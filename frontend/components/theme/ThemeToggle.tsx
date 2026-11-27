"use client";

import { useTheme } from "@/app/providers/ThemeProvider/ThemeProvider";

export default function ThemeToggle() {
  const { theme, switchTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={switchTheme}
      className="button button-secondary"
    >
      {theme === "dark" ? "Dark mode" : "Light mode"}
    </button>
  );
}
