import { cn } from "../../lib/utils";

type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger";

const styles: Record<
  BadgeVariant,
  { bg: string; border: string; color: string }
> = {
  neutral: {
    bg: "var(--surface-2)",
    border: "var(--border)",
    color: "var(--muted)",
  },
  primary: {
    bg: "color-mix(in oklab, var(--primary) 14%, transparent)",
    border: "color-mix(in oklab, var(--primary) 40%, transparent)",
    color: "var(--primary)",
  },
  success: {
    bg: "color-mix(in oklab, var(--success) 14%, transparent)",
    border: "color-mix(in oklab, var(--success) 40%, transparent)",
    color: "var(--success)",
  },
  warning: {
    bg: "color-mix(in oklab, var(--warning) 14%, transparent)",
    border: "color-mix(in oklab, var(--warning) 40%, transparent)",
    color: "var(--warning)",
  },
  danger: {
    bg: "color-mix(in oklab, var(--danger) 14%, transparent)",
    border: "color-mix(in oklab, var(--danger) 40%, transparent)",
    color: "var(--danger)",
  },
};

export function Badge({
  className,
  variant = "neutral",
  children,
}: {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  const s = styles[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-pill text-xs font-medium font-mono border",
        className,
      )}
      style={{ background: s.bg, borderColor: s.border, color: s.color }}
    >
      {children}
    </span>
  );
}
