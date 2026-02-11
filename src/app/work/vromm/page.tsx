"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function VrommCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] flex items-end"
        style={{ backgroundColor: "#3B82F6" }}
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Work
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Vromm - Driving Instruction App
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
              Building a smarter, more engaging way for driving students and instructors to plan, track, and complete practice based on Sweden's 16-step curriculum.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {["Product Design", "React Native", "AI", "Startup", "Education", "Figma", "AI Prototyping", "AI-assisted Development", "Cursor"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
              <div>
                <p className="text-white/60 text-sm mb-1">Client</p>
                <p className="font-medium">Vromm (Own Startup)</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Duration</p>
                <p className="font-medium">Ongoing (2025-Present)</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Team</p>
                <p className="font-medium">Solo founder with AI assistance</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Role</p>
                <p className="font-medium">Founder & Product Designer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-6xl mx-auto">
        {/* Challenge & Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Build a smarter, more structured way for students and instructors to plan, track, and complete driving practice together. Reduce complexity in planning and feedback, especially for private driving pairs. The traditional driving education system lacked digital tools to effectively map progress against Sweden's 16-step curriculum.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Designed and developed an MVP in React Native using Cursor, Supabase, and GPT-based tools. Connected real-world driving routes to learning objectives with gamified progress tracking. Created an intuitive interface that makes curriculum progression visible and engaging for both students and instructors.
            </p>
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[var(--card)] rounded-2xl p-8 md:p-12 mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Impact & Results</h2>
          <p className="text-lg text-[var(--text-muted)] mb-6">
            Launching internal MVP with active pilot users. Built a co-creation system using AI to cut dev/design time by 60–70%. Preparing for 2025 public pilot with schools and instructors in Skåne.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">60-70% faster development using AI-assisted workflows</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Active pilot users providing valuable feedback</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Public pilot planned with Skåne driving schools</span>
            </li>
          </ul>
        </motion.div>

        {/* Research & Discovery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Research & Discovery</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Surveys with instructors, students, and parents. Input from startup coaches (ALMI, Minc). Mapping Trafikverket's 16 steps to real routes and increasing clarity in how students approach the curriculum. The research revealed a critical need for better progress visualization and communication tools between students and instructors.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-xl p-6">
              <h3 className="font-bold mb-3">Key Insights from Research</h3>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span>Students struggle to understand curriculum progression</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span>Instructors lack digital tools for planning practice routes</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span>Parents want visibility into student progress</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent)]">→</span>
                  <span>Traditional methods are paper-based and inefficient</span>
                </li>
              </ul>
            </div>
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Survey results & stakeholder input</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI-Powered Development */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">AI-Powered Development</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Solo-led product design and development using AI agents (ChatGPT, Claude) to brainstorm, write code, design UI, and validate ideas. Faster design and iteration cycles using co-creation workflows with Cursor as the primary development environment.
          </p>
          <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl p-8 md:p-12">
            <h3 className="text-xl font-bold mb-6">AI-Assisted Workflow</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">1</div>
                <div>
                  <h4 className="font-bold mb-2">Ideation with AI</h4>
                  <p className="text-[var(--text-muted)] text-sm">Used ChatGPT and Claude for brainstorming features, user flows, and technical architecture decisions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">2</div>
                <div>
                  <h4 className="font-bold mb-2">Cursor for Development</h4>
                  <p className="text-[var(--text-muted)] text-sm">Leveraged Cursor's AI capabilities for rapid React Native development, reducing coding time by 60-70%</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">3</div>
                <div>
                  <h4 className="font-bold mb-2">Design in Figma</h4>
                  <p className="text-[var(--text-muted)] text-sm">Created high-fidelity prototypes in Figma, then used AI to convert designs to React Native code</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold text-lg">4</div>
                <div>
                  <h4 className="font-bold mb-2">Validation & Iteration</h4>
                  <p className="text-[var(--text-muted)] text-sm">Used AI to generate test scenarios and edge cases, ensuring robust product quality</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product & Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Product & Key Features</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Built React Native MVP with gamified progress tracking. Connected real-world driving routes to learning objectives. Early positive feedback on visual route-planning and progress tracking.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--card)] rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Route Planning</h3>
              <p className="text-sm text-[var(--text-muted)]">Map real-world driving routes to curriculum steps with visual progress tracking</p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Gamified Progress</h3>
              <p className="text-sm text-[var(--text-muted)]">Track completion of 16 curriculum steps with badges and achievements</p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6">
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2">Collaboration Tools</h3>
              <p className="text-sm text-[var(--text-muted)]">Connect students, instructors, and parents with real-time progress sharing</p>
            </div>
          </div>
        </motion.div>

        {/* App Screenshots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">App Preview</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[9/16] bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="w-12 h-12 mx-auto mb-3 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p className="text-xs text-[var(--text-muted)]">App Screen {i}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technology Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "React Native", desc: "Cross-platform app development" },
              { name: "Supabase", desc: "Backend & real-time database" },
              { name: "Cursor", desc: "AI-assisted development" },
              { name: "Figma", desc: "Design & prototyping" }
            ].map((tech) => (
              <div key={tech.name} className="bg-[var(--card)] rounded-lg p-4 text-center">
                <p className="font-bold mb-1">{tech.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{tech.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl p-8 md:p-12 mb-20"
        >
          <svg className="w-12 h-12 text-[var(--accent)] mb-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="text-xl md:text-2xl mb-6 leading-relaxed">
            Really impressed with the user experience design and the integration with existing driving school workflows. This could transform how we teach driving.
          </blockquote>
          <div>
            <p className="font-bold">Maria Andersson</p>
            <p className="text-[var(--text-muted)]">Driving Instructor, Skåne</p>
          </div>
        </motion.div>

        {/* Next Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-[var(--border)] pt-12"
        >
          <p className="text-sm text-[var(--text-muted)] mb-2">Next Project</p>
          <Link
            href="/work/qasa"
            className="group inline-flex items-center gap-3 text-2xl font-bold hover:text-[var(--accent)] transition-colors"
          >
            Qasa - Rental Matching Platform
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
