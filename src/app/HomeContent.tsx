"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Information from "@/components/Information";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import CV from "@/components/CV";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";

interface HomeContentProps {
  data: {
    personal: {
      firstName: string;
      lastName: string;
      title?: string;
      subtitle?: string;
      status?: string;
      bio: string;
      tools: string[];
      roles?: string[];
      experience: string;
    };
    skills: string[];
    projects: Array<{
      id: string;
      slug: string;
      name: string;
      type: string;
      date: string;
      location: string;
      description: string;
      tags: string[];
      image: string;
      color: string;
      featured?: boolean;
    }>;
    clients: Array<{ id: string; name: string; url?: string | null }>;
    apps: Array<{
      id: string;
      slug: string;
      name: string;
      description: string;
      highlightLogo: string;
      highlightUrl: string | null;
      tags: string[];
    }>;
    cv: {
      experience: Array<{
        title: string;
        company: string;
        companyUrl?: string;
        period: string;
        description: string;
        projects?: string[];
        recommendations?: Array<{ quote: string; author: string; role: string; date?: string }>;
      }>;
      education: Array<{
        degree: string;
        school: string;
        schoolUrl?: string;
        year: string;
      }>;
      mediumPosts: unknown[];
      keyContributions?: string[];
    };
  };
}

export default function HomeContent({ data }: HomeContentProps) {
  const { personal, skills, projects, clients, apps, cv } = data;
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Only show featured projects
  const featuredProjects = projects.filter((p) => p.featured);

  const filteredProjects = activeTag
    ? featuredProjects.filter((p) => p.tags.includes(activeTag))
    : featuredProjects;

  const filteredApps = activeTag
    ? apps.filter((a) => a.tags.includes(activeTag))
    : apps;

  return (
    <>
      <Navigation />
      <main>
        <Hero
          firstName={personal.firstName}
          lastName={personal.lastName}
          title={personal.title}
          subtitle={personal.subtitle}
          status={personal.status}
          apps={filteredApps as Parameters<typeof Hero>[0]["apps"]}
        />
        <Information
          bio={personal.bio}
          tools={personal.tools}
          roles={personal.roles}
          experience={personal.experience}
          keyContributions={cv.keyContributions}
        />
        <Skills skills={skills} activeTag={activeTag} onTagClick={setActiveTag} />
        <Projects projects={filteredProjects} activeTag={activeTag} onTagClick={setActiveTag} />
        <Clients clients={clients.map(c => ({ ...c, url: c.url ?? undefined }))} />
        <CV experience={cv.experience as Parameters<typeof CV>[0]["experience"]} education={cv.education} activeTag={activeTag} />
        <Articles articles={cv.mediumPosts as Parameters<typeof Articles>[0]["articles"]} />
      </main>
      <Footer />
    </>
  );
}
