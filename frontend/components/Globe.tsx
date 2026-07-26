"use client";
import { useEffect, useRef, useState } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useTheme } from "next-themes";

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

function hexToUnitRgb(hex: string, fallback: [number, number, number] = [0.06, 0.24, 0.4]): [number, number, number] {
  const clean = hex.replace("#", "").trim();
  const bigint = parseInt(clean, 16);
  if (Number.isNaN(bigint) || clean.length !== 6) return fallback;
  return [
    ((bigint >> 16) & 255) / 255,
    ((bigint >> 8) & 255) / 255,
    (bigint & 255) / 255,
  ];
}

export default function Globe({
  size = 480,
  className = "",
  customBaseColor,
  customGlowColor,
  customMarkerColor,
}: {
  size?: number;
  className?: string;
  forceDark?: boolean;
  customBaseColor?: string;
  customGlowColor?: string;
  customMarkerColor?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerDelta = useRef(0);
  const autoRotateSpeed = useRef(0.0035);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const baseColor: [number, number, number] = customBaseColor
      ? hexToUnitRgb(customBaseColor)
      : [0.06, 0.24, 0.4];

    const glowColor: [number, number, number] = customGlowColor
      ? hexToUnitRgb(customGlowColor)
      : [0.06, 0.24, 0.4];

    const markerColor: [number, number, number] = customMarkerColor
      ? hexToUnitRgb(customMarkerColor)
      : [0.98, 0.945, 0.792];

    const el = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const initialWidth = el.getBoundingClientRect().width || size;
    widthRef.current = initialWidth;

    const globe = createGlobe(el, {
      devicePixelRatio: dpr,
      width: initialWidth * dpr,
      height: initialWidth * dpr,
      phi: 0,
      theta: 0.32,
      dark: 0,
      diffuse: 1.3,
      mapSamples: 14000,
      mapBrightness: 4.5,
      baseColor,
      markerColor,
      glowColor,
      markers: MARKERS,
      opacity: 0.92,
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

    const ro = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) widthRef.current = width;
    });
    ro.observe(el);

    return () => {
      ro.disconnect();
      globe.destroy();
    };
  }, [mounted, resolvedTheme, size, customBaseColor, customGlowColor, customMarkerColor]);

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