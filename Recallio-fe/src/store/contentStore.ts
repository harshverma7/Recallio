import { create } from "zustand";
import {
  contentAPI,
  shareAPI,
  type Content,
  type CreateContentRequest,
} from "../services/api";

export type ContentType =
  | "all"
  | "youtube"
  | "twitter"
  | "article"
  | "image"
  | "video"
  | "audio";

interface ContentState {
  contents: Content[];
  selectedContentType: ContentType;
  searchQuery: string;
  searchResults: Content[];
  isSearching: boolean;
  isLoading: boolean;
  error: string | null;
  shareLink: string | null;
  fetchContents: () => Promise<void>;
  searchContents: (query: string) => Promise<void>;
  clearSearch: () => void;
  createContent: (content: CreateContentRequest) => Promise<void>;
  deleteContent: (contentId: string) => Promise<void>;
  createShareLink: () => Promise<void>;
  removeShareLink: () => Promise<void>;
  importCollection: (
    shareUrl: string
  ) => Promise<{ importedCount: number; skippedDuplicates: number }>;
  setSelectedContentType: (type: ContentType) => void;
  getFilteredContents: () => Content[];
  clearError: () => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  selectedContentType: "all",
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  isLoading: false,
  error: null,
  shareLink: null,

  fetchContents: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await contentAPI.getAll();
      set({
        contents: response.content,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to fetch contents",
      });
    }
  },

  searchContents: async (query: string) => {
    if (!query.trim()) {
      set({ searchQuery: "", searchResults: [], isSearching: false });
      return;
    }

    set({ isSearching: true, error: null, searchQuery: query });
    try {
      const response = await contentAPI.search(query);
      set({
        searchResults: response.content,
        isSearching: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isSearching: false,
        error: error.response?.data?.message || "Failed to search contents",
        searchResults: [],
      });
    }
  },

  clearSearch: () => {
    set({ searchQuery: "", searchResults: [], isSearching: false });
  },

  createContent: async (content: CreateContentRequest) => {
    set({ isLoading: true, error: null });
    try {
      await contentAPI.create(content);
      // Refresh the contents list after creating
      await get().fetchContents();
      set({ isLoading: false, error: null });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create content",
      });
      throw error;
    }
  },

  deleteContent: async (contentId: string) => {
    set({ isLoading: true, error: null });
    try {
      await contentAPI.delete(contentId);
      // Remove from local state
      set((state) => ({
        contents: state.contents.filter((content) => content._id !== contentId),
        isLoading: false,
        error: null,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to delete content",
      });
    }
  },

  createShareLink: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await shareAPI.createShareLink();
      set({
        shareLink: `${window.location.origin}/shared/${response.hash}`,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to create share link",
      });
    }
  },

  removeShareLink: async () => {
    set({ isLoading: true, error: null });
    try {
      await shareAPI.removeShareLink();
      set({
        shareLink: null,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to remove share link",
      });
    }
  },

  importCollection: async (shareUrl: string) => {
    set({ isLoading: true, error: null });
    try {
      const result = await shareAPI.importCollection(shareUrl);
      // Refresh the contents list after importing
      await get().fetchContents();
      set({ isLoading: false, error: null });
      return result;
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Failed to import collection",
      });
      throw error;
    }
  },

  setSelectedContentType: (type: ContentType) => {
    set({ selectedContentType: type });
  },

  getFilteredContents: () => {
    const { contents, selectedContentType, searchQuery, searchResults } = get();

    // If there's a search query, return search results
    if (searchQuery.trim()) {
      if (selectedContentType === "all") {
        return searchResults;
      }
      return searchResults.filter(
        (content) => content.type === selectedContentType
      );
    }

    // Otherwise return regular filtered contents
    if (selectedContentType === "all") {
      return contents;
    }
    return contents.filter((content) => content.type === selectedContentType);
  },

  clearError: () => {
    set({ error: null });
  },
}));
