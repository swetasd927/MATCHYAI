import { Request, Response } from "express";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { AppDataSource } from "../config/db.js";
import { Job } from "../entities/Job.js";

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

interface AppError extends Error {
  statusCode?: number;
}

interface JobData {
  title?: string;
  requirements?: string[];
  skills?: string[];
}

const aiModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.1,
  maxRetries: 23, // fail fast, matches resumeControllers.ts
});

// Must stay identical to the model used in resumeControllers.ts — job and
// resume embeddings are compared via cosine similarity, so they only make
// sense if both come from the exact same embedding model/vector space.
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  modelName: "gemini-embedding-001",
});

export const createJob = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (req.user?.role !== "recruiter") {
      res.status(403).json({ message: "Only Recruiters can post jobs" });
      return;
    }

    const { description } = req.body;

    if (!description) {
      res.status(400).json({ message: "Job description is required" });
      return;
    }

    // 1. Instruct Gemini to extract and structure the data into JSON
    const systemPrompt = `You are an expert at parsing Job Descriptions. 
        Extract the following information from the provided job description text and
        return it strictly as a JSON object matching this exact schema:
    {
        "title": "Job Title",
        "requirements": ["requirement1", "requirement2"],
        "skills": ["skill1", "skill2"]
    }
        Return ONLY valid JSON. Do not include any markdown formatting like \`\`\`json.`;

    const aiResponse = await aiModel.invoke([
      new SystemMessage(systemPrompt),
      new HumanMessage(description),
    ]);

    // 2. Parse Gemini's JSON string back into a real JavaScript Object
    let structuredData: JobData;
    try {
      structuredData = JSON.parse(aiResponse.content.toString()) as JobData;
    } catch (jsonError) {
      console.error("AI output was not valid JSON:", aiResponse.content);
      res.status(500).json({ message: "Failed to structure job data" });
      return;
    }

    // 3. Generate Vector Embeddings for the job description
    const vectorEmbedding = await embeddingsModel.embedQuery(description);

    // 4. Save the structured JSON AND the Vector Embedding into PostgreSQL Database!
    const jobRepository = AppDataSource.getRepository(Job);
    const newJob = jobRepository.create({
      recruiterId: req.user.id,
      title: structuredData.title || "Untitled Job",
      description: description,
      requirements: structuredData.requirements || [],
      skills: structuredData.skills || [],
      embedding: vectorEmbedding,
    });

    await jobRepository.save(newJob);

    // 5. Send the saved DB record back to the user
    res.status(201).json({
      message: "Job successfully created, parsed, and embedded!",
      data: newJob,
    });
  } catch (error) {
    const err = error as AppError;
    console.error("Error creating job:", error);

    const isRateLimit =
      err.message?.includes("429") || err.message?.toLowerCase().includes("quota");

    if (isRateLimit) {
      res.status(429).json({
        message: "Our AI service is temporarily busy (rate limit reached). Please try again in a minute.",
      });
      return;
    }

    res.status(500).json({
      message: "Server error while processing job description. Please try again.",
    });
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const jobRepository = AppDataSource.getRepository(Job);
    const job = await jobRepository.findOne({ where: { id: Number(req.params.id) } });

    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    res.status(200).json({ data: job });
  } catch (error) {
    const err = error as AppError;
    console.error("Error fetching job:", error); // was mislabeled "Error creating job"

    res.status(500).json({
      message: "Server error while fetching job. Please try again.",
    });
  }
};