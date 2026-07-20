"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import CtaBand from "../../components/ctaBand";
import Footer from "../../components/Footer";

type Plan = {
  name: string;
  tagline: string;
  monthly: number | null;
  yearly: number | null;
  priceSuffix?: string;
  highlight?: boolean;
  cta: string;
  ctaHref: string;
  features: { label: string; included: boolean }[];
};

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For individuals trying MatchyAI out",
    monthly: 0,
    yearly: 0,
    cta: "Get Started Free",
    ctaHref: "/register",
    features: [
      { label: "5 resume-to-job matches / month", included: true },
      { label: "Semantic match scoring", included: true },
      { label: "Plain-language match reasoning", included: true },
      { label: "1 active job post", included: true },
      { label: "Bulk resume uploads", included: false },
      { label: "Team seats", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    tagline: "For recruiters and active job seekers",
    monthly: 29,
    yearly: 24,
    priceSuffix: "/mo",
    highlight: true,
    cta: "Start Free Trial",
    ctaHref: "/register",
    features: [
      { label: "Unlimited resume-to-job matches", included: true },
      { label: "Semantic match scoring", included: true },
      { label: "Plain-language match reasoning", included: true },
      { label: "Unlimited active job posts", included: true },
      { label: "Bulk resume uploads", included: true },
      { label: "3 team seats", included: true },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Enterprise",
    tagline: "For hiring teams at scale",
    monthly: null,
    yearly: null,
    cta: "Contact Sales",
    ctaHref: "/contact",
    features: [
      { label: "Unlimited resume-to-job matches", included: true },
      { label: "Semantic match scoring", included: true },
      { label: "Plain-language match reasoning", included: true },
      { label: "Unlimited active job posts", included: true },
      { label: "Bulk resume uploads", included: true },
      { label: "Unlimited team seats", included: true },
      { label: "Priority support & SSO", included: true },
    ],
  },
];

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
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      {/* Header */}
      <section className="pt-20 pb-12 text-center">
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
          <Sparkles size={13} /> Simple, transparent pricing
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight"
        >
          Pricing that scales <span className="text-gradient">with you</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 max-w-md mx-auto text-base sm:text-lg"
          style={{ color: "var(--muted)" }}
        >
          Start free. Upgrade when you need more matches, more seats, or more firepower.
        </motion.p>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-pill border"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
          <button
            onClick={() => setYearly(false)}
            className="relative px-4 py-2 text-sm font-semibold rounded-pill transition-colors"
            style={{ color: !yearly ? "var(--text)" : "var(--muted)" }}
          >
            {!yearly && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-pill -z-10"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className="relative px-4 py-2 text-sm font-semibold rounded-pill transition-colors flex items-center gap-2"
            style={{ color: yearly ? "var(--text)" : "var(--muted)" }}
          >
            {yearly && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-pill -z-10"
                style={{ background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">Yearly</span>
            <span className="relative z-10 text-xs font-bold px-2 py-0.5 rounded-pill" style={{ background: "color-mix(in oklab, var(--success) 16%, transparent)", color: "var(--success)" }}>
              -18%
            </span>
          </button>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="pb-20 grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card
                className="h-full flex flex-col relative overflow-hidden"
                style={
                  plan.highlight
                    ? { border: "1px solid var(--primary)", boxShadow: "var(--shadow-glow)" }
                    : undefined
                }
              >
                {plan.highlight && (
                  <div
                    className="pointer-events-none absolute -top-20 -right-10 w-56 h-56 rounded-full blur-3xl opacity-40"
                    style={{ background: "color-mix(in oklab, var(--primary) 40%, transparent)" }}
                  />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-display text-xl font-bold">{plan.name}</h3>
                    {plan.highlight && <Badge variant="primary">Most Popular</Badge>}
                  </div>
                  <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                    {plan.tagline}
                  </p>

                  <div className="mb-6 flex items-end gap-1">
                    {price === null ? (
                      <span className="font-display text-4xl font-bold">Custom</span>
                    ) : (
                      <>
                        <span className="font-display text-4xl font-bold">${price}</span>
                        {price > 0 && (
                          <span className="text-sm mb-1" style={{ color: "var(--muted)" }}>
                            {plan.priceSuffix}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  <Link href={plan.ctaHref} className="mb-8">
                    <Button
                      variant={plan.highlight ? "primary" : "secondary"}
                      className="w-full justify-center"
                    >
                      {plan.cta}
                      <ArrowRight size={16} />
                    </Button>
                  </Link>

                  <ul className="flex flex-col gap-3 mt-auto">
                    {plan.features.map((f) => (
                      <li key={f.label} className="flex items-start gap-2.5 text-sm">
                        {f.included ? (
                          <Check size={16} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} />
                        ) : (
                          <X size={16} className="mt-0.5 shrink-0" style={{ color: "var(--muted)", opacity: 0.5 }} />
                        )}
                        <span style={{ color: f.included ? "var(--text)" : "var(--muted)" }}>{f.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </section>

      {/* FAQ */}
      <section className="pb-20 max-w-2xl mx-auto">
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