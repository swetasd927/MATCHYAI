// components/Navbar.tsx
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../lib/auth";
import ProfileMenu from "./ProfileMenu";
import { Button } from "./ui/Button";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
  { href: "/seeker", label: "For Job Seekers" },
  { href: "/recruiter", label: "For Recruiters" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      if (pathname === path || (pathname === "/" && path === "/")) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b transition-all duration-300"
      style={{
        borderColor: scrolled ? "var(--border)" : "transparent",
        background: scrolled ? "color-mix(in oklab, var(--bg) 82%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
      }}
    >
      <div
        className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 transition-[padding] duration-300"
        style={{ paddingTop: scrolled ? "0.65rem" : "0.85rem", paddingBottom: scrolled ? "0.65rem" : "0.85rem" }}
      >
        {/* Left group: logo + nav links, anchored together */}
        <div className="flex items-center gap-8 min-w-0">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold shrink-0">
            <motion.span
              whileHover={{ rotate: 15, scale: 1.05 }}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white shrink-0"
            >
              <Sparkles size={14} />
            </motion.span>
            <span className="whitespace-nowrap tracking-tight">
              Matchy<span className="text-gradient">AI</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5 relative">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="relative px-3 py-1.5 text-[13px] font-medium rounded-full whitespace-nowrap transition-colors"
                  style={{ color: active ? "var(--text)" : "var(--muted)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right group: auth actions, pinned to the far right */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {user ? (
            <ProfileMenu />
          ) : (
            <>
              <Link href="/login" className="text-[13px] font-medium text-muted hover:text-text whitespace-nowrap transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-[13px] px-4 py-1.5 h-auto">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        <button className="lg:hidden shrink-0" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--bg)" }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    onClick={(e) => {
                      handleNavClick(e, l.href);
                      setMobileOpen(false);
                    }}
                    className="text-sm font-medium"
                    style={{ color: pathname === l.href ? "var(--primary)" : "var(--text)" }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                {user ? (
                  <>
                    <span className="text-sm font-medium">
                      {user.firstName} {user.lastName}
                    </span>
                    <Button variant="secondary" size="sm" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="text-sm font-medium text-muted">
                      Login
                    </Link>
                    <Link href="/register">
                      <Button size="sm">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}