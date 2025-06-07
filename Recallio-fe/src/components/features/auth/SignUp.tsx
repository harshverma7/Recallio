import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/authStore";

interface SignUpForm {
  username: string;
  password: string;
  confirmPassword: string;
}

interface SignUpProps {
  onToggleMode: () => void;
  onSignUpSuccess: () => void;
  onBackToLanding?: () => void;
}

export function SignUp({
  onToggleMode,
  onSignUpSuccess,
  onBackToLanding,
}: SignUpProps) {
  const { signup, isLoading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpForm>();

  const password = watch("password");

  const onSubmit = async (data: SignUpForm) => {
    try {
      await signup(data.username, data.password);
      onSignUpSuccess();
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Right Hexagon */}
        <svg
          className="absolute top-16 right-20 w-20 h-20 text-gray-400 opacity-75"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 80 80"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M40 10 L60 25 L60 55 L40 70 L20 55 L20 25 Z"
          />
        </svg>

        {/* Top Left Zigzag */}
        <svg
          className="absolute top-24 left-12 w-28 h-16 text-gray-400 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 120 60"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M10 30 L30 10 L50 30 L70 10 L90 30 L110 10"
          />
        </svg>

        {/* Bottom Right Spirals */}
        <svg
          className="absolute bottom-20 right-16 w-24 h-24 text-gray-400 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 100 100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M50 10 Q80 20 70 50 Q60 80 30 70 Q10 60 20 30 Q30 10 50 20"
          />
        </svg>

        {/* Bottom Left Stars */}
        <div className="absolute bottom-32 left-14">
          <svg
            className="w-8 h-8 text-gray-400 opacity-80"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="w-6 h-6 text-gray-400 opacity-70 mt-3 ml-8"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>

        {/* Center Left Cloud Shape */}
        <svg
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-20 h-12 text-gray-400 opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 80 48"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M16 32 Q8 32 8 24 Q8 16 16 16 Q20 8 32 8 Q44 8 48 16 Q56 16 56 24 Q56 32 48 32 Z"
          />
        </svg>

        {/* Center Right Diamond */}
        <div className="absolute right-10 top-2/5 w-12 h-12 border-4 border-gray-400 opacity-65 rotate-45 transform"></div>

        {/* Scattered Elements */}
        <div className="absolute top-1/3 left-1/3 w-10 h-2 bg-gray-400 opacity-70 rotate-45"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2 h-10 bg-gray-400 opacity-75 rotate-12"></div>
        <div className="absolute top-2/3 left-1/5 w-6 h-6 border-4 border-gray-400 opacity-80"></div>

        {/* Plus Signs */}
        <div className="absolute top-1/5 right-1/3 text-gray-400 opacity-70 text-2xl font-light">
          +
        </div>
        <div className="absolute bottom-1/5 left-1/3 text-gray-400 opacity-65 text-3xl font-light">
          +
        </div>

        {/* Additional Bold Elements */}
        <div className="absolute top-1/4 right-1/5 w-14 h-14 bg-gray-300 rounded-full opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/6 w-8 h-16 bg-gray-400 opacity-60 rotate-30"></div>
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
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-black tracking-tight mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start building your digital collection today
          </p>
        </div>

        {/* Sign Up Form */}
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
                  placeholder="Choose a username"
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
                  placeholder="Create a password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all duration-200"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.confirmPassword.message}
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
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <button
                onClick={onToggleMode}
                className="font-medium text-black hover:text-gray-600 transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
