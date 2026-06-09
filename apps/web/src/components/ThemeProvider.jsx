"use client";
import { createContext, useContext, useEffect, useState } from "react";

export const themes = {
  "Onyx Dark": {
    "--bg": "#050505",
    "--bg2": "#0a0a0a",
    "--surface": "rgba(14,14,14,0.85)",
    "--surface2": "rgba(22,22,22,0.6)",
    "--accent": "#ef4444",
    "--accent-rgb": "239,68,68",
    "--accent-glow": "rgba(239,68,68,0.18)",
    "--border": "rgba(255,255,255,0.07)",
    "--text": "#ffffff",
    "--muted": "#6b7280",
    "--orb1": "rgba(239,68,68,0.12)",
    "--orb2": "rgba(127,29,29,0.1)",
    "--gradient": "linear-gradient(135deg,#ef4444,#dc2626)",
  },
  "Purple Void": {
    "--bg": "#06000f",
    "--bg2": "#0d0020",
    "--surface": "rgba(20,5,40,0.85)",
    "--surface2": "rgba(30,10,55,0.6)",
    "--accent": "#a855f7",
    "--accent-rgb": "168,85,247",
    "--accent-glow": "rgba(168,85,247,0.18)",
    "--border": "rgba(168,85,247,0.12)",
    "--text": "#ffffff",
    "--muted": "#9d7ec9",
    "--orb1": "rgba(168,85,247,0.12)",
    "--orb2": "rgba(88,28,135,0.1)",
    "--gradient": "linear-gradient(135deg,#a855f7,#7c3aed)",
  },
  "Ocean Blue": {
    "--bg": "#00050f",
    "--bg2": "#000d1e",
    "--surface": "rgba(5,15,35,0.85)",
    "--surface2": "rgba(10,25,50,0.6)",
    "--accent": "#3b82f6",
    "--accent-rgb": "59,130,246",
    "--accent-glow": "rgba(59,130,246,0.18)",
    "--border": "rgba(59,130,246,0.12)",
    "--text": "#ffffff",
    "--muted": "#60a5fa",
    "--orb1": "rgba(59,130,246,0.12)",
    "--orb2": "rgba(30,64,175,0.1)",
    "--gradient": "linear-gradient(135deg,#3b82f6,#1d4ed8)",
  },
  "Neon Green": {
    "--bg": "#000f05",
    "--bg2": "#001a0a",
    "--surface": "rgba(5,22,12,0.85)",
    "--surface2": "rgba(10,35,20,0.6)",
    "--accent": "#22c55e",
    "--accent-rgb": "34,197,94",
    "--accent-glow": "rgba(34,197,94,0.18)",
    "--border": "rgba(34,197,94,0.12)",
    "--text": "#ffffff",
    "--muted": "#4ade80",
    "--orb1": "rgba(34,197,94,0.12)",
    "--orb2": "rgba(21,128,61,0.1)",
    "--gradient": "linear-gradient(135deg,#22c55e,#16a34a)",
  },
  "Crimson Blood": {
    "--bg": "#0f0000",
    "--bg2": "#1a0000",
    "--surface": "rgba(28,5,5,0.85)",
    "--surface2": "rgba(42,10,10,0.6)",
    "--accent": "#dc2626",
    "--accent-rgb": "220,38,38",
    "--accent-glow": "rgba(220,38,38,0.18)",
    "--border": "rgba(220,38,38,0.12)",
    "--text": "#ffffff",
    "--muted": "#f87171",
    "--orb1": "rgba(220,38,38,0.12)",
    "--orb2": "rgba(127,29,29,0.1)",
    "--gradient": "linear-gradient(135deg,#dc2626,#991b1b)",
  },
};

// Build default CSS vars string for the default theme (Onyx Dark)
const defaultVarsCss = Object.entries(themes["Onyx Dark"])
  .map(([k, v]) => `${k}:${v}`)
  .join(";");

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("Onyx Dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("salt_theme");
    if (saved && themes[saved]) {
      setThemeState(saved);
      applyVars(themes[saved]);
    }
  }, []);

  function applyVars(vars) {
    if (typeof document === "undefined") return;
    Object.entries(vars).forEach(([k, v]) =>
      document.documentElement.style.setProperty(k, v),
    );
  }

  const setTheme = (name) => {
    if (!themes[name]) return;
    setThemeState(name);
    applyVars(themes[name]);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("salt_theme", name);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, themeList: Object.keys(themes), themes }}
    >
      {/* Inject default CSS vars immediately via style tag so first render is styled */}
      <style>{`:root{${defaultVarsCss}}`}</style>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
