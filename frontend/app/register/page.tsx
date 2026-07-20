"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertCircle, User, Briefcase } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { FloatingInput } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import AuthPanel from "../../components/AuthPanel";

type Role = "seeker" | "recruiter";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "seeker" as Role,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 md:py-16">
      <div
        className="max-w-5xl mx-auto grid md:grid-cols-2 rounded-lg overflow-hidden border"
        style={{ borderColor: "var(--border)", background: "var(--surface)" }}
      >
        <AuthPanel
          eyebrow="Join MatchyAI"
          title="Matching that"
          gradientWord="reads meaning, not keywords."
          subtitle="Create a free account and get ranked, explainable matches in seconds — whether you're hiring or job hunting."
          highlights={["Free to start, no credit card", "Setup takes about 2 minutes", "Built for seekers & recruiters alike"]}
        />

        <div className="flex items-center justify-center px-6 sm:px-10 py-14">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-2">Create your account</h2>
            <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
              Already have one?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="flex items-start gap-2 px-4 py-3 rounded-(--radius-md) text-sm overflow-hidden"
                  style={{
                    background: "color-mix(in oklab, var(--danger) 10%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--danger) 30%, transparent)",
                    color: "var(--danger)",
                  }}
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Role toggle */}
            <div
              className="grid grid-cols-2 gap-1.5 p-1.5 rounded-(--radius-md) mb-5"
              style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
            >
              {(
                [
                  { role: "seeker" as Role, label: "Job Seeker", icon: User },
                  { role: "recruiter" as Role, label: "Recruiter", icon: Briefcase },
                ]
              ).map((opt) => {
                const active = form.role === opt.role;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setForm({ ...form, role: opt.role })}
                    className="relative flex items-center justify-center gap-1.5 py-2.5 rounded-sm text-sm font-semibold transition-colors"
                    style={{
                      background: active ? "var(--primary)" : "transparent",
                      color: active ? "white" : "var(--muted)",
                    }}
                  >
                    <opt.icon size={14} />
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <FloatingInput
                label="First name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Last name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col gap-5">
              <FloatingInput
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <FloatingInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-8 group">
              {!loading && (
                <>
                  Create Account
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
              {loading && "Creating account..."}
            </Button>

            <p className="text-xs text-center mt-5" style={{ color: "var(--muted)" }}>
              By signing up, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.form>
        </div>
      </div>
    </div>
  );
}