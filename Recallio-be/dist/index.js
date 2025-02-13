"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const zod_1 = require("zod");
const validateMiddleware_1 = require("./validateMiddleware");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const authMiddleware_1 = require("./authMiddleware");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(6),
});
app.post("/api/v1/signup", (0, validateMiddleware_1.validateRequest)(signupSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 5);
    try {
        const user = yield db_1.UserModel.create({
            username,
            password: hashedPassword,
        });
        res.json({
            message: "User Signed Up",
        });
    }
    catch (e) {
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
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield db_1.UserModel.findOne({ username });
        if (!(user === null || user === void 0 ? void 0 : user.username) || !(user === null || user === void 0 ? void 0 : user.password)) {
            res.status(400).json({
                message: "User does not exist",
            });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).json({
                message: "Invalid Password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            username: user.username,
            id: user._id,
        }, config_1.JWT_SECRET, { expiresIn: "12h" });
        res.json({
            token,
            expiresIn: "12h",
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}));
app.post("/api/v1/content", authMiddleware_1.authRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { link, type, title, tags } = req.body;
    try {
        const content = yield db_1.ContentModel.create({
            userId: userId,
            link: link,
            type: type,
            title: title,
            tags: tags || [],
        });
        res.status(201).json({
            message: "Content created",
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e,
        });
    }
}));
app.get("/api/v1/content", authMiddleware_1.authRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const content = yield db_1.ContentModel.find({
            userId: userId,
        }).populate("userId", "username");
        res.status(200).json({
            content,
            message: "Content fetched",
        });
    }
    catch (e) {
        res.status(500).json({
            error: e,
        });
    }
}));
app.delete("/api/v1/content", authMiddleware_1.authRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.body.contentId;
    if (!contentId) {
        res.status(400).json({
            message: "contentId is required",
        });
        return;
    }
    try {
        const result = yield db_1.ContentModel.deleteOne({
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
    }
    catch (e) {
        res.status(500).json({
            message: "error while deleting content",
            error: e,
        });
    }
}));
app.post("/api/v1/recall/share", authMiddleware_1.authRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { share } = req.body;
    try {
        if (share) {
            const existingLink = yield db_1.LinkModel.findOne({
                userId: userId,
            });
            if (existingLink) {
                res.status(200).json({
                    hash: existingLink.hash,
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            const link = yield db_1.LinkModel.create({
                userId: userId,
                hash: hash,
            });
            res.status(201).json({
                hash: link.hash,
            });
        }
        else {
            yield db_1.LinkModel.deleteOne({
                userId: userId,
            });
            res.status(200).json({
                message: "Link removed",
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e,
        });
    }
}));
app.get("/api/v1/recall/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    try {
        const link = yield db_1.LinkModel.findOne({
            hash: hash,
        });
        if (!link) {
            res.status(404).json({
                message: "Link not found",
            });
            return;
        }
        const content = yield db_1.ContentModel.find({
            userId: link.userId,
        });
        const user = yield db_1.UserModel.findOne({
            _id: link.userId,
        });
        res.status(200).json({
            user: user === null || user === void 0 ? void 0 : user.username,
            content,
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e,
        });
    }
}));
app.listen(3000);
