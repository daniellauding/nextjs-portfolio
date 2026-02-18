"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import portfolioData from "../../../data/portfolio.json";

const featuredProjects = [
  {
    slug: "vromm-driving-app",
    highlight: "Solo-developed React Native app using AI-assisted workflows"
  },
  {
    slug: "qasa-rental-platform", 
    highlight: "Built AI-enhanced prototyping tools using Lovable and Figma"
  },
  {
    slug: "asteria-fintech",
    highlight: "Scalable design systems serving 400,000+ users"
  }
];

const skills = [
  "React & React Native",
  "Design Systems",
  "Component Libraries", 
  "Storybook",
  "AI-Assisted Development",
  "Figma to Code",
  "Cursor & Lovable",
  "TypeScript",
  "Tailwind CSS",
  "Performance Optimization"
];

const tools = [
  {
    name: "Design to Code",
    description: "Pixel-perfect implementations from Figma designs",
    icon: "🎨→💻"
  },
  {
    name: "AI Prototyping",
    description: "Rapid prototyping using Claude, ChatGPT, and Cursor",
    icon: "🤖"
  },
  {
    name: "Component Systems",
    description: "Scalable, maintainable component architectures",
    icon: "🧩"
  }
];

const testimonials = [
  {
    quote: "Daniel designs, speak/write code and think systems so for me being Staff it was a smooth run. Five out of five LinkedIn-stars on Daniel!",
    author: "Fredrik Weinestad",
    role: "Staff Product Designer",
    company: "Qasa"
  },
  {
    quote: "I highly recommend Daniel! He helped us iterate design, prototype and test really fast. Daniel is at the cutting edge by combining a design, user experience understanding, using AI coding - and being able to code himself!",
    author: "Fredrik Eklöf", 
    role: "CEO & Founder",
    company: "Emotional Fitness Sweden"
  }
];

export default function DesignEngineeringPage() {
  const projects = portfolioData.projects.filter(p => 
    featuredProjects.some(fp => fp.slug === p.slug)
  );

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
            href="/services/roles"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Design Engineering
              </h1>
              <p className="text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
                Bridge the gap between design and development with pixel-perfect implementations, scalable component systems, and AI-enhanced workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services/request?role=design-engineering"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Start Project
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="mailto:daniel@lauding.se?subject=Design Engineering Inquiry"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-medium hover:border-[var(--accent)] transition-colors"
                >
                  Discuss Project
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-8xl">
                ⚡
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* What I Do */}
      <section className="px-6 md:px-12 py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Perfect Bridge</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Where design meets code. I bring designs to life with pixel-perfect implementations and scalable systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center text-3xl">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{tool.name}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">My Approach</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Combining 15+ years of development experience with modern AI-assisted workflows
            </p>
          </motion.div>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Design Systems First</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                  Every project starts with scalable component systems. I build reusable, maintainable code that grows with your product and team needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Storybook component libraries
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Design tokens & theming
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Cross-platform consistency
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 flex items-center justify-center">
                  <div className="text-4xl">📐</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              <div className="md:order-2">
                <h3 className="text-2xl font-bold mb-4">AI-Enhanced Development</h3>
                <p className="text-[var(--text-muted)] leading-relaxed mb-6">
                  Leveraging modern AI tools to accelerate development cycles while maintaining high quality and pixel-perfect implementations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Cursor AI for rapid prototyping
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Lovable for design system integration
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--accent)]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    60-70% faster delivery cycles
                  </li>
                </ul>
              </div>
              <div className="relative md:order-1">
                <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 flex items-center justify-center">
                  <div className="text-4xl">🚀</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-12 py-16 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <p className="text-lg text-[var(--text-muted)]">
              The technologies and tools I use to bring designs to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-3 bg-[var(--background)] rounded-xl text-sm font-medium text-center hover:bg-[var(--accent)]/10 transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Work</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Design engineering projects that combine beautiful design with solid technical execution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const projectHighlight = featuredProjects.find(fp => fp.slug === project.slug);
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/projects/${project.slug}`} className="block">
                    <div className="bg-[var(--card)] rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
                      <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 mb-6 flex items-center justify-center">
                        <Image
                          src={project.image}
                          alt={project.name}
                          width={400}
                          height={240}
                          className="rounded-xl object-cover w-full h-full"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                        {project.name}
                      </h3>
                      
                      <p className="text-[var(--text-muted)] mb-4 leading-relaxed text-sm">
                        {project.description}
                      </p>

                      {projectHighlight && (
                        <p className="text-sm font-medium text-[var(--accent)] mb-4">
                          {projectHighlight.highlight}
                        </p>
                      )}

                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-[var(--background)] rounded-full text-[var(--text-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-16 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Client Feedback</h2>
            <p className="text-lg text-[var(--text-muted)]">
              What teams say about working with a design engineer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--background)] rounded-2xl p-8"
              >
                <blockquote className="text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-[var(--text-muted)] text-sm">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-16 bg-gradient-to-r from-[var(--accent)]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need a design engineer for your team?
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Bridge the gap between design and development with scalable systems and AI-enhanced workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/request?role=design-engineering"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Start Project Request
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:daniel@lauding.se?subject=Design Engineering Inquiry"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-medium hover:border-[var(--accent)] transition-colors"
              >
                Email Directly
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}