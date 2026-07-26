import { Request, Response } from "express";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { AppDataSource } from "../config/db.js";
import { Resume } from "../entities/Resume.js";
import pdfParse from "pdf-parse";

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

interface AppError extends Error {
  statusCode?: number;
}

interface ResumeData {
  name?: string;
  address?: string;
  skills?: string[];
  experience?: Array<{ title: string; company: string; duration: string }>;
  education?: Array<{ degree: string; institution: string; year: string }>;
}

// Initialize the Gemini AI model for structured JSON parsing
const aiModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.1,
  // Was 12 — on a daily quota error, retries don't help (the cap doesn't
  // reset mid-retry), so 12 retries just meant the client sat there for
  // 10+ minutes before finally failing. 1 retry catches transient blips
  // without turning quota exhaustion into a multi-minute hang.
  maxRetries: 1,
});

// Initialize the Gemini Embedding model to convert text into numbers.
// NOTE: "text-embedding-004" was deprecated by Google — it now 404s on v1beta.
// "gemini-embedding-001" is the current replacement. This MUST stay identical
// to the model used in jobControllers.ts, since resume and job embeddings are
// compared via cosine similarity and only make sense in the same vector space.
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY,
  modelName: "gemini-embedding-001",
});

export const uploadAndParseResume = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    if (req.user?.role !== "seeker") {
      res.status(403).json({ message: "Only Job Seekers can upload resumes" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "Please upload a PDF file" });
      return;
    }

    // 1. Extract raw text using pdf-parse
    const pdfBuffer = req.file.buffer;
    const parsedPdf = await pdfParse(pdfBuffer);
    const rawText = parsedPdf.text;

    // 2 & 4. Structure the resume into JSON AND generate its vector embedding
    // at the same time — both only depend on rawText, not on each other, so
    // Promise.all cuts total wait time to roughly whichever is slower rather
    // than the sum of both.
    const systemPrompt = `You are an expert at parsing CV/PDF files. 
        Extract the following information from the provided resume text and
        return it strictly as a JSON object matching this exact schema:
    {
        "name": "Full Name",
        "address": "Full Address or Location",
        "skills": ["skill1", "skill2"],
        "experience": [{"title": "Job Title", "company": "Company Name", "duration": "Duration"}],
        "education": [{"degree": "Degree Name", "institution": "University Name", "year": "Year"}]
    }
        Return ONLY valid JSON. Do not include any markdown formatting like \`\`\`json.`;

    const [aiResponse, vectorEmbedding] = await Promise.all([
      aiModel.invoke([new SystemMessage(systemPrompt), new HumanMessage(rawText)]),
      embeddingsModel.embedQuery(rawText),
    ]);

    // 3. Parse Gemini's JSON string back into a real JavaScript Object
    let structuredData: ResumeData;
    try {
      structuredData = JSON.parse(aiResponse.content.toString()) as ResumeData;
    } catch (jsonError) {
      console.error("AI output was not valid JSON:", aiResponse.content);
      res.status(500).json({ message: "Failed to structure resume data" });
      return;
    }

    // 4. Save the structured JSON AND the Vector Embedding into our PostgreSQL Database!
    const resumeRepository = AppDataSource.getRepository(Resume);
    const newResume = resumeRepository.create({
      userId: req.user.id,
      name: structuredData.name || "",
      address: structuredData.address || "",
      skills: structuredData.skills || [],
      experience: structuredData.experience || [],
      education: structuredData.education || [],
      embedding: vectorEmbedding,
    });

    await resumeRepository.save(newResume);

    // 6. Send the saved DB record back to the user
    res.status(200).json({
      message:
        "Resume successfully parsed, embedded, and saved to the vector database!",
      data: newResume,
    });
  } catch (error) {
    const err = error as AppError;
    console.error("Error parsing resume:", error);

    const isRateLimit =
      err.message?.includes("429") || err.message?.toLowerCase().includes("quota");

    if (isRateLimit) {
      res.status(429).json({
        message: "Our AI service is temporarily busy (rate limit reached). Please try again in a minute.",
      });
      return;
    }

    res.status(500).json({
      message: "Server error while processing resume. Please try again.",
    });
  }
};