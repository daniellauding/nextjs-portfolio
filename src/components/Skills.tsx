"use client";

import { motion } from "framer-motion";

interface SkillsProps {
  skills: string[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

export default function Skills({ skills, activeTag, onTagClick }: SkillsProps) {
  const handleClick = (skill: string) => {
    if (activeTag === skill) {
      onTagClick(null);
    } else {
      onTagClick(skill);
    }
  };

  return (
    <section className="px-6 md:px-12 pb-24">
      {activeTag && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex items-center gap-2"
        >
          <span className="text-sm text-[var(--text-muted)]">Filtering by:</span>
          <button
            onClick={() => onTagClick(null)}
            className="px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--background)] text-sm flex items-center gap-2"
          >
            {activeTag}
            <span className="text-xs">×</span>
          </button>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap gap-3"
      >
        {skills.map((skill, index) => (
          <motion.button
            key={skill}
            onClick={() => handleClick(skill)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{
              scale: 1.05,
            }}
            className={`px-5 py-2.5 rounded-full border text-sm cursor-pointer transition-all ${
              activeTag === skill
                ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--background)]"
                : "border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-[var(--background)]"
            }`}
          >
            {skill}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
