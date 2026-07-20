"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;

  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-9 h-9 rounded-full border transition-colors"
      style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
    >
      {isDark ? <Sun size={16} className="text-primary-light" /> : <Moon size={16} className="text-muted" />}
    </button>
  );
}