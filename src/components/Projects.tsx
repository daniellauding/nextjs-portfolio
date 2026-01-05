"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { trackProjectView, trackClick } from "@/lib/tracking";

interface Project {
  id: string;
  slug: string;
  name: string;
  type: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  image: string;
  color: string;
  featured?: boolean;
  readMore?: string;
}

interface ProjectsProps {
  projects: Project[];
  activeTag: string | null;
  onTagClick: (tag: string | null) => void;
}

export default function Projects({ projects, activeTag, onTagClick }: ProjectsProps) {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState<Record<string, boolean>>({});

  return (
    <section id="work" className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mt-2">
          Work <span className="text-[var(--accent)]">&</span>
          <br />
          Highlights
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() =>
              setActiveProject(activeProject === project.id ? null : project.id)
            }
            className="group relative cursor-pointer touch-manipulation"
          >
            <motion.div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ backgroundColor: project.color }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: hoveredProject === project.id ? 0.6 : 0.3,
                  scale: hoveredProject === project.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="w-32 h-32 rounded-full blur-3xl"
                  style={{ backgroundColor: "white" }}
                />
              </motion.div>

              <AnimatePresence>
                {(hoveredProject === project.id ||
                  activeProject === project.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/60 to-transparent"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        const maxTagsToShow = 3;
                        const projectShowAll = showAllTags[project.id] || false;
                        const tagsToShow = projectShowAll 
                          ? project.tags 
                          : project.tags.slice(0, maxTagsToShow);
                        
                        return (
                          <>
                            {tagsToShow.map((tag) => (
                              <button
                                key={tag}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onTagClick(activeTag === tag ? null : tag);
                                }}
                                className={`px-3 py-1 rounded-full text-xs transition-all ${
                                  activeTag === tag
                                    ? "bg-white text-black"
                                    : "bg-white/20 text-white hover:bg-white/40"
                                }`}
                                aria-label={`Filter projects by ${tag}`}
                              >
                                {tag}
                              </button>
                            ))}
                            {project.tags.length > maxTagsToShow && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowAllTags(prev => ({
                                    ...prev,
                                    [project.id]: !projectShowAll
                                  }));
                                }}
                                className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/80 hover:bg-white/20 transition-all"
                                aria-label={projectShowAll ? "Show fewer tags" : `Show ${project.tags.length - maxTagsToShow} more tags`}
                              >
                                {projectShowAll 
                                  ? "..." 
                                  : `+${project.tags.length - maxTagsToShow}`
                                }
                              </button>
                            )}
                          </>
                        );
                      })()}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        trackProjectView(project.name);
                      }}
                      className="mt-3 inline-flex items-center gap-2 text-sm text-white hover:text-[var(--accent)] transition-colors"
                    >
                      View Case Study
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="mt-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-[var(--foreground)]">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    {project.type} – {project.date}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-16 pt-12 border-t border-[var(--text-muted)]"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
          Got any project?
        </h3>
        <motion.a
          href="#contact"
          className="text-lg text-[var(--accent)] underline underline-offset-4"
          whileHover={{ opacity: 0.7 }}
        >
          Hire me
        </motion.a>
      </motion.div>
    </section>
  );
}
