"use client";

import { motion } from "framer-motion";

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  appStoreUrl: string;
  tags: string[];
}

interface HeroProps {
  firstName: string;
  lastName: string;
  apps?: App[];
}

export default function Hero({ firstName, lastName, apps = [] }: HeroProps) {
  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24">
      <div className="w-full">
        <motion.h1
          className="text-[clamp(3rem,15vw,12rem)] font-light leading-[0.9] tracking-tight text-[var(--foreground)]"
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden">
            {firstName.split("").map((char, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {lastName.split("").map((char, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + firstName.length}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>

        {apps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-6"
          >
            <span className="text-sm text-[var(--text-muted)]">My Apps</span>
            <div className="flex gap-4">
              {apps.map((app, index) => (
                <motion.a
                  key={app.id}
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  className="group relative"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                    <span className="text-2xl text-[var(--background)] font-medium">
                      {app.name.charAt(0)}
                    </span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-[var(--background-light)] rounded-lg whitespace-nowrap z-10"
                  >
                    <p className="text-xs font-medium text-[var(--foreground)]">{app.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{app.description}</p>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
