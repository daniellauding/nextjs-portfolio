"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import portfolioData from "@/data/portfolio.json";

const ALL_TAGS = Array.from(
  new Set(portfolioData.projects.flatMap((p) => p.tags))
).sort();

export default function CasesPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState<Record<string, boolean>>({});

  const filtered = activeTag
    ? portfolioData.projects.filter((p) => p.tags.includes(activeTag))
    : portfolioData.projects;

  return (
    <>
      <Navigation />
      <main className="px-6 md:px-12 py-24 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            All Cases
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            {portfolioData.projects.length} projects across product design, frontend development, fintech, and more — spanning 15+ years of work.
          </p>
        </motion.div>

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeTag
                ? "bg-[var(--foreground)] text-[var(--background)]"
                : "bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
            }`}
          >
            All ({portfolioData.projects.length})
          </button>
          {ALL_TAGS.slice(0, 12).map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTag === tag
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group"
            >
              <Link href={`/projects/${project.slug}`}>
                <motion.div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4"
                  style={{ backgroundColor: project.color }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      opacity: hoveredProject === project.id ? 0.6 : 0.25,
                      scale: hoveredProject === project.id ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-24 h-24 rounded-full blur-3xl bg-white" />
                  </motion.div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-xs font-medium">
                      Featured
                    </div>
                  )}

                  {/* Hover overlay */}
                  {hoveredProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute inset-0 p-5 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent"
                    >
                      <p className="text-sm text-white/80 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 bg-white/20 rounded-full text-white text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mt-0.5">
                      {project.type} · {project.date}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      {project.location}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-[var(--text-muted)]">
            No projects match that filter.
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
