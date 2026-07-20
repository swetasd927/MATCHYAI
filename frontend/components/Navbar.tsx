"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    <nav
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        borderColor: scrolled ? "var(--border)" : "transparent",
        background: scrolled ? "color-mix(in oklab, var(--bg) 80%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white shrink-0">
            <Sparkles size={16} />
          </span>
          <span className="whitespace-nowrap">
            Matchy<span className="text-gradient">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap text-muted hover:text-text transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-muted whitespace-nowrap">{user.firstName}</span>
              <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-muted hover:text-text whitespace-nowrap">
                Login
              </Link>
              <Link href="/register"><Button size="sm">Get Started</Button></Link>
            </>
          )}
        </div>

        <button className="md:hidden shrink-0" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-4 flex flex-col gap-3" style={{ borderColor: "var(--border)", background: "var(--bg)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium">
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--border)" }}>
            <ThemeToggle />
            <Link href="/register"><Button size="sm">Get Started</Button></Link>
          </div>
        </div>
      )}
    </nav>
  );
}