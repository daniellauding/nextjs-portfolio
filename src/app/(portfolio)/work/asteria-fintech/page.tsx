"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AsteriaCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] flex items-end"
        style={{ backgroundColor: "#6366F1" }}
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
              Asteria - Smart Cash Flow
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
              Transformed complex financial tools into intuitive digital products for SMEs, reaching over 400,000 users through partnerships with Swedbank and PayEx.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {["Fintech", "Product Design", "Co-founder", "SaaS", "Banking", "Design Systems", "Figma"].map((tag) => (
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
                <p className="font-medium">Swedbank, PayEx, SMEs</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Duration</p>
                <p className="font-medium">8 years (2017-2025)</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Team</p>
                <p className="font-medium">Co-founder team + partners</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Role</p>
                <p className="font-medium">Co-Founder & Lead Product Designer</p>
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
              Bring advanced cash flow and financial planning tools to SMEs in a way that feels accessible, delightful, and easy to integrate with banking workflows. Small business owners needed simpler, digital cash flow management solutions but were faced with complex financial planning interfaces that required expert knowledge.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Led design from discovery to delivery. Built modular design systems, dashboards, and forecasting interfaces embedded in partner platforms. Created scalable, white-label solutions that served 400,000+ users while maintaining each partner's unique brand identity.
            </p>
          </div>
        </motion.div>

        {/* Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-8">Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <div className="text-3xl font-bold text-[var(--accent)] mb-2">400,000+</div>
              <p className="text-[var(--text-muted)]">Users reached through banking partnerships</p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <div className="text-3xl font-bold text-[var(--accent)] mb-2">8 years</div>
              <p className="text-[var(--text-muted)]">Co-founding and leading product design</p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <div className="text-3xl font-bold text-[var(--accent)] mb-2">3 major</div>
              <p className="text-[var(--text-muted)]">Banking integrations (Swedbank, PayEx)</p>
            </div>
          </div>
        </motion.div>

        {/* Research & Discovery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">SME Research & Discovery</h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-3xl">
            Comprehensive user research with SMEs revealed complex financial planning pain points. Small business owners needed simpler, digital cash flow management solutions that integrated seamlessly with their existing banking relationships.
          </p>
          <div className="bg-[var(--card)] p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Key Research Insights</h3>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>SMEs struggled with cash flow visibility and financial forecasting</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Existing tools were too complex and required financial expertise</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Trust in banking partnerships was crucial for adoption</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Banking Partnership Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Banking Partnership Integration</h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-3xl">
            Designed modular systems for integration with Swedbank and PayEx platforms. Created embedded financial tools that felt native to each partner's ecosystem while maintaining consistent user experience and functionality.
          </p>
          
          <div className="space-y-6">
            <div className="bg-[var(--card)] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Företagskollen - Swedbank</h3>
              <p className="text-[var(--text-muted)] mb-4">
                White-label financial dashboard integrated into Swedbank's online banking platform for 400,000+ business customers. Led product definition, user research, and Design Systems creation.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Design Systems", "Banking Integration", "User Research", "Product Strategy"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Smart Cash Flow - Core Platform</h3>
              <p className="text-[var(--text-muted)] mb-4">
                AI-powered cash flow management platform used by 10,000+ SMEs and multiple banks. Led UX/UI, Design Systems, and product validation from 2017-2025.
              </p>
              <div className="flex flex-wrap gap-2">
                {["AI Features", "Figma", "Dashboard Design", "Forecasting UI"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-3">Invoice Portal - PayEx</h3>
              <p className="text-[var(--text-muted)] mb-4">
                Scalable invoice management portal for SMEs in partnership with PayEx (Swedbank subsidiary). Led UX/UI work and integration with existing tech ecosystem.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Invoice Management", "Integration Design", "Scalable UX"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent)} rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Design Systems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Scalable Design Systems</h2>
          <p className="text-lg text-[var(--text-muted)] mb-8 max-w-3xl">
            Built design systems and dashboard interfaces that served 400,000+ users. Focused on making complex financial data accessible and actionable for non-experts while maintaining flexibility for white-label partnerships.
          </p>
          <div className="bg-[var(--card)] p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Design System Approach</h3>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Modular components that could be themed for different banking partners</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Data visualization patterns that made complex financial forecasts understandable</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Accessibility-first approach ensuring financial tools were inclusive</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Documentation and design tokens that enabled consistent implementation</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent p-8 md:p-12 rounded-2xl">
            <svg className="w-12 h-12 text-[var(--accent)] mb-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              "I've had the pleasure of working with Daniel for over 5 years. Daniel is a great resource and it has been a joy to see how Daniel has developed during our time working together. I highly recommend hiring Daniel."
            </p>
            <div>
              <p className="font-bold">Anders Nordkvist</p>
              <p className="text-[var(--text-muted)]">CEO at Asteria AB</p>
            </div>
          </div>
        </motion.div>

        {/* Key Learnings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6">Key Learnings</h2>
          <div className="space-y-4">
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <h3 className="font-bold mb-2">Building for Trust</h3>
              <p className="text-[var(--text-muted)]">
                In fintech, user trust is paramount. Working within established banking partnerships provided credibility but required meticulous attention to security, privacy, and regulatory compliance in every design decision.
              </p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <h3 className="font-bold mb-2">Scalable White-Label Design</h3>
              <p className="text-[var(--text-muted)]">
                Creating design systems that could be themed for different banking partners while maintaining consistent UX taught me the power of modular, token-based design approaches.
              </p>
            </div>
            <div className="bg-[var(--card)] p-6 rounded-xl">
              <h3 className="font-bold mb-2">Simplifying Complexity</h3>
              <p className="text-[var(--text-muted)]">
                The biggest design challenge was making advanced financial forecasting accessible to non-experts. Success came from progressive disclosure, clear data visualization, and contextual help.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-12 border-t border-[var(--border)]"
        >
          <p className="text-[var(--text-muted)] mb-4">Next Case Study</p>
          <Link
            href="/work/spotify-data-saver"
            className="inline-flex items-center gap-2 text-2xl font-bold hover:text-[var(--accent)] transition-colors"
          >
            Spotify - Data Saver Feature
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
