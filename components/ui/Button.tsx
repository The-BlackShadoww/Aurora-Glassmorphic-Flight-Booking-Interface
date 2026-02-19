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
          "bg-purple-pink-gradient text-white hover:shadow-lg hover:glow-purple-intense",
        (variant === "secondary" || variant === "outline") &&
          "glass-card text-white hover:bg-white/20",
        variant === "ghost" &&
          "text-white/80 hover:text-white hover:bg-white/10",
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
