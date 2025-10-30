import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
const JWT_SECRET = process.env.JWT_SECRET || "change_this";

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization?.split(" ");
  if (!auth || auth[0] !== "Bearer")
    return res.status(401).json({ error: "no token" });
  try {
    const payload = jwt.verify(auth[1], JWT_SECRET) as any;
    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ error: "invalid token" });
  }
}
