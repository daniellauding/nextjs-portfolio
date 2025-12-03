"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface FormData {
  service: string;
  pricing: string;
  projectTitle: string;
  projectDescription: string;
  contactName: string;
  email: string;
  businessType: string;
  location: string;
  hasMaterials: boolean;
  additionalNotes: string;
}

const serviceOptions = [
  { id: "freelance", name: "Freelance Projects", pricing: ["Small Project - 25,000 SEK (2-4 weeks)", "Large Project - 75,000 SEK (6-12 weeks)"] },
  { id: "consultant", name: "Consultant", pricing: ["Part-time - 8,000 SEK/day", "Weekly - 35,000 SEK/week"] },
  { id: "fulltime", name: "Full-time", pricing: ["Monthly - 85,000 SEK/month", "+ Benefits - 100,000 SEK/month"] }
];

function RequestForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>({
    service: "",
    pricing: "",
    projectTitle: "",
    projectDescription: "",
    contactName: "",
    email: "",
    businessType: "Company",
    location: "",
    hasMaterials: false,
    additionalNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (serviceParam) {
      setFormData(prev => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const selectedServiceOptions = serviceOptions.find(s => s.id === formData.service);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-4">Request Submitted!</h1>
          <p className="text-lg text-[var(--text-muted)] mb-8">
            Thank you for your project request. I'll review the details and get back to you within 24 hours with a custom proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="px-6 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:border-[var(--accent)] transition-colors"
            >
              Back to Services
            </Link>
            <Link
              href="/"
              className="px-6 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Services
          </Link>

          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Request</h1>
            <p className="text-lg text-[var(--text-muted)]">
              Tell me about your project and let's create something amazing together.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Service Selection */}
            <div className="bg-[var(--card)] rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Step 1: Select Service</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Service Type</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  >
                    <option value="">Choose a service...</option>
                    {serviceOptions.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedServiceOptions && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Pricing Option</label>
                    <div className="space-y-2">
                      {selectedServiceOptions.pricing.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-4 border border-[var(--border)] rounded-lg hover:border-[var(--accent)] cursor-pointer transition-colors">
                          <input
                            type="radio"
                            name="pricing"
                            value={option}
                            checked={formData.pricing === option}
                            onChange={handleInputChange}
                            className="text-[var(--accent)]"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-[var(--card)] rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Step 2: Project Description</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Project Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., 'New website for our store'"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    placeholder="What do you want to achieve? What are your goals for this project?"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Business Type</label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  >
                    <option value="Company">Company</option>
                    <option value="Startup">Startup</option>
                    <option value="Agency">Agency</option>
                    <option value="Individual">Individual</option>
                    <option value="Non-profit">Non-profit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location (if relevant)
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., 'Stockholm' or 'Remote'"
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="hasMaterials"
                      checked={formData.hasMaterials}
                      onChange={handleInputChange}
                      className="text-[var(--accent)]"
                    />
                    <span>I have materials (images, text, etc.) that I want to share</span>
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleInputChange}
                    placeholder="Any additional information or specific requirements..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--background)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Link
                href="/services"
                className="px-8 py-3 border border-[var(--border)] text-[var(--foreground)] rounded-lg hover:border-[var(--accent)] transition-colors text-center"
              >
                Back
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !formData.projectTitle || !formData.contactName || !formData.email}
                className="px-8 py-3 bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 4v4m4-8h-4m-4 0H4" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)]" />
      </div>
    }>
      <RequestForm />
    </Suspense>
  );
}