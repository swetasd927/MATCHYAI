import { Skeleton } from "./ui/Skeleton";
import { Card } from "./ui/Card";

/** Mirrors the job card layout in app/recruiter/page.tsx (Card-based design). */
export default function JobCardSkeleton() {
  return (
    <Card className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3.5 w-14 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[14, 18, 12].map((w, i) => (
            <Skeleton key={i} className="h-6 rounded-full" style={{ width: `${w * 4}px` }} />
          ))}
        </div>
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
      <Skeleton className="h-10 w-36 rounded-pill shrink-0" />
    </Card>
  );
}