import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import { houses } from "@/data/houses";
import { NexusCanvas, ScienceGrid, Starfield } from "./shared";

function readVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

function Tower({
  index,
  name,
  id,
  colorVar,
}: {
  index: number;
  name: string;
  id: string;
  colorVar: string;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);
  const color = readVar(colorVar, "#7fd8f0");
  const x = (index - 1.5) * 2.6;
  const height = 3.2;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.003;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + index) * 0.08;
  });

  return (
    <group
      position={[x, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "auto";
        void navigate({ to: `/houses/${id}` });
      }}
    >
      <group ref={ref}>
        <mesh position={[0, height / 2 - 1.6, 0]}>
          <cylinderGeometry args={[0.55, 0.8, height, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 0.7 : 0.25}
            transparent
            opacity={0.55}
            metalness={0.5}
            roughness={0.25}
          />
        </mesh>
        <mesh position={[0, height - 1.35, 0]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1.5 : 0.6} />
        </mesh>
        <mesh position={[0, -1.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.01, 8, 64]} />
          <meshBasicMaterial color={color} transparent opacity={hovered ? 0.9 : 0.4} />
        </mesh>
      </group>
      <Html center position={[0, -2.15, 0]} distanceFactor={10} zIndexRange={[10, 0]}>
        <div className="pointer-events-none select-none whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] tracking-[0.18em] text-white/90 backdrop-blur-md">
          {name.toUpperCase()}
        </div>
      </Html>
    </group>
  );
}

export default function TowersScene() {
  return (
    <NexusCanvas cameraPosition={[0, 0.8, 9]} fov={52}>
      <fog attach="fog" args={["#0b1020", 10, 24]} />
      <Starfield count={280} radius={20} />
      <ScienceGrid y={-1.62} />
      {houses.map((h, i) => (
        <Tower key={h.id} index={i} name={h.name} id={h.id} colorVar={h.colorVar} />
      ))}
    </NexusCanvas>
  );
}
