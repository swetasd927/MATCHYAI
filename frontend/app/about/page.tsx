"use client";
import { motion } from "framer-motion";
import { Sparkles, Target, Eye, Heart, Users, Zap, ShieldCheck } from "lucide-react";
import { Card } from "../../components/ui/Card";
import CtaBand from "../../components/ctaBand";
import Footer from "../../components/Footer";

const values = [
  {
    icon: Eye,
    title: "Explainability first",
    desc: "A match score means nothing without a reason. Every result we surface comes with plain-language context, never a black box.",
  },
  {
    icon: Users,
    title: "Fair to both sides",
    desc: "We build for job seekers and recruiters equally — matching should feel like a fair conversation, not a filter that quietly excludes people.",
  },
  {
    icon: Zap,
    title: "Fast, not just smart",
    desc: "Semantic understanding is only useful if it shows up in seconds. We optimize for speed as much as accuracy.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    desc: "Resumes and job data are sensitive. We only use them to generate your matches — never to train shared models without consent.",
  },
];

const stats = [
  { value: "2,000+", label: "teams matching smarter" },
  { value: "500K+", label: "resumes analyzed" },
  { value: "94%", label: "match relevance rate" },
  { value: "<3s", label: "average match time" },
];

const team = [
  { initials: "AR", name: "Aarav Rao", role: "Co-founder & CEO" },
  { initials: "SK", name: "Sara Khan", role: "Co-founder & CTO" },
  { initials: "ML", name: "Marcus Lee", role: "Head of Product" },
  { initials: "PN", name: "Priya Nair", role: "Lead ML Engineer" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-pill mb-5"
          style={{
            background: "color-mix(in oklab, var(--primary) 12%, transparent)",
            color: "var(--primary)",
            border: "1px solid color-mix(in oklab, var(--primary) 25%, transparent)",
          }}
        >
          <Sparkles size={13} /> About MatchyAI
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight"
        >
          Hiring shouldn't feel like <span className="text-gradient">guesswork</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-xl mx-auto text-base sm:text-lg"
          style={{ color: "var(--muted)" }}
        >
          We're building the matching layer between people and roles — one that reads meaning
          instead of keywords, and explains itself instead of hiding behind a score.
        </motion.p>
      </section>

      {/* Story */}
      <section className="pb-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Our story</h2>
          <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--muted)" }}>
            MatchyAI started from a simple frustration: keyword-matching systems were rejecting
            great candidates over phrasing, while recruiters drowned in applications that looked
            right on paper but weren't. Both sides were losing time to the same broken layer.
          </p>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            So we built a matching engine that reads for meaning — skills, context, and intent —
            and pairs every ranked result with a plain-language reason. No black boxes, no
            guesswork, just faster and fairer matches for everyone involved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="relative overflow-hidden">
            <div
              className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-40"
              style={{ background: "color-mix(in oklab, var(--primary) 35%, transparent)" }}
            />
            <div className="relative z-10 flex items-center gap-2 mb-6">
              <Target size={18} className="text-primary" />
              <h3 className="font-semibold">Our mission</h3>
            </div>
            <p className="relative z-10 font-display text-xl sm:text-2xl font-semibold leading-snug mb-6">
              Make every match explainable, so the right person and the right role find each
              other faster.
            </p>
            <div className="relative z-10 grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-gradient">{s.value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </section>

      {/* Values */}
      <section className="pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">What we believe</h2>
          <p className="max-w-md mx-auto text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            The principles that shape every feature we ship.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full">
                <div
                  className="w-10 h-10 rounded-(--radius-md) flex items-center justify-center mb-4"
                  style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
                >
                  <v.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {v.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="pb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3">The team</h2>
          <p className="max-w-md mx-auto text-sm sm:text-base" style={{ color: "var(--muted)" }}>
            A small team obsessed with getting matching right.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="text-center h-full flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-display font-bold text-lg mb-4"
                  style={{
                    background: "linear-gradient(135deg, var(--primary-light), var(--primary))",
                    color: "white",
                  }}
                >
                  {m.initials}
                </div>
                <h4 className="font-semibold text-sm">{m.name}</h4>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                  {m.role}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Culture strip */}
      <section className="pb-20">
        <Card className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
          >
            <Heart size={22} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1">We're hiring</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              We're a remote-first team building the future of hiring. Curious what it's like to
              work here? Check out our open roles.
            </p>
          </div>
        </Card>
      </section>

      <CtaBand />
      <Footer />
    </div>
  );
}