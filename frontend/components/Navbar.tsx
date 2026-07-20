"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../lib/auth";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/Button";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/seeker", label: "For Job Seekers" },
  { href: "/recruiter", label: "For Recruiters" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 px-4 sm:px-6 pt-4"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between rounded-[var(--radius-lg)] transition-all duration-300 ${
          scrolled ? "glass shadow-[var(--shadow-md)] px-5 py-3" : "px-5 py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--primary)] text-white">
            <Sparkles size={16} />
          </span>
          Matchy<span className="text-gradient">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 relative">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium rounded-full text-[var(--muted)] hover:text-[var(--text)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-[var(--muted)]">{user.firstName}</span>
              <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--text)]">
                Login
              </Link>
              <Link href="/register"><Button size="sm">Get Started</Button></Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden max-w-6xl mx-auto mt-2 card p-4 flex flex-col gap-3"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
            <ThemeToggle />
            <Link href="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}