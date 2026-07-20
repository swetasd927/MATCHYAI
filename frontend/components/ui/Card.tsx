"use client";
import { HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "solid" | "glass";
  interactive?: boolean;
}

export function Card({ className, variant = "solid", interactive = false, children, ...props }: CardProps) {
  const base = cn(variant === "glass" ? "glass" : "card", "p-6", className);

  if (!interactive) {
    return <div className={base} {...props}>{children}</div>;
  }

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "var(--shadow-md)" }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(base, "cursor-pointer")}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}