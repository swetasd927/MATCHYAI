"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";

/**
 * A dramatic, minimal "stage light" CTA — a soft glowing beam falling from
 * the top of the section onto a centered headline. Distinct from CtaBand
 * (which is a fuller card with perks/orbs); this one is meant to feel like
 * a quiet, confident closing statement rather than a sales pitch.
 */
export default function SpotlightBand() {
  return (
    <section
      className="relative overflow-hidden py-28 sm:py-36 text-center"
      style={{ background: "var(--bg)" }}
    >
      {/* The beam: a thin bright bar at the very top fading into a soft cone
          of light down the section, like a spotlight hitting a stage. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0.6 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-0.75 w-40 sm:w-56 rounded-full"
          style={{
            background: "var(--primary)",
            boxShadow: "0 0 40px 8px color-mix(in oklab, var(--primary) 70%, transparent)",
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-105 mx-auto max-w-3xl"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display text-3xl sm:text-5xl font-bold tracking-tight leading-tight"
          style={{ color: "var(--text)" }}
        >
          Step into the future of
          <br />
          resume &amp; job matching
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-5 max-w-md mx-auto text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          Experience a platform where AI meets opportunity — making hiring
          and job hunting smarter, faster, and refreshingly honest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-9"
        >
          <Link href="/register">
            <Button size="lg" className="group">
              Start For Free
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Small centered dash — a quiet section-end marker, echoing the
          reference's carousel-style indicator without implying this section
          actually scrolls/paginates. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mx-auto mt-16 h-0.5 w-8 rounded-full"
        style={{ background: "var(--border)" }}
      />
    </section>
  );
}