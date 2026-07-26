"use client";
import { motion } from "framer-motion";
import Globe from "./Globe";
import StarsBackground from "./StarsBackground";

export default function GlobeSection() {
  return (
    <section className="relative py-16 md:py-24">
      <div
        className="relative overflow-hidden rounded-2xl shadow-xl"
        style={{
          background: "#FAF1CA",
          border: "1px solid rgba(15, 60, 101, 0.15)",
        }}
      >
        <StarsBackground count={100} />

        {/* Soft elegant ambient background glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-105 w-105 rounded-full opacity-30 blur-3xl md:h-[560px] md:w-[560px]"
            style={{ background: "rgba(15, 60, 101, 0.25)" }}
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
            <h2 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl" style={{ color: "#0F3C65" }}>
              The Global Talent Network
            </h2>
            <p className="mt-4 text-base sm:text-lg" style={{ color: "rgba(15, 60, 101, 0.8)" }}>
              Candidates and recruiters, matched instantly — wherever they are.
              MatchyAI brings the world of hiring to your fingertips.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-8 flex max-w-155 justify-center"
          >
            <Globe
              size={620}
              customBaseColor="#0F3C65"
              customGlowColor="#0F3C65"
              customMarkerColor="#FAF1CA"
              className="drop-shadow-[0_0_50px_rgba(15,60,101,0.3)]"
            />
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-24"
          style={{ background: "linear-gradient(to bottom, transparent, #FAF1CA)" }}
        />
      </div>
    </section>
  );
}