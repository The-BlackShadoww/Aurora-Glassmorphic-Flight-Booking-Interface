"use client";

import { InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value || props.defaultValue;

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      {label && (
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            isFocused || hasValue
              ? "top-2 text-xs text-primary-500"
              : "top-1/2 -translate-y-1/2 text-base text-slate-900/60 dark:text-slate-300/60",
          )}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <input
        className={cn(
          "w-full glass-card px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-300",
          "transition-all duration-300 input-glow",
          "focus:border-primary-500/60 focus:bg-slate-100 dark:focus:bg-slate-800",
          label ? "pt-6 pb-2" : "py-3",
          error && "border-red-500/60",
          className,
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-400 animate-fadeIn">{error}</p>
      )}
    </div>
  );
}
