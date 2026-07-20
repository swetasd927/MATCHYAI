"use client";
import { motion } from "framer-motion";
import ContactForm from "@/components/contactForm";
import Footer from "../../components/Footer";
import CtaBand from "../../components/ctaBand";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-5xl font-bold tracking-tight mb-4">
            Get in touch
          </h1>
          <p className="text-lg" style={{ color: "var(--muted)" }}>
            Have questions? Want to partner? Or just say hi?<br />
            We’d love to hear from you.
          </p>
        </motion.div>

        <ContactForm />

        <div className="mt-16 text-center text-sm" style={{ color: "var(--muted)" }}>
          Or email us directly at{" "}
          <a href="mailto:hello@matchyai.app" className="underline hover:text-primary">
            hello@matchyai.app
          </a>
        </div>
      </div>

      <CtaBand />
      <Footer />
    </div>
  );
}