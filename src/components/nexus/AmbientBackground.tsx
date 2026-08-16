/** Cheap, always-on cinematic backdrop shared by every route (no WebGL cost). */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-deep" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, color-mix(in oklab, var(--primary) 16%, transparent), transparent 65%), radial-gradient(50% 40% at 85% 90%, color-mix(in oklab, var(--eco) 10%, transparent), transparent 70%), radial-gradient(60% 50% at 10% 70%, color-mix(in oklab, var(--house-chanakya) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="grid-field absolute inset-0 opacity-30 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
        <defs>
          <pattern id="nexus-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="currentColor" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexus-dots)" />
      </svg>
    </div>
  );
}

/** Route-change fade/scale so the whole site feels like one continuous world. */
export function RouteTransition({
  routeKey,
  children,
}: {
  routeKey: string;
  children: React.ReactNode;
}) {
  return (
    <div key={routeKey} className="animate-fade-up">
      {children}
    </div>
  );
}
