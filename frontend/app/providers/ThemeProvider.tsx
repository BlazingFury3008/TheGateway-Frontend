"use client";

import { createContext, useContext, useEffect, useState } from "react";

type ThemeType = "light" | "dark";

type ThemeContextProps = {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  switchTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>("light");
  const [hasLoadedTheme, setHasLoadedTheme] = useState(false);

  useEffect(() => {
    // Match the palette already applied before the first paint.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    setHasLoadedTheme(true);
  }, []);

  function switchTheme() {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    if (hasLoadedTheme) {
      document.documentElement.dataset.theme = theme;
      try {
        localStorage.setItem("theme", theme);
      } catch {
        // The current page can still switch themes when storage is unavailable.
      }
    }
  }, [hasLoadedTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
