import { useForm } from "react-hook-form";
import { Button } from "./button";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { useContentStore } from "../../store/contentStore";

interface ContentForm {
  title: string;
  link: string;
  type: "image" | "video" | "article" | "audio" | "youtube" | "twitter";
}

// Function to clean and validate URLs
const cleanUrl = (url: string): string => {
  // Remove leading @ symbol and trim whitespace
  let cleanedUrl = url.trim().replace(/^@+/, "");

  // Handle YouTube URL variations
  if (cleanedUrl.includes("youtu")) {
    // Convert youtu.be links to full youtube.com format
    if (cleanedUrl.includes("youtu.be/")) {
      const videoId = cleanedUrl.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) {
        cleanedUrl = `https://www.youtube.com/watch?v=${videoId}`;
      }
    }

    // Ensure YouTube URLs have proper protocol
    if (!cleanedUrl.match(/^https?:\/\//)) {
      if (
        cleanedUrl.startsWith("www.youtube.com") ||
        cleanedUrl.startsWith("youtube.com")
      ) {
        cleanedUrl = `https://${cleanedUrl}`;
      } else if (cleanedUrl.startsWith("m.youtube.com")) {
        cleanedUrl = `https://${cleanedUrl.replace(
          "m.youtube.com",
          "www.youtube.com"
        )}`;
      }
    }

    // Convert mobile YouTube URLs to standard format
    cleanedUrl = cleanedUrl.replace("m.youtube.com", "www.youtube.com");

    // Ensure www prefix for YouTube
    if (cleanedUrl.includes("youtube.com") && !cleanedUrl.includes("www.")) {
      cleanedUrl = cleanedUrl.replace("youtube.com", "www.youtube.com");
    }
  }

  // Add https:// if no protocol is specified and it's not already a YouTube URL
  else if (cleanedUrl && !cleanedUrl.match(/^https?:\/\//)) {
    cleanedUrl = `https://${cleanedUrl}`;
  }

  return cleanedUrl;
};

// More comprehensive URL validation
const isValidUrl = (url: string): boolean => {
  try {
    const cleanedUrl = cleanUrl(url);
    const urlObj = new URL(cleanedUrl);

    // Additional validation for common URL schemes
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return false;
    }

    // Special handling for YouTube URLs
    if (cleanedUrl.includes("youtube.com") || cleanedUrl.includes("youtu.be")) {
      return true; // YouTube URLs are always valid after cleaning
    }

    return true;
  } catch {
    return false;
  }
};

export function Modal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { createContent, isLoading, error, clearError } = useContentStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContentForm>();

  const onSubmit = async (data: ContentForm) => {
    try {
      // Clean the URL before submitting
      const cleanedData = {
        ...data,
        link: cleanUrl(data.link),
      };
      await createContent(cleanedData);
      reset();
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleClose = () => {
    reset();
    clearError();
    onClose();
  };

  // Auto-detect content type based on URL
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const cleanedUrl = cleanUrl(url);

    // Auto-detect type based on URL
    if (
      cleanedUrl.includes("youtube.com") ||
      cleanedUrl.includes("youtu.be") ||
      cleanedUrl.includes("m.youtube.com") ||
      url.includes("youtube") // Also check original URL for partial matches
    ) {
      setValue("type", "youtube");
    } else if (
      cleanedUrl.includes("twitter.com") ||
      cleanedUrl.includes("x.com")
    ) {
      setValue("type", "twitter");
    }
  };

  return (
    <>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-40"></div>
          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
            <div className="bg-white opacity-100 p-8 rounded-2xl min-w-[500px] max-w-[800px] w-[50%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-medium">
              <div className="flex justify-end mb-4">
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-primary-100 rounded-lg transition-colors duration-200"
                >
                  <CrossIcon />
                </button>
              </div>
              <h1 className="text-primary-900 text-2xl font-bold text-center mb-6">
                Add New Content
              </h1>
              <p className="text-primary-600 text-center mb-8">
                Save articles, videos, and other content to your digital
                collection
              </p>

              {error && (
                <div className="bg-error-50 border border-error-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-error-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-error-700 font-medium text-sm">
                        {error}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearError}
                      className="text-error-400 hover:text-error-600 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      URL / Link
                    </label>
                    <input
                      {...register("link", {
                        required: "URL is required",
                        validate: (value) => {
                          if (!isValidUrl(value)) {
                            return "Please enter a valid URL (e.g., https://example.com)";
                          }
                          return true;
                        },
                      })}
                      onChange={handleUrlChange}
                      placeholder="https://example.com or paste any link"
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200"
                    />
                    {errors.link && (
                      <p className="mt-2 text-sm text-error-600">
                        {errors.link.message}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-primary-500">
                      Tip: Supported formats - YouTube: youtube.com/watch,
                      youtu.be, m.youtube.com | Twitter: twitter.com, x.com
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      Title
                    </label>
                    <input
                      {...register("title", { required: "Title is required" })}
                      placeholder="Give your content a descriptive title"
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200"
                    />
                    {errors.title && (
                      <p className="mt-2 text-sm text-error-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      Content Type
                    </label>
                    <select
                      {...register("type", {
                        required: "Content type is required",
                      })}
                      className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200"
                    >
                      <option value="">Select content type</option>
                      <option value="youtube">📺 YouTube Video</option>
                      <option value="twitter">🐦 Twitter Post</option>
                      <option value="article">📰 Article</option>
                      <option value="image">🖼️ Image</option>
                      <option value="video">🎬 Video</option>
                      <option value="audio">🎵 Audio</option>
                    </select>
                    {errors.type && (
                      <p className="mt-2 text-sm text-error-600">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="secondary"
                    text="Cancel"
                    onClick={handleClose}
                  />
                  <Button
                    variant="primary"
                    text={isLoading ? "Adding..." : "Add to Collection"}
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
