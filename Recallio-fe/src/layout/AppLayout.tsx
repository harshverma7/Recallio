import { ReactNode } from "react";
import { Sidebar } from "../components/ui/sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  onAddContent: () => void;
  onShareAll: () => void;
  onDeleteAccount: () => void;
}

export function AppLayout({
  children,
  onAddContent,
  onShareAll,
  onDeleteAccount,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-88">
        <div className="max-w-7xl mx-auto">
          <Header
            onAddContent={onAddContent}
            onShareAll={onShareAll}
            onDeleteAccount={onDeleteAccount}
          />
          {children}
        </div>
      </main>
    </div>
  );
}
