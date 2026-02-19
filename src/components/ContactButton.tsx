"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const ContactModal = dynamic(() => import("./ContactModal"), { ssr: false });

interface ContactButtonProps {
  label?: string;
  formSlug?: string;
  className?: string;
}

export default function ContactButton({
  label = "Let's build something great",
  formSlug = "contact",
  className,
}: ContactButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-all"
        }
      >
        {label}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </button>

      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        formSlug={formSlug}
      />
    </>
  );
}
