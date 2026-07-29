import { Router } from "express";
import { createJob, getJobById, getAllJobs } from "../controllers/jobControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/jobs
router.get("/", authenticateToken, getAllJobs);

// POST /api/jobs
router.post("/", authenticateToken, createJob);

// GET /api/jobs/:id
router.get("/:id", authenticateToken, getJobById);

export default router;