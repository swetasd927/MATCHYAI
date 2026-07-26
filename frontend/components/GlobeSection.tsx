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
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 md:p-16 shadow-xl"
        style={{
          background: "#FFFBE6",
          border: "2px solid rgba(15, 60, 101, 0.18)",
        }}
      >
        {/* Ambient background soft glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-96 w-96 rounded-full opacity-15 blur-3xl md:h-[500px] md:w-[500px]"
            style={{ background: "rgba(15, 60, 101, 0.3)" }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Section Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold"
            style={{
              background: "rgba(15, 60, 101, 0.08)",
              border: "1px solid rgba(15, 60, 101, 0.18)",
              color: "#0F3C65",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#0F3C65" }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#0F3C65" }} />
            </span>
            The Global Talent Network
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display mx-auto mb-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl"
            style={{ color: "#0F3C65" }}
          >
            Hire Talent in Minutes.{" "}
            <span style={{ color: "#0F3C65", opacity: 0.9 }}>
              Discover Jobs Worldwide.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-base md:text-lg font-medium leading-relaxed"
            style={{ color: "rgba(15, 60, 101, 0.85)" }}
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
              customBaseColor="#0F3C65"
              customGlowColor="#0F3C65"
              customMarkerColor="#FFFBE6"
              className="drop-shadow-[0_12px_40px_rgba(15,60,101,0.22)]"
            />
          </motion.div>

          {/* 4 Feature Highlights Grid */}
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
                    background: "rgba(255, 255, 255, 0.75)",
                    border: "1px solid rgba(15, 60, 101, 0.15)",
                    boxShadow: "0 4px 14px rgba(15, 60, 101, 0.04)",
                  }}
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: "#0F3C65",
                      color: "#FFFBE6",
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-1 text-base font-bold" style={{ color: "#0F3C65" }}>
                    {f.title}
                  </h3>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: "rgba(15, 60, 101, 0.75)" }}>
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