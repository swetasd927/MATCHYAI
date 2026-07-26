"use client";
import { motion } from "framer-motion";
import Globe from "./Globe";

export default function GlobeSection() {
  return (
    <section className="relative py-12 md:py-20">
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl"
        style={{
          background: "#FAF1CA",
          border: "2px solid rgba(15, 60, 101, 0.18)",
        }}
      >
        {/* Soft background ambient accent */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-96 w-96 rounded-full opacity-20 blur-3xl md:h-[500px] md:w-[500px]"
            style={{ background: "rgba(15, 60, 101, 0.3)" }}
          />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl tracking-tight" style={{ color: "#0F3C65" }}>
              The Global Talent Network
            </h2>
            <p className="mt-4 text-base sm:text-lg font-medium leading-relaxed" style={{ color: "rgba(15, 60, 101, 0.85)" }}>
              Candidates and recruiters, matched instantly wherever they are.
              MatchyAI brings the world of hiring to your fingertips.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-6 flex justify-center"
          >
            <Globe
              size={540}
              customBaseColor="#0F3C65"
              customGlowColor="#0F3C65"
              customMarkerColor="#FAF1CA"
              className="drop-shadow-[0_12px_45px_rgba(15,60,101,0.25)]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}