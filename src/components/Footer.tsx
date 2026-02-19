"use client";

import { motion } from "framer-motion";
import Logo from "./Logo";
import ContactButton from "./ContactButton";
import { trackExternalLink } from "@/lib/tracking";

interface SocialLinkEntry {
  name: string;
  url: string;
}

interface FooterProps {
  socialLinks?: SocialLinkEntry[];
}

const DEFAULT_SOCIAL_LINKS: SocialLinkEntry[] = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/daniellauding" },
  { name: "Twitter", url: "https://x.com/daniellauding" },
  { name: "Dribbble", url: "https://dribbble.com/daniellauding" },
  { name: "GitHub", url: "https://github.com/daniellauding" },
  { name: "Instagram", url: "https://www.instagram.com/daniellauding" },
  { name: "Spotify", url: "https://open.spotify.com/artist/4cDYlG9sl8IYOGsoXWKkGt?si=PREJisoNRWuwWeSYSL3dZQ" },
  { name: "Airbnb", url: "https://airbnb.com/h/daniellauding" },
];

export default function Footer({ socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const links = socialLinks && socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIAL_LINKS;

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
              href="mailto:daniel@lauding.se"
              className="inline-block text-xl text-[var(--accent)] hover:underline underline-offset-4 mb-6"
              whileHover={{ x: 10 }}
            >
              daniel@lauding.se
            </motion.a>
            <div>
              <p className="text-[var(--text-muted)] mb-2 text-sm">
                Open for workshops, mentorship &amp; design engineering education
              </p>
              <p className="text-[var(--text-muted)] mb-4 text-xs">
                Exploring 1-on-1 and small team learning experiences
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <ContactButton label="Let's Build Something Great" formSlug="contact" />
              </motion.div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm text-[var(--text-muted)] mb-4">Social</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.url}
                    className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    whileHover={{ x: 5 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackExternalLink(link.url, "social")}
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
              Lund/Stockholm, Sweden
              <br />
              <span className="text-[var(--text-muted)]">Remote-first, travel-ready</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[var(--text-muted)]/30">
          <div className="flex items-center gap-3">
            <Logo className="text-[var(--accent)]" />
            <span className="text-sm text-[var(--text-muted)]">
              Daniel Lauding
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
