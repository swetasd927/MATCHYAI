import { Request, Response } from "express";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";

import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { AppDataSource } from "../config/db.js";
import { Resume } from "../entities/Resume.js";
// Importing pdf-parse's inner lib file directly (not the package root) — the
// package's own index.js runs a top-level "debug mode" check (`!module.parent`)
// that, under ESM/tsx interop, evaluates to true and tries to read a test PDF
// (./test/data/05-versions-space.pdf) that doesn't exist in this project,
// throwing ENOENT. Importing lib/pdf-parse.js skips that broken code entirely.

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
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.1,
});

// Initialize the Gemini Embedding model to convert text into numbers.
// NOTE: "text-embedding-004" was deprecated by Google — it now 404s on v1beta.
// "gemini-embedding-001" is the current replacement. This MUST stay identical
// to the model used in jobControllers.ts, since resume and job embeddings are
// compared via cosine similarity and only make sense in the same vector space.
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
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
    // Bypassing the ESM/CJS interop bug in TSX
    const parsedPdf = await pdfParse(pdfBuffer);
    const rawText = parsedPdf.text;

    // 2 & 4. Structure the resume into JSON AND generate its vector embedding
    // at the same time. Both only depend on rawText (from step 1), not on
    // each other, so running them sequentially was pure wasted latency —
    // each Gemini call takes a few seconds, and doing them one after another
    // meant paying for both in full. Promise.all cuts total wait time down
    // to roughly whichever one is slower, not the sum of both.
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
      embedding: vectorEmbedding, // Standard array for Postgres float[]
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
    res.status(500).json({
      message: "Server error while processing resume",
      error: err.message,
      stack: err.stack,
    });
  }
};