"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, User, Briefcase, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../lib/auth";
import AuthPanel from "../../components/AuthPanel";
import GoogleLoginButton from "../../components/GoogleLoginButton";

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
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 bg-black">
      <div
        className="w-full max-w-5xl grid md:grid-cols-2 rounded-2xl overflow-hidden border border-stone-800/80 shadow-2xl"
        style={{ background: "#0a0a0a" }}
      >
        {/* Left Panel: Animated Orbital Hero */}
        <AuthPanel
          title="Matching that reads meaning, not keywords."
          subtitle="Create a free account and get ranked, explainable matches in seconds — whether you're hiring or job hunting."
        />

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center px-8 sm:px-12 py-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-sm mx-auto"
          >
            {/* Header */}
            <h2 className="font-display text-3xl font-bold tracking-tight mb-1 text-white">
              Create an Account
            </h2>
            <p className="text-xs text-stone-400 mb-6">
              Join MatchyAI to get started in minutes
            </p>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="flex items-start gap-2 px-4 py-3 rounded-lg text-xs overflow-hidden bg-red-950/40 border border-red-800/50 text-red-400"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Role Toggle */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-lg mb-5 bg-stone-900 border border-stone-800">
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
                    className={`relative flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold transition-all ${
                      active
                        ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-sm"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    <opt.icon size={13} />
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-medium text-stone-300">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800/90 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-medium text-stone-300">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-stone-950 border border-stone-800/90 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-stone-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 rounded-lg bg-stone-950 border border-stone-800/90 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-medium text-stone-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 pr-10 rounded-lg bg-stone-950 border border-stone-800/90 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-sm font-semibold shadow-lg shadow-orange-600/20 transition-all disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5 flex items-center justify-center">
              <div className="w-full border-t border-stone-800" />
              <span className="absolute px-3 text-xs text-stone-500 bg-[#0a0a0a]">
                or
              </span>
            </div>

            {/* Google Register Button */}
            <div className="w-full">
              <GoogleLoginButton role={form.role} onError={(err) => setError(err)} />
            </div>

            {/* Sign In Footer Link */}
            <div className="mt-6 text-center text-xs text-stone-400">
              Already Have An Account?{" "}
              <Link href="/login" className="font-semibold text-orange-500 hover:underline ml-1">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}