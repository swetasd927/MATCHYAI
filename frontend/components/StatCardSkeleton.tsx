import { Skeleton } from "./ui/Skeleton";
import { Card } from "./ui/Card";

/** Mirrors the stat cards at the top of app/recruiter/page.tsx. */
export default function StatCardSkeleton() {
  return (
    <Card className="p-4! sm:p-5!">
      <Skeleton className="h-4 w-4 rounded-full mb-2.5" />
      <Skeleton className="h-6 w-10 mb-1.5" />
      <Skeleton className="h-3 w-20" />
    </Card>
  );
}