import express from "express";
import { UserModel, ContentModel, LinkModel } from "./db";
import { z } from "zod";
import { validateRequest } from "./validateMiddleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authRequest } from "./authMiddleware";
import { random } from "./utils";

const app = express();

app.use(express.json());

const signupSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

app.post("/api/v1/signup", validateRequest(signupSchema), async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    const user = await UserModel.create({
      username,
      password: hashedPassword,
    });

    res.json({
      message: "User Signed Up",
    });
  } catch (e: any) {
    if (e.code === 11000) {
      res.status(409).json({
        message: "Username already exists",
      });
      return;
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user?.username || !user?.password) {
      res.status(400).json({
        message: "User does not exist",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({
        message: "Invalid Password",
      });
      return;
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      token,
      expiresIn: "12h",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/api/v1/content", authRequest, async (req, res) => {
  const userId = req.userId;
  const { link, type, title, tags } = req.body;

  try {
    const content = await ContentModel.create({
      userId: userId,
      link: link,
      type: type,
      title: title,
      tags: tags || [],
    });

    res.status(201).json({
      message: "Content created",
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
});

app.get("/api/v1/content", authRequest, async (req, res) => {
  const userId = req.userId;

  try {
    const content = await ContentModel.find({
      userId: userId,
    }).populate("userId", "username");

    res.status(200).json({
      content,
      message: "Content fetched",
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
});

app.delete("/api/v1/content", authRequest, async (req, res) => {
  const userId = req.userId;
  const contentId = req.body.contentId;

  if (!contentId) {
    res.status(400).json({
      message: "contentId is required",
    });
    return;
  }

  try {
    const result = await ContentModel.deleteOne({
      userId: userId,
      _id: contentId,
    });

    if (result.deletedCount === 0) {
      res.status(404).json({
        message: "Content not found",
      });
      return;
    }

    res.status(200).json({
      message: "Content deleted",
    });
  } catch (e) {
    res.status(500).json({
      message: "error while deleting content",
      error: e,
    });
  }
});

app.post("/api/v1/recall/share", authRequest, async (req, res) => {
  const userId = req.userId;
  const { share } = req.body;

  try {
    if (!userId) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    if (share) {
      const existingLink = await LinkModel.findOne({
        userId: userId,
      });

      if (existingLink) {
        res.status(200).json({
          hash: existingLink.hash,
        });
        return;
      }

      const hash = random(10);
      const link = await LinkModel.create({
        userId: userId,
        hash: hash,
      });

      res.status(201).json({
        hash: link.hash,
      });
    } else {
      await LinkModel.deleteOne({
        userId: userId,
      });
      res.status(200).json({
        message: "Link removed",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
});

app.get("/api/v1/recall/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;

  try {
    const link = await LinkModel.findOne({
      hash: hash,
    });

    if (!link) {
      res.status(404).json({
        message: "Link not found",
      });
      return;
    }

    const content = await ContentModel.find({
      userId: link.userId,
    });

    const user = await UserModel.findOne({
      _id: link.userId,
    });

    res.status(200).json({
      user: user?.username,
      content,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
      error: e,
    });
  }
});

app.listen(3000);
