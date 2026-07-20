"use client";
import { motion } from "framer-motion";
import { Target, Zap, ShieldCheck } from "lucide-react";
import { Card } from "../components/ui/Card";
import BentoFeatures from "../components/BentoFeatures";
import Hero from "../components/Hero";
import PricingSection from "../components/PricingSection";
import SpotlightBand from "../components/SpotLightBand";
import CtaBand from "../components/ctaBand";
import Footer from "../components/Footer";

const features = [
  { icon: Target, title: "Semantic matching", desc: "We read meaning, not just keywords — so a great candidate isn't filtered out over phrasing." },
  { icon: Zap, title: "Instant ranking", desc: "Upload a job or resume once. Ranked matches with reasoning appear in seconds." },
  { icon: ShieldCheck, title: "Explainable results", desc: "Every match comes with a plain-language reason, not a black-box score." },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Pricing sits right under the hero/globe, same as the reference
          layout — visible without needing to scroll past every section. */}
      <PricingSection variant="home" />

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
              <div className="w-10 h-10 rounded-(--radius-md) flex items-center justify-center mb-4"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}>
                <f.icon size={18} className="text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </section>

      <BentoFeatures />

      <SpotlightBand />

      <CtaBand />
      <Footer />
    </div>
  );
}