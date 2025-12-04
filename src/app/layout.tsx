import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Lauding | Design Engineer & Product Designer Available for Hire 2026",
  description: "Freelance Design Engineer & Lead Product Designer with 15+ years experience. Available for hire 2026. Specializing in AI-assisted design, fintech, SaaS, and modern product development. Based in Stockholm, Sweden. Expert in React, TypeScript, Figma, and AI prototyping tools.",
  keywords: [
    "freelance design engineer", "product designer for hire", "design engineer available 2026",
    "freelance UX designer Stockholm", "design consultant Sweden", "product design contractor",
    "AI-powered design", "design engineer freelancer", "hire design engineer",
    "Design Engineer", "Product Design", "UX Design", "UI Design", "AI Prototyping", 
    "Stockholm designer", "Sweden freelancer", "design consultant", "product designer",
    "fintech designer", "SaaS designer", "startup designer", "design systems",
    "React developer designer", "TypeScript designer", "Figma expert",
    "design sprints", "user research", "prototype developer", "frontend designer",
    "available for work", "freelance", "contractor", "consultant", "hire me",
    "design engineer 2026", "product designer 2026", "available 2026"
  ],
  authors: [{ name: "Daniel Lauding" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Daniel Lauding | Design Engineer & Product Designer Available for Hire 2026",
    description: "Freelance Design Engineer with 15+ years experience. Available for hire 2026. Specializing in AI-assisted design, fintech, SaaS. Based in Stockholm, Sweden.",
    type: "website",
    locale: "en_US",
    siteName: "Daniel Lauding Portfolio",
    url: "https://daniellauding.se",
    images: [
      {
        url: "https://daniellauding.se/og-image.png",
        width: 1200,
        height: 630,
        alt: "Daniel Lauding - Design Engineer & Product Designer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Lauding | Design Engineer Available for Hire 2026",
    description: "Freelance Design Engineer & Product Designer. 15+ years experience. Available for hire 2026.",
    creator: "@daniellauding",
    images: ["https://daniellauding.se/og-image.png"],
  },
  alternates: {
    canonical: "https://daniellauding.se",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Daniel Lauding",
    "jobTitle": "Design Engineer & Product Designer",
    "description": "Freelance Design Engineer & Lead Product Designer with 15+ years experience. Available for hire 2026. Specializing in AI-assisted design, fintech, SaaS, and modern product development.",
    "url": "https://daniellauding.se",
    "email": "daniel@lauding.se",
    "telephone": "+46(0) 73 918 44 10",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Stockholm",
      "addressRegion": "Stockholm County", 
      "addressCountry": "Sweden"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Instinctly"
    },
    "knowsAbout": [
      "Design Engineering",
      "Product Design", 
      "UX Design",
      "UI Design",
      "AI Prototyping",
      "React",
      "TypeScript", 
      "Figma",
      "Design Systems",
      "Fintech Design",
      "SaaS Design",
      "Startup Design",
      "User Research",
      "Frontend Development"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Design Engineer",
      "occupationLocation": {
        "@type": "City",
        "name": "Stockholm, Sweden"
      },
      "skills": [
        "Design Engineering",
        "Product Design",
        "AI-assisted Design", 
        "React Development",
        "TypeScript",
        "Figma",
        "Design Systems",
        "User Experience Design",
        "Frontend Development"
      ]
    },
    "seeks": {
      "@type": "JobPosting", 
      "title": "Freelance Design Engineering & Product Design Opportunities",
      "description": "Seeking freelance, consulting, and contract opportunities in design engineering and product design for 2026",
      "employmentType": ["CONTRACTOR", "PART_TIME", "TEMPORARY"],
      "hiringOrganization": {
        "@type": "Person",
        "name": "Daniel Lauding"
      },
      "jobLocation": {
        "@type": "Place",
        "address": "Remote or Stockholm, Sweden"
      }
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "Technigo"
      },
      {
        "@type": "EducationalOrganization", 
        "name": "Malmö University"
      }
    ],
    "foundingDate": "2007",
    "sameAs": [
      "https://www.linkedin.com/in/daniellauding",
      "https://twitter.com/daniellauding",
      "https://dribbble.com/daniellauding",
      "https://github.com/daniellauding"
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta property="og:image" content="https://daniellauding.se/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Daniel Lauding - Design Engineer & Product Designer" />
        <meta property="og:url" content="https://daniellauding.se" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Daniel Lauding | Design Engineer & Product Designer Available for Hire 2026" />
        <meta property="og:description" content="Freelance Design Engineer with 15+ years experience. Available for hire 2026. Specializing in AI-assisted design, fintech, SaaS. Based in Stockholm, Sweden." />
        <meta name="twitter:image" content="https://daniellauding.se/og-image.png" />
        <meta name="google-site-verification" content="your-verification-code" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="availability" content="available" />
        <meta name="hiring-status" content="available-2026" />
        <meta name="location" content="Stockholm, Sweden" />
        <meta name="remote-work" content="yes" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
