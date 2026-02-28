import { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "btn-ripple rounded-xl font-semibold transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" &&
          "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-900 hover:shadow-lg dark:from-slate-700 dark:to-slate-900 dark:text-white",
        (variant === "secondary" || variant === "outline") &&
          "glass-card text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800",
        variant === "ghost" &&
          "text-slate-900/80 hover:text-slate-900 hover:bg-slate-100 dark:text-white/80 dark:hover:text-white dark:hover:bg-slate-800",
        size === "sm" && "px-4 py-2 text-sm",
        size === "md" && "px-6 py-3 text-base",
        size === "lg" && "px-8 py-4 text-lg",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
