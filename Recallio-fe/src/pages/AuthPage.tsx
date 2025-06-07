import { useState } from "react";
import { SignIn } from "../components/features/auth/SignIn";
import { SignUp } from "../components/features/auth/SignUp";
import { LandingPage } from "../components/features/auth/LandingPage";

export function AuthPage() {
  const [authMode, setAuthMode] = useState<"landing" | "signin" | "signup">(
    "landing"
  );
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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
