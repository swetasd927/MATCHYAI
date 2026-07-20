"use client";
import { motion } from "framer-motion";
import Globe from "./Globe";
import StarsBackground from "./StarsBackground";

export default function GlobeSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div
        className="relative overflow-hidden rounded-lg"
        style={{ background: "#05070d", border: "1px solid var(--border)" }}
      >
        <StarsBackground count={140} />

        {/* soft glow sitting behind the globe */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[420px] w-[420px] rounded-full opacity-40 blur-3xl md:h-[560px] md:w-[560px]"
            style={{ background: "rgba(59, 130, 246, 0.55)" }}
          />
        </div>

        <div className="relative z-10 px-6 pt-16 pb-24 sm:px-10 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-xl text-center"
          >
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              The Global Talent Network
            </h2>
            <p className="mt-4 text-base text-white/60 sm:text-lg">
              Candidates and recruiters, matched instantly — wherever they are.
              MatchyAI brings the world of hiring to your fingertips.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-8 flex max-w-[620px] justify-center"
          >
            <Globe
              size={620}
              forceDark
              className="drop-shadow-[0_0_90px_rgba(59,130,246,0.35)]"
            />
          </motion.div>
        </div>

        {/* fade the bottom of the globe into the page background — kept
            short and clear of the sphere itself (see pb-24/pb-32 above)
            so the full circle stays visible instead of melting into black. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #05070d)" }}
        />
      </div>
    </section>
  );
}