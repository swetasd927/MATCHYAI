import { cn } from "../../lib/utils";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-medium font-[family-name:var(--font-mono)] border",
        className
      )}
      style={{ background: "var(--surface-2)", borderColor: "var(--border)", color: "var(--muted)" }}
    >
      {children}
    </span>
  );
}