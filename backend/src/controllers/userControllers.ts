import { Request, Response } from "express";
import { AppDataSource } from "../config/db.js";
import { User, UserRole } from "../entities/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
        if (!user) {
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
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
};

