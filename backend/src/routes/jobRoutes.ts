import { Router } from "express";
import { createJob, getJobById } from "../controllers/jobControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/jobs
router.post("/", authenticateToken, createJob);

// GET /api/jobs/:id
router.get("/:id", authenticateToken, getJobById);

export default router;