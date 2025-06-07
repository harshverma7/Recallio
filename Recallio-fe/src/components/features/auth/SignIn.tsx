import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/authStore";

interface SignInForm {
  username: string;
  password: string;
}

interface SignInProps {
  onToggleMode: () => void;
  onBackToLanding?: () => void;
}

export function SignIn({ onToggleMode, onBackToLanding }: SignInProps) {
  const { signin, isLoading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>();

  const onSubmit = async (data: SignInForm) => {
    try {
      await signin(data.username, data.password);
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Circle */}
        <div className="absolute top-20 left-10 w-32 h-32 border-4 border-gray-400 rounded-full opacity-70"></div>

        {/* Top Right Wavy Lines */}
        <svg
          className="absolute top-16 right-16 w-24 h-24 text-gray-400 opacity-80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 100 100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M20 20 Q50 40 80 20 M20 35 Q50 55 80 35 M20 50 Q50 70 80 50"
          />
        </svg>

        {/* Bottom Left Squares */}
        <div className="absolute bottom-32 left-16">
          <div className="w-6 h-6 border-4 border-gray-400 opacity-70 rotate-45"></div>
          <div className="w-8 h-8 border-4 border-gray-400 opacity-60 rotate-12 mt-2 ml-8"></div>
        </div>

        {/* Bottom Right Dots */}
        <div className="absolute bottom-24 right-20">
          <div className="w-4 h-4 bg-gray-500 rounded-full opacity-80"></div>
          <div className="w-6 h-6 bg-gray-500 rounded-full opacity-70 mt-4 ml-6"></div>
          <div className="w-2 h-2 bg-gray-500 rounded-full opacity-90 mt-2 ml-2"></div>
        </div>

        {/* Center Left Abstract Shape */}
        <svg
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 text-gray-400 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 60 60"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 30 Q30 10 50 30 Q30 50 10 30 Z"
          />
        </svg>

        {/* Center Right Triangle */}
        <div className="absolute right-12 top-1/3 w-0 h-0 border-l-12 border-l-transparent border-r-12 border-r-transparent border-b-16 border-b-gray-400 opacity-65"></div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-10 h-10 border-4 border-gray-400 rounded-lg opacity-60 rotate-12"></div>
        <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border-4 border-gray-400 rounded-full opacity-65"></div>

        {/* Additional Highly Visible Elements */}
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-gray-300 rounded-lg opacity-60 rotate-45"></div>
        <div className="absolute bottom-1/5 left-1/5 w-16 h-3 bg-gray-400 opacity-70 rotate-12"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Back Button */}
        {onBackToLanding && (
          <div className="mb-6">
            <button
              onClick={onBackToLanding}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Back to home</span>
            </button>
          </div>
        )}
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to access your digital collection
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
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
                  <div className="flex-1">
                    <p className="text-red-700 font-medium text-sm">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={clearError}
                    className="text-red-400 hover:text-red-600 transition-colors"
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

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Username
                </label>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 4,
                      message: "Username must be at least 4 characters",
                    },
                  })}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
                />
                {errors.username && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button
                onClick={onToggleMode}
                className="font-medium text-black hover:text-gray-600 transition-colors"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
