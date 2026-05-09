import { Router } from "express";
import { register, login } from "../controllers/userControllers.js";

const router = Router();

// POST /api/users/register
router.post("/register", register);

// POST /api/users/login
router.post("/login", login);

export default router;
