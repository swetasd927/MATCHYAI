// components/ProfileMenu.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../lib/auth";

function initials(first?: string, last?: string) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase() || "U";
}

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  if (!user) return null;

  const dashboardHref = user.role === "recruiter" ? "/recruiter" : "/seeker";

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Account menu"
        className="flex items-center justify-center w-9 h-9 rounded-full text-xs font-semibold text-white shrink-0 border-2 transition-colors"
        style={{
          background: "var(--primary)",
          borderColor: open ? "var(--primary)" : "transparent",
          outline: open ? "2px solid color-mix(in oklab, var(--primary) 30%, transparent)" : "none",
          outlineOffset: "2px",
        }}
      >
        {initials(user.firstName, user.lastName)}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-56 rounded-(--radius-md) border overflow-hidden z-50"
            style={{ borderColor: "var(--border)", background: "var(--surface)", boxShadow: "var(--shadow-md)" }}
          >
            <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
              <p className="text-sm font-semibold truncate">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs truncate mt-0.5" style={{ color: "var(--muted)" }}>
                {user.email}
              </p>
              <span
                className="inline-block mt-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)", color: "var(--primary)" }}
              >
                {user.role}
              </span>
            </div>

            <Link
              href={dashboardHref}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-2)]"
            >
              <LayoutDashboard size={15} style={{ color: "var(--muted)" }} />
              Dashboard
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-[var(--surface-2)]"
              style={{ color: "var(--danger)" }}
            >
              <LogOut size={15} />
              Log out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}