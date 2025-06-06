import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  username: string;
  id: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: "image" | "video" | "article" | "audio" | "youtube" | "twitter";
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: string;
}

export interface CreateContentRequest {
  title: string;
  link: string;
  type: "image" | "video" | "article" | "audio" | "youtube" | "twitter";
  tags?: string[];
}

// Auth API
export const authAPI = {
  signup: async (username: string, password: string) => {
    const response = await api.post("/signup", { username, password });
    return response.data;
  },

  signin: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post("/signin", { username, password });
    return response.data;
  },

  deleteAccount: async (password: string) => {
    const response = await api.delete("/account", { data: { password } });
    return response.data;
  },
};

// Content API
export const contentAPI = {
  getAll: async (): Promise<{ content: Content[] }> => {
    const response = await api.get("/content");
    return response.data;
  },

  search: async (
    query: string
  ): Promise<{ content: Content[]; query: string }> => {
    const response = await api.get(
      `/content/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  create: async (content: CreateContentRequest) => {
    const response = await api.post("/content", content);
    return response.data;
  },

  delete: async (contentId: string) => {
    const response = await api.delete("/content", { data: { contentId } });
    return response.data;
  },
};

// Share API
export const shareAPI = {
  createShareLink: async (): Promise<{ hash: string }> => {
    const response = await api.post("/recall/share", { share: true });
    return response.data;
  },

  removeShareLink: async () => {
    const response = await api.post("/recall/share", { share: false });
    return response.data;
  },

  getSharedContent: async (shareLink: string) => {
    const response = await axios.get(`${API_BASE_URL}/recall/${shareLink}`);
    return response.data;
  },

  importCollection: async (
    shareUrl: string
  ): Promise<{ importedCount: number; skippedDuplicates: number }> => {
    // Extract the hash from the share URL
    const urlParts = shareUrl.split("/shared/");
    if (urlParts.length !== 2) {
      throw new Error("Invalid share URL format");
    }
    const hash = urlParts[1];

    const response = await api.post("/recall/import", { hash });
    return {
      importedCount: response.data.importedCount,
      skippedDuplicates: response.data.skippedDuplicates || 0,
    };
  },
};
