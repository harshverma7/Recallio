import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./button";
import { CrossIcon } from "../../assets/icons/CrossIcon";
import { useAuthStore } from "../../store/authStore";

interface DeleteAccountForm {
  password: string;
  confirmation: string;
}

interface DeleteAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({ open, onClose }: DeleteAccountModalProps) {
  const { deleteAccount, isLoading, error, clearError } = useAuthStore();
  const [step, setStep] = useState<"warning" | "confirm">("warning");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<DeleteAccountForm>();

  const confirmationText = watch("confirmation");

  const onSubmit = async (data: DeleteAccountForm) => {
    try {
      await deleteAccount(data.password);
      reset();
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleClose = () => {
    reset();
    clearError();
    setStep("warning");
    onClose();
  };

  const handleNext = () => {
    setStep("confirm");
  };

  if (!open) return null;

  return (
    <>
      <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 z-40"></div>
      <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-50">
        <div className="bg-white opacity-100 p-8 rounded-2xl min-w-[500px] max-w-[600px] w-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-medium">
          <div className="flex justify-end mb-4">
            <button
              onClick={handleClose}
              className="p-2 hover:bg-primary-100 rounded-lg transition-colors duration-200"
            >
              <CrossIcon />
            </button>
          </div>

          {step === "warning" ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-error-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-error-900 mb-2">
                  Delete Account
                </h1>
                <p className="text-primary-600">
                  This action cannot be undone. Please read carefully.
                </p>
              </div>

              <div className="bg-error-50 border border-error-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-error-900 mb-4">
                  ⚠️ Warning: This will permanently delete:
                </h3>
                <ul className="space-y-2 text-error-700">
                  <li className="flex items-start gap-2">
                    <span className="text-error-500 mt-1">•</span>
                    <span>Your entire content collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error-500 mt-1">•</span>
                    <span>All saved articles, videos, and links</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error-500 mt-1">•</span>
                    <span>Your account and profile information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-error-500 mt-1">•</span>
                    <span>Any shared collection links</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  text="Cancel"
                  onClick={handleClose}
                />
                <button
                  onClick={handleNext}
                  className="flex-1 bg-error-600 hover:bg-error-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error-500/20"
                >
                  I Understand, Continue
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-error-900 text-center mb-2">
                Confirm Account Deletion
              </h1>
              <p className="text-primary-600 text-center mb-8">
                Enter your password and type "DELETE" to confirm
              </p>

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
                      <p className="text-error-700 font-medium text-sm">
                        {error}
                      </p>
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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Password
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-error-500/20 focus:border-error-500 transition-all duration-200"
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-error-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Type "DELETE" to confirm
                  </label>
                  <input
                    {...register("confirmation", {
                      required: "Please type DELETE to confirm",
                      validate: (value) =>
                        value === "DELETE" ||
                        'Please type "DELETE" exactly as shown',
                    })}
                    type="text"
                    placeholder="Type DELETE"
                    className="w-full px-4 py-3 border border-primary-200 rounded-xl text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-error-500/20 focus:border-error-500 transition-all duration-200"
                  />
                  {errors.confirmation && (
                    <p className="mt-2 text-sm text-error-600">
                      {errors.confirmation.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="secondary"
                    text="Cancel"
                    onClick={handleClose}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || confirmationText !== "DELETE"}
                    className="flex-1 bg-error-600 hover:bg-error-700 disabled:bg-error-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-error-500/20"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Deleting Account...</span>
                      </div>
                    ) : (
                      "Delete Account Permanently"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
