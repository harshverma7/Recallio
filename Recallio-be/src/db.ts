import mongoose, { Types } from "mongoose";
import { URL } from "./config/config";

const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "youtube",
  "twitter",
];
mongoose.connect(URL);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
});

const contentSchema = new mongoose.Schema(
  {
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: String }],
    userId: { type: Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt fields automatically
  }
);

const tagSchema = new mongoose.Schema({
  title: { type: String, unique: true },
});

const linkSchema = new mongoose.Schema({
  hash: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true, unique: true },
});

export const UserModel = mongoose.model("User", userSchema);
export const TagModel = mongoose.model("Tag", tagSchema);
export const LinkModel = mongoose.model("Link", linkSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
