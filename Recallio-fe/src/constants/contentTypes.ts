import { TwitterIcon } from "../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../assets/icons/YoutubeIcon";
import { ArticleIcon } from "../assets/icons/ArticleIcon";

export const CONTENT_TYPES = [
  {
    id: "all" as const,
    label: "All Items",
    icon: null,
  },
  {
    id: "youtube" as const,
    label: "YouTube",
    icon: YoutubeIcon,
  },
  {
    id: "twitter" as const,
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    id: "article" as const,
    label: "Articles",
    icon: ArticleIcon,
  },
] as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];
