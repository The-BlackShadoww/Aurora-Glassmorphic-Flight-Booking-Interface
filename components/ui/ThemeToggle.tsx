"use client";

import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  // keep document class in sync (in case component is rendered in isolation)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "p-2 rounded-full transition-colors",
        theme === "dark"
          ? "bg-slate-700 text-yellow-300"
          : "bg-slate-100 text-slate-900",
        "hover:ring-2 hover:ring-offset-2 hover:ring-primary-500/60",
      )}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
