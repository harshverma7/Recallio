import { SidebarItem } from "./sideBarItem";
import { SearchBar } from "./SearchBar";
import { Logo } from "./Logo";
import { useContentStore, type ContentType } from "../../store/contentStore";
import { CONTENT_TYPES } from "../../constants/contentTypes";

export function Sidebar() {
  const { selectedContentType, setSelectedContentType, contents } =
    useContentStore();

  const contentTypes = CONTENT_TYPES.map((type) => ({
    ...type,
    icon: type.icon ? <type.icon /> : null,
    count:
      type.id === "all"
        ? contents.length
        : contents.filter((c) => c.type === type.id).length,
  }));

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
        <div className="space-y-6">
          {/* Search Section */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Search
            </h3>
            <SearchBar />
          </div>

          {/* Content Types Section */}
          <div>
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

          {/* Weekly Activity Graph */}
          <div className="pt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              This Week's Activity
            </h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-end justify-between gap-1 h-16 mb-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, index) => {
                    // Calculate start of current week (Monday)
                    const startOfWeek = new Date();
                    const dayOfWeek = startOfWeek.getDay();
                    const diff =
                      startOfWeek.getDate() -
                      dayOfWeek +
                      (dayOfWeek === 0 ? -6 : 1);
                    startOfWeek.setDate(diff);

                    // Get the specific day
                    const targetDate = new Date(startOfWeek);
                    targetDate.setDate(startOfWeek.getDate() + index);

                    // Count content for this day
                    const dayContent = contents.filter((c) => {
                      const contentDate = new Date(c.createdAt);
                      return (
                        contentDate.toDateString() === targetDate.toDateString()
                      );
                    }).length;

                    // Calculate bar height (max 48px)
                    const maxItems = Math.max(
                      ...["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (_, i) => {
                          const d = new Date(startOfWeek);
                          d.setDate(startOfWeek.getDate() + i);
                          return contents.filter((c) => {
                            const contentDate = new Date(c.createdAt);
                            return (
                              contentDate.toDateString() === d.toDateString()
                            );
                          }).length;
                        }
                      )
                    );

                    const barHeight =
                      maxItems > 0
                        ? Math.max((dayContent / maxItems) * 48, 2)
                        : 2;

                    return (
                      <div
                        key={day}
                        className="flex flex-col items-center flex-1"
                      >
                        <div
                          className="w-full bg-black rounded-sm transition-all duration-200"
                          style={{ height: `${barHeight}px` }}
                          title={`${day}: ${dayContent} items`}
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                  <div key={index} className="flex-1 text-center">
                    {day}
                  </div>
                ))}
              </div>
            </div>
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
