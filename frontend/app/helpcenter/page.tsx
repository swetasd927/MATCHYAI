"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LifeBuoy,
  Rocket,
  UserCircle,
  FileSearch,
  Building2,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import Footer from "../../components/Footer";

const categories = [
  { icon: Rocket, label: "Getting Started" },
  { icon: UserCircle, label: "Account & Billing" },
  { icon: FileSearch, label: "For Job Seekers" },
  { icon: Building2, label: "For Recruiters" },
  { icon: Sparkles, label: "Matching & AI" },
  { icon: ShieldCheck, label: "Privacy & Security" },
];

const faqs = [
  {
    category: "Getting Started",
    q: "How do I create a MatchyAI account?",
    a: "Click \"Get Started\" on the homepage, choose whether you're a job seeker or recruiter, and sign up with your email. You'll be matching within minutes — no credit card required.",
  },
  {
    category: "Getting Started",
    q: "What file formats can I upload?",
    a: "We support PDF and DOCX for resumes and job descriptions. Files should be under 10MB for the fastest processing.",
  },
  {
    category: "Matching & AI",
    q: "How does the matching engine work?",
    a: "MatchyAI reads resumes and job posts for meaning — skills, context, and intent — rather than just keywords, then ranks results and explains each match in plain language.",
  },
  {
    category: "Matching & AI",
    q: "Why did I get a low match score?",
    a: "Scores reflect how closely your experience aligns with a role's core requirements. Each result includes a reason, so you can see exactly what drove the score and what to adjust.",
  },
  {
    category: "For Job Seekers",
    q: "Can recruiters see my resume without my consent?",
    a: "No. Your resume is only visible to recruiters once you apply or explicitly opt in to be discoverable. You're always in control of your visibility.",
  },
  {
    category: "For Recruiters",
    q: "How many job posts can I create on the free plan?",
    a: "The free plan includes one active job post at a time. Paid plans unlock multiple concurrent listings — see our Pricing page for details.",
  },
  {
    category: "Account & Billing",
    q: "How do I cancel my subscription?",
    a: "Go to Account Settings → Billing → Cancel Plan. Your access continues until the end of the current billing period, and you won't be charged again.",
  },
  {
    category: "Privacy & Security",
    q: "Is my data used to train AI models?",
    a: "Never without your explicit consent. Your resumes and job data are used solely to generate your matches. See our Privacy Policy for full details.",
  },
];

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesQuery =
        !query ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !activeCategory || f.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-10 text-center">
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
          <LifeBuoy size={13} /> Help Center
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-xl mx-auto leading-tight"
        >
          How can we <span className="text-gradient">help you today?</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-md mx-auto relative"
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--muted)" }}
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for answers..."
            className="pl-11"
          />
        </motion.div>
      </section>

      {/* Categories */}
      <section className="pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((c, i) => {
            const active = activeCategory === c.label;
            return (
              <motion.button
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setActiveCategory(active ? null : c.label)}
                whileHover={{ y: -3 }}
              >
                <Card
                  className="h-full flex flex-col items-center text-center gap-2 p-4!"
                  style={{
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    background: active
                      ? "color-mix(in oklab, var(--primary) 8%, var(--surface))"
                      : undefined,
                  }}
                >
                  <c.icon size={18} className="text-primary" />
                  <span className="text-xs font-semibold leading-tight">{c.label}</span>
                </Card>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-16 max-w-2xl mx-auto">
        <h2 className="font-display text-xl sm:text-2xl font-bold mb-6">
          {activeCategory ? activeCategory : "Frequently asked questions"}
        </h2>

        {filtered.length === 0 ? (
          <Card className="text-center py-10">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              No results for "{query}". Try a different search or browse a category above.
            </p>
          </Card>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((f, i) => (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <Card className="p-0! overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center gap-4 text-left p-5 sm:p-6"
                  >
                    <span className="flex-1 font-semibold text-sm sm:text-base">{f.q}</span>
                    <motion.span
                      animate={{ rotate: open === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} style={{ color: "var(--muted)" }} />
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: open === i ? "auto" : 0,
                      opacity: open === i ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm leading-relaxed"
                      style={{ color: "var(--muted)" }}
                    >
                      {f.a}
                    </p>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Contact strip */}
      <section className="pb-20 max-w-2xl mx-auto">
        <Card className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
          >
            <MessageCircle size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Still need help?</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Our team typically replies within a few hours.
            </p>
          </div>
          <a
            href="mailto:support@matchyai.app"
            className="inline-flex items-center gap-2 text-sm font-semibold whitespace-nowrap px-4 py-2.5 rounded-pill shrink-0"
            style={{
              background: "var(--primary)",
              color: "white",
            }}
          >
            <Mail size={14} /> Contact Support
          </a>
        </Card>
      </section>

      <Footer />
    </div>
  );
}