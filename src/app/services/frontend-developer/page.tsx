"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import portfolioData from "../../../data/portfolio.json";

const frontendProjects = [
  {
    name: "Energiforsk - Energieffektiv webb",
    description: "Frontend development consultant for Sweden's most energy-efficient website, achieving 75% lighter page loads than previous site. Built with Next.js and headless CMS using code splitting and minification.",
    tags: ["HTML5", "CSS3", "Storybook", "Next.js", "Sustainability", "Performance"],
    year: "2025",
    highlight: "75% performance improvement over previous site"
  },
  {
    name: "Gavlegårdarna - Housing Platform",
    description: "Frontend development for Sweden's largest public housing company serving 30,000 residents. Built Vue.js frontend with WordPress backend, featuring apartment search with advanced filtering.",
    tags: ["HTML5", "CSS3", "Vue.js", "WordPress", "WCAG AA", "Real Estate"],
    year: "2025", 
    highlight: "WCAG AA compliance for 30,000+ residents"
  },
  {
    name: "Edenred - Benefits Platform", 
    description: "Frontend development for unified lunch and wellness benefits platform. Migrated from Episerver to WordPress, integrated Google APIs, and built responsive Vue.js components.",
    tags: ["HTML5", "CSS3", "Vue.js", "WordPress", "Google APIs", "Platform Migration"],
    year: "2025",
    highlight: "Successful platform migration with zero downtime"
  }
];

const technologies = [
  {
    category: "Core",
    skills: ["HTML5", "CSS3", "JavaScript ES6+", "TypeScript"]
  },
  {
    category: "Frameworks",
    skills: ["React", "Vue.js", "Next.js", "React Native"]
  },
  {
    category: "Styling",
    skills: ["Tailwind CSS", "Bootstrap", "Styled Components", "LESS/SASS"]
  },
  {
    category: "Tools",
    skills: ["Storybook", "Vite", "Git/GitHub", "Node.js"]
  }
];

const achievements = [
  {
    title: "Performance Optimization",
    description: "Sweden's most energy-efficient website with 75% improved performance",
    icon: "⚡"
  },
  {
    title: "Accessibility Excellence", 
    description: "WCAG AA compliance across multiple large-scale projects",
    icon: "♿"
  },
  {
    title: "Cross-browser Expertise",
    description: "From IE6 compatibility to modern AI-assisted workflows",
    icon: "🌐"
  },
  {
    title: "AI-Enhanced Development",
    description: "Leveraging modern AI tools for faster, better code",
    icon: "🤖"
  }
];

const testimonials = [
  {
    quote: "Daniel is a great front end programmer since he always get things done in a swift and effective way, and at the same time pays a lot of attention to details.",
    author: "Simon Källgård",
    role: "Digital UX Director",
    company: "IKEA Projects"
  }
];

export default function FrontendDeveloperPage() {
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
                Frontend Developer
              </h1>
              <p className="text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
                Create fast, accessible, and maintainable frontend applications using modern technologies and best practices. From IE6 to modern AI workflows.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services/request?role=frontend-developer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Start Project
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="mailto:daniel@lauding.se?subject=Frontend Development Inquiry"
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
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-8xl">
                💻
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bio Section */}
      <section className="px-6 md:px-12 py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">15+ Years of Frontend Evolution</h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                Daniel started making websites as a kid, driven by curiosity, tutorials, gaming communities, and a love for building things. He created team sites, tweaked graphics, and constantly rebuilt his own corner of the internet with every new trend or effect he discovered.
              </p>
              <p>
                That early curiosity carried him into product design, startups, and exploring every new wave of technology. From pixel-perfect IE6 implementations to modern React development, he has always been drawn to the mix of creativity, interactivity, and the ability to shape something people actually use.
              </p>
              <p>
                Today, Daniel is leveraging AI to prototype faster, solve problems smarter, and push his development craft further — ultimately building more efficient and meaningful experiences that genuinely help people.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">What I Bring</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Real-world experience solving complex frontend challenges across industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-[var(--card)] rounded-2xl"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-3xl">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="px-6 md:px-12 py-16 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Technologies & Tools</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Modern tools combined with proven technologies for robust, scalable applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--background)] rounded-xl p-6"
              >
                <h3 className="text-lg font-bold mb-4 text-[var(--accent)]">{tech.category}</h3>
                <div className="space-y-2">
                  {tech.skills.map((skill) => (
                    <div key={skill} className="text-sm text-[var(--text-muted)]">
                      {skill}
                    </div>
                  ))}
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Recent Frontend Work</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Frontend development projects showcasing modern technologies and best practices
            </p>
          </motion.div>

          <div className="space-y-8">
            {frontendProjects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[var(--card)] rounded-2xl p-8 hover:shadow-lg transition-all"
              >
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <span className="text-sm text-[var(--accent)] font-medium">{project.year}</span>
                    </div>
                    
                    <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <p className="text-sm font-medium text-[var(--accent)] mb-4">
                      {project.highlight}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-[var(--background)] rounded-full text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent)]/5 flex items-center justify-center">
                      <div className="text-4xl">🌐</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 md:px-12 py-16 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-12">Client Testimonial</h2>
            
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[var(--background)] rounded-2xl p-8">
                <blockquote className="text-xl leading-relaxed mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-bold text-lg">{testimonial.author}</div>
                  <div className="text-[var(--text-muted)]">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
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
              Need a reliable frontend developer?
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              From performance optimization to accessibility compliance, I deliver frontend solutions that scale with your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/request?role=frontend-developer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Start Project Request
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:daniel@lauding.se?subject=Frontend Development Inquiry"
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