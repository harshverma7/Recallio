import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";

export const authRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token as string, JWT_SECRET) as { id: string };
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized Request, login to get access",
    });
    return;
  }
};
