import { ShareIcon } from "../../assets/icons/shareIcon";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/youtubeIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

const getYoutubeEmbedUrl = (url: string) => {
  return url
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "youtube.com/embed/");
};

export const Card = ({ title, link, type }: CardProps) => {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const TypeIcon = type === "youtube" ? YoutubeIcon : TwitterIcon;

  return (
    <div className="w-full max-w-[320px]">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Card Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-gray-500">
                <TypeIcon />
              </span>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Open in new tab"
              >
                <h3 className="text-gray-900 font-medium truncate">{title}</h3>
              </a>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <button
                onClick={handleShare}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Copy link"
              >
                <ShareIcon />
              </button>

              <DeleteIcon />
            </div>
          </div>
        </div>

        <div className="p-4">
          {type === "youtube" && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden">
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
            <div className="rounded-md overflow-hidden">
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
      </div>
    </div>
  );
};
