"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  UserPlus,
  Briefcase,
  Ban,
  Copyright,
  CreditCard,
  ShieldAlert,
  Scale,
  RefreshCw,
  Mail,
  ChevronDown,
  Handshake,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import Footer from "../../components/Footer";

const glance = [
  { icon: UserPlus, label: "Your account", desc: "Keep it accurate & secure" },
  { icon: Briefcase, label: "The content you post", desc: "You own it, we just match it" },
  { icon: Ban, label: "Fair use", desc: "No scraping, spam, or abuse" },
  { icon: Scale, label: "Liability", desc: "Matches are guidance, not guarantees" },
];

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    body: "By creating an account or using MatchyAI, you agree to these Terms of Service. If you don't agree, please don't use the platform. We may update these terms from time to time, and continued use after changes means you accept the new terms.",
  },
  {
    icon: UserPlus,
    title: "Accounts & Eligibility",
    body: "You must be at least 16 years old to use MatchyAI. You're responsible for keeping your login credentials secure and for all activity under your account. Provide accurate information when registering — we may suspend accounts that contain false or misleading details.",
  },
  {
    icon: Briefcase,
    title: "Content You Provide",
    body: "You retain ownership of the resumes, job postings, and other content you upload. By submitting content, you grant MatchyAI a limited license to process it solely to generate matches and operate the service — nothing more.",
  },
  {
    icon: Ban,
    title: "Acceptable Use",
    body: "Don't misuse the platform: no scraping, reverse engineering, impersonation, spam, fraudulent job postings, or uploading content you don't have rights to. Violating this may result in suspension or termination without notice.",
  },
  {
    icon: Copyright,
    title: "Intellectual Property",
    body: "MatchyAI's matching engine, branding, and platform design are our property and protected by intellectual property law. Nothing in these terms transfers ownership of our technology to you.",
  },
  {
    icon: CreditCard,
    title: "Payments & Subscriptions",
    body: "Paid plans are billed on the cycle you select at checkout. Fees are non-refundable except where required by law. You can cancel anytime; cancellation takes effect at the end of the current billing period.",
  },
  {
    icon: ShieldAlert,
    title: "Disclaimers & Limitation of Liability",
    body: "Match scores and rankings are intended to assist decision-making, not replace it — we don't guarantee hiring outcomes or job placement. MatchyAI is provided \"as is,\" and to the extent permitted by law, we aren't liable for indirect or incidental damages arising from your use of the service.",
  },
  {
    icon: Handshake,
    title: "Termination",
    body: "You may stop using MatchyAI and delete your account at any time. We may suspend or terminate accounts that violate these terms, pose a security risk, or remain inactive for an extended period.",
  },
  {
    icon: RefreshCw,
    title: "Changes to These Terms",
    body: "We may revise these terms as MatchyAI evolves. For material changes, we'll notify you by email or an in-app notice ahead of the update taking effect.",
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
    <Card className="!p-0 overflow-hidden">
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
          className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.25rem] text-sm leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {body}
        </p>
      </motion.div>
    </Card>
  );
}

export default function TermsPage() {
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
          <FileText size={13} /> Legal · Terms of Service
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-xl mx-auto leading-tight"
        >
          The <span className="text-gradient">ground rules</span> for using MatchyAI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-lg mx-auto text-sm sm:text-base"
          style={{ color: "var(--muted)" }}
        >
          Simple, fair terms that keep matching honest for everyone. Last updated July 21, 2026.
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
            <h3 className="font-semibold mb-1 text-sm sm:text-base">Questions about these terms?</h3>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Reach out to{" "}
              <a href="mailto:legal@matchyai.app" className="underline hover:text-primary">
                legal@matchyai.app
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