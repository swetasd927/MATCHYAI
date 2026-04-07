import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

dotenv.config();
console.log("API Key:", process.env.GEMINI_API_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

// Validate env variables on startup
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing from .env! Gemini features will be disabled.");
}

// Gemini API Test
const testGemini = async (): Promise<void> => {
  if (!process.env.GEMINI_API_KEY) return;

  try {
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-2.5-flash",
    });

    const res = await model.invoke([
      ["human", "What would be a good company name for a company that makes colorful socks?"],
    ]);

    console.log("Gemini Response:", res.content);
  } catch (err) {
      console.error("Gemini error:", err);
   
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Backend + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  testGemini();
});
