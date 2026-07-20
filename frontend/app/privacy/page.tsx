"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Share2,
  Lock,
  Clock,
  UserCheck,
  Cookie,
  Baby,
  RefreshCw,
  Mail,
  ChevronDown,
  Eye,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import Footer from "../../components/Footer";

const glance = [
  { icon: Database, label: "What we collect", desc: "Resumes, job posts & basic account info" },
  { icon: Eye, label: "Why we collect it", desc: "Only to generate your matches" },
  { icon: Share2, label: "Who sees it", desc: "Never sold, never shared without consent" },
  { icon: Lock, label: "How it's protected", desc: "Encrypted in transit and at rest" },
];

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    body: "We collect what you give us directly — your name, email, resume or job posting content, and account details. We also collect basic usage data, like pages visited and match interactions, to keep the product working smoothly.",
  },
  {
    icon: ShieldCheck,
    title: "How We Use Your Information",
    body: "Your data powers your matches. We use resumes and job posts to generate ranked, explainable results, and account info to manage your login and preferences. We do not use your personal data to train shared models without your explicit consent.",
  },
  {
    icon: Share2,
    title: "Data Sharing & Third Parties",
    body: "We never sell your data. We only share information with trusted infrastructure providers (hosting, email, analytics) who process it strictly on our behalf, under confidentiality agreements, and only to the extent needed to run the service.",
  },
  {
    icon: Lock,
    title: "Data Security",
    body: "All data is encrypted in transit (TLS) and at rest. Access to production systems is restricted to authorized personnel, and we continuously monitor for vulnerabilities to keep your information safe.",
  },
  {
    icon: Clock,
    title: "Data Retention",
    body: "We keep your data only as long as your account is active or as needed to provide the service. You can request deletion of your resume, job data, or account at any time, and we'll remove it within 30 days.",
  },
  {
    icon: UserCheck,
    title: "Your Rights & Choices",
    body: "You can access, update, export, or delete your personal data at any time from your account settings. Depending on your location, you may also have additional rights under laws like the GDPR or CCPA — reach out and we'll help.",
  },
  {
    icon: Cookie,
    title: "Cookies & Tracking",
    body: "We use essential cookies to keep you signed in and a small set of analytics cookies to understand how MatchyAI is used. You can disable non-essential cookies anytime through your browser settings.",
  },
  {
    icon: Baby,
    title: "Children's Privacy",
    body: "MatchyAI is intended for users aged 16 and older. We do not knowingly collect data from children, and we'll delete any such data if we become aware of it.",
  },
  {
    icon: RefreshCw,
    title: "Changes to This Policy",
    body: "We may update this policy as our product evolves. If a change is material, we'll notify you by email or an in-app notice before it takes effect.",
  },
];

function AccordionItem({
  icon: Icon,
  title,
  body,
  isOpen,
  onToggle,
}: {
  icon: any;
  title: string;
  body: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="p-0! overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 text-left p-5 sm:p-6"
      >
        <div
          className="w-9 h-9 rounded-(--radius-md) flex items-center justify-center shrink-0"
          style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
        >
          <Icon size={16} className="text-primary" />
        </div>
        <span className="flex-1 font-semibold text-sm sm:text-base">{title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} style={{ color: "var(--muted)" }} />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <p
          className="px-5 sm:px-6 pb-5 sm:pb-6 pl-15 sm:pl-17 text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {body}
        </p>
      </motion.div>
    </Card>
  );
}

export default function PrivacyPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      {/* Hero */}
      <section className="pt-20 pb-14 text-center">
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
          <ShieldCheck size={13} /> Legal · Privacy Policy
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-xl mx-auto leading-tight"
        >
          Your data, <span className="text-gradient">handled responsibly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-lg mx-auto text-sm sm:text-base"
          style={{ color: "var(--muted)" }}
        >
          This policy explains what we collect, why we collect it, and the control you have
          over it. Last updated July 21, 2026.
        </motion.p>
      </section>

      {/* At a glance */}
      <section className="pb-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {glance.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Card className="h-full">
                <g.icon size={17} className="text-primary mb-3" />
                <h3 className="font-semibold text-sm mb-1">{g.label}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                  {g.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sections */}
      <section className="pb-16 max-w-2xl mx-auto">
        <div className="flex flex-col gap-3">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <AccordionItem
                icon={s.icon}
                title={s.title}
                body={s.body}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact strip */}
      <section className="pb-20 max-w-2xl mx-auto">
        <Card className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
          >
            <Mail size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Questions about your data?</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Reach out to{" "}
              <a href="mailto:privacy@matchyai.app" className="underline hover:text-primary">
                privacy@matchyai.app
              </a>{" "}
              and we'll get back to you within 2 business days.
            </p>
          </div>
        </Card>
      </section>

      <Footer />
    </div>
  );
}