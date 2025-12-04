"use client";

import { motion } from "framer-motion";

interface InformationProps {
  bio: string;
  tools: string[];
  roles?: string[];
  experience: string;
  keyContributions?: string[];
}

export default function Information({ bio, tools, roles, experience, keyContributions }: InformationProps) {
  return (
    <section id="about" className="px-6 md:px-12 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="border-t border-[var(--text-muted)] pt-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="text-sm font-medium text-[var(--accent)]">Information</h2>
          </div>

          <div className="md:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Mobile Avatar Section */}
              <div className="md:hidden flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)]">
                  <img 
                    src="/avatar.png" 
                    alt="Daniel Lauding"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full hidden items-center justify-center text-white font-medium">
                    DL
                  </div>
                </div>
                <div>
                  <p className="font-medium text-[var(--foreground)]">Daniel Lauding</p>
                  <p className="text-sm text-[var(--text-muted)]">Design Engineer • Available 2026</p>
                </div>
              </div>
              
              <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--foreground)]">
                What started as a childhood fascination with building websites has evolved into 15+ years of crafting digital experiences that matter.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--foreground)]">
                From those early days tweaking graphics and rebuilding sites with every new trend, Daniel discovered his passion for the intersection of creativity, technology, and human impact.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--foreground)]">
                Today, he's a Design Engineer who thrives on transforming complex problems into elegant, user-centered solutions. Whether co-founding fintech companies serving 400,000+ users or conducting field research in Brazilian favelas for Spotify, Daniel brings a unique blend of strategic thinking, technical execution, and genuine care for the people using what he builds.
              </p>
              <p className="text-lg md:text-xl font-light leading-relaxed text-[var(--foreground)]">
                Currently exploring the frontiers of AI-assisted design and development, he's passionate about leveraging cutting-edge tools to create more meaningful, accessible experiences that truly serve users' needs.
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-4 md:pr-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-sm text-[var(--text-muted)] mb-2">Tools</h3>
                <p className="text-[var(--foreground)]">{tools.join(", ")}</p>
              </div>

              {roles && (
                <div>
                  <h3 className="text-sm text-[var(--text-muted)] mb-2">Roles</h3>
                  <p className="text-[var(--foreground)]">{roles.join(", ")}</p>
                </div>
              )}

              {/* <div>
                <h3 className="text-sm text-[var(--text-muted)] mb-2">Experience</h3>
                <p className="text-[var(--foreground)]">{experience}</p>
              </div> */}

              {keyContributions && (
                <div>
                  <h3 className="text-sm text-[var(--text-muted)] mb-2">Key Contributions</h3>
                  <div className="space-y-2">
                    {keyContributions.map((contribution, index) => (
                      <p key={index} className="text-sm text-[var(--foreground)] leading-relaxed">
                        • {contribution}
                      </p>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
