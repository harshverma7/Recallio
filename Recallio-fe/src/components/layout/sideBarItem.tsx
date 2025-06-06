import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
  count,
  isActive = false,
  onClick,
}: {
  text: string;
  icon?: ReactElement | null;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between gap-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-gray-100 text-black border border-gray-300"
          : "text-gray-600 hover:text-black hover:bg-gray-50"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div
            className={`w-5 h-5 flex items-center justify-center ${
              isActive
                ? "text-black"
                : "text-gray-500 group-hover:text-gray-700"
            }`}
          >
            {icon}
          </div>
        )}
        <span className="text-sm font-medium">{text}</span>
      </div>

      {typeof count === "number" && (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-md ${
            isActive ? "bg-gray-200 text-black" : "bg-gray-100 text-gray-500"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
