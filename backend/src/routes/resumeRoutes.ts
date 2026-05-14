import { Router } from "express";
import multer from "multer";
import { uploadAndParseResume } from "../controllers/resumeControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// POST /api/resume/upload
// 1. authenticateToken: Ensures the user is logged in
// 2. upload.single("pdf"): Multer intercepts the file attached to the field named "pdf"
// 3. uploadAndParseResume: Our logic runs!
router.post("/upload", authenticateToken, upload.single("pdf"), uploadAndParseResume);

export default router;
