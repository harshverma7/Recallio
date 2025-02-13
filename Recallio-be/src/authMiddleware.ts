import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
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

  const decoded = jwt.verify(token as string, JWT_SECRET) as { id: string };

  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized Request, login to get access",
    });
    return;
  }

  req.userId = decoded.id;
  next();
};
