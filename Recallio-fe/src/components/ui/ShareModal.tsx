import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./button";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { ShareIcon } from "../../assets/icons/ShareIcon";
import { useContentStore } from "../../store/contentStore";

interface ImportForm {
  shareUrl: string;
}

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShareModal({ open, onClose }: ShareModalProps) {
  const {
    contents,
    createShareLink,
    shareLink,
    importCollection,
    isLoading,
    error,
    clearError,
  } = useContentStore();

  const [activeTab, setActiveTab] = useState<"share" | "import">("share");
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ImportForm>();

  const handleClose = () => {
    reset();
    clearError();
    setCopySuccess(null);
    setActiveTab("share");
    onClose();
  };

  const handleCreateShareLink = async () => {
    try {
      await createShareLink();
      if (shareLink) {
        await navigator.clipboard.writeText(shareLink);
        setCopySuccess("Share link copied to clipboard!");
        setTimeout(() => setCopySuccess(null), 3000);
      }
    } catch (error) {
      console.error("Failed to create share link");
    }
  };

  const onImportSubmit = async (data: ImportForm) => {
    try {
      const result = await importCollection(data.shareUrl);
      reset();
      if (result.importedCount === 0) {
        setCopySuccess("All items already exist in your collection!");
      } else if (result.skippedDuplicates > 0) {
        setCopySuccess(
          `Imported ${result.importedCount} new items, skipped ${result.skippedDuplicates} duplicates!`
        );
      } else {
        setCopySuccess(`Successfully imported ${result.importedCount} items!`);
      }
      setTimeout(() => setCopySuccess(null), 5000);
    } catch (error) {
      // Error is handled by the store
    }
  };

  if (!open) return null;

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-40"></div>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
        <div className="bg-white opacity-100 p-8 rounded-2xl min-w-[600px] max-w-[700px] w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-medium">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors duration-200"
            >
              <CrossIcon />
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShareIcon />
            </div>
            <h1 className="text-2xl font-bold text-primary-900 mb-2">
              Share & Import Collections
            </h1>
            <p className="text-primary-600">
              Share your collection or import from others
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-primary-50 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab("share")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "share"
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-primary-600 hover:text-primary-900"
              }`}
            >
              Share Collection
            </button>
            <button
              onClick={() => setActiveTab("import")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === "import"
                  ? "bg-white text-primary-900 shadow-sm"
                  : "text-primary-600 hover:text-primary-900"
              }`}
            >
              Import Collection
            </button>
          </div>

          {/* Success Message */}
          {copySuccess && (
            <div className="bg-success-50 border border-success-200 text-success-700 px-4 py-3 rounded-xl mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-success-500 rounded-full flex items-center justify-center">
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
                <span className="font-medium">{copySuccess}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
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
                  <p className="text-error-700 font-medium text-sm">{error}</p>
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

          {activeTab === "share" ? (
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-xl p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-accent-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-primary-900 mb-3">
                    Share Your Collection
                  </h3>
                  <p className="text-primary-600 mb-6">
                    Create a shareable link that others can use to view and
                    import your collection
                  </p>
                  <Button
                    onClick={handleCreateShareLink}
                    variant="primary"
                    text={isLoading ? "Creating Link..." : "Create Share Link"}
                    disabled={isLoading || contents.length === 0}
                  />
                  {contents.length === 0 && (
                    <p className="text-sm text-primary-500 mt-3">
                      Add some content to your collection first
                    </p>
                  )}
                </div>
              </div>

              <div className="text-center text-sm text-primary-500">
                {contents.length} {contents.length === 1 ? "item" : "items"} in
                your collection
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  Import Collection
                </h3>
                <p className="text-sm text-primary-600 mb-6">
                  Add items from someone else's shared collection to your own
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onImportSubmit)}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Shared Collection URL
                  </label>
                  <input
                    {...register("shareUrl", {
                      required: "Please enter a shared collection URL",
                      pattern: {
                        value: /^https?:\/\/.+\/shared\/.+$/,
                        message: "Please enter a valid shared collection URL",
                      },
                    })}
                    type="url"
                    placeholder="https://yoursite.com/shared/abc123"
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all duration-200"
                  />
                  {errors.shareUrl && (
                    <p className="mt-2 text-sm text-error-600">
                      {errors.shareUrl.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-primary-500">
                    Enter the shared collection URL you received from another
                    user
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="secondary"
                    text="Cancel"
                    onClick={handleClose}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-accent-600 hover:bg-accent-700 disabled:bg-accent-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Importing...</span>
                      </div>
                    ) : (
                      "Import Collection"
                    )}
                  </button>
                </div>
              </form>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-blue-800 font-medium text-sm mb-1">
                      How it works:
                    </p>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Paste a shared collection URL from another user</li>
                      <li>• All items will be added to your collection</li>
                      <li>• Duplicate items will be skipped automatically</li>
                      <li>• You can organize imported items afterward</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
