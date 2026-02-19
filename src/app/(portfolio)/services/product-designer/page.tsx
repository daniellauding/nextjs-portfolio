"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import portfolioData from "../../../data/portfolio.json";

const featuredProjects = [
  {
    slug: "vromm-driving-app",
    highlight: "Solo-founded with 400k+ user research insights"
  },
  {
    slug: "qasa-rental-platform", 
    highlight: "Improved CSAT scores and tenant-landlord matching flows"
  },
  {
    slug: "asteria-fintech",
    highlight: "400,000+ users through Swedbank partnership"
  },
  {
    slug: "spotify-data-saver",
    highlight: "Field research in Brazilian favelas"
  }
];

const skills = [
  "User Research & Testing",
  "Information Architecture", 
  "Wireframing & Prototyping",
  "Design Systems",
  "A/B Testing & Analytics",
  "Heuristic Evaluation",
  "Journey Mapping",
  "Workshop Facilitation",
  "Stakeholder Collaboration",
  "Figma & AI Prototyping"
];

const testimonials = [
  {
    quote: "I've had the pleasure of working with Daniel for over 5 years. Daniel is a great resource and it has been a joy to see how Daniel has developed during our time working together. I highly recommend hiring Daniel.",
    author: "Anders Nordkvist",
    role: "CEO at Asteria AB",
    company: "Asteria"
  },
  {
    quote: "Daniel stepped in and filled a pair of vacant design-shoes at Qasa during the summer of 2025. As the versatile designer he is - he covered our needs by always delivering multiple alternatives of the UX/UI challenges.",
    author: "Fredrik Weinestad", 
    role: "Staff Product Designer",
    company: "Qasa"
  }
];

export default function ProductDesignerPage() {
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
                Product Designer
              </h1>
              <p className="text-xl text-[var(--text-muted)] mb-8 leading-relaxed">
                Transform complex problems into elegant, user-centered solutions. From research to pixel-perfect delivery, I help create products that genuinely serve user needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services/request?role=product-designer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Start Project
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="mailto:daniel@lauding.se?subject=Product Design Inquiry"
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
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-8xl">
                🎨
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What I Do</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              15+ years of transforming ideas into user-centered products across startups, fintech, and enterprise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center text-3xl">
                🔍
              </div>
              <h3 className="text-xl font-bold mb-4">Research & Strategy</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                User interviews, field research, competitive analysis, and strategic planning to uncover genuine user needs and business opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center text-3xl">
                ✏️
              </div>
              <h3 className="text-xl font-bold mb-4">Design & Prototyping</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                From wireframes to high-fidelity prototypes, creating user experiences that balance usability, aesthetics, and business goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center text-3xl">
                📊
              </div>
              <h3 className="text-xl font-bold mb-4">Testing & Iteration</h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                User testing, A/B experiments, and data-driven iterations to continuously improve product experiences and conversion rates.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Core Skills</h2>
            <p className="text-lg text-[var(--text-muted)]">
              The tools and methodologies I use to deliver exceptional product design
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
                className="px-4 py-3 bg-[var(--card)] rounded-xl text-sm font-medium text-center hover:bg-[var(--accent)]/10 transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-6 md:px-12 py-24 bg-[var(--card)]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
              Product design work that reached hundreds of thousands of users
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project, index) => {
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
                    <div className="bg-[var(--background)] rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
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
                      
                      <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
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
                            className="px-3 py-1 text-xs bg-[var(--card)] rounded-full text-[var(--text-muted)]"
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-[var(--accent)] font-medium hover:gap-3 transition-all"
            >
              View All Projects
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">What Clients Say</h2>
            <p className="text-lg text-[var(--text-muted)]">
              Feedback from CEOs, design directors, and product teams
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
                className="bg-[var(--card)] rounded-2xl p-8"
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
      <section className="px-6 md:px-12 py-24 bg-gradient-to-r from-[var(--accent)]/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start your product design project?
            </h2>
            <p className="text-xl text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
              Let's discuss your users, goals, and how thoughtful design can drive your business forward.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/services/request?role=product-designer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Start Project Request
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="mailto:daniel@lauding.se?subject=Product Design Inquiry"
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