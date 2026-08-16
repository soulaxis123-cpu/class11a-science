import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export const CYAN = "#63d5f0";
export const GREEN = "#5fd6a0";

export function NexusCanvas({
  children,
  cameraPosition = [0, 0, 8],
  fov = 50,
}: {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: cameraPosition, fov }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color={CYAN} />
      <directionalLight position={[-5, -3, -4]} intensity={0.4} color="#8ea0ff" />
      {children}
    </Canvas>
  );
}

/** Soft parallax: the group leans toward the pointer. */
export function PointerParallax({
  children,
  strength = 0.22,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.y += (pointer.x * strength - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-pointer.y * strength - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export function Starfield({ count = 700, radius = 26 }: { count?: number; radius?: number }) {
  const points = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * (0.4 + Math.random() * 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        color={CYAN}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Faint scientific coordinate plane far below the scene. */
export function ScienceGrid({ y = -3.2 }: { y?: number }) {
  return (
    <gridHelper
      args={[60, 60, new THREE.Color(CYAN), new THREE.Color("#2a3a55")]}
      position={[0, y, 0]}
    />
  );
}

export function useResponsiveScale(base = 1) {
  const { viewport } = useThree();
  return viewport.width < 6 ? base * 0.68 : base;
}
