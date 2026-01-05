"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ServiceOption {
  id: string;
  name: string;
  description: string;
  pricing: {
    basic: { name: string; price: string; period: string };
    premium: { name: string; price: string; period: string };
  };
  features: string[];
}

const services: ServiceOption[] = [
  {
    id: "freelance",
    name: "Freelance Projects",
    description: "Fixed scope work with clear deliverables",
    pricing: {
      basic: { name: "Small Project", price: "25,000 SEK", period: "2-4 weeks" },
      premium: { name: "Large Project", price: "75,000 SEK", period: "6-12 weeks" }
    },
    features: [
      "Complete project delivery",
      "UX/UI design & development", 
      "Design systems & documentation",
      "2-3 iterations included"
    ]
  },
  {
    id: "consultant",
    name: "Consultant",
    description: "Ongoing collaboration as part of your team",
    pricing: {
      basic: { name: "Part-time", price: "8,000 SEK", period: "per day" },
      premium: { name: "Weekly", price: "35,000 SEK", period: "per week" }
    },
    features: [
      "Integrated team member",
      "Design, strategy & development",
      "Flexible scope & scheduling",
      "Long-term partnership"
    ]
  },
  {
    id: "fulltime",
    name: "Full-time",
    description: "Dedicated full-time design & development",
    pricing: {
      basic: { name: "Monthly", price: "85,000 SEK", period: "per month" },
      premium: { name: "+ Benefits", price: "100,000 SEK", period: "per month" }
    },
    features: [
      "40h/week commitment",
      "Complete ownership of projects",
      "Strategic planning & execution",
      "Leadership & mentoring"
    ]
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPricing, setSelectedPricing] = useState<string>("basic");

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
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Services & Pricing
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl mb-12">
              Three ways to work together — freelance projects, consultant, or full-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Role-specific Services Section */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore Services by Role
            </h2>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              Learn more about specific expertise areas and how I can help in different capacities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link href="/services/product-designer" className="group block">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    Product Designer
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">
                    User research, design systems, and user-centered solutions
                  </p>
                  <span className="text-sm font-medium text-[var(--accent)]">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/services/design-engineering" className="group block">
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    Design Engineering
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">
                    Bridging design and code with scalable component systems
                  </p>
                  <span className="text-sm font-medium text-[var(--accent)]">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/services/frontend-developer" className="group block">
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-6 hover:shadow-lg transition-all group-hover:scale-[1.02]">
                  <div className="text-4xl mb-4">💻</div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                    Frontend Developer
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm mb-4">
                    Fast, accessible applications with modern technologies
                  </p>
                  <span className="text-sm font-medium text-[var(--accent)]">
                    Learn more →
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          <div className="text-center">
            <Link 
              href="/services/roles"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card)] rounded-xl font-medium hover:bg-[var(--accent)]/10 transition-colors"
            >
              View All Role Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div 
                  className={`relative bg-[var(--card)] rounded-2xl p-8 transition-all duration-300 cursor-pointer border-2 ${
                    selectedService === service.id 
                      ? 'border-[var(--accent)] shadow-xl' 
                      : 'border-transparent hover:border-[var(--accent)]/30'
                  }`}
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                  <p className="text-[var(--text-muted)] mb-6">{service.description}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center p-3 bg-[var(--background)] rounded-lg">
                      <span className="font-medium">{service.pricing.basic.name}</span>
                      <div className="text-right">
                        <span className="font-bold text-[var(--accent)]">{service.pricing.basic.price}</span>
                        <span className="text-sm text-[var(--text-muted)] block">{service.pricing.basic.period}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[var(--accent)]/10 rounded-lg">
                      <span className="font-medium">{service.pricing.premium.name}</span>
                      <div className="text-right">
                        <span className="font-bold text-[var(--accent)]">{service.pricing.premium.price}</span>
                        <span className="text-sm text-[var(--text-muted)] block">{service.pricing.premium.period}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <svg className="w-4 h-4 text-[var(--accent)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[var(--text-muted)]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      selectedService === service.id
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)] hover:text-white'
                    }`}
                  >
                    {selectedService === service.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Service Details */}
          <AnimatePresence>
            {selectedService && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-12 p-8 bg-gradient-to-br from-[var(--accent)]/10 to-transparent rounded-2xl"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">
                    {services.find(s => s.id === selectedService)?.name}
                  </h3>
                  <p className="text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
                    Ready to get started? Let's discuss your project and create a custom proposal.
                  </p>
                  
                  <Link
                    href={`/services/request?service=${selectedService}`}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                  >
                    Start Project Request
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* General CTA */}
          {!selectedService && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Not sure which service fits your needs?</h3>
              <p className="text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
                Let's have a conversation about your project goals and find the perfect collaboration approach.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/services/request"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  Start General Request
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="mailto:hello@instinctly.se"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--foreground)] rounded-xl font-medium hover:border-[var(--accent)] transition-colors"
                >
                  Email Directly
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}