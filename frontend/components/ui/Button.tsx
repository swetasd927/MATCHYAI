"use client";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-[var(--shadow-glow)]",
  secondary: "bg-[var(--surface-2)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)]/50",
  ghost: "bg-transparent text-[var(--text)] hover:bg-[var(--surface-2)]",
};
const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-3.5 text-base" };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  )
);
Button.displayName = "Button";