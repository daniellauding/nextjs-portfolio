"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

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
          <div className="flex items-center">
            <motion.a
              href="#"
              className="flex items-center text-[var(--foreground)]"
              whileHover={{ opacity: 0.7 }}
            >
              <Logo className="text-[var(--accent)]" />
            </motion.a>
          </div>

          <div className="flex items-center gap-8">

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
