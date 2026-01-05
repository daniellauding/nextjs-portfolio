"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    mouseTimeout?: NodeJS.Timeout;
    hoverTimeout?: NodeJS.Timeout;
  }
}

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
  appStoreUrl: string | null;
  tags: string[];
}

interface HeroProps {
  firstName: string;
  lastName: string;
  title?: string;
  subtitle?: string;
  status?: string;
  apps?: App[];
}

export default function Hero({ firstName, lastName, title, subtitle, status, apps = [] }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [whispPosition, setWhispPosition] = useState({ x: 0, y: 0 });
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(true);
  const [autonomousTarget, setAutonomousTarget] = useState({ x: 0, y: 0 });
  const [showAvatar, setShowAvatar] = useState(false);
  const [avatarPosition, setAvatarPosition] = useState({ x: 0, y: 0 });
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const [appTooltipPosition, setAppTooltipPosition] = useState({ x: 0, y: 0 });
  
  // Initialize and update autonomous movement targets
  React.useEffect(() => {
    // Set initial target immediately
    setAutonomousTarget({
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 0.5) * 200
    });
    
    // Keep updating targets for continuous movement
    const interval = setInterval(() => {
      const newX = (Math.random() - 0.5) * 300;
      const newY = (Math.random() - 0.5) * 200;
      setAutonomousTarget({ x: newX, y: newY });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Continuous movement update
  React.useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setWhispPosition(prev => {
        if (isMouseInCanvas) {
          // Follow mouse smoothly
          const targetX = mousePosition.x * 0.4;
          const targetY = mousePosition.y * 0.4;
          return {
            x: prev.x + (targetX - prev.x) * 0.1,
            y: prev.y + (targetY - prev.y) * 0.1
          };
        } else {
          // Move autonomously towards target
          return {
            x: prev.x + (autonomousTarget.x - prev.x) * 0.02,
            y: prev.y + (autonomousTarget.y - prev.y) * 0.02
          };
        }
      });
      requestAnimationFrame(animate);
    };
    animate();
  }, [mousePosition, autonomousTarget, isMouseInCanvas]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left - rect.width / 2;
    const newY = e.clientY - rect.top - rect.height / 2;
    
    setMousePosition({ x: newX, y: newY });
    setAvatarPosition({ x: e.clientX, y: e.clientY });
    setIsMouseInCanvas(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInCanvas(false);
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24 relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background whisp - only in hero section */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <motion.div
          className="absolute w-80 h-80 rounded-full blur-3xl opacity-35 dark:opacity-8 cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{
            background: "var(--whisp-color)",
            mixBlendMode: "normal",
            x: whispPosition.x,
            y: whispPosition.y
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          onClick={() => {
            document.getElementById('contact')?.scrollIntoView({ 
              behavior: 'smooth' 
            });
          }}
        />
      </motion.div>
      
      <div className="w-full relative z-10">
        <motion.h1
          className="text-[clamp(3rem,15vw,12rem)] font-light leading-[1.1] tracking-tight text-[var(--foreground)] relative"
          initial="hidden"
          animate="visible"
        >
          <div className="overflow-hidden">
            {firstName.split("").map((char, i) => (
              <motion.span
                key={`first-${i}`}
                custom={i}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
                onMouseEnter={(e) => {
                  if (char !== " ") {
                    setShowAvatar(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setAvatarPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10
                    });
                  }
                }}
                onMouseLeave={() => setShowAvatar(false)}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {lastName.split("").map((char, i) => (
              <motion.span
                key={`last-${i}`}
                custom={i + firstName.length}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === " " ? "inline" : "inline-block" }}
                onMouseEnter={(e) => {
                  if (char !== " ") {
                    setShowAvatar(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setAvatarPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10
                    });
                  }
                }}
                onMouseLeave={() => setShowAvatar(false)}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>
        
        {/* Avatar card on hover - positioned at cursor */}
        {showAvatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 pointer-events-none hidden md:block"
            style={{
              left: avatarPosition.x - 60,
              top: avatarPosition.y - 120
            }}
          >
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)]">
                  <img 
                    src="/avatar.png" 
                    alt="Daniel Lauding"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      (target.nextElementSibling as HTMLElement)!.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-white font-medium text-sm">
                    DL
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)] text-sm">Daniel Lauding</p>
                  <p className="text-xs text-[var(--text-muted)]">Design Engineer</p>
                  <p className="text-xs text-[var(--accent)]">Lund/Stockholm, Sweden</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Title and Subtitle */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 space-y-2"
          >
            <p className="text-lg md:text-xl text-[var(--text-muted)] font-light max-w-3xl">
              {title}
            </p>
            {subtitle && (
              <p className="text-base md:text-lg text-[var(--accent)] font-medium">
                {subtitle}
              </p>
            )}
            {status && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="pt-2"
              >
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contact')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-xs font-medium text-[var(--accent)] hover:bg-[var(--accent)]/20 hover:border-[var(--accent)]/40 transition-all cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                  {status}
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        )}

        {apps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-6"
          >
            <span className="text-sm text-[var(--text-muted)]">My Apps</span>
            <div className="flex gap-4">
              {apps.map((app, index) => {
                const Component = app.appStoreUrl ? motion.a : motion.div;
                const linkProps = app.appStoreUrl ? {
                  href: app.appStoreUrl,
                  target: "_blank",
                  rel: "noopener noreferrer"
                } : {};
                
                return (
                <Component
                  key={app.id}
                  {...linkProps}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1, duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
                  whileHover={{ scale: 1.15, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative touch-manipulation"
                  onMouseEnter={(e) => {
                    setHoveredApp(app.id);
                    const rect = e.currentTarget.getBoundingClientRect();
                    setAppTooltipPosition({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10
                    });
                  }}
                  onMouseLeave={() => setHoveredApp(null)}
                  onMouseMove={(e) => {
                    if (hoveredApp === app.id) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setAppTooltipPosition({
                        x: rect.left + rect.width / 2,
                        y: rect.top - 10
                      });
                    }
                  }}
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center ${
                    app.slug === 'plotta' 
                      ? 'bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)]' 
                      : 'bg-white'
                  }`}>
                    {app.icon.startsWith('/') ? (
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <span className="text-2xl text-[var(--background)] font-medium flex items-center justify-center w-full h-full">
                        {app.icon}
                      </span>
                    )}
                  </div>
                  
                  {/* Tooltip rendered outside, positioned at cursor */}
                  {hoveredApp === app.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className="fixed z-50 pointer-events-none"
                      style={{
                        left: appTooltipPosition.x - 80,
                        top: appTooltipPosition.y - 80
                      }}
                    >
                      <div className="px-3 py-2 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg backdrop-blur-sm">
                        <p className="text-sm font-medium text-[var(--foreground)] whitespace-nowrap">{app.name}</p>
                        <p className="text-xs text-[var(--text-muted)] whitespace-nowrap">{app.description}</p>
                      </div>
                    </motion.div>
                  )}
                </Component>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
