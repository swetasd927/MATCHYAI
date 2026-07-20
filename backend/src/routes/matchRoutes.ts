import { Router } from "express";
import { getMatchesForJob, getMatchExplanation } from "../controllers/matchControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:jobId", authenticateToken, getMatchesForJob);
router.get("/:jobId/explanation/:resumeId", authenticateToken, getMatchExplanation);

export default router;