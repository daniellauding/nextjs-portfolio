import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Daniel Lauding | Product Design",
  description: "Stockholm-based designer specializing in elegant, user-friendly design. Creative force behind Instinctly design studio.",
  keywords: ["Product Design", "UX Design", "UI Design", "Stockholm", "Instinctly"],
  authors: [{ name: "Daniel Lauding" }],
  openGraph: {
    title: "Daniel Lauding | Product Design",
    description: "Stockholm-based designer specializing in elegant, user-friendly design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        {children}
      </body>
    </html>
  );
}
