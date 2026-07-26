"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { FloatingInput } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import AuthPanel from "../../components/AuthPanel";
import GoogleLoginButton from "../../components/GoogleLoginButton";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
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
          eyebrow="Welcome back"
          title="Pick up right"
          gradientWord="where you left off."
          subtitle="Sign in to see your latest matches, track applications, and keep your profile working for you."
          highlights={["Ranked, explainable matches", "Real-time application tracking", "Your data, never sold"]}
        />

        <div className="flex items-center justify-center px-6 sm:px-10 py-14">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm"
          >
            <h2 className="font-display text-3xl font-bold tracking-tight mb-2">Sign in</h2>
            <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
              New to MatchyAI?{" "}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>

            <div className="mb-6">
              <GoogleLoginButton onError={(err) => setError(err)} />
              <div className="relative my-6 flex items-center justify-center">
                <div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
                <span className="absolute px-3 text-xs uppercase tracking-wider bg-surface text-stone-400">
                  Or continue with email
                </span>
              </div>
            </div>

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

            <div className="flex flex-col gap-5">
              <FloatingInput
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FloatingInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full mt-8 group">
              {!loading && (
                <>
                  Sign In
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </>
              )}
              {loading && "Signing in..."}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}