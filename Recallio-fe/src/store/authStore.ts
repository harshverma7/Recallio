import { create } from "zustand";
import { authAPI, type AuthResponse } from "../services/api";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signin: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: (password: string) => Promise<void>;
  clearError: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  token: null,
  isLoading: false,
  error: null,

  signin: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response: AuthResponse = await authAPI.signin(username, password);
      localStorage.setItem("authToken", response.token);
      set({
        isAuthenticated: true,
        token: response.token,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      let errorMessage = "Sign in failed. Try again.";

      if (error.response?.status === 400) {
        const message = error.response?.data?.message;
        if (message === "User does not exist") {
          errorMessage =
            "Username not found. Please check your username or sign up.";
        } else if (message === "Invalid Password") {
          errorMessage = "Incorrect password. Please try again.";
        } else {
          errorMessage = "Invalid username or password.";
        }
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Cannot connect to server. Check your internet connection.";
      }

      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  signup: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await authAPI.signup(username, password);
      set({ isLoading: false, error: null });
    } catch (error: any) {
      let errorMessage = "Account creation failed. Try again.";

      if (error.response?.status === 409) {
        errorMessage =
          "Username already taken. Please choose a different username.";
      } else if (error.response?.status === 400) {
        const message = error.response?.data?.message;
        if (message?.includes("username")) {
          errorMessage = "Username must be at least 4 characters.";
        } else if (message?.includes("password")) {
          errorMessage = "Password must be at least 6 characters.";
        } else {
          errorMessage = "Invalid input. Please check your details.";
        }
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Cannot connect to server. Check your internet connection.";
      }

      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    set({
      isAuthenticated: false,
      token: null,
      error: null,
    });
  },

  deleteAccount: async (password: string) => {
    set({ isLoading: true, error: null });
    try {
      await authAPI.deleteAccount(password);
      localStorage.removeItem("authToken");
      set({
        isAuthenticated: false,
        token: null,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      let errorMessage = "Account deletion failed. Try again.";

      if (error.response?.status === 400) {
        const message = error.response?.data?.message;
        if (message === "Invalid Password") {
          errorMessage = "Incorrect password. Please try again.";
        } else {
          errorMessage = "Invalid request. Please try again.";
        }
      } else if (error.response?.status === 401) {
        errorMessage = "Session expired. Please sign in again.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (
        error.code === "NETWORK_ERROR" ||
        error.message === "Network Error"
      ) {
        errorMessage =
          "Cannot connect to server. Check your internet connection.";
      }

      set({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  },

  clearError: () => {
    set({ error: null });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      set({ isAuthenticated: true, token });
    }
  },
}));
