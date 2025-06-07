import { Card } from "../components/ui/card";
import { useContentStore } from "../store/contentStore";
import { groupContentByMonth } from "../utils/dateUtils";
import { Button } from "../components/ui/button";
import { PlusIcon } from "../assets/icons/PlusIcon";

interface DashboardPageProps {
  onAddContent: () => void;
}

export function DashboardPage({ onAddContent }: DashboardPageProps) {
  const { getFilteredContents, selectedContentType, searchQuery } =
    useContentStore();

  const filteredContents = getFilteredContents();
  const groupedContents = groupContentByMonth(filteredContents);

  return (
    <div className="px-8 py-8">
      {filteredContents.length === 0 ? (
        <div className="text-center py-24">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-black mb-2">
              {searchQuery
                ? `No results found for "${searchQuery}"`
                : `No ${selectedContentType} content found`}
            </h3>
            <p className="text-gray-600 mb-8">
              {searchQuery
                ? "Try searching with different keywords or check your spelling."
                : `Try adding some ${selectedContentType} content or select a different filter.`}
            </p>
            <Button
              onClick={onAddContent}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {groupedContents.map((group) => (
            <div key={group.monthYear} className="space-y-6">
              {/* Month Header */}
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-black">
                  {group.displayDate}
                </h2>
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-sm text-gray-500 font-medium">
                  {group.contents.length}{" "}
                  {group.contents.length === 1 ? "item" : "items"}
                </span>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {group.contents.map((content) => (
                  <Card key={content._id} content={content} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
