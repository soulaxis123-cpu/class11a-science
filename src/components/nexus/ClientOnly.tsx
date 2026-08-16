import { useEffect, useState, type ReactNode } from "react";

/** Renders children only after hydration — required for WebGL / browser-only code. */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return <>{mounted ? children : fallback}</>;
}

/** Coarse capability check: skip heavy 3D on small / low-power / reduced-motion devices. */
export function useLightMode() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const cores = navigator.hardwareConcurrency ?? 8;
    setLight(reduce || small || cores <= 4);
  }, []);
  return light;
}
