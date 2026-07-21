// components/Hero.tsx
"use client";

import Link from "next/link";
import { motion, type Variants, type Easing } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { MatchRing } from "./MatchRing";
import Globe from "./Globe";

const headlineTop = "Hire top talents.";
const headlineBottom = "In seconds.";

function AnimatedHeadline() {
  const ease: Easing = [0.22, 1, 0.36, 1];

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  };

  const word: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className="font-display mb-6 text-5xl font-bold leading-[1.05] md:text-6xl"
    >
      <span className="block overflow-hidden">
        {headlineTop.split(" ").map((w, i) => (
          <motion.span key={i} variants={word} className="mr-3 inline-block">
            {w}
          </motion.span>
        ))}
      </span>

      <span className="text-gradient block overflow-hidden">
        {headlineBottom.split(" ").map((w, i) => (
          <motion.span key={i} variants={word} className="mr-3 inline-block">
            {w}
          </motion.span>
        ))}
      </span>
    </motion.h1>
  );
}

function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card className="ml-auto max-w-sm" variant="glass">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="font-semibold">Sarah Chen</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Senior Product Designer
              </p>
            </div>
            <MatchRing percentage={94} size={64} />
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {["Figma", "React", "Design Systems"].map((skill) => (
              <span
                key={skill}
                className="rounded-full px-2.5 py-1 font-mono text-xs"
                style={{
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          <p
            className="rounded-md px-3 py-2 text-sm"
            style={{ background: "var(--surface-2)", color: "var(--muted)" }}
          >
            Strong overlap in design systems experience
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function GlobalNetworkBand() {
  return (
    <section className="relative py-24" style={{ background: "#0a0806" }}>
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 60% 70%, white, transparent), radial-gradient(1px 1px at 80% 20%, white, transparent), radial-gradient(1.5px 1.5px at 40% 80%, white, transparent), radial-gradient(1px 1px at 90% 60%, white, transparent), radial-gradient(1px 1px at 10% 90%, white, transparent)",
          backgroundSize: "600px 600px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{
            filter: "drop-shadow(0 0 40px rgba(255, 122, 41, 0.25))",
          }}
        >
          <Globe size={400} />
        </motion.div>
      </div>
    </section>
  );
}

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden pb-24 pt-20">
        {/* Background Orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            className="absolute rounded-full opacity-30 blur-3xl"
            style={{
              width: 420,
              height: 420,
              top: "-10%",
              left: "-5%",
              background: "var(--primary)",
            }}
            animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full opacity-20 blur-3xl"
            style={{
              width: 360,
              height: 360,
              top: "10%",
              right: "-8%",
              background: "var(--primary-light)",
            }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="noise-mesh absolute inset-0" />
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--primary)",
              }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Semantic matching, not keyword matching
            </motion.div>

            <AnimatedHeadline />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8 max-w-lg text-lg leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              Upload your resume once and let AI find the perfect role.
              Recruiters get ranked, explained candidate matches in seconds —
              not keyword soup.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/register">
                <Button size="lg">
                  Start Matching
                  <ArrowRight size={16} />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="lg">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-center">
            <TiltCard />
          </div>
        </div>
      </section>

      <GlobalNetworkBand />
    </>
  );
}
