"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/Button";

const perks = ["Free to start", "No credit card", "Setup in 2 minutes"];

export default function CtaBand() {
  return (
    <section className="relative py-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-lg px-6 py-16 sm:px-14 sm:py-20 text-center"
        style={{
          background: "linear-gradient(155deg, var(--surface-2), var(--surface))",
          border: "1px solid var(--border)",
        }}
      >
        {/* glow orbs */}
        <div
          className="pointer-events-none absolute -top-24 -left-20 w-72 h-72 rounded-full blur-3xl opacity-60"
          style={{ background: "color-mix(in oklab, var(--primary) 35%, transparent)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-16 w-80 h-80 rounded-full blur-3xl opacity-50"
          style={{ background: "color-mix(in oklab, var(--primary-light) 30%, transparent)" }}
        />
        {/* faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text) 1px, transparent 1px), linear-gradient(90deg, var(--text) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-pill mb-5"
            style={{
              background: "color-mix(in oklab, var(--primary) 12%, transparent)",
              color: "var(--primary)",
              border: "1px solid color-mix(in oklab, var(--primary) 25%, transparent)",
            }}
          >
            <Sparkles size={13} /> Join 2,000+ teams matching smarter
          </motion.span>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-tight">
            Ready to find your <span className="text-gradient">perfect match?</span>
          </h2>

          <p className="mt-4 max-w-md text-base sm:text-lg" style={{ color: "var(--muted)" }}>
            Upload a resume or post a job — see ranked, explainable matches in seconds.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/register">
              <Button size="lg" className="group">
                Get Started Free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {perks.map((p) => (
              <span key={p} className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--muted)" }}>
                <CheckCircle2 size={14} style={{ color: "var(--success)" }} />
                {p}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}