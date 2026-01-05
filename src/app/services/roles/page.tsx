"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "product-designer",
    title: "Product Designer",
    subtitle: "From concept to pixel-perfect reality",
    description: "Transform complex problems into elegant, user-centered solutions through research, strategy, and thoughtful design.",
    href: "/services/product-designer",
    color: "from-blue-500/20 to-purple-500/20",
    features: ["User Research", "Design Systems", "Prototyping", "A/B Testing"],
    stats: "400,000+ users reached through partnerships"
  },
  {
    id: "design-engineering", 
    title: "Design Engineering",
    subtitle: "Where design meets code",
    description: "Bridge the gap between design and development with pixel-perfect implementations and scalable component systems.",
    href: "/services/design-engineering",
    color: "from-green-500/20 to-blue-500/20",
    features: ["Component Libraries", "Design Systems", "Prototyping", "AI-Assisted Development"],
    stats: "15+ years bridging design and code"
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer", 
    subtitle: "Building experiences that perform",
    description: "Create fast, accessible, and maintainable frontend applications using modern technologies and best practices.",
    href: "/services/frontend-developer",
    color: "from-orange-500/20 to-red-500/20", 
    features: ["React/Vue.js", "TypeScript", "Performance", "Accessibility"],
    stats: "From IE6 to modern AI workflows"
  }
];

export default function ServicesRolesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-24 pb-16 px-6 md:px-12"
      >
        <div className="max-w-6xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Services & Expertise
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto mb-16">
              Three specialized roles, one versatile professional. Choose the expertise that matches your project needs.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <Link href={service.href} className="block">
                  <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${service.color} p-0.5 hover:shadow-xl transition-all duration-500 group-hover:scale-[1.02]`}>
                    <div className="bg-[var(--card)] rounded-3xl p-8 md:p-12 h-full">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                              {service.title}
                            </h2>
                            <p className="text-lg text-[var(--accent)] font-medium">
                              {service.subtitle}
                            </p>
                          </div>
                          
                          <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-2 gap-3">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                                <span className="text-[var(--text-muted)]">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-[var(--accent)]">
                              {service.stats}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-[var(--accent)]/50 to-transparent" />
                          </div>

                          <div className="flex items-center gap-2 text-[var(--accent)] font-medium group-hover:gap-3 transition-all">
                            Learn more about {service.title}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </div>
                        </div>

                        <div className="relative">
                          <div className="aspect-square rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-transparent flex items-center justify-center">
                            <div className="text-6xl font-bold text-[var(--accent)]/30">
                              {service.id === "product-designer" && "🎨"}
                              {service.id === "design-engineering" && "⚡"}
                              {service.id === "frontend-developer" && "💻"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[var(--accent)]/10 to-transparent"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need a combination of services?
            </h3>
            <p className="text-lg text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Many projects benefit from a hybrid approach. Let's discuss how to combine my expertise for your specific needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/request"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Start Project Discussion
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:daniel@lauding.se"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-medium hover:border-[var(--accent)] transition-colors"
              >
                Email Directly
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}