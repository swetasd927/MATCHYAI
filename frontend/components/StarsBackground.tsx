"use client";
import { useMemo } from "react";

type Star = {
  top: string;
  left: string;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  duration: number;
  delay: number;
};

export default function StarsBackground({
  count = 120,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  // Random but stable for the lifetime of the mount — regenerating on every
  // render would make the field "jump" whenever a parent re-renders.
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.85 ? 1 : Math.random() < 0.97 ? 1.5 : 2,
      minOpacity: 0.1 + Math.random() * 0.15,
      maxOpacity: 0.6 + Math.random() * 0.4,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 4,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s, i) => (
        <span
          key={i}
          className="animate-star-twinkle absolute rounded-full bg-white"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--star-min": s.minOpacity,
              "--star-max": s.maxOpacity,
              "--star-duration": `${s.duration}s`,
              "--star-delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}