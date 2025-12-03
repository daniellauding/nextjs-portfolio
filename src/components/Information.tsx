"use client";

import { motion } from "framer-motion";

interface InformationProps {
  bio: string;
  tools: string[];
  experience: string;
}

export default function Information({ bio, tools, experience }: InformationProps) {
  return (
    <section id="about" className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-[var(--text-muted)] pt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-sm font-medium text-[var(--accent)]">Information</h2>
          </div>

          <div className="md:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl md:text-2xl font-light leading-relaxed text-[var(--foreground)]"
            >
              {bio}
            </motion.p>
          </div>

          <div className="md:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm text-[var(--text-muted)] mb-2">Tools</h3>
                <p className="text-[var(--foreground)]">{tools.join(", ")}</p>
              </div>

              <div>
                <h3 className="text-sm text-[var(--text-muted)] mb-2">Experience</h3>
                <p className="text-[var(--foreground)]">{experience}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
