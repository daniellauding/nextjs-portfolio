"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SpotifyDataSaverCaseStudy() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[60vh] md:h-[70vh] flex items-end"
        style={{ backgroundColor: "#1DB954" }}
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
              href="/work"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Work
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Spotify - Data Saver Feature
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-3xl">
              Designed a low-data music streaming experience for users in emerging markets like Brazil, conducting field research in favelas to understand real barriers to music streaming.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-8">
              {["Mobile Design", "Emerging Markets", "User Research", "Music Tech", "Field Research", "A/B Testing"].map((tag) => (
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
                <p className="font-medium">Spotify</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Duration</p>
                <p className="font-medium">4 months (Mar-Jun 2017)</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Team</p>
                <p className="font-medium">Product owners, developers in Stockholm</p>
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
              Make Spotify usable in low-bandwidth areas and increase adoption in favelas and other regions with data limitations. High data costs were a major barrier to adoption in emerging markets, preventing millions of potential users from enjoying music streaming. Users felt anxious about streaming on mobile networks, worried about burning through their data allowance.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Designed and tested a 'Data Saver' theme that streamed music with just 1% of the normal data use. Conducted field interviews and user testing on-site in Brazil to deeply understand the real-world constraints and behaviors. The feature let users play four on-demand playlists with minimal data consumption, making streaming feel safer and more accessible even without Wi-Fi.
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
            Successfully launched feature with increased adoption in target markets and measurable improvements in retention. After nail-biting A/B tests, the Data Saver feature stood out as a game-changer, making streaming on Spotify feel a whole lot safer and more accessible.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">99% reduction in data usage (1% of normal consumption)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Increased adoption in emerging markets like Brazil</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Improved user confidence in mobile streaming</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--text-muted)]">Validated through rigorous A/B testing</span>
            </li>
          </ul>
        </motion.div>

        {/* Field Research in Brazil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Field Research in Brazil</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Conducted field interviews and user testing on-site in Brazil, including visits to favelas to understand the real barriers caused by high data costs. This immersive research revealed how data anxiety prevented users from enjoying music streaming, and informed every design decision in the Data Saver feature. Understanding the context—limited budgets, expensive data plans, and unreliable Wi-Fi access—was crucial to creating a solution that truly served users' needs.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">On-site research in Brazilian favelas</p>
              </div>
            </div>
            <div className="aspect-video bg-[var(--card)] rounded-xl overflow-hidden flex items-center justify-center">
              <div className="text-center p-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-[var(--text-muted)]">Understanding data cost barriers</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Saver Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">Data Saver Design</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            Designed a feature that let users play four on-demand playlists with just 1% of their data. Created intuitive UI that made data usage transparent and controllable, giving users confidence to stream even when not connected to Wi-Fi. The design balanced audio quality with data efficiency, ensuring users still enjoyed their music while dramatically reducing data consumption.
          </p>
          <div className="bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl p-8 md:p-12">
            <h3 className="text-xl font-bold mb-4">Key Design Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-bold mb-1">Ultra-Low Data Streaming</h4>
                  <p className="text-[var(--text-muted)] text-sm">Reduced streaming data to just 1% of normal usage through intelligent compression and quality optimization</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-bold mb-1">Transparent Data Controls</h4>
                  <p className="text-[var(--text-muted)] text-sm">Clear UI showing data usage and giving users full control over when to enable data saving mode</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-bold mb-1">On-Demand Playlists Access</h4>
                  <p className="text-[var(--text-muted)] text-sm">Curated selection of four on-demand playlists optimized for the Data Saver experience</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* A/B Testing & Launch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">A/B Testing & Launch</h2>
          <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
            After nail-biting A/B tests, the Data Saver feature stood out as a game-changer. The feature was rigorously tested across different user segments in emerging markets to validate its impact on adoption and retention. Made streaming feel safer and more accessible even without Wi-Fi, fundamentally changing how users in data-constrained environments could enjoy Spotify.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[var(--card)] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2">99%</div>
              <p className="text-sm text-[var(--text-muted)]">Data reduction</p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2">4</div>
              <p className="text-sm text-[var(--text-muted)]">On-demand playlists</p>
            </div>
            <div className="bg-[var(--card)] rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-[var(--accent)] mb-2">✓</div>
              <p className="text-sm text-[var(--text-muted)]">A/B test success</p>
            </div>
          </div>
        </motion.div>

        {/* User Experience Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold mb-6">User Experience Impact</h2>
          <p className="text-[var(--text-muted)] mb-6 leading-relaxed">
            The Data Saver feature fundamentally changed the relationship between users and music streaming in emerging markets. By removing data anxiety, we enabled millions of users to confidently enjoy Spotify on the move, transforming it from a Wi-Fi-only luxury to an everyday companion.
          </p>
          <div className="bg-gradient-to-br from-[#1DB954]/10 to-transparent rounded-2xl p-8 md:p-12">
            <blockquote className="text-lg italic mb-4">
              "Users felt confident using Spotify while on the move. It was a game-changer, making streaming on Spotify feel a whole lot safer and more accessible, even when Wi-Fi was out of reach."
            </blockquote>
            <p className="text-sm text-[var(--text-muted)]">— Internal User Research, Spotify Brazil Team</p>
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
            Users felt confident using Spotify while on the move. It was a game-changer, making streaming on Spotify feel a whole lot safer and more accessible, even when Wi-Fi was out of reach.
          </blockquote>
          <div>
            <p className="font-bold">Internal User Research</p>
            <p className="text-[var(--text-muted)]">Spotify Brazil Team</p>
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
            href="/work/vromm-driving-app"
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
