"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface App {
  id: string;
  slug?: string;
  name: string;
  icon: string;
  description: string;
  appStoreUrl: string;
  tags?: string[];
}

interface AppsProps {
  apps: App[];
  enableClickthrough?: boolean;
}

export default function Apps({ apps, enableClickthrough = true }: AppsProps) {
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
          Currently shipping
        </h2>
        <p className="text-xl text-[var(--foreground)]">
          Apps & projects I'm working on
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {apps.map((app, index) => {
          const Wrapper = enableClickthrough && app.slug ? Link : "a";
          const wrapperProps = enableClickthrough && app.slug 
            ? { href: `/projects/${app.slug}` }
            : { href: app.appStoreUrl, target: "_blank", rel: "noopener noreferrer" };
          
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Wrapper
                {...wrapperProps}
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-[22px] overflow-hidden shadow-lg mb-4 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                  {app.icon && (app.icon.startsWith('http') || app.icon.startsWith('/')) ? (
                    <Image
                      src={app.icon}
                      alt={`${app.name} icon`}
                      fill
                      className="object-cover"
                      unoptimized={app.icon.startsWith('http')}
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl text-[var(--background)]">
                      {app.icon || app.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {app.description}
                </p>
                {enableClickthrough && app.slug && (
                  <span className="mt-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </span>
                )}
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
