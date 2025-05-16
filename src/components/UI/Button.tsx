import React from "react";
import { CgSpinner } from "react-icons/cg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold text-white transition cursor-pointer ${
        disabled || isLoading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-black"
      }`}
    >
      {isLoading ? <CgSpinner /> : children}
    </button>
  );
};

export default Button;
