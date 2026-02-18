"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Section {
  title: string;
  content: string;
  images?: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface ProjectDetails {
  client?: string;
  duration?: string;
  team?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  sections?: Section[];
  testimonial?: Testimonial;
  nextProject?: string | null;
  // App details
  overview?: string;
  features?: string[];
  screenshots?: string[];
  downloads?: string;
  rating?: string | number;
  testimonials?: Array<{ quote: string; author: string; rating?: number }>;
}

interface PortfolioItem {
  id: string;
  slug: string;
  name: string;
  type?: string;
  date?: string;
  location?: string;
  description: string;
  tags: string[];
  image?: string;
  icon?: string;
  color?: string;
  password?: string | null;
  featured?: boolean;
  appStoreUrl?: string | null;
  playStoreUrl?: string | null;
  details?: ProjectDetails;
}

interface ProjectContentProps {
  slug: string;
  project: PortfolioItem | null;
  app: PortfolioItem | null;
  // For "next project" link lookup
  nextProjectName?: string | null;
}

export default function ProjectContent({ slug, project, app, nextProjectName }: ProjectContentProps) {
  const item = project || app;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const itemPassword = item?.password || null;

  useEffect(() => {
    if (!itemPassword) {
      setIsAuthenticated(true);
    } else {
      const storedAuth = sessionStorage.getItem(`auth-${slug}`);
      if (storedAuth === "true") {
        setIsAuthenticated(true);
      }
    }
  }, [itemPassword, slug]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-[var(--accent)] hover:underline">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === itemPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem(`auth-${slug}`, "true");
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  if (!isAuthenticated && itemPassword) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-[var(--card)] rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-2">Protected Project</h2>
            <p className="text-[var(--text-muted)] mb-6">
              This project requires a password to view.
            </p>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full py-3 bg-[var(--accent)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Unlock Project
              </button>
            </form>
            <Link
              href="/"
              className="block mt-6 text-center text-[var(--text-muted)] hover:text-[var(--foreground)]"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  const details = item.details;
  const isApp = !!app && !project;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] flex items-end"
        style={{ backgroundColor: item.color || "#58B99B" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="relative z-10 w-full px-6 md:px-12 pb-12 md:pb-20">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{item.name}</h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">{item.description}</p>

            <div className="flex flex-wrap gap-3 mb-8">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {details && project && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
                <div>
                  <p className="text-white/60 text-sm mb-1">Client</p>
                  <p className="font-medium">{details.client}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Duration</p>
                  <p className="font-medium">{details.duration}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Team</p>
                  <p className="font-medium">{details.team}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Role</p>
                  <p className="font-medium">{details.role}</p>
                </div>
              </div>
            )}

            {/* App specific info */}
            {isApp && (
              <div className="flex flex-wrap gap-6 text-white">
                {details?.downloads && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 1 1 0 000 2H4v10h12V5h-2a1 1 0 100-2 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{details.downloads} downloads</span>
                  </div>
                )}
                {details?.rating && (
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{details.rating} rating</span>
                  </div>
                )}
                <div className="flex gap-3">
                  {item.appStoreUrl && (
                    <a
                      href={item.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors"
                    >
                      App Store
                    </a>
                  )}
                  {item.playStoreUrl && (
                    <a
                      href={item.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white/20 backdrop-blur rounded-lg hover:bg-white/30 transition-colors"
                    >
                      Play Store
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        {details && project && (
          <>
            {/* Challenge & Solution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-12 mb-20"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <p className="text-[var(--text-muted)] leading-relaxed">{details.challenge}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                <p className="text-[var(--text-muted)] leading-relaxed">{details.solution}</p>
              </div>
            </motion.div>

            {/* Impact */}
            {details.impact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[var(--card)] rounded-2xl p-8 md:p-12 mb-20"
              >
                <h2 className="text-2xl font-bold mb-6">Impact & Results</h2>
                <p className="text-lg text-[var(--text-muted)]">{details.impact}</p>
              </motion.div>
            )}

            {/* Project Sections */}
            {details.sections?.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
                <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{section.content}</p>
                {section.images && section.images.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {section.images.map((image, i) => (
                      <div
                        key={i}
                        className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5" />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Testimonial */}
            {details.testimonial && details.testimonial.quote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl p-8 md:p-12 mb-20"
              >
                <svg
                  className="w-12 h-12 text-[var(--accent)] mb-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl md:text-2xl mb-6 leading-relaxed">
                  {details.testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-bold">{details.testimonial.author}</p>
                  <p className="text-[var(--text-muted)]">{details.testimonial.role}</p>
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* App specific content */}
        {isApp && details && (
          <>
            {details.overview && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
                  {details.overview}
                </p>

                {details.features && details.features.length > 0 && (
                  <>
                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {details.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-[var(--text-muted)]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            )}

            {/* App Screenshots placeholder */}
            {details.screenshots && details.screenshots.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {details.screenshots.map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[9/16] bg-[var(--card)] rounded-xl overflow-hidden"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* App Testimonials */}
            {details.testimonials && details.testimonials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-20"
              >
                <h2 className="text-2xl font-bold mb-6">User Reviews</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {details.testimonials.map((testimonial, i) => (
                    <div key={i} className="bg-[var(--card)] rounded-xl p-6">
                      {testimonial.rating && (
                        <div className="flex gap-1 mb-3">
                          {Array.from({ length: testimonial.rating }).map((_, j) => (
                            <svg
                              key={j}
                              className="w-5 h-5 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      )}
                      <p className="text-[var(--text-muted)] mb-3">{testimonial.quote}</p>
                      <p className="font-medium text-sm">— {testimonial.author}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </>
        )}

        {/* Next Project */}
        {project && details?.nextProject && nextProjectName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-[var(--border)] pt-12"
          >
            <p className="text-sm text-[var(--text-muted)] mb-2">Next Project</p>
            <Link
              href={`/projects/${details.nextProject}`}
              className="group inline-flex items-center gap-3 text-2xl font-bold hover:text-[var(--accent)] transition-colors"
            >
              {nextProjectName}
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
