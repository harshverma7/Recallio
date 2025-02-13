import * as dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET || !process.env.DATABASE_URL) {
  throw new Error("Missing required environment variables");
}

export const JWT_SECRET = process.env.JWT_SECRET;
export const URL = process.env.DATABASE_URL;
