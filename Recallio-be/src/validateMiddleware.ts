import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (e) {
      res.status(400).json({
        message: "Invalid Request Body",
      });
    }
  };
};
