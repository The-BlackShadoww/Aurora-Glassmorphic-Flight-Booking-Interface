"use client";

import { useEffect, useState, ReactNode } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // load stored theme preference
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
    }
  }, []);

  // keep html class and localStorage in sync
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <header className="w-full px-6 py-4 flex justify-end">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>
      {children}
    </>
  );
}
