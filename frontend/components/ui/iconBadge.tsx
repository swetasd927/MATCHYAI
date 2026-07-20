// components/ui/IconBadge.tsx
"use client";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export function IconBadge({
  icon: Icon,
  size = 40,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ borderColor: "var(--primary)" }}
      className={`relative flex items-center justify-center shrink-0 ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border)",
        background: "var(--surface)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* faint top-left highlight for depth, not a flat fill */}
      <span
        className="absolute inset-0 rounded-(--radius-md) pointer-events-none"
        style={{
          background: "linear-gradient(135deg, color-mix(in oklab, var(--text) 4%, transparent), transparent 60%)",
        }}
      />
      <Icon size={size * 0.42} strokeWidth={1.5} style={{ color: "var(--primary)" }} className="relative" />
    </motion.div>
  );
}