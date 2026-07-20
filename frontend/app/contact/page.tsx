"use client";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import ContactForm from "@/components/contactForm";
import Footer from "../../components/Footer";
import CtaBand from "../../components/ctaBand";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-12">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 noise-mesh" />

      <div className="max-w-xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-pill px-3 py-1 text-xs font-medium"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--primary)" }}
          >
            <Sparkles size={12} />
            Get in touch
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Let&apos;s <span className="text-gradient">talk</span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
            Have questions? Want to partner? Or just say hi?
            <br className="hidden sm:block" />
            We&apos;d love to hear from you.
          </p>
        </motion.div>

        <ContactForm />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm"
          style={{ color: "var(--muted)" }}
        >
          <Mail size={14} />
          Or email us directly at{" "}
          <a
            href="mailto:hello@matchyai.app"
            className="font-medium text-primary hover:underline underline-offset-4"
          >
            hello@matchyai.app
          </a>
        </motion.div>
      </div>

      <div className="mt-16">
        <CtaBand />
        <Footer />
      </div>
    </div>
  );
}