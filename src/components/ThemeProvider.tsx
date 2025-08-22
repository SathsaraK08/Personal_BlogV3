"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Theme } from "@/lib/theme";

type SiteSettings = {
  siteTitle?: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  darkMode?: string | boolean; // supports 'true'/'false' or boolean
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface SettingsContextType {
  settings: SiteSettings;
  setSettings: (next: SiteSettings) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function ThemeProvider({ children, initialSettings }: { children: React.ReactNode; initialSettings?: Record<string, string> }) {
  const initialParsed: SiteSettings = useMemo(() => {
    const s = initialSettings || {};
    return {
      siteTitle: s.siteTitle,
      logoUrl: s.logoUrl,
      primaryColor: s.primaryColor || '#2563eb',
      secondaryColor: s.secondaryColor || '#10b981',
      darkMode: s.darkMode,
    };
  }, [initialSettings]);

  const [settings, setSettings] = useState<SiteSettings>(initialParsed);
  const [theme, setTheme] = useState<Theme>("light");

  // Initialize theme from settings or system preference, allowing local override
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      return;
    }
    const darkFromSettings = settings.darkMode === true || settings.darkMode === 'true';
    if (darkFromSettings) setTheme("dark");
    else if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) setTheme("dark");
    else setTheme("light");
  }, [settings.darkMode]);

  // Apply theme class and CSS color variables
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") root.classList.add("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.primaryColor) root.style.setProperty("--color-primary", settings.primaryColor);
    if (settings.secondaryColor) root.style.setProperty("--color-secondary", settings.secondaryColor);
  }, [settings.primaryColor, settings.secondaryColor]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </SettingsContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useSiteSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSiteSettings must be used within a ThemeProvider");
  }
  return context;
}

