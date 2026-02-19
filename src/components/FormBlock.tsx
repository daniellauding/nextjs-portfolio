"use client";

import { useState } from "react";

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

interface FormBlockProps {
  form: FormData;
}

function extractConfirmationText(confirmationMessage: unknown): string {
  try {
    if (!confirmationMessage) return "Thank you! Your message has been sent.";
    const msg = confirmationMessage as { root?: { children?: Array<{ children?: Array<{ text?: string }> }> } };
    const root = msg?.root;
    if (!root?.children) return "Thank you! Your message has been sent.";
    const texts: string[] = [];
    for (const block of root.children) {
      if (block.children) {
        for (const child of block.children) {
          if (child.text) texts.push(child.text);
        }
      }
    }
    return texts.join(" ") || "Thank you! Your message has been sent.";
  } catch {
    return "Thank you! Your message has been sent.";
  }
}

export default function FormBlock({ form }: FormBlockProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const submissionData = {
        form: form.id,
        submissionData: Object.entries(values).map(([field, value]) => ({
          field,
          value,
        })),
      };

      const res = await fetch("/api/form-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Submission failed. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const confirmText = extractConfirmationText(form.confirmationMessage);
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {/* Animated checkmark */}
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-[var(--accent)]/15 animate-[scale-in_0.4s_ease-out]">
          <svg
            className="w-8 h-8 text-[var(--accent)]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-lg text-[var(--foreground)] font-medium">{confirmText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {form.fields?.map((field, idx) => {
        const inputClass =
          "w-full border border-[var(--border)] bg-transparent rounded-xl px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors";

        switch (field.blockType) {
          case "text":
            return (
              <div key={field.name || idx}>
                {field.label && (
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    {field.label}
                    {field.required && <span className="text-[var(--accent)] ml-0.5">*</span>}
                  </label>
                )}
                <input
                  type="text"
                  name={field.name}
                  required={field.required}
                  placeholder={field.label || field.name}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={inputClass}
                />
              </div>
            );

          case "email":
            return (
              <div key={field.name || idx}>
                {field.label && (
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    {field.label}
                    {field.required && <span className="text-[var(--accent)] ml-0.5">*</span>}
                  </label>
                )}
                <input
                  type="email"
                  name={field.name}
                  required={field.required}
                  placeholder={field.label || field.name}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={inputClass}
                />
              </div>
            );

          case "textarea":
            return (
              <div key={field.name || idx}>
                {field.label && (
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    {field.label}
                    {field.required && <span className="text-[var(--accent)] ml-0.5">*</span>}
                  </label>
                )}
                <textarea
                  name={field.name}
                  required={field.required}
                  placeholder={field.label || field.name}
                  rows={4}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`${inputClass} resize-none`}
                />
              </div>
            );

          case "select":
            return (
              <div key={field.name || idx}>
                {field.label && (
                  <label className="block text-sm text-[var(--text-muted)] mb-1">
                    {field.label}
                    {field.required && <span className="text-[var(--accent)] ml-0.5">*</span>}
                  </label>
                )}
                <select
                  name={field.name}
                  required={field.required}
                  value={values[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="" disabled className="bg-[var(--card)] text-[var(--text-muted)]">
                    {field.label || "Select an option"}
                  </option>
                  {field.options?.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-[var(--card)] text-[var(--foreground)]"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            );

          case "checkbox":
            return (
              <div key={field.name || idx} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={field.name}
                  name={field.name}
                  required={field.required}
                  checked={values[field.name] === "true"}
                  onChange={(e) => handleChange(field.name, String(e.target.checked))}
                  className="w-4 h-4 accent-[var(--accent)]"
                />
                {field.label && (
                  <label htmlFor={field.name} className="text-sm text-[var(--foreground)]">
                    {field.label}
                    {field.required && <span className="text-[var(--accent)] ml-0.5">*</span>}
                  </label>
                )}
              </div>
            );

          default:
            return null;
        }
      })}

      {error && (
        <p className="text-sm text-red-400 bg-red-400/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--background)] rounded-full font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          <>
            {form.submitButtonLabel || "Send Message"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
