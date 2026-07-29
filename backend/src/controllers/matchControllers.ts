import { Request, Response } from "express";
import { AppDataSource } from "../config/db.js";
import { Job } from "../entities/Job.js";
import { Resume } from "../entities/Resume.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";

const aiModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.2,
});

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const getMatchesForJob = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (req.user?.role !== "recruiter") {
      res.status(403).json({ message: "Only Recruiters can view matches" });
      return;
    }

    const { jobId } = req.params;

    const jobRepository = AppDataSource.getRepository(Job);
    const resumeRepository = AppDataSource.getRepository(Resume);

    // 1. Fetch the Job
    const job = await jobRepository.findOne({ where: { id: Number(jobId) } });

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    if (!job.embedding || job.embedding.length === 0) {
      res.status(400).json({ message: "Job does not have an embedding yet" });
      return;
    }

    // 2. Fetch all Resumes that have embeddings
    const resumes = await resumeRepository
      .createQueryBuilder("resume")
      .where("resume.embedding IS NOT NULL")
      .getMany();

    if (resumes.length === 0) {
      res.status(404).json({ message: "No resumes found to match against" });
      return;
    }

    // 3. Compare vectors using Calibrated Cosine Similarity + Skill Overlap
    const jobSkills = [
      ...(job.skills || []),
      ...(job.requirements || []),
    ].map((s) => s.toLowerCase().trim()).filter(Boolean);

    const matchResults = resumes.map((resume) => {
      const similarityScore = cosineSimilarity(job.embedding, resume.embedding);

      // Embedding calibration:
      // Raw cosine similarity between tech documents sits in a baseline range [0.50, 0.90].
      // Map 0.50 -> 0% and 0.90 -> 100% so unrelated tech roles (like QA vs SWE) don't get 60%+.
      const minSim = 0.50;
      const maxSim = 0.90;
      const calibratedEmbeddingScore = Math.min(
        100,
        Math.max(0, ((similarityScore - minSim) / (maxSim - minSim)) * 100),
      );

      // Skill Overlap calculation
      const candidateSkills = (resume.skills || []).map((s) => s.toLowerCase().trim());
      let matchedSkillCount = 0;

      if (jobSkills.length > 0) {
        jobSkills.forEach((jobSkill) => {
          const matched = candidateSkills.some(
            (cSkill) => cSkill.includes(jobSkill) || jobSkill.includes(cSkill),
          );
          if (matched) matchedSkillCount++;
        });
      }

      const skillScore =
        jobSkills.length > 0 ? (matchedSkillCount / jobSkills.length) * 100 : calibratedEmbeddingScore;

      // Hybrid score: 60% calibrated embedding similarity + 40% skill overlap
      const finalScore =
        jobSkills.length > 0
          ? 0.6 * calibratedEmbeddingScore + 0.4 * skillScore
          : calibratedEmbeddingScore;

      const matchPercentage = Number(finalScore.toFixed(2));

      return {
        resumeId: resume.id,
        name: resume.name,
        skills: resume.skills,
        experience: resume.experience,
        education: resume.education,
        matchPercentage,
        similarityScore,
      };
    });

    // 4. Sort by matchPercentage DESC and return Top 5
    matchResults.sort((a, b) => b.matchPercentage - a.matchPercentage);
    const top5Matches = matchResults.slice(0, 5);

    res.status(200).json({
      jobId: job.id,
      jobTitle: job.title,
      matches: top5Matches,
    });
  } catch (error) {
    console.error("Error matching resumes:", error);
    res.status(500).json({
      message: "Server error while matching resumes",
    });
  }
};

export const getMatchExplanation = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { jobId, resumeId } = req.params;
    const jobRepository = AppDataSource.getRepository(Job);
    const resumeRepository = AppDataSource.getRepository(Resume);

    const job = await jobRepository.findOne({ where: { id: Number(jobId) } });
    const resume = await resumeRepository.findOne({ where: { id: Number(resumeId) } });

    if (!job || !resume) {
      res.status(404).json({ message: "Job or resume not found" });
      return;
    }

    const prompt = `You are an expert technical recruiter. Explain concisely in 1-2 sentences why this candidate is a good match for the job.
Job Title: ${job.title}
Job Requirements: ${job.requirements.join(", ")}
Candidate Skills: ${resume.skills.join(", ")}
Candidate Experience: ${JSON.stringify(resume.experience)}
Candidate Education: ${JSON.stringify(resume.education)}
Provide ONLY the explanation, without quotes.`;

    const aiResponse = await aiModel.invoke([new HumanMessage(prompt)]);
    res.status(200).json({ explanation: aiResponse.content.toString().trim() });
  } catch (error) {
    console.error("Error generating explanation:", error);
    res.status(500).json({ message: "Failed to generate explanation" });
  }
};