"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;

  const project = portfolioData.projects.find(
    (p) => p.readMore === `/projects/${slug}`
  );

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Project not found
          </h1>
          <Link
            href="/"
            className="text-[var(--accent)] hover:underline"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back
        </Link>
      </nav>

      <section className="pt-24 pb-12 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm text-[var(--text-muted)]">
            {project.type} — {project.date}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mt-2 mb-4">
            {project.name}
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            {project.location}
          </p>
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="px-6 md:px-12 pb-12"
      >
        <div
          className="w-full aspect-video rounded-3xl"
          style={{ backgroundColor: project.color }}
        />
      </motion.section>

      <section className="px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="md:col-span-2"
          >
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
              About the project
            </h2>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg">
              {project.description}
            </p>
            <p className="text-[var(--text-muted)] leading-relaxed text-lg mt-4">
              This is an example project detail page. In a real implementation,
              you would add more detailed content here including case study information,
              process documentation, additional images, and outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-sm font-medium text-[var(--accent)] mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full border border-[var(--foreground)] text-sm text-[var(--foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-medium text-[var(--accent)] mt-8 mb-4">
              Details
            </h3>
            <dl className="space-y-3">
              <div>
                <dt className="text-xs text-[var(--text-muted)]">Type</dt>
                <dd className="text-[var(--foreground)]">{project.type}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--text-muted)]">Year</dt>
                <dd className="text-[var(--foreground)]">{project.date}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--text-muted)]">Location</dt>
                <dd className="text-[var(--foreground)]">{project.location}</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 border-t border-[var(--text-muted)]/20">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          View all projects
        </Link>
      </section>
    </main>
  );
}
