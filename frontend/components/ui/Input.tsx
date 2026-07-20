import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-[var(--radius-md)] px-4 py-3 text-sm outline-none border transition-colors",
        "bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--muted)]",
        "focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";