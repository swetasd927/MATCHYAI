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

// The globe intentionally uses a blue palette rather than the orange brand
// color — matching the reference design's "network globe" look, which reads
// better as a data/network visual than an orange sphere would. Kept as its
// own constants (not tied to --primary) so it stays blue in both themes.
const GLOBE_BLUE = {
  markerDark: hexToUnitRgb("#4d9fff"),
  markerLight: hexToUnitRgb("#2f6fe0"),
  glowDark: hexToUnitRgb("#3b7dde"),
  glowLight: hexToUnitRgb("#6ea8f7"),
};

export default function Globe({
  size = 480,
  className = "",
}: {
  size?: number;
  className?: string;
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

    // Read the theme so the globe can pick light/dark-appropriate shades of
    // its (fixed) blue palette — colors are no longer pulled from the
    // orange --primary brand variable, see GLOBE_BLUE above.
    const isDark = resolvedTheme === "dark";

    let globe: ReturnType<typeof createGlobe> | null = null;
    let width = 0;
    let destroyed = false;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
        widthRef.current = width;
      }
    };

    // A window "resize" event alone isn't enough here: this canvas's size is
    // driven by its flex/aspect-ratio parent, which can settle to its final
    // width slightly *after* mount (font swap, animation, etc.) without ever
    // firing a window resize. When that happens the canvas's internal draw
    // buffer stays locked to a stale (often 0 or wrong) width forever, which
    // is what produced the squashed/"just an arc" render. ResizeObserver
    // tracks the actual element box instead, so it always self-corrects.
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width;
      widthRef.current = width;

      // First time we get a real (non-zero) measurement, (re)create the
      // globe so it starts at the correct size instead of 0.
      if (width > 0 && !globe && !destroyed) {
        createGlobeInstance();
      }
    });
    ro.observe(canvasRef.current);

    window.addEventListener("resize", onResize);
    onResize();

    function createGlobeInstance() {
      if (!canvasRef.current) return;
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        phi: 0,
        theta: 0.32,
        dark: isDark ? 1 : 0.4,
        // Toned down from the earlier version — that was tuned for visibility
        // but ended up reading as an over-bright glow. This keeps the sphere
        // clearly visible without blowing out into a "highlight" look.
        diffuse: 1.1,
        mapSamples: 14000,
        mapBrightness: isDark ? 3.2 : 3,
        baseColor: isDark ? [0.08, 0.13, 0.24] : [0.86, 0.9, 0.97],
        markerColor: isDark ? GLOBE_BLUE.markerDark : GLOBE_BLUE.markerLight,
        glowColor: isDark ? GLOBE_BLUE.glowDark : GLOBE_BLUE.glowLight,
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
    }

    // If we already have a real width at mount, create immediately instead
    // of waiting for the ResizeObserver's first callback.
    if (width > 0) createGlobeInstance();

    return () => {
      destroyed = true;
      globe?.destroy();
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [mounted, resolvedTheme]);

  return (
    <div
      className={`relative aspect-square ${className}`}
      style={{ width: size, maxWidth: "100%" }}
    >
      {/* Soft halo behind the sphere so its silhouette reads clearly against
          a dark page background — kept subtle so it reads as ambient light,
          not a bright highlight. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(61, 120, 220, 0.14) 0%, transparent 70%)",
        }}
      />
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