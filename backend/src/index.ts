import "reflect-metadata"
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is missing from environment");
  console.log("Please add your API key to the .env file.");
  process.exit(1);
}

const app = express();
//app.use(cors());: development
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      process.env.FRONTEND_URL!,
    ],
    credentials: true,
  })
);
// production for removing cors error: allows development too

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Backend + TypeScript!");
});

//routes setup
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/match", matchRoutes);

AppDataSource.initialize()
  .then(async () => {
    console.log("Database connection established successfully!");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });