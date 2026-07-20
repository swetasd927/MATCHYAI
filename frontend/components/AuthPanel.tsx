"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/Card";
import { MatchRing } from "./MatchRing";

export default function AuthPanel({
  eyebrow,
  title,
  gradientWord,
  subtitle,
  highlights,
}: {
  eyebrow: string;
  title: string;
  gradientWord: string;
  subtitle: string;
  highlights: string[];
}) {
  return (
    <div className="relative hidden md:flex flex-col justify-center overflow-hidden px-14 py-16">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" style={{ background: "var(--surface-2)" }}>
        <motion.div
          className="absolute rounded-full opacity-30 blur-3xl"
          style={{ width: 420, height: 420, top: "-8%", left: "-10%", background: "var(--primary)" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full opacity-20 blur-3xl"
          style={{ width: 360, height: 360, bottom: "-10%", right: "-8%", background: "var(--primary-light)" }}
          animate={{ x: [0, -30, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="noise-mesh absolute inset-0" />
      </div>

      <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold w-fit mb-12">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
          <Sparkles size={16} />
        </span>
        <span>
          Matchy<span className="text-gradient">AI</span>
        </span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium w-fit"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--primary)" }}
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
        </span>
        {eyebrow}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="font-display text-4xl font-bold leading-tight max-w-sm mb-4"
      >
        {title} <span className="text-gradient">{gradientWord}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22 }}
        className="max-w-sm mb-10 leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-3 mb-10"
      >
        {highlights.map((h) => (
          <span key={h} className="inline-flex items-center gap-2.5 text-sm">
            <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
            {h}
          </span>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="max-w-xs" variant="glass">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-sm">Amelia Novak</h3>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Backend Engineer
              </p>
            </div>
            <MatchRing percentage={91} size={52} />
          </div>
          <p
            className="rounded-md px-3 py-2 text-xs leading-relaxed"
            style={{ background: "var(--surface-2)", color: "var(--muted)" }}
          >
            Strong overlap in distributed systems experience
          </p>
        </Card>
      </motion.div>
    </div>
  );
}