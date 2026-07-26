import { Request, Response } from "express";
import { AppDataSource } from "../config/db.js";
import { User, UserRole } from "../entities/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "576593608797-u8525u5pr6ovdfeif7qsnnfej6bpj327.apps.googleusercontent.com";
const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) {
            res.status(400).json({ message: "User with this email already exists" });
            return;
        }

        // Hash the password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the new user
        const newUser = userRepository.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || UserRole.SEEKER // Defaults to Seeker
        });

        await userRepository.save(newUser);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userRepository.findOneBy({ email });
        if (!user || !user.password) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Compare the provided password with the hashed one in the DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // Create the JWT Token containing their ID and Role
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "fallback_secret", // We will add JWT_SECRET to .env next
            { expiresIn: "1d" } // Token expires in 1 day
        );

        // Send back the token and basic user info (DO NOT send the password!)
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { credential, role } = req.body;
        if (!credential) {
            res.status(400).json({ message: "Google credential token is required" });
            return;
        }

        let googleUserPayload: {
            sub: string;
            email: string;
            given_name?: string;
            family_name?: string;
            picture?: string;
        } | null = null;

        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: credential,
                audience: GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (payload && payload.email) {
                googleUserPayload = {
                    sub: payload.sub,
                    email: payload.email,
                    given_name: payload.given_name || payload.name?.split(" ")[0] || "User",
                    family_name: payload.family_name || payload.name?.split(" ").slice(1).join(" ") || "",
                    picture: payload.picture,
                };
            }
        } catch (verifyErr) {
            console.warn("Direct ID token verify fallback check:", verifyErr);
            const fetchRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
            if (fetchRes.ok) {
                const info = (await fetchRes.json()) as {
                    sub: string;
                    email: string;
                    given_name?: string;
                    family_name?: string;
                    name?: string;
                    picture?: string;
                };
                if (info.email) {
                    googleUserPayload = {
                        sub: info.sub,
                        email: info.email,
                        given_name: info.given_name || info.name?.split(" ")[0] || "User",
                        family_name: info.family_name || info.name?.split(" ").slice(1).join(" ") || "",
                        picture: info.picture,
                    };
                }
            }
        }

        if (!googleUserPayload) {
            res.status(400).json({ message: "Invalid or expired Google Token" });
            return;
        }

        const { sub, email, given_name, family_name, picture } = googleUserPayload;

        let user = await userRepository.findOne({
            where: [{ googleId: sub }, { email }]
        });

        if (user) {
            if (!user.googleId) user.googleId = sub;
            if (!user.avatarUrl && picture) user.avatarUrl = picture;
            await userRepository.save(user);
        } else {
            user = userRepository.create({
                firstName: given_name || "User",
                lastName: family_name || "",
                email,
                googleId: sub,
                avatarUrl: picture,
                role: role === UserRole.RECRUITER ? UserRole.RECRUITER : UserRole.SEEKER,
            });
            await userRepository.save(user);
        }

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET || "fallback_secret",
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
            }
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: "Server error during Google login" });
    }
};


