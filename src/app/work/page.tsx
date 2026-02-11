"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const caseStudies = [
  {
    slug: "qasa",
    title: "Qasa - Rental Matching Platform",
    description: "Led product design within the Match team, making it easier for tenants and landlords to find each other, connect, and sign homes.",
    color: "#10B981",
    tags: ["Product Design", "UX Research", "AI Tools", "Rental Platform"],
    year: "2025",
    duration: "4 months"
  },
  {
    slug: "vromm",
    title: "Vromm - Driving Instruction App",
    description: "Building a smarter, more engaging way for driving students and instructors to plan, track, and complete practice based on Sweden's 16-step curriculum.",
    color: "#3B82F6",
    tags: ["Product Design", "React Native", "AI", "Startup", "Education"],
    year: "2025",
    duration: "Ongoing"
  }
];

export default function WorkIndex() {
  return (
    <div className="min-h-screen px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--foreground)] mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Selected Work</h1>
          <p className="text-lg text-[var(--text-muted)] max-w-2xl">
            Case studies showcasing product design, AI-assisted development, and user-centered solutions.
          </p>
        </motion.div>

        <div className="space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/work/${study.slug}`}
                className="group block"
              >
                <div 
                  className="relative overflow-hidden rounded-2xl p-8 md:p-12 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: study.color }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                  
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-white/80 text-sm">{study.year}</span>
                      <span className="text-white/60 text-sm">•</span>
                      <span className="text-white/80 text-sm">{study.duration}</span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform">
                      {study.title}
                    </h2>
                    
                    <p className="text-lg text-white/90 mb-6 max-w-3xl">
                      {study.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-white text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-white font-medium">
                      <span>View case study</span>
                      <svg 
                        className="w-5 h-5 group-hover:translate-x-2 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--text-muted)] mb-4">Want to see more work?</p>
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline font-medium"
          >
            View all projects
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
