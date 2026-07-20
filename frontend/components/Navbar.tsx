"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";
import { useAuth } from "../lib/auth";
import { cn } from "../lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/seeker", label: "For Job Seekers" },
  { href: "/recruiter", label: "For Recruiters" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          paddingTop: scrolled ? 10 : 20,
          paddingBottom: scrolled ? 10 : 20,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 px-4 md:px-6"
      >
        <div
          className={cn(
            "max-w-6xl mx-auto flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-300",
            scrolled
              ? "bg-white/4 backdrop-blur-xl border border-white/8 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)]"
              : "bg-transparent border border-transparent"
          )}
        >
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-brand to-brand-2">
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <span className="text-gradient">MatchyAI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-white/6 border border-white/6 rounded-lg"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-sm font-medium text-slate-200">{user.firstName} {user.lastName}</span>
                  <span className="text-xs text-brand-2 capitalize">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/4 hover:bg-white/8 rounded-full border border-white/8 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-medium bg-brand hover:bg-brand/90 text-white rounded-full transition-all shadow-[0_0_20px_-4px_rgba(99,102,241,0.6)] hover:shadow-[0_0_28px_-4px_rgba(99,102,241,0.8)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-19 left-4 right-4 z-40 glass-card p-4 space-y-1"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href ? "bg-white/6 text-white" : "text-slate-300 hover:bg-white/4"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/8 my-2" />
            {user ? (
              <button onClick={logout} className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/4">
                Logout
              </button>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link href="/login" className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium border border-white/8 text-slate-300">
                  Login
                </Link>
                <Link href="/register" className="flex-1 text-center px-4 py-2.5 rounded-lg text-sm font-medium bg-brand text-white">
                  Get Started
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}