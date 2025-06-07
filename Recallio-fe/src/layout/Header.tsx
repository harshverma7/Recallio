import { useState } from "react";
import { Button } from "../components/ui/button";
import { PlusIcon } from "../assets/icons/PlusIcon";
import { ShareIcon } from "../assets/icons/ShareIcon";
import { LogoutIcon } from "../assets/icons/LogoutIcon";
import { UserIcon } from "../assets/icons/UserIcon";
import { useAuthStore } from "../store/authStore";
import { useContentStore } from "../store/contentStore";

interface HeaderProps {
  onAddContent: () => void;
  onShareAll: () => void;
  onDeleteAccount: () => void;
}

export function Header({
  onAddContent,
  onShareAll,
  onDeleteAccount,
}: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuthStore();
  const { contents, getFilteredContents, selectedContentType, searchQuery } =
    useContentStore();

  const filteredContents = getFilteredContents();

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };

  const handleDeleteAccount = () => {
    setUserMenuOpen(false);
    onDeleteAccount();
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black tracking-tight">
              Digital Memory
            </h1>
            <p className="text-gray-600 mt-1">
              {contents.length === 0
                ? "Start building your digital library"
                : searchQuery
                ? `${filteredContents.length} search ${
                    filteredContents.length === 1 ? "result" : "results"
                  } for "${searchQuery}"`
                : selectedContentType === "all"
                ? `${contents.length} saved ${
                    contents.length === 1 ? "item" : "items"
                  }`
                : `${filteredContents.length} ${selectedContentType} ${
                    filteredContents.length === 1 ? "item" : "items"
                  }`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={onAddContent}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
              />

              <Button
                onClick={onShareAll}
                variant="secondary"
                text="Share & Import"
                startIcon={<ShareIcon />}
              />
            </div>

            <div className="w-px h-6 bg-gray-300" />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-all duration-200"
              >
                <UserIcon />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <LogoutIcon />
                    Sign Out
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleDeleteAccount}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
