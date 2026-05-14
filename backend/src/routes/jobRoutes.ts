import { Router } from "express";
import { createJob } from "../controllers/jobControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// POST /api/jobs
router.post("/", authenticateToken, createJob);

export default router;
