"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUp, Mail } from "lucide-react";
import type { SVGProps } from "react";


function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.9-3s-2.2 1.4-2.2 2.9V21h-4V9Z" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49v-1.9c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.9 1.55 2.36 1.11 2.94.85.09-.66.35-1.11.64-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: [
      { label: "For Job Seekers", href: "/seeker" },
      { label: "For Recruiters", href: "/recruiter" },
      { label: "How it works", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Help Center", href: "/helpcenter" },
    ],
  },
];

const socials = [
  { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: Mail, href: "mailto:hello@matchyai.app", label: "Email" },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative mt-8 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold w-fit">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
                <Sparkles size={16} />
              </span>
              <span>
                Matchy<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="mt-4 text-sm max-w-[26ch] leading-relaxed" style={{ color: "var(--muted)" }}>
              Semantic resume &amp; job matching that explains every result — no black boxes.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -2, borderColor: "var(--primary)" }}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-colors"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}
                >
                  <s.icon width={15} height={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text)" }}>
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm transition-colors hover:text-primary"
                      style={{ color: "var(--muted)" }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} MatchyAI. All rights reserved.
          </span>

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <ArrowUp size={15} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}