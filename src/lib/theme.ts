export type Theme = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
}

export const themes: Record<Theme, ThemeColors> = {
  light: {
    primary: "#000000",
    secondary: "#6B7280",
    background: "#FFFFFF",
    surface: "#F9FAFB",
    text: "#111827",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    accent: "#3B82F6",
  },
  dark: {
    primary: "#FFFFFF",
    secondary: "#9CA3AF",
    background: "#111827",
    surface: "#1F2937",
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
    border: "#374151",
    accent: "#60A5FA",
  },
};

export function getThemeColors(theme: Theme): ThemeColors {
  return themes[theme];
}

// Tailwind only needs "dark" to be present or absent
export function getThemeClass(theme: Theme): string {
  return theme === "dark" ? "dark" : "";
}





