"use client";

import { motion } from "framer-motion";

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  appStoreUrl: string;
}

interface AppsProps {
  apps: App[];
}

export default function Apps({ apps }: AppsProps) {
  return (
    <section id="apps" className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-sm font-medium text-[var(--accent)] mb-4">
          My Apps
        </h2>
        <p className="text-xl text-[var(--foreground)]">
          Personal projects and apps available on the App Store
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {apps.map((app, index) => (
          <motion.a
            key={app.id}
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[22px] overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
              <span className="text-3xl md:text-4xl text-[var(--background)]">
                {app.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
              {app.name}
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {app.description}
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
