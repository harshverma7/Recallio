import { ReactElement } from "react";
import { PlusIcon } from "../../assets/icons/plusIcon";
import { ShareIcon } from "../../assets/icons/shareIcon";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg",
  secondary:
    "bg-purple-200 text-purple-600 hover:bg-purple-300 hover:shadow-md",
};

const defaultClass =
  "px-6 py-2.5 rounded-md font-medium flex items-center justify-center" +
  " min-w-[160px] transition-all duration-300 ease-in-out" +
  " transform hover:-translate-y-0.5 active:translate-y-0";

export const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
  return (
    <button
      className={`${variantClasses[variant]} ${defaultClass}`}
      onClick={onClick}
    >
      <div className="pr-2">{startIcon}</div>
      {text}
    </button>
  );
};
