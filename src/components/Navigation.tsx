"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Navigation() {
  const [time, setTime] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const stockholmTime = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Stockholm",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(stockholmTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Apps", href: "#apps" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <motion.a
              href="#"
              className="flex items-center gap-3 text-[var(--foreground)]"
              whileHover={{ opacity: 0.7 }}
            >
              <Logo className="text-[var(--accent)]" />
              <span className="text-sm font-medium">Instinctly</span>
            </motion.a>
            <span className="hidden md:block text-sm text-[var(--text-muted)]">
              Product Design
            </span>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <span>Stockholm</span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
                {time}
              </span>
            </div>

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sm text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {menuOpen ? "Close" : "Menu"}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--background)] pt-24 px-6 md:px-12"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-5xl md:text-7xl font-light text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
