import { AuthRequest } from "./auth";
import { Response, NextFunction } from "express";

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) return res.status(403).json({ error: "forbidden" });
    next();
  };
}
