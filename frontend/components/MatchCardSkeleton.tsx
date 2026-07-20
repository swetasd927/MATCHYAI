import { Skeleton, SkeletonCircle } from "./ui/Skeleton";

/**
 * Mirrors MatchCard.tsx's structure 1:1 (same slots, same sizes) so that
 * when real matches load in, nothing jumps or reflows — the skeleton is
 * just a placeholder occupying the exact same space.
 */
export default function MatchCardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1 mr-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-56" />
        </div>
        <SkeletonCircle size={64} />
      </div>

      <div className="rounded-(--radius-md) p-4 flex gap-3" style={{ background: "var(--surface-2)" }}>
        <Skeleton className="h-4 w-4 rounded-full shrink-0 mt-0.5" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[16, 20, 14, 18].map((w, i) => (
          <Skeleton key={i} className="h-6 rounded-full" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
    </div>
  );
}