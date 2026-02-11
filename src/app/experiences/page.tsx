"use client";

import { useState } from "react";
import experiencesData from "@/data/experiences.json";

interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  type: string;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  schoolUrl?: string;
  period: string;
  startDate: string;
  endDate: string;
  type: string;
  description: string;
}

export default function ExperiencesPage() {
  const experiences = experiencesData.experiences as Experience[];
  const education = experiencesData.education as Education[];

  // Get year from period (e.g., "2025 – Present" -> "2025—")
  const getYearLabel = (item: Experience | Education) => {
    const startYear = new Date(item.startDate).getFullYear();
    const endYear = item.endDate ? new Date(item.endDate).getFullYear() : null;
    
    if (item.type === "work" && (item as Experience).current) {
      return `${startYear}—`;
    }
    if (endYear && endYear !== startYear) {
      return `${startYear}—${endYear}`;
    }
    return `${startYear}`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-[var(--foreground)] text-3xl md:text-4xl font-light mb-4">
            Experiences
          </h1>
        </div>

        {/* Work Experience */}
        <div className="mb-20">
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex gap-8 md:gap-12">
                {/* Year */}
                <div className="flex-shrink-0 w-20 md:w-24 pt-1">
                  <span className="text-[var(--text-muted)] text-sm">
                    {getYearLabel(exp)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Company */}
                  <h3 className="text-lg md:text-xl mb-1">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      <span className="text-[var(--foreground)]">{exp.company}</span>
                    )}
                  </h3>

                  {/* Role */}
                  <p className="text-[var(--text-muted)] text-sm md:text-base mb-3">
                    {exp.role}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl md:text-3xl font-light text-[var(--foreground)] mb-12">
            Education
          </h2>
          <div className="space-y-12">
            {education.map((edu) => (
              <div key={edu.id} className="flex gap-8 md:gap-12">
                {/* Year */}
                <div className="flex-shrink-0 w-20 md:w-24 pt-1">
                  <span className="text-[var(--text-muted)] text-sm">
                    {getYearLabel(edu)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* School */}
                  <h3 className="text-lg md:text-xl mb-1">
                    {edu.schoolUrl ? (
                      <a
                        href={edu.schoolUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                      >
                        {edu.school}
                      </a>
                    ) : (
                      <span className="text-[var(--foreground)]">{edu.school}</span>
                    )}
                  </h3>

                  {/* Degree */}
                  <p className="text-[var(--text-muted)] text-sm md:text-base mb-3">
                    {edu.degree}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
