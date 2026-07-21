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
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
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

  // components/Globe.tsx — replace the useEffect that creates the globe
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const styles = getComputedStyle(document.documentElement);
    const primary = hexToUnitRgb(
      styles.getPropertyValue("--primary") || "#e8600c",
    );
    const primaryLight = hexToUnitRgb(
      styles.getPropertyValue("--primary-light") || "#ff8a3d",
    );
    const isDark = resolvedTheme === "dark";

    const el = canvasRef.current;

    // cobe's underlying WebGL renderer sets the canvas's REAL pixel buffer
    // size as `canvas.clientWidth * devicePixelRatio` internally — that part
    // is automatic and we don't control it directly. But the width/height we
    // pass into createGlobe (and update each frame) are used separately, as
    // a resolution constant baked into the shader's screen-space math. If
    // that constant doesn't exactly match the real buffer size, the sphere
    // renders at the wrong scale — on a non-Retina display (devicePixelRatio
    // 1) the old hardcoded "* 2" made the shader think the canvas was twice
    // its real size, so it only ever drew into one quarter of it. Using the
    // same dpr value for both keeps them in sync on every screen.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const initialWidth = el.getBoundingClientRect().width || size;
    widthRef.current = initialWidth;

    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: initialWidth * dpr,
      height: initialWidth * dpr,
      phi: 0,
      theta: 0.32,
      dark: isDark ? 1 : 0.4,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: isDark ? 5.5 : 3.5,
      baseColor: isDark ? [0.14, 0.12, 0.1] : [0.9, 0.86, 0.8],
      markerColor: primary,
      glowColor: primaryLight,
      markers: MARKERS,
      opacity: 0.9,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += autoRotateSpeed.current;
        } else {
          phiRef.current += pointerDelta.current;
        }
        state.phi = phiRef.current;
        state.width = widthRef.current * dpr;
        state.height = widthRef.current * dpr;
      },
    });

    // Still watch for real resizes (e.g. window resize) after creation —
    // just update the ref cobe reads on each frame, no recreation needed.
    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) widthRef.current = width;
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      globe.destroy();
    };
  }, [mounted, resolvedTheme, size]);

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size, maxWidth: "100%", aspectRatio: "1 / 1" }}
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