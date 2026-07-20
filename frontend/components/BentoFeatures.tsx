"use client";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, FileText, Clock, Wand2 } from "lucide-react";

function CardShell({
  className,
  eyebrow,
  icon: Icon,
  title,
  desc,
  children,
}: {
  className?: string;
  eyebrow: string;
  icon: React.ElementType;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`card p-6 flex flex-col overflow-hidden ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className="text-primary" />
        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--primary)" }}>
          {eyebrow}
        </span>
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>{desc}</p>
      <div className="mt-auto">{children}</div>
    </motion.div>
  );
}

export default function BentoFeatures() {
  return (
    <section className="py-20">
      <div className="mb-10 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          AI-powered matching, <span className="text-gradient">made simple</span>
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
          From semantic job recommendations to real-time tracking — every tool talks to the same match engine.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {/* Job recommendation card */}
        <CardShell
          className="md:col-span-2"
          eyebrow="Live match"
          icon={Sparkles}
          title="Smart job recommendations"
          desc="Get personalized matches based on skills, experience, and preferences."
        >
          <div className="flex items-center gap-3 rounded-(--radius-md) p-4" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0" style={{ background: "var(--primary)" }}>
              <Sparkles size={16} className="text-white" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                <span className="text-xs font-semibold" style={{ color: "var(--primary)" }}>NEW</span>
              </div>
              <p className="text-sm font-semibold truncate">Senior Frontend Engineer at Nimbus</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>96% match · Today, 10:25</p>
            </div>
          </div>
        </CardShell>

        {/* Analytics card */}
        <CardShell eyebrow="Insights" icon={TrendingUp} title="Talent analytics" desc="Visualize your pipeline in real time.">
          <svg viewBox="0 0 200 70" className="w-full h-16">
            <polyline
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              points="0,55 25,50 50,52 75,35 100,40 125,20 150,24 175,8 200,10"
            />
            <circle cx="175" cy="8" r="4" fill="var(--primary)" />
          </svg>
        </CardShell>

        {/* Resume hub */}
        <CardShell eyebrow="Storage" icon={FileText} title="Profile & resume hub" desc="All your resumes, organized in one place.">
          <div className="space-y-2">
            {["My_Resume.pdf", "Frontend_Resume.pdf"].map((f, i) => (
              <div key={f} className="flex items-center gap-3 rounded-sm px-3 py-2" style={{ background: "var(--surface-2)" }}>
                <FileText size={14} className="text-primary shrink-0" />
                <span className="text-xs truncate flex-1">{f}</span>
                <div className="w-10 h-1 rounded-full overflow-hidden" style={{ background: "var(--border)" }}>
                  <div className="h-full rounded-full" style={{ width: i === 0 ? "80%" : "45%", background: "var(--primary)" }} />
                </div>
              </div>
            ))}
          </div>
        </CardShell>

        {/* Application tracker */}
        <CardShell eyebrow="Live" icon={Clock} title="Real-time application tracker" desc="Instant updates on every stage of your search.">
          <div className="flex gap-2 mb-3">
            {["This week", "This month"].map((t, i) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: i === 0 ? "var(--primary)" : "var(--surface-2)",
                  color: i === 0 ? "white" : "var(--muted)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-end gap-1.5 h-10">
            {[40, 65, 30, 80, 50, 90, 60].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? "var(--primary)" : "var(--border)" }} />
            ))}
          </div>
        </CardShell>

        {/* Resume optimizer */}
        <CardShell
          className="md:col-span-2"
          eyebrow="Generative"
          icon={Wand2}
          title="Dynamic resume optimizer"
          desc="AI suggests tailored tweaks to your resume for each role you match with."
        >
          <div className="flex flex-wrap gap-2">
            {["+ Add 'GraphQL' to skills", "Rephrase bullet #2", "Quantify impact in role #1"].map((s) => (
              <span key={s} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "var(--surface-2)", border: "1px dashed var(--border)", color: "var(--muted)" }}>
                {s}
              </span>
            ))}
          </div>
        </CardShell>
      </div>
    </section>
  );
}