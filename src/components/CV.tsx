"use client";

import { motion } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface Education {
  degree: string;
  school: string;
  year: string;
}

interface CVProps {
  experience: Experience[];
  education: Education[];
}

export default function CV({ experience, education }: CVProps) {
  return (
    <section className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div>
          <h2 className="text-sm font-medium text-[var(--accent)] mb-8">
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border-l-2 border-[var(--accent)] pl-6"
              >
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {exp.title}
                </h3>
                <p className="text-[var(--accent)] text-sm mt-1">
                  {exp.company}
                </p>
                <p className="text-[var(--text-muted)] text-sm mt-1">
                  {exp.period}
                </p>
                <p className="text-[var(--foreground)] text-sm mt-3 opacity-80">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-[var(--accent)] mb-8">
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="border-l-2 border-[var(--accent)] pl-6"
              >
                <h3 className="text-lg font-medium text-[var(--foreground)]">
                  {edu.degree}
                </h3>
                <p className="text-[var(--accent)] text-sm mt-1">{edu.school}</p>
                <p className="text-[var(--text-muted)] text-sm mt-1">
                  {edu.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
