import { Match } from "../types";
import { MatchRing } from "./MatchRing";
import { Zap } from "lucide-react";

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{match.name || "Unnamed Candidate"}</h3>
          <p className="text-sm line-clamp-1" style={{ color: "var(--muted)" }}>
            {match.experience[0] || "No experience listed"}
          </p>
        </div>
        <MatchRing percentage={match.matchPercentage} size={64} />
      </div>

      {match.explanation && (
        <div className="rounded-(--radius-md) p-4 flex gap-3"
          style={{ background: "color-mix(in oklab, var(--primary) 8%, transparent)", border: "1px solid color-mix(in oklab, var(--primary) 25%, transparent)" }}>
          <Zap size={16} className="text-primary mt-0.5 shrink-0" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-1 text-primary">AI Match Insight</h4>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{match.explanation}</p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {match.skills.slice(0, 6).map((skill) => (
          <span key={skill} className="px-2.5 py-1 text-xs font-mono rounded-full"
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--muted)" }}>
            {skill}
          </span>
        ))}
        {match.skills.length > 6 && (
          <span className="text-xs self-center" style={{ color: "var(--muted)" }}>+{match.skills.length - 6} more</span>
        )}
      </div>
    </div>
  );
}