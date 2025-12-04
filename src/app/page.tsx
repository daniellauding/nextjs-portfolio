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
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import portfolioData from "@/data/portfolio.json";

export default function Home() {
  const { personal, skills, projects, clients, apps, cv } = portfolioData;
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredProjects = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

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
          apps={apps} 
        />
        <Information
          bio={personal.bio}
          tools={personal.tools}
          roles={personal.roles}
          experience={personal.experience}
          keyContributions={cv.keyContributions}
        />
        <Skills skills={skills} activeTag={activeTag} onTagClick={setActiveTag} />
        {/* <Projects projects={filteredProjects} activeTag={activeTag} onTagClick={setActiveTag} /> */}
        <Clients clients={clients} />
        <CV experience={cv.experience} education={cv.education} activeTag={activeTag} />
        <Articles articles={cv.mediumPosts} />
        {/* <Services /> */}
      </main>
      <Footer />
    </>
  );
}
