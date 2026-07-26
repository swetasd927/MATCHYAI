"use client";
import { motion } from "framer-motion";
import { Zap, Briefcase, Users, Sparkles } from "lucide-react";
import Globe from "./Globe";

const features = [
  {
    icon: Zap,
    title: "Hire in Minutes",
    desc: "Instantly connect with AI-matched candidates ranked by actual skill alignment.",
  },
  {
    icon: Briefcase,
    title: "Discover Global Jobs",
    desc: "Explore top remote and international roles matched directly to your experience.",
  },
  {
    icon: Users,
    title: "Grow Your Network",
    desc: "Connect directly with verified recruiters and high-caliber professionals worldwide.",
  },
  {
    icon: Sparkles,
    title: "Get Hired Without Friction",
    desc: "Upload your resume once and let semantic AI land your ideal position effortlessly.",
  },
];

export default function GlobeSection() {
  return (
    <section className="relative py-12 md:py-20">
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl transition-colors duration-300"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        {/* Signature primary orange ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-96 w-96 rounded-full opacity-15 blur-3xl md:h-[500px] md:w-[500px]"
            style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Section Pill Badge — exact match with Hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-medium"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--primary)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            The Global Talent Network
          </motion.div>

          {/* Heading with signature orange gradient mix */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl"
            style={{ color: "var(--text)" }}
          >
            Hire Talent in Minutes.{" "}
            <span className="text-gradient block sm:inline">
              Discover Jobs Worldwide.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Expand your global reach and get hired sooner without friction. MatchyAI bridges forward-thinking recruiters and top talent worldwide with semantic precision.
          </motion.p>

          {/* Single Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mb-12 flex justify-center"
          >
            <Globe
              size={540}
              customBaseColor="#0f172a"
              customGlowColor="#0f172a"
              customMarkerColor="#e8600c"
              className="drop-shadow-[0_12px_40px_rgba(232,96,12,0.15)]"
            />
          </motion.div>

          {/* 4 Feature Highlights Grid — matching Hero card styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left max-w-5xl mx-auto"
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: "color-mix(in oklab, var(--primary) 15%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-1 text-base font-bold" style={{ color: "var(--text)" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}