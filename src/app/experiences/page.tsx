"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import experiencesData from "@/data/experiences.json";

interface Recommendation {
  quote: string;
  author: string;
  role: string;
  date?: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  type: string;
  description: string;
  achievements?: string[];
  tags: string[];
  recommendations?: Recommendation[];
}

interface Education {
  id: string;
  degree: string;
  school: string;
  schoolUrl?: string;
  period: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
  tags: string[];
}

export default function ExperiencesPage() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const experiences = experiencesData.experiences as Experience[];
  const education = experiencesData.education as Education[];
  const allTags = experiencesData.allTags as string[];

  // Combined timeline (experiences + education)
  const timeline = useMemo(() => {
    return [...experiences, ...education].sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return dateB.getTime() - dateA.getTime(); // Most recent first
    });
  }, [experiences, education]);

  // Filter timeline based on search and active tag
  const filteredTimeline = useMemo(() => {
    let filtered = timeline;

    // Filter by tag
    if (activeTag) {
      filtered = filtered.filter((item) =>
        item.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        const searchableText = [
          item.type === "work" ? (item as Experience).role : (item as Education).degree,
          item.type === "work" ? (item as Experience).company : (item as Education).school,
          item.description,
          item.tags.join(" "),
          ...(item.type === "work" && (item as Experience).achievements
            ? (item as Experience).achievements!
            : []),
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    return filtered;
  }, [timeline, activeTag, searchQuery]);

  // Get popular tags (tags with most occurrences)
  const popularTags = useMemo(() => {
    const tagCounts = new Map<string, number>();
    timeline.forEach((item) => {
      item.tags.forEach((tag) => {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag]) => tag);
  }, [timeline]);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-[var(--accent)]/20 text-[var(--accent)] font-medium px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const clearFilters = () => {
    setActiveTag(null);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-light text-[var(--foreground)] mb-4">
            Experience
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            15+ years of crafting digital experiences across fintech, startups, and
            enterprise. From co-founding companies to designing for millions of users.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search experiences, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
              aria-label="Search experiences"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                aria-label="Clear search"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Popular Tags */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3">
              Filter by skill:
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeTag === tag
                      ? "bg-[var(--accent)] text-white"
                      : "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)]/10 border border-[var(--border)]"
                  }`}
                  aria-label={`Filter by ${tag}`}
                  aria-pressed={activeTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(activeTag || searchQuery) && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-[var(--text-muted)]">
                Showing {filteredTimeline.length} of {timeline.length} entries
              </span>
              <button
                onClick={clearFilters}
                className="text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Timeline */}
        {filteredTimeline.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[var(--text-muted)] text-lg">
              No experiences found matching your filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {filteredTimeline.map((item, index) => {
                const isWork = item.type === "work";
                const workItem = item as Experience;
                const eduItem = item as Education;
                const hasExpandableContent =
                  isWork && (workItem.achievements || workItem.recommendations);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.6 }}
                    className="relative pl-8 md:pl-20"
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 md:left-8 top-2 w-4 h-4 rounded-full border-4 ${
                        item.type === "work" && (item as Experience).current
                          ? "bg-[var(--accent)] border-[var(--accent)] ring-4 ring-[var(--accent)]/20"
                          : "bg-[var(--background)] border-[var(--accent)]"
                      } -translate-x-[7px]`}
                    />

                    {/* Content Card */}
                    <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--accent)]/30 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Type Badge */}
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                              isWork
                                ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                : "bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)]"
                            }`}
                          >
                            {isWork ? "Work" : "Education"}
                          </span>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-medium text-[var(--foreground)] mb-1">
                            {highlightText(
                              isWork ? workItem.role : eduItem.degree,
                              searchQuery
                            )}
                          </h3>

                          {/* Company/School */}
                          {(isWork ? workItem.companyUrl : eduItem.schoolUrl) ? (
                            <a
                              href={
                                isWork ? workItem.companyUrl : eduItem.schoolUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--accent)] hover:underline inline-flex items-center gap-1 text-lg mb-2"
                            >
                              {highlightText(
                                isWork ? workItem.company : eduItem.school,
                                searchQuery
                              )}
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ) : (
                            <p className="text-[var(--accent)] text-lg mb-2">
                              {highlightText(
                                isWork ? workItem.company : eduItem.school,
                                searchQuery
                              )}
                            </p>
                          )}

                          {/* Period */}
                          <p className="text-[var(--text-muted)] text-sm mb-4 flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {item.period}
                            {isWork && workItem.current && (
                              <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs rounded-full">
                                Current
                              </span>
                            )}
                          </p>

                          {/* Description */}
                          <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                            {highlightText(item.description, searchQuery)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {item.tags.slice(0, 6).map((tag) => (
                              <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className="px-3 py-1 bg-[var(--background-light)] text-[var(--foreground)] text-xs rounded-full hover:bg-[var(--accent)]/10 transition-colors"
                                aria-label={`Filter by ${tag}`}
                              >
                                {tag}
                              </button>
                            ))}
                            {item.tags.length > 6 && (
                              <span className="px-3 py-1 text-[var(--text-muted)] text-xs">
                                +{item.tags.length - 6} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expand Button */}
                        {hasExpandableContent && (
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors rounded-full hover:bg-[var(--background-light)]"
                            aria-label={
                              expandedItems[item.id]
                                ? "Collapse details"
                                : "Expand details"
                            }
                            aria-expanded={expandedItems[item.id] || false}
                          >
                            <motion.div
                              animate={{ rotate: expandedItems[item.id] ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <svg
                                className="w-6 h-6"
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
                          </button>
                        )}
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {hasExpandableContent && expandedItems[item.id] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6 pt-6 border-t border-[var(--border)] space-y-6 overflow-hidden"
                          >
                            {/* Achievements */}
                            {workItem.achievements &&
                              workItem.achievements.length > 0 && (
                                <div>
                                  <h4 className="text-base font-medium text-[var(--foreground)] mb-3">
                                    Key Achievements:
                                  </h4>
                                  <ul className="space-y-2">
                                    {workItem.achievements.map(
                                      (achievement, idx) => (
                                        <li
                                          key={idx}
                                          className="flex items-start gap-3 text-[var(--text-muted)]"
                                        >
                                          <svg
                                            className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                          <span className="leading-relaxed">
                                            {highlightText(achievement, searchQuery)}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}

                            {/* Recommendations */}
                            {workItem.recommendations &&
                              workItem.recommendations.length > 0 && (
                                <div>
                                  <h4 className="text-base font-medium text-[var(--foreground)] mb-3">
                                    Recommendations:
                                  </h4>
                                  <div className="space-y-4">
                                    {workItem.recommendations.map((rec, idx) => (
                                      <div
                                        key={idx}
                                        className="bg-[var(--background-light)] rounded-lg p-4 border border-[var(--border)]"
                                      >
                                        <div className="flex items-start gap-3">
                                          <svg
                                            className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-1"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                          >
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                          </svg>
                                          <div className="flex-1">
                                            <blockquote className="text-[var(--foreground)] mb-3 leading-relaxed italic">
                                              "{rec.quote}"
                                            </blockquote>
                                            <div>
                                              <p className="font-medium text-[var(--foreground)]">
                                                — {rec.author}
                                              </p>
                                              <p className="text-sm text-[var(--text-muted)]">
                                                {rec.role}
                                              </p>
                                              {rec.date && (
                                                <p className="text-sm text-[var(--text-muted)]">
                                                  {rec.date}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-4">
            Let's work together
          </h2>
          <p className="text-[var(--text-muted)] mb-6">
            Available for freelance projects and consulting in 2026
          </p>
          <a
            href="/#contact"
            className="inline-block px-8 py-4 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/90 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>
    </div>
  );
}
