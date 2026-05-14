import { Router } from "express";
import { getMatchesForJob } from "../controllers/matchControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

// GET /api/match/:jobId
router.get("/:jobId", authenticateToken, getMatchesForJob);

export default router;
