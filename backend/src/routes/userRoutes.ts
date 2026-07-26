import { Router } from "express";
import { register, login, googleLogin } from "../controllers/userControllers.js";

const router = Router();

// POST /api/users/register
router.post("/register", register);

// POST /api/users/login
router.post("/login", login);

// POST /api/users/google-login
router.post("/google-login", googleLogin);

export default router;
