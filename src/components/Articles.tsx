"use client";

import { motion } from "framer-motion";

interface Article {
  title: string;
  url: string;
}

interface ArticlesProps {
  articles: Article[];
}

export default function Articles({ articles }: ArticlesProps) {
  return (
    <section className="px-6 md:px-12 py-24 border-t border-[var(--text-muted)]/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12"
      >
        <div className="md:col-span-2">
          <h2 className="text-sm font-medium text-[var(--accent)]">Articles</h2>
        </div>

        <div className="md:col-span-10">
          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="block text-lg md:text-xl text-[var(--accent)] hover:underline leading-relaxed"
              >
                {article.title} ↗
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}