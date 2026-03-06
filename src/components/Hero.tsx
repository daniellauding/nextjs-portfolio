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
  color?: string;
}

const PejlaLogo = () => (
  <svg width="48" height="26" viewBox="0 0 1242 657" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M132.234 584.797C68.9754 534.55 30.6254 470.301 19.4563 390.243C15.3078 360.507 15.5755 330.794 18.5121 300.998C19.0191 295.854 21.9956 295.896 25.7406 295.899C84.3964 295.94 143.052 295.928 201.708 295.928C229.869 295.928 258.032 295.821 286.192 296.033C290.926 296.069 292.359 294.873 292.351 289.986C292.207 196.004 292.244 102.021 292.246 8.03861C292.246 -0.120679 292.25 -0.0642185 300.625 0.0149155C336.41 0.353034 371.847 3.42771 406.428 13.3245C431.993 20.6409 456.243 30.9622 479.832 43.3165C524.507 66.7129 563.108 97.3954 594.026 137.174C640.834 197.397 664.036 265.636 660.863 342.252C657.072 433.779 618.389 508.663 550.905 569.182C493.993 620.22 426.457 647.467 350.735 654.563C318.219 657.61 286.162 652.825 254.686 644.743C209.906 633.246 169.065 613.465 132.234 584.797Z" fill="#000000"/>
    <path d="M721.233 288.44C721.387 219.951 720.845 151.949 722.011 83.9771C722.539 53.1687 737.719 29.0411 764.053 12.516C773.842 6.37304 784.742 3.21422 796.249 2.77854C806.066 2.4069 815.922 2.4252 825.728 2.92089C828.187 3.04522 831.384 5.09928 832.779 7.22597C847.214 29.2387 861.536 51.3314 875.537 73.6225C951.142 193.986 1026.42 314.555 1102.27 434.764C1147.17 505.928 1192.93 576.551 1238.24 647.457C1239.57 649.534 1240.19 652.058 1241.15 654.374C1238.65 654.941 1236.16 656.005 1233.66 656.004C1116.84 655.972 1000.02 655.792 883.204 655.77C853.876 655.765 824.537 655.83 795.221 656.593C763.214 657.427 741.97 641.636 727.88 614.482C722.403 603.929 721.431 592.153 721.418 580.405C721.329 502.081 721.286 423.758 721.234 345.434C721.222 326.603 721.233 307.771 721.233 288.44Z" fill="#000000"/>
    <path d="M183.38 24.614C243.812 67.0427 251.454 155.246 199.035 206.758C165.05 240.156 124.592 250.785 79.1231 235.934C41.7941 223.741 17.3463 197.478 5.76275 159.973C-6.08628 121.609 0.623981 85.9324 23.2501 53.0269C52.911 9.89061 113.618 -7.84553 161.564 12.8807C169.008 16.0985 175.924 20.536 183.38 24.614Z" fill="#000000"/>
  </svg>
);

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
                  <div 
                    className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
                    style={{
                      backgroundColor: app.color || (app.name === 'plotta' ? 'transparent' : '#ffffff'),
                      backgroundImage: app.name === 'plotta' ? 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' : 'none'
                    }}
                  >
                    {app.icon === '/apps/pejla-logo.svg' ? (
                      <PejlaLogo />
                    ) : app.icon.startsWith('/') ? (
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
