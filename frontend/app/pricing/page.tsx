"use client";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import PricingSection from "../../components/PricingSection";
import CtaBand from "../../components/ctaBand";
import Footer from "../../components/Footer";

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade, downgrade, or cancel anytime from your account settings. Changes apply on your next billing cycle.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Pro comes with a 14-day free trial, no credit card required to start.",
  },
  {
    q: "How does billing work for Enterprise?",
    a: "Enterprise is billed annually via invoice, with pricing based on team size and usage. Our sales team will put together a plan that fits.",
  },
  {
    q: "Do you offer discounts for nonprofits or students?",
    a: "Yes — reach out through our contact page and we'll get you set up with a discounted plan.",
  },
];

export default function PricingPage() {
  return (
    <div>
      <div className="pt-20">
        <PricingSection variant="full" />
      </div>

      {/* FAQ */}
      <section className="py-20 max-w-2xl mx-auto">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-10">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-4">
          {faqs.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card>
                <h4 className="font-semibold mb-2">{f.q}</h4>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {f.a}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaBand />
      <Footer />
    </div>
  );
}