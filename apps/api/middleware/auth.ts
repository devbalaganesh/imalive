import type { Request, Response, NextFunction } from "express";
import { clerkClient, verifyToken } from "@clerk/express";
import dotenv from "dotenv";

dotenv.config();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "No token provided", success: false });
      return;
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify Clerk token using the new SDK
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });

    if (!payload.sub) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }

    // ✅ Attach user info
    (req as any).userId = payload.sub;
    next();
  } catch (err: any) {
    console.error("Auth error:", err.message || err);
    res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: err.message,
    });
  }
}
