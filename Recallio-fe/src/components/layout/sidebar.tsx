import { SidebarItem } from "./sideBarItem";
import { TwitterIcon } from "../../assets/icons/TwitterIcon";
import { YoutubeIcon } from "../../assets/icons/YoutubeIcon";
import { ArticleIcon } from "../../assets/icons/ArticleIcon";
import { Logo } from "./Logo";
import { useContentStore, type ContentType } from "../../store/contentStore";

export function Sidebar() {
  const { selectedContentType, setSelectedContentType, contents } =
    useContentStore();

  const contentTypes = [
    {
      id: "all" as ContentType,
      label: "All Items",
      icon: null,
      count: contents.length,
    },
    {
      id: "youtube" as ContentType,
      label: "YouTube",
      icon: <YoutubeIcon />,
      count: contents.filter((c) => c.type === "youtube").length,
    },
    {
      id: "twitter" as ContentType,
      label: "Twitter",
      icon: <TwitterIcon />,
      count: contents.filter((c) => c.type === "twitter").length,
    },
    {
      id: "article" as ContentType,
      label: "Articles",
      icon: <ArticleIcon />,
      count: contents.filter((c) => c.type === "article").length,
    },
  ];

  return (
    <aside className="h-screen bg-white border-r border-gray-200 w-88 fixed left-0 top-0 flex flex-col">
      {/* Logo Section */}
      <div className="px-8 py-8 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
            <Logo />
          </div>
          <div>
            <h2 className="text-xl font-bold text-black tracking-tight">
              Recallio
            </h2>
            <p className="text-xs text-gray-500 font-medium">Digital Memory</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-6">
        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Content Types
          </h3>

          <div className="space-y-1">
            {contentTypes.map((type) => (
              <SidebarItem
                key={type.id}
                text={type.label}
                icon={type.icon}
                count={type.count}
                isActive={selectedContentType === type.id}
                onClick={() => setSelectedContentType(type.id)}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-400">© 2024 Recallio</div>
      </div>
    </aside>
  );
}
