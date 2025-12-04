"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { trackContactAttempt, trackExternalLink } from "@/lib/tracking";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/daniellauding" },
    { name: "Twitter", url: "https://x.com/daniellauding" },
    { name: "Dribbble", url: "https://dribbble.com/daniellauding" },
    { name: "GitHub", url: "https://github.com/daniellauding" },
    { name: "Instagram", url: "https://www.instagram.com/daniellauding" },
    { name: "Spotify", url: "https://open.spotify.com/artist/4cDYlG9sl8IYOGsoXWKkGt?si=PREJisoNRWuwWeSYSL3dZQ" },
    { name: "Airbnb", url: "https://airbnb.com/h/daniellauding" },
  ];

  const services = [
    "Freelance Projects",
    "Consultant", 
    "Full-time"
  ];

  return (
    <footer id="contact" className="px-6 md:px-12 py-24 border-t border-[var(--text-muted)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Services CTA Section */}
        {/* <div className="mb-20 py-16 px-8 rounded-3xl bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[var(--accent-secondary)]/5">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--accent)] text-xs text-[var(--accent)] mb-4">
              SERVICES
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--foreground)] mb-6">
              Ready to bring your ideas to life?
            </h2>
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Whether you need freelance work, consultant support, or a full-time designer — let's create something amazing together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {services.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 bg-[var(--card)] rounded-full text-sm text-[var(--foreground)] border border-[var(--border)]"
                >
                  {service}
                </span>
              ))}
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              View Services & Pricing
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div> */}

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
              onClick={() => trackContactAttempt('email_main')}
            >
              daniel@lauding.se
            </motion.a>
            <div>
              <p className="text-[var(--text-muted)] mb-2 text-sm">
                Open for workshops, mentorship & design engineering education
              </p>
              <p className="text-[var(--text-muted)] mb-4 text-xs">
                Exploring 1-on-1 and small team learning experiences
              </p>
              <motion.a
                href="mailto:daniel@lauding.se?subject=Let's Build Something Great&body=Hi Daniel, I'm interested in working together on..."
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => trackContactAttempt('email_cta_button')}
              >
                Let's Build Something Great
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
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
                    onClick={() => trackExternalLink(link.url, 'social')}
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
