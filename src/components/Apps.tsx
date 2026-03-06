"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface App {
  id: string;
  slug?: string;
  name: string;
  icon: string;
  description: string;
  appStoreUrl: string;
  tags?: string[];
  color?: string;
}

interface AppsProps {
  apps: App[];
  enableClickthrough?: boolean;
}

const PejlaLogo = () => (
  <svg width="48" height="26" viewBox="0 0 1242 657" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M132.234 584.797C68.9754 534.55 30.6254 470.301 19.4563 390.243C15.3078 360.507 15.5755 330.794 18.5121 300.998C19.0191 295.854 21.9956 295.896 25.7406 295.899C84.3964 295.94 143.052 295.928 201.708 295.928C229.869 295.928 258.032 295.821 286.192 296.033C290.926 296.069 292.359 294.873 292.351 289.986C292.207 196.004 292.244 102.021 292.246 8.03861C292.246 -0.120679 292.25 -0.0642185 300.625 0.0149155C336.41 0.353034 371.847 3.42771 406.428 13.3245C431.993 20.6409 456.243 30.9622 479.832 43.3165C524.507 66.7129 563.108 97.3954 594.026 137.174C640.834 197.397 664.036 265.636 660.863 342.252C657.072 433.779 618.389 508.663 550.905 569.182C493.993 620.22 426.457 647.467 350.735 654.563C318.219 657.61 286.162 652.825 254.686 644.743C209.906 633.246 169.065 613.465 132.234 584.797Z" fill="#000000"/>
    <path d="M721.233 288.44C721.387 219.951 720.845 151.949 722.011 83.9771C722.539 53.1687 737.719 29.0411 764.053 12.516C773.842 6.37304 784.742 3.21422 796.249 2.77854C806.066 2.4069 815.922 2.4252 825.728 2.92089C828.187 3.04522 831.384 5.09928 832.779 7.22597C847.214 29.2387 861.536 51.3314 875.537 73.6225C951.142 193.986 1026.42 314.555 1102.27 434.764C1147.17 505.928 1192.93 576.551 1238.24 647.457C1239.57 649.534 1240.19 652.058 1241.15 654.374C1238.65 654.941 1236.16 656.005 1233.66 656.004C1116.84 655.972 1000.02 655.792 883.204 655.77C853.876 655.765 824.537 655.83 795.221 656.593C763.214 657.427 741.97 641.636 727.88 614.482C722.403 603.929 721.431 592.153 721.418 580.405C721.329 502.081 721.286 423.758 721.234 345.434C721.222 326.603 721.233 307.771 721.233 288.44Z" fill="#000000"/>
    <path d="M183.38 24.614C243.812 67.0427 251.454 155.246 199.035 206.758C165.05 240.156 124.592 250.785 79.1231 235.934C41.7941 223.741 17.3463 197.478 5.76275 159.973C-6.08628 121.609 0.623981 85.9324 23.2501 53.0269C52.911 9.89061 113.618 -7.84553 161.564 12.8807C169.008 16.0985 175.924 20.536 183.38 24.614Z" fill="#000000"/>
  </svg>
);

export default function Apps({ apps, enableClickthrough = true }: AppsProps) {
  return (
    <section id="apps" className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-sm font-medium text-[var(--accent)] mb-4">
          My Apps
        </h2>
        <p className="text-xl text-[var(--foreground)]">
          Personal projects and apps available on the App Store
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {apps.map((app, index) => {
          const Wrapper = enableClickthrough && app.slug ? Link : "a";
          const wrapperProps = enableClickthrough && app.slug 
            ? { href: `/projects/${app.slug}` }
            : { href: app.appStoreUrl, target: "_blank", rel: "noopener noreferrer" };
          
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <Wrapper
                {...wrapperProps}
                className="flex flex-col items-center text-center cursor-pointer"
              >
                <div 
                  className="relative w-20 h-20 md:w-24 md:h-24 rounded-[22px] overflow-hidden shadow-lg mb-4 flex items-center justify-center"
                  style={{ 
                    backgroundColor: app.color || 'var(--accent)'
                  }}
                >
                  {app.icon === '/apps/pejla-logo.svg' ? (
                    <PejlaLogo />
                  ) : app.icon.startsWith('/') ? (
                    <img 
                      src={app.icon} 
                      alt={`${app.name} icon`}
                      className="w-12 h-12 md:w-16 md:h-16 object-contain"
                    />
                  ) : (
                    <span className="text-3xl md:text-4xl text-[var(--background)]">
                      {app.icon}
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {app.description}
                </p>
                {enableClickthrough && app.slug && (
                  <span className="mt-2 text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details →
                  </span>
                )}
              </Wrapper>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
