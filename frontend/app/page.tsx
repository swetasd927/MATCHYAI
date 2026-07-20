"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { MatchRing } from "../components/MatchRing";

const features = [
  { icon: Target, title: "Semantic matching", desc: "We read meaning, not just keywords — so a great candidate isn't filtered out over phrasing." },
  { icon: Zap, title: "Instant ranking", desc: "Upload a job or resume once. Ranked matches with reasoning appear in seconds." },
  { icon: ShieldCheck, title: "Explainable results", desc: "Every match comes with a plain-language reason, not a black-box score." },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 noise-mesh -z-10" />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--primary)" }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--primary)]" />
              </span>
              Semantic matching, not keyword matching
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              Hire smarter.<br />
              <span className="text-gradient">Match instantly.</span>
            </h1>

            <p className="text-lg max-w-lg mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
              Upload your resume once and let AI find the perfect role. Recruiters get ranked, explained candidate matches in seconds — not keyword soup.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/register"><Button size="lg">Start Matching <ArrowRight size={16} /></Button></Link>
              <Link href="/login"><Button variant="secondary" size="lg">Sign In</Button></Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Card className="max-w-sm ml-auto">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Sarah Chen</h3>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>Senior Product Designer</p>
                </div>
                <MatchRing percentage={94} size={64} />
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Figma", "React", "Design Systems"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full text-xs font-[family-name:var(--font-mono)]"
                    style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>{s}</span>
                ))}
              </div>
              <p className="text-sm px-3 py-2 rounded-[var(--radius-md)]" style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
                Strong overlap in design systems experience
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="py-20 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="h-full">
              <div className="w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center mb-4"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                <f.icon size={18} className="text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      <section className="py-16 text-center card px-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-3">Ready to match smarter?</h2>
        <p className="mb-6" style={{ color: "var(--muted)" }}>Free to start. No credit card required.</p>
        <Link href="/register"><Button size="lg">Get Started <ArrowRight size={16} /></Button></Link>
      </section>

      <footer className="py-10 mt-8 border-t flex justify-between text-sm" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
        <span>© 2026 MatchyAI</span>
        <div className="flex gap-6">
          <Link href="/login">Login</Link>
          <Link href="/register">Get Started</Link>
        </div>
      </footer>
    </div>
  );
}