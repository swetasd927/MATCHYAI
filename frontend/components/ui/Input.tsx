import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-(--radius-md) px-4 py-3 text-sm outline-none border transition-colors",
        "bg-surface border-border text-text placeholder:text-muted",
        "focus:border-primary focus:ring-2 focus:ring-(--primary)/20",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";