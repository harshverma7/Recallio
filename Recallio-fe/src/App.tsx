import { Button } from "./components/ui/button";
import { PlusIcon } from "./assets/icons/PlusIcon";
import { ShareIcon } from "./assets/icons/ShareIcon";
import { LogoutIcon } from "./assets/icons/LogoutIcon";
import { UserIcon } from "./assets/icons/UserIcon";
import { Card } from "./components/ui/card";
import { Modal } from "./components/ui/modal";
import { DeleteAccountModal } from "./components/ui/DeleteAccountModal";
import { ShareModal } from "./components/ui/ShareModal";
import { useState, useEffect } from "react";
import { Sidebar } from "./components/ui/sidebar";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { LandingPage } from "./components/auth/LandingPage";
import { useAuthStore } from "./store/authStore";
import { useContentStore } from "./store/contentStore";
import { groupContentByMonth } from "./utils/dateUtils";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"landing" | "signin" | "signup">(
    "landing"
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { isAuthenticated, logout, initializeAuth } = useAuthStore();
  const {
    contents,
    fetchContents,
    createShareLink,
    shareLink,
    error,
    getFilteredContents,
    selectedContentType,
    searchQuery,
  } = useContentStore();

  const filteredContents = getFilteredContents();
  const groupedContents = groupContentByMonth(filteredContents);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContents();
    }
  }, [isAuthenticated, fetchContents]);

  // Close user menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [userMenuOpen]);

  const handleSignUpSuccess = () => {
    setShowSuccessMessage(true);
    setAuthMode("signin");
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleGetStarted = () => {
    setAuthMode("signup");
  };

  const handleSignInFromLanding = () => {
    setAuthMode("signin");
  };

  const handleBackToLanding = () => {
    setAuthMode("landing");
  };

  const handleShareAll = () => {
    setShareModalOpen(true);
  };

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
  };

  const handleDeleteAccount = () => {
    setUserMenuOpen(false);
    setDeleteAccountModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {showSuccessMessage && (
          <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-full duration-300">
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="font-medium">
                  Account created successfully! Please sign in.
                </span>
              </div>
            </div>
          </div>
        )}

        {authMode === "landing" ? (
          <LandingPage
            onGetStarted={handleGetStarted}
            onSignIn={handleSignInFromLanding}
          />
        ) : authMode === "signin" ? (
          <SignIn
            onToggleMode={() => setAuthMode("signup")}
            onBackToLanding={handleBackToLanding}
          />
        ) : (
          <SignUp
            onToggleMode={() => setAuthMode("signin")}
            onSignUpSuccess={handleSignUpSuccess}
            onBackToLanding={handleBackToLanding}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-88">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
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
                      onClick={() => setModalOpen(true)}
                      variant="primary"
                      text="Add Content"
                      startIcon={<PlusIcon />}
                    />

                    <Button
                      onClick={handleShareAll}
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
                      className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                    >
                      <UserIcon />
                      <span className="text-sm font-medium">Account</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          userMenuOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {userMenuOpen && (
                      <>
                        {/* Backdrop */}
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setUserMenuOpen(false)}
                        />

                        {/* Menu */}
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-40 animate-in slide-in-from-top-2 duration-200">
                          <div className="p-3 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                                <UserIcon />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-black">
                                  Signed in
                                </p>
                                <p className="text-xs text-gray-500">
                                  Manage your account
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-2 space-y-1">
                            <button
                              onClick={handleDeleteAccount}
                              className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            >
                              <svg
                                className="w-5 h-5"
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
                              <span className="font-medium">
                                Delete Account
                              </span>
                            </button>

                            <div className="h-px bg-gray-200 my-1" />

                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                            >
                              <LogoutIcon />
                              <span className="font-medium">Sign out</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="px-8 py-8">
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
            <ShareModal
              open={shareModalOpen}
              onClose={() => setShareModalOpen(false)}
            />
            <DeleteAccountModal
              open={deleteAccountModalOpen}
              onClose={() => setDeleteAccountModalOpen(false)}
            />

            {error && (
              <div className="mb-6 animate-in slide-in-from-top-full duration-300">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
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
                    <span className="font-medium">{error}</span>
                  </div>
                </div>
              </div>
            )}

            {contents.length === 0 ? (
              <div className="text-center py-24">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <PlusIcon />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Your collection is empty
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Start saving articles, videos, and other content you want to
                    remember.
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="primary"
                    text="Add Your First Item"
                    startIcon={<PlusIcon />}
                  />
                </div>
              </div>
            ) : filteredContents.length === 0 ? (
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
                    onClick={() => setModalOpen(true)}
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
        </div>
      </main>
    </div>
  );
}

export default App;
