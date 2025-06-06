import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

const variantClasses = {
  primary:
    "bg-black hover:bg-gray-800 text-white shadow-sm hover:shadow-md focus:ring-gray-500/20",
  secondary:
    "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 hover:border-gray-400 focus:ring-gray-500/20",
};

const baseClass =
  "inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none";

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`${variantClasses[variant]} ${baseClass}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && (
        <span className="w-4 h-4 flex items-center justify-center">
          {startIcon}
        </span>
      )}
      <span>{text}</span>
    </button>
  );
};
