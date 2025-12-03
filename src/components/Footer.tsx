"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "#" },
    { name: "Twitter", url: "#" },
    { name: "Dribbble", url: "#" },
    { name: "GitHub", url: "#" },
  ];

  return (
    <footer id="contact" className="px-6 md:px-12 py-24 border-t border-[var(--text-muted)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-6xl font-light text-[var(--foreground)] mb-6">
              Let&apos;s work
              <br />
              together
            </h2>
            <motion.a
              href="mailto:hello@instinctly.se"
              className="inline-block text-xl text-[var(--accent)] hover:underline underline-offset-4"
              whileHover={{ x: 10 }}
            >
              hello@instinctly.se
            </motion.a>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm text-[var(--text-muted)] mb-4">Social</h3>
            <ul className="space-y-2">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm text-[var(--text-muted)] mb-4">Location</h3>
            <p className="text-[var(--foreground)]">
              Stockholm, Sweden
              <br />
              <span className="text-[var(--text-muted)]">Available worldwide</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--text-muted)]/30">
          <div className="flex items-center gap-3">
            <Logo className="text-[var(--accent)]" />
            <span className="text-sm text-[var(--text-muted)]">
              Instinctly
            </span>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            {currentYear} All rights reserved
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
