"use client";

import { useEffect, useState, useCallback } from "react";
import FormBlock from "./FormBlock";

interface FormField {
  id?: string;
  blockType: string;
  name: string;
  label?: string;
  required?: boolean;
  width?: number;
  options?: { label: string; value: string }[];
}

interface FormData {
  id: string | number;
  title: string;
  fields: FormField[];
  submitButtonLabel?: string;
  confirmationType?: string;
  confirmationMessage?: unknown;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  formSlug?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  formSlug = "contact",
}: ContactModalProps) {
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchForm = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(
        `/api/forms?where[title][equals]=Contact&limit=1`,
      );
      if (!res.ok) throw new Error("Failed to load form");
      const data = await res.json();
      if (data?.docs?.[0]) {
        setForm(data.docs[0]);
      } else {
        // Fallback: try fetching all forms
        const fallback = await fetch(`/api/forms?limit=10`);
        const fallbackData = await fallback.json();
        const found = fallbackData?.docs?.find(
          (f: FormData) => f.title?.toLowerCase() === formSlug.toLowerCase(),
        );
        if (found) {
          setForm(found);
        } else {
          setFetchError("Contact form not found. Please seed it in Payload CMS.");
        }
      }
    } catch {
      setFetchError("Unable to load form. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [formSlug]);

  useEffect(() => {
    if (isOpen && !form) {
      fetchForm();
    }
  }, [isOpen, form, fetchForm]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-label="Contact form"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-light text-[var(--foreground)]">
              Let&apos;s work together
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">
              Tell me about your project or idea.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-full hover:bg-[var(--border)] transition-colors text-[var(--text-muted)] hover:text-[var(--foreground)] flex-shrink-0"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <svg className="w-6 h-6 animate-spin text-[var(--accent)]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )}

        {fetchError && (
          <div className="py-8 text-center">
            <p className="text-sm text-red-400">{fetchError}</p>
            <button
              onClick={fetchForm}
              className="mt-4 text-sm text-[var(--accent)] hover:underline"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !fetchError && form && <FormBlock form={form} />}
      </div>
    </div>
  );
}
