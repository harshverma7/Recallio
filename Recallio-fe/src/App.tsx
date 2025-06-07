import { useState, useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { useContentStore } from "./store/contentStore";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AppLayout } from "./layout/AppLayout";
import { Modal } from "./components/ui/modal";
import { DeleteAccountModal } from "./components/features/sharing/DeleteAccountModal";
import { ShareModal } from "./components/features/sharing/ShareModal";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const { isAuthenticated, initializeAuth } = useAuthStore();
  const { fetchContents } = useContentStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContents();
    }
  }, [isAuthenticated, fetchContents]);

  const handleAddContent = () => {
    setModalOpen(true);
  };

  const handleShareAll = () => {
    setShareModalOpen(true);
  };

  const handleDeleteAccount = () => {
    setDeleteAccountModalOpen(true);
  };

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <>
      <AppLayout
        onAddContent={handleAddContent}
        onShareAll={handleShareAll}
        onDeleteAccount={handleDeleteAccount}
      >
        <DashboardPage onAddContent={handleAddContent} />
      </AppLayout>

      {/* Modals */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      <DeleteAccountModal
        open={deleteAccountModalOpen}
        onClose={() => setDeleteAccountModalOpen(false)}
      />
    </>
  );
}

export default App;
