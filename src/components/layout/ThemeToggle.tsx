"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

/**
 * The initial theme is applied by the inline script in the root layout (before
 * paint), so this component only mirrors and updates it.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable (private mode); the toggle still works */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        mounted
          ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
          : "Toggle theme"
      }
      className="panel panel-hover inline-flex h-9 w-9 items-center justify-center rounded-xl text-muted hover:text-text"
    >
      {mounted && theme === "light" ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </button>
  );
}
