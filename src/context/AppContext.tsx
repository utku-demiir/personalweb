import { createContext, useContext, useEffect, useMemo, useState } from "react";
import content from "../data/content.json";

export type Language = "tr" | "en";
export type Theme = "light" | "dark";

type Content = typeof content.languages.tr;

type AppContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  text: Content;
};

const AppContext = createContext<AppContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "tr";
  const stored = localStorage.getItem("language");
  if (stored === "tr" || stored === "en") return stored;
  return "tr";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const text = useMemo(() => content.languages[language], [language]);

  const value = useMemo(
    () => ({ language, setLanguage, theme, toggleTheme, text }),
    [language, theme, text]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
