import express from "express";
import cors from "cors";
import { UserModel, ContentModel, LinkModel } from "./db";
import { z } from "zod";
import { validateRequest } from "./middleware/validateMiddleware";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config/config";
import { authRequest } from "./middleware/authMiddleware";
import { random } from "./utils/utils";

const app = express();

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

const signupSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

const signinSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(6),
});

const contentTypes = [
  "image",
  "video",
  "article",
  "audio",
  "youtube",
  "twitter",
] as const;

const createContentSchema = z.object({
  link: z
    .string()
    .min(1, "URL is required")
    .refine((url) => {
      try {
        new URL(url);
        return true;
      } catch {
        try {
          new URL(`https://${url}`);
          return true;
        } catch {
          return false;
        }
      }
    }, "Please enter a valid URL (e.g., https://youtube.com/watch?v=...)"),
  type: z.enum(contentTypes, {
    errorMap: () => ({
      message: `Type must be one of: ${contentTypes.join(", ")}`,
    }),
  }),
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  tags: z.array(z.string()).optional().default([]),
});

const deleteContentSchema = z.object({
  contentId: z.string().min(1, "Content ID is required"),
});

const deleteAccountSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

const importCollectionSchema = z.object({
  hash: z.string().min(1, "Share hash is required"),
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

app.post("/api/v1/signin", validateRequest(signinSchema), async (req, res) => {
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

app.post(
  "/api/v1/content",
  authRequest,
  validateRequest(createContentSchema),
  async (req, res) => {
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
  }
);

app.get("/api/v1/content", authRequest, async (req, res) => {
  const userId = req.userId;

  try {
    const content = await ContentModel.find({
      userId: userId,
    })
      .populate("userId", "username")
      .sort({ createdAt: -1 });
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

app.get("/api/v1/content/search", authRequest, async (req, res) => {
  const userId = req.userId;
  const { q } = req.query;

  try {
    if (!q || typeof q !== "string") {
      res.status(400).json({
        message: "Search query is required",
      });
      return;
    }

    const searchQuery = q.trim();
    if (searchQuery.length === 0) {
      res.status(400).json({
        message: "Search query cannot be empty",
      });
      return;
    }

    const content = await ContentModel.find({
      userId: userId,
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ],
    })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.status(200).json({
      content,
      message: "Search results fetched",
      query: searchQuery,
    });
  } catch (e) {
    console.error("Search error:", e);
    res.status(500).json({
      message: "Internal server error",
      error: e instanceof Error ? e.message : "Unknown error",
    });
  }
});

app.delete(
  "/api/v1/content",
  authRequest,
  validateRequest(deleteContentSchema),
  async (req, res) => {
    const userId = req.userId;
    const { contentId } = req.body;

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
  }
);

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

app.delete(
  "/api/v1/account",
  authRequest,
  validateRequest(deleteAccountSchema),
  async (req, res) => {
    const userId = req.userId;
    const { password } = req.body;

    try {
      // First verify the user exists and password is correct
      const user = await UserModel.findById(userId);
      if (!user?.password) {
        res.status(400).json({
          message: "User not found",
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

      // Delete all content associated with the user
      await ContentModel.deleteMany({ userId: userId });

      // Delete any share links associated with the user
      await LinkModel.deleteMany({ userId: userId });

      // Finally delete the user account
      await UserModel.deleteOne({ _id: userId });

      res.status(200).json({
        message: "Account deleted successfully",
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal server error",
        error: e,
      });
    }
  }
);

app.post(
  "/api/v1/recall/import",
  authRequest,
  validateRequest(importCollectionSchema),
  async (req, res) => {
    const userId = req.userId;
    const { hash } = req.body;

    try {
      const sharedLink = await LinkModel.findOne({ hash: hash });
      if (!sharedLink) {
        res.status(404).json({
          message: "Shared collection not found",
        });
        return;
      }

      const sharedContent = await ContentModel.find({
        userId: sharedLink.userId,
      }).sort({ createdAt: -1 });

      if (sharedContent.length === 0) {
        res.status(200).json({
          message: "No content to import",
          importedCount: 0,
        });
        return;
      }

      const userContent = await ContentModel.find({ userId: userId });
      const existingUrls = new Set(userContent.map((content) => content.link));

      const contentToImport = sharedContent
        .filter((content) => !existingUrls.has(content.link))
        .map((content) => ({
          userId: userId,
          link: content.link,
          type: content.type,
          title: content.title,
          tags: content.tags || [],
        }));

      if (contentToImport.length === 0) {
        res.status(200).json({
          message: "All content already exists in your collection",
          importedCount: 0,
        });
        return;
      }

      await ContentModel.insertMany(contentToImport);

      res.status(200).json({
        message: `Successfully imported ${contentToImport.length} items`,
        importedCount: contentToImport.length,
        skippedDuplicates: sharedContent.length - contentToImport.length,
      });
    } catch (e) {
      res.status(500).json({
        message: "Internal server error",
        error: e,
      });
    }
  }
);

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
    }).sort({ createdAt: -1 });

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
