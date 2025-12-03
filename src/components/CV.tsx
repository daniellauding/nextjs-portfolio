"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Recommendation {
  quote: string;
  author: string;
  role: string;
  date?: string;
}

interface Experience {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  description: string;
  projects?: string[];
  recommendation?: Recommendation;
}

interface Education {
  degree: string;
  school: string;
  schoolUrl?: string;
  year: string;
}

interface CVProps {
  experience: Experience[];
  education: Education[];
}

export default function CV({ experience, education }: CVProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-[var(--foreground)]">
                      {exp.title}
                    </h3>
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--accent)] text-sm mt-1 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        {exp.company}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <p className="text-[var(--accent)] text-sm mt-1">
                        {exp.company}
                      </p>
                    )}
                    <p className="text-[var(--text-muted)] text-sm mt-1">
                      {exp.period}
                    </p>
                    <p className="text-[var(--foreground)] text-sm mt-3 opacity-80">
                      {exp.description}
                    </p>
                  </div>
                  {(exp.projects || exp.recommendation) && (
                    <motion.button
                      onClick={() => {
                        const itemKey = `exp-${index}`;
                        setExpandedItems(prev => ({
                          ...prev,
                          [itemKey]: !prev[itemKey]
                        }));
                      }}
                      className="ml-4 flex-shrink-0 flex items-center justify-center w-8 h-8 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={{ rotate: expandedItems[`exp-${index}`] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </motion.div>
                    </motion.button>
                  )}
                </div>
                
                <AnimatePresence>
                  {(exp.projects || exp.recommendation) && expandedItems[`exp-${index}`] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-4 overflow-hidden"
                    >
                      {exp.projects && (
                        <div>
                          <h4 className="text-base font-medium text-[var(--foreground)] mb-4">Projects:</h4>
                          {exp.projects.map((project, projIndex) => {
                            const urlMatch = project.match(/(https?:\/\/[^\s)]+)/);
                            const hasUrl = urlMatch !== null;
                            const url = urlMatch ? urlMatch[0] : null;
                            const projectText = hasUrl && url ? project.replace(url, '').replace(/[()]/g, '').trim() : project;
                            
                            return (
                              <div key={projIndex} className="text-base pl-4 border-l border-[var(--text-muted)]/30 mb-3 leading-relaxed">
                                <div className="flex items-start gap-2">
                                  <span className="flex-1 text-[var(--text-muted)]/80">{projectText}</span>
                                  {hasUrl && url && (
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors cursor-pointer"
                                    >
                                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                      
                      {exp.recommendation && (
                        <div className="bg-[var(--card)] rounded-lg p-4 border border-[var(--border)]">
                          <h4 className="text-base font-medium text-[var(--foreground)] mb-3">Recommendation:</h4>
                          <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-[var(--accent)] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                            <div>
                              <blockquote className="text-base text-[var(--foreground)] mb-3 leading-relaxed italic">
                                "{exp.recommendation.quote}"
                              </blockquote>
                              <div>
                                <p className="font-medium text-[var(--foreground)]">— {exp.recommendation.author}</p>
                                <p className="text-sm text-[var(--text-muted)]">{exp.recommendation.role}</p>
                                {exp.recommendation.date && (
                                  <p className="text-xs text-[var(--text-muted)] mt-1">{exp.recommendation.date}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
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
                {edu.schoolUrl ? (
                  <a
                    href={edu.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] text-sm mt-1 hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    {edu.school}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : (
                  <p className="text-[var(--accent)] text-sm mt-1">{edu.school}</p>
                )}
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
