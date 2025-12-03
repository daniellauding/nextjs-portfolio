"use client";

import { motion } from "framer-motion";

interface Client {
  id: string;
  name: string;
  logo: string;
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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center h-24 rounded-xl border border-[var(--text-muted)]/30 bg-[var(--background)] transition-colors hover:border-[var(--accent)]"
          >
            <span className="text-lg font-medium text-[var(--foreground)]">
              {client.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
