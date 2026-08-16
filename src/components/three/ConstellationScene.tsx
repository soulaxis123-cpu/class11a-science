import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useNavigate } from "@tanstack/react-router";
import * as THREE from "three";
import { students, displayName } from "@/data/students";
import { getHouse } from "@/data/houses";
import { CYAN, NexusCanvas, Starfield } from "./shared";

function Node({
  position,
  roll,
}: {
  position: [number, number, number];
  roll: number;
}) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Group>(null);
  const student = students[roll - 1]!;
  const house = getHouse(student.house);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + roll) * 0.08;
    const s = hovered ? 1.7 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
  });

  return (
    <group
      ref={ref}
      position={position}
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
        void navigate({ to: "/students/$roll", params: { roll: String(roll) } });
      }}
    >
      <mesh>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#bfeeff"}
          emissive={CYAN}
          emissiveIntensity={hovered ? 1.6 : 0.6}
        />
      </mesh>
      {hovered ? (
        <Html center distanceFactor={10} zIndexRange={[20, 0]}>
          <div className="pointer-events-none w-44 select-none rounded-xl border border-white/15 bg-black/70 px-3 py-2 text-center backdrop-blur-md">
            <p className="text-[11px] font-medium tracking-wide text-white">
              {displayName(student)}
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-white/60">
              ROLL {String(roll).padStart(2, "0")} · {house ? house.name.toUpperCase() : "HOUSE TBA"}
            </p>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function Links({ points }: { points: THREE.Vector3[] }) {
  const geometry = useMemo(() => {
    const verts: number[] = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i]!;
      const b = points[(i + 1) % points.length]!;
      verts.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const c = points[(i + 7) % points.length]!;
      verts.push(a.x, a.y, a.z, c.x, c.y, c.z);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    return g;
  }, [points]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={CYAN} transparent opacity={0.16} />
    </lineSegments>
  );
}

function Cluster() {
  const ref = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    // Fibonacci sphere — even, scientific distribution of the 33 nodes
    const n = students.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return students.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      return new THREE.Vector3(Math.cos(theta) * r * 3.4, y * 3.4, Math.sin(theta) * r * 3.4);
    });
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x += (-pointer.y * 0.2 - ref.current.rotation.x) * 0.04;
  });

  return (
    <group ref={ref}>
      <Links points={positions} />
      {positions.map((p, i) => (
        <Node key={i} roll={i + 1} position={[p.x, p.y, p.z]} />
      ))}
      <mesh>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#8fe8ff"
          emissive={CYAN}
          emissiveIntensity={0.5}
          transparent
          opacity={0.35}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function ConstellationScene() {
  return (
    <NexusCanvas cameraPosition={[0, 0, 10]} fov={50}>
      <Starfield count={300} radius={22} />
      <Cluster />
    </NexusCanvas>
  );
}
