"use client";

import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  url?: string;
}

interface ClientsProps {
  clients: Client[];
}

export default function Clients({ clients }: ClientsProps) {
  return (
    <section className="px-6 md:px-12 py-24 bg-[var(--background-light)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-sm font-medium text-[var(--accent)] mb-4">
          Clients & Brands
        </h2>
        <p className="text-xl text-[var(--foreground)]">
          Trusted by companies across industries
        </p>
      </motion.div>

      <div className="overflow-hidden">
        <motion.div
          animate={{ x: [0, -50, 0] }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "linear"
          }}
          className="flex flex-wrap gap-x-8 gap-y-4 text-[var(--text-muted)] whitespace-nowrap"
        >
          {clients.map((client, index) => (
            client.url ? (
              <motion.a
                key={client.id}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="text-xl md:text-2xl font-medium hover:text-[var(--foreground)] transition-colors cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {client.name}
              </motion.a>
            ) : (
              <motion.span
                key={client.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03, duration: 0.4 }}
                className="text-xl md:text-2xl font-medium hover:text-[var(--foreground)] transition-colors cursor-default"
              >
                {client.name}
              </motion.span>
            )
          ))}
        </motion.div>
      </div>
    </section>
  );
}
