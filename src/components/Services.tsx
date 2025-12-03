"use client";

import { motion } from "framer-motion";

export default function Services() {
  return (
    <section className="px-6 md:px-12 py-24 bg-[var(--background-light)]" id="services">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-light mb-6 text-[var(--foreground)]"
        >
          Ready to bring your ideas to life?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-[var(--text-muted)] mb-12 max-w-3xl mx-auto"
        >
          Whether you need freelance work, consultant support, or a full-time designer — let's create something amazing together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-medium mb-3 text-[var(--foreground)]">
              Freelance Projects
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Fixed scope work with clear deliverables and timelines
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-medium mb-3 text-[var(--foreground)]">
              Consultant
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Ongoing collaboration as part of your team
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 text-center"
          >
            <h3 className="text-xl font-medium mb-3 text-[var(--foreground)]">
              Full-time
            </h3>
            <p className="text-[var(--text-muted)] text-sm">
              Dedicated full-time design & development
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-[var(--text-muted)]">
            Not sure which service fits your needs?
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Let's have a conversation about your project goals and find the perfect collaboration approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="mailto:daniel@lauding.se?subject=General Project Inquiry"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-3 bg-[var(--accent)] text-white rounded-full font-medium hover:bg-[var(--accent-secondary)] transition-colors"
            >
              Start General Request
            </motion.a>
            
            <motion.a
              href="mailto:daniel@lauding.se"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-8 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-full font-medium hover:bg-[var(--card)] transition-colors"
            >
              Email Directly
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}