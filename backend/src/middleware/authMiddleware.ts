import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// We extend the Express Request interface to attach our user payload
export interface AuthRequest extends Request {
    user?: { id: number; role: string };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // Tokens are usually sent in the Authorization header like: "Bearer <token>"
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Access Denied: No Token Provided" });
        return;
    }

    try {
        // Verify the token using the secret from your .env file
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || "fallback_secret"
        ) as { id: number; role: string };
        
        // Attach the decoded user data to the request so the next function can use it
        req.user = decoded;
        next(); // Move on to the actual route!
    } catch (err) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

