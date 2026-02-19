// Root layout — intentionally minimal (no html/body).
// Each route group provides its own html/body:
//   (portfolio)/layout.tsx  → standard portfolio pages
//   (payload)/layout.tsx    → Payload admin (RootLayout renders its own html/body)
// This prevents nested <html><body> which causes React hydration error #418.
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
