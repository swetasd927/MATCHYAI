import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage } from "@langchain/core/messages";
import "reflect-metadata";

dotenv.config();
//console.log("API Key:", process.env.GEMINI_API_KEY);
const app = express();
const PORT = process.env.PORT || 5000;

const testGemini = async () => {
  if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing from environment");
  console.log("Please add your API key to the .env file.");
  process.exit(1);
} 
// Initialize the Gemini model
  const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
  });

  console.log("Asking Gemini for a compliment...");

  // Send a message to the model
  const response = await model.invoke([
    new HumanMessage("Human message"),
  ]);

  console.log("\nGemini's Response:\n");
  console.log(response.content);
}

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Backend + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  testGemini().catch(console.error);;
});
