import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import { campusLocations } from "@/data/navigation";
import { CYAN, NexusCanvas, ScienceGrid, Starfield } from "./shared";

function LocationNode({
  index,
  total,
  label,
  to,
  glyph,
}: {
  index: number;
  total: number;
  label: string;
  to: string;
  glyph: string;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);

  const angle = (index / total) * Math.PI * 2;
  const radius = 4.2;
  const y = Math.sin(index * 1.7) * 0.9;
  const base: [number, number, number] = [Math.cos(angle) * radius, y, Math.sin(angle) * radius];

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = base[1] + Math.sin(state.clock.elapsedTime * 0.7 + index) * 0.12;
    const target = hovered ? 1.35 : 1;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
  });

  return (
    <group
      ref={ref}
      position={base}
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
        void navigate({ to });
      }}
    >
      <mesh>
        <octahedronGeometry args={[0.34, 0]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#9fe6fb"}
          emissive={CYAN}
          emissiveIntensity={hovered ? 1.4 : 0.5}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.62, 0.006, 8, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={hovered ? 0.9 : 0.35} />
      </mesh>
      <Html center distanceFactor={11} zIndexRange={[10, 0]}>
        <div
          className="pointer-events-none select-none whitespace-nowrap rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[11px] tracking-[0.14em] text-white/90 backdrop-blur-md"
          style={{ opacity: hovered ? 1 : 0.75 }}
        >
          <span className="mr-1.5">{glyph}</span>
          {label.toUpperCase()}
        </div>
      </Html>
    </group>
  );
}

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.12;
  });
  return (
    <group>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshStandardMaterial color="#7fd8f0" emissive={CYAN} emissiveIntensity={0.35} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.6, 24, 24]} />
        <meshStandardMaterial color="#c9f2ff" emissive={CYAN} emissiveIntensity={0.9} />
      </mesh>
    </group>
  );
}

function OrbitRig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.06;
    ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

export default function CampusScene() {
  return (
    <NexusCanvas cameraPosition={[0, 2.4, 9.5]} fov={52}>
      <fog attach="fog" args={["#0b1020", 9, 24]} />
      <Starfield count={420} radius={20} />
      <ScienceGrid y={-2.6} />
      <OrbitRig>
        <Core />
        {campusLocations.map((loc, i) => (
          <LocationNode
            key={loc.to}
            index={i}
            total={campusLocations.length}
            label={loc.label}
            to={loc.to}
            glyph={loc.glyph}
          />
        ))}
      </OrbitRig>
    </NexusCanvas>
  );
}
