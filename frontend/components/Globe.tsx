"use client";
import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";

/**
 * Cities we "serve" — feel free to add/remove. Kathmandu is included since
 * that's where this project is being built, alongside major global hubs to
 * sell the "global job network" idea from the reference design.
 */
const MARKERS: COBEOptions["markers"] = [
  { location: [27.7172, 85.324], size: 0.09 }, // Kathmandu
  { location: [40.7128, -74.006], size: 0.06 }, // New York
  { location: [51.5074, -0.1278], size: 0.06 }, // London
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
  { location: [37.7749, -122.4194], size: 0.05 }, // San Francisco
  { location: [28.6139, 77.209], size: 0.06 }, // Delhi
  { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
  { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
];

/** Converts a "#rrggbb" CSS color into cobe's expected [0-1, 0-1, 0-1] tuple. */
function hexToUnitRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const bigint = parseInt(clean, 16);
  if (Number.isNaN(bigint) || clean.length !== 6) return [0.9, 0.4, 0.1]; // safe fallback
  return [((bigint >> 16) & 255) / 255, ((bigint >> 8) & 255) / 255, (bigint & 255) / 255];
}

export default function Globe({
  size = 480,
  className = "",
  forceDark,
}: {
  size?: number;
  className?: string;
  /** Ignore the site's light/dark theme and always render as dark (or light). */
  forceDark?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Drag-to-spin state, doesn't trigger re-renders — read inside onRender.
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerDelta = useRef(0);
  const autoRotateSpeed = useRef(0.0035);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    // Read the current theme's actual colors from CSS variables so the
    // globe re-themes itself automatically between light/dark mode instead
    // of using hardcoded colors. forceDark bypasses this entirely and uses
    // a fixed blue "deep space" palette, independent of the brand color.
    const styles = getComputedStyle(document.documentElement);
    const primary: [number, number, number] = forceDark
      ? [0.35, 0.55, 1]
      : hexToUnitRgb(styles.getPropertyValue("--primary") || "#e8600c");
    const primaryLight: [number, number, number] = forceDark
      ? [0.55, 0.75, 1]
      : hexToUnitRgb(styles.getPropertyValue("--primary-light") || "#ff8a3d");
    const isDark = forceDark ?? resolvedTheme === "dark";

    let globe: ReturnType<typeof createGlobe> | null = null;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        widthRef.current = width;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.32,
      dark: isDark ? 1 : 0.4,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: isDark ? 5.5 : 3.5,
      baseColor: forceDark ? [0.05, 0.09, 0.22] : isDark ? [0.14, 0.12, 0.1] : [0.9, 0.86, 0.8],
      markerColor: primary,
      glowColor: primaryLight,
      markers: MARKERS,
      opacity: 0.9,
      onRender: (state) => {
        // Auto-rotate unless the user is actively dragging.
        if (pointerInteracting.current === null) {
          phiRef.current += autoRotateSpeed.current;
        } else {
          phiRef.current += pointerDelta.current;
        }
        state.phi = phiRef.current;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    return () => {
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, resolvedTheme, forceDark]);

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerDelta.current = delta * 0.006;
            pointerInteracting.current = e.clientX;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerDelta.current = delta * 0.006;
            pointerInteracting.current = e.touches[0].clientX;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </div>
  );
}