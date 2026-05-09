import { Request, Response } from "express";
import type PdfParseType from "pdf-parse";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { AppDataSource } from "../config/db.js";
import { Resume } from "../entities/Resume.js";

const pdfParse: typeof PdfParseType = require("pdf-parse");

interface AuthRequest extends Request {
    user?: { id: number; role: string };
}

// Initialize the Gemini AI model for structured JSON parsing
const aiModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-1.5-flash",
    temperature: 0.1, // Very low temperature so it strictly follows our JSON instructions!
});

// Initialize the Gemini Embedding model to convert text into numbers
const embeddingsModel = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    modelName: "text-embedding-004", // Gemini's dedicated embedding model (768 dimensions)
});

export const uploadAndParseResume = async (req: AuthRequest, res: Response): Promise<void> => {
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

        // 2. Instruct Gemini to extract and structure the data into JSON
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

        const aiResponse = await aiModel.invoke([
            new SystemMessage(systemPrompt),
            new HumanMessage(rawText)
        ]);

        // 3. Parse Gemini's JSON string back into a real JavaScript Object
        let structuredData;
        try {
            structuredData = JSON.parse(aiResponse.content.toString());
        } catch (jsonError) {
            console.error("AI output was not valid JSON:", aiResponse.content);
            res.status(500).json({ message: "Failed to structure resume data" });
            return;
        }

        // 4. Generate Vector Embeddings for the resume
        // We pass the rawText to the embedding model, which returns an array of 768 floats!
        const vectorEmbedding = await embeddingsModel.embedQuery(rawText);

        // 5. Save the structured JSON AND the Vector Embedding into our PostgreSQL Database!
        const resumeRepository = AppDataSource.getRepository(Resume);
        const newResume = resumeRepository.create({
            userId: req.user.id,
            name: structuredData.name || "",
            address: structuredData.address || "",
            skills: structuredData.skills || [],
            experience: structuredData.experience || [],
            education: structuredData.education || [],
            embedding: vectorEmbedding // Standard array for Postgres float[]
        });

        await resumeRepository.save(newResume);

        // 6. Send the saved DB record back to the user
        res.status(200).json({
            message: "Resume successfully parsed, embedded, and saved to the vector database!",
            data: newResume
        });

    } catch (error) {
        console.error("Error parsing resume:", error);
        res.status(500).json({ message: "Server error while processing resume" });
    }
};
