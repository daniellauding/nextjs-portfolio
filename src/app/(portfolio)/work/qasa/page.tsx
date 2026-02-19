"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function QasaCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] flex items-end"
        style={{ backgroundColor: "#10B981" }}
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
              Qasa - Rental Matching Platform
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
              Led product design within the Match team, making it easier for tenants and landlords to find each other, connect, and sign homes.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {["Product Design", "UX Research", "AI Tools", "Rental Platform", "Figma", "AI Prototyping"].map((tag) => (
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
                <p className="font-medium">Qasa</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Duration</p>
                <p className="font-medium">4 months (May-Aug 2025)</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Team</p>
                <p className="font-medium">Cross-functional with PMs, developers, customer support</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Role</p>
                <p className="font-medium">Senior Product Design Consultant</p>
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
              Improve the Find Tenant flow to reduce friction and increase conversions. Address the complexity of matching and signing workflows for both landlords and tenants. CSAT scores from landlords highlighted significant issues in the listing and tenant discovery process, particularly around image uploads and profile clarity.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Built high-fidelity, brand-consistent prototypes using AI-enhanced design tooling. Introduced full-journey mapping and redesigned flows to scale across the product. Created a custom Lovable prototyping tool integrated with Qasa's design system for rapid concept validation.
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
            Increased usage of Find Tenant tool, improved CSAT scores from landlords (avg. 2.6 to higher scores), positive feedback on image upload improvements and profile clarity.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Improved landlord satisfaction scores</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Streamlined image upload flow</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Created reusable Lovable prototyping tool for Qasa</span>
            </li>
          </ul>
        </motion.div>

        {/* Research & Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Research & Analysis</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            CSAT scores from landlords highlighted issues in listing and tenant discovery. Market benchmarking across Sweden, Finland, and Norway revealed UX gaps in image upload flows. Conducted stakeholder interviews and analyzed user feedback to identify pain points in the tenant-landlord matching process.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Research findings & CSAT analysis</p>
              </div>
            </div>
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Market benchmarking (SE, FI, NO)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI-Enhanced Design Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">AI-Enhanced Design Process</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Led workshops, heuristic audits, and built AI-usable design system components to speed up iteration. Used AI to explore edge cases and accelerate ideation. This approach allowed for rapid prototyping and validation of design concepts with stakeholders.
          </p>
          <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl p-8 md:p-12">
            <h3 className="text-xl font-bold mb-4">Key Process Innovations</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold mb-1">AI-Powered Design System</h4>
                  <p className="text-[var(--text-muted)] text-sm">Built reusable components optimized for AI tools, enabling faster iteration cycles</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold mb-1">Rapid Prototyping Workshops</h4>
                  <p className="text-[var(--text-muted)] text-sm">Cross-functional collaboration sessions to validate concepts quickly</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold mb-1">Edge Case Exploration</h4>
                  <p className="text-[var(--text-muted)] text-sm">Leveraged AI to identify and design for edge cases often missed in traditional workflows</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Lovable Prototyping Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Lovable Prototyping Tool</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Built a custom Lovable prototyping tool for Qasa using their design system and branding. Now part of their toolbox for shaping product bets and validating concepts. This tool enabled rapid concept testing without requiring full development resources.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Lovable tool configuration</p>
              </div>
            </div>
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Interactive prototype showcase</p>
              </div>
            </div>
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
            Daniel stepped in and filled a pair of vacant design-shoes at Qasa during the summer of 2025. As the versatile designer he is - he covered our needs by always delivering multiple alternatives of the UX/UI challenges. Five out of five LinkedIn-stars on Daniel!
          </blockquote>
          <div>
            <p className="font-bold">Fredrik Weinestad</p>
            <p className="text-[var(--text-muted)]">Staff Product Designer at Qasa</p>
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
            href="/work/vromm"
            className="group inline-flex items-center gap-3 text-2xl font-bold hover:text-[var(--accent)] transition-colors"
          >
            Vromm - Driving Instruction App
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
