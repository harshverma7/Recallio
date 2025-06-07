import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon";
import { ArticleIcon } from "../../assets/icons/ArticleIcon";
import { useContentStore } from "../../store/contentStore";
import { Content } from "../../services/api";
import { formatRelativeDate } from "../../utils/dateUtils";

interface CardProps {
  content: Content;
}

const getYoutubeEmbedUrl = (url: string) => {
  // Handle different YouTube URL formats
  // Extract video ID from different URL formats
  let videoId = "";

  if (url.includes("youtu.be/")) {
    // youtu.be/VIDEO_ID format
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/watch")) {
    // youtube.com/watch?v=VIDEO_ID format
    const urlParams = new URLSearchParams(url.split("?")[1]);
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtube.com/embed/")) {
    // Already in embed format
    return url;
  } else if (url.includes("youtube.com/shorts/")) {
    // YouTube Shorts format
    videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
  }

  // Return embed URL if we have a video ID
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // Fallback to original URL processing
  return url
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "youtube.com/embed/")
    .replace("m.youtube.com", "www.youtube.com");
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "youtube":
      return YoutubeIcon;
    case "twitter":
      return TwitterIcon;
    case "article":
      return ArticleIcon;
    default:
      return ArticleIcon;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "youtube":
      return "bg-red-50 text-red-600 border-red-200";
    case "twitter":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "article":
      return "bg-green-50 text-green-600 border-green-200";
    default:
      return "bg-primary-50 text-primary-600 border-primary-200";
  }
};

export const Card = ({ content }: CardProps) => {
  const { deleteContent } = useContentStore();
  const { title, link, type, tags, _id } = content;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteContent(_id);
      } catch (error) {
        console.error("Failed to delete content:", error);
      }
    }
  };

  const TypeIcon = getTypeIcon(type);
  const typeColorClass = getTypeColor(type);

  return (
    <div className="group">
      <div className="bg-white rounded-2xl border border-primary-200/50 hover:border-primary-300 shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-primary-100">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-medium border ${typeColorClass}`}
                >
                  <TypeIcon />
                  <span className="capitalize">{type}</span>
                </div>

                <span className="text-xs text-primary-500 font-medium">
                  {formatRelativeDate(content.createdAt)}
                </span>
              </div>

              <h3 className="text-primary-900 font-semibold text-lg leading-tight mb-2 line-clamp-2">
                {title}
              </h3>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-700 text-sm transition-colors truncate block"
                title="Open in new tab"
              >
                {new URL(link).hostname}
              </a>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleDelete}
                className="p-2 text-primary-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200"
                title="Delete"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-md"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="px-2 py-1 bg-primary-100 text-primary-500 text-xs font-medium rounded-md">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Content */}
        {(type === "youtube" || type === "twitter") && (
          <div className="p-6">
            {type === "youtube" && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-primary-100">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getYoutubeEmbedUrl(link)}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            )}

            {type === "twitter" && (
              <div className="rounded-xl overflow-hidden">
                <blockquote className="twitter-tweet" data-dnt="true">
                  <a
                    href={link.replace("x.com", "twitter.com")}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </blockquote>
                <script async src="https://platform.twitter.com/widgets.js" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
