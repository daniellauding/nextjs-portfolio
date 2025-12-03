"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  let themeContext;
  try {
    themeContext = useTheme();
  } catch {
    themeContext = null;
  }

  useEffect(() => {
    setMounted(true);
    if (themeContext) {
      setTheme(themeContext.theme);
    }
  }, [themeContext]);

  if (!mounted || !themeContext) {
    return null;
  }

  const { theme: contextTheme, toggleTheme } = themeContext;

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-[var(--card)] shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: contextTheme === "dark" ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {contextTheme === "dark" ? (
          <svg
            className="w-6 h-6 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}