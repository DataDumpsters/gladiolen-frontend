import React from "react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ onClick, children, className, type }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${className}`}>
      {children}
    </button>
  );
};

export default Button;
