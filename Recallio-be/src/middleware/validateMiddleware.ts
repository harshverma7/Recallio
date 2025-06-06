import { z } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequest = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        const errors = e.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        const firstError = errors[0];
        res.status(400).json({
          message: firstError ? firstError.message : "Invalid Request Body",
          errors: errors,
        });
      } else {
        res.status(400).json({
          message: "Invalid Request Body",
        });
      }
    }
  };
};
