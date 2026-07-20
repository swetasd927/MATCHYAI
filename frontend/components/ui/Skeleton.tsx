import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("skeleton", className)} {...props} />;
}

/** Circular variant, for avatars / match-percentage rings. */
export function SkeletonCircle({
  size = 64,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { size?: number }) {
  return (
    <div
      className={cn("skeleton rounded-full shrink-0", className)}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}