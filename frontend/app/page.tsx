// app/page.tsx
"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

import { IconBadge } from "../components/ui/iconBadge";
import BentoFeatures from "../components/BentoFeatures";
import Hero from "../components/Hero";
import CtaBand from "../components/ctaBand";
import Footer from "../components/Footer";

const features = [
  {
    icon: Target,
    title: "Semantic matching",
    desc: "We read meaning, not just keywords — so a great candidate isn't filtered out over phrasing.",
  },
  {
    icon: Zap,
    title: "Instant ranking",
    desc: "Upload a job or resume once. Ranked matches with reasoning appear in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Explainable results",
    desc: "Every match comes with a plain-language reason, not a black-box score.",
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section id="features" className="py-20 grid md:grid-cols-3 gap-6">
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
              <IconBadge icon={f.icon} className="mb-4" />
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {f.desc}
              </p>
            </Card>
          </motion.div>
        ))}
      </section>

      <BentoFeatures />

      <section className="py-16 text-center card px-8">
        <h2 className="font-display text-3xl font-bold mb-3">Ready to match smarter?</h2>
        <p className="mb-6" style={{ color: "var(--muted)" }}>
          Free to start. No credit card required.
        </p>
        <Link href="/register">
          <Button size="lg">
            Get Started <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      <CtaBand />
      <Footer />
    </div>
  );
}