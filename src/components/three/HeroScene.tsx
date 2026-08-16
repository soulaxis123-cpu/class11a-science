import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CYAN, NexusCanvas, PointerParallax, ScienceGrid, Starfield } from "./shared";

function Nucleus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.15, 1]} />
      <meshStandardMaterial
        color="#8fe8ff"
        emissive={CYAN}
        emissiveIntensity={0.5}
        roughness={0.25}
        metalness={0.5}
        wireframe
      />
    </mesh>
  );
}

function Orbit({ tilt, speed, radius }: { tilt: [number, number, number]; speed: number; radius: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.45} />
      </mesh>
      <group ref={ref}>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshBasicMaterial color="#d8f7ff" />
        </mesh>
      </group>
    </group>
  );
}

function Helix() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });
  const nodes = Array.from({ length: 26 }, (_, i) => i);
  return (
    <group ref={ref} position={[4.6, -0.4, -2.2]} scale={0.75}>
      {nodes.map((i) => {
        const t = i * 0.36;
        const y = i * 0.16 - 2;
        return (
          <group key={i} position={[0, y, 0]}>
            <mesh position={[Math.cos(t) * 0.6, 0, Math.sin(t) * 0.6]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.85} />
            </mesh>
            <mesh position={[-Math.cos(t) * 0.6, 0, -Math.sin(t) * 0.6]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshBasicMaterial color="#9fb6ff" transparent opacity={0.8} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function GlassPlate({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
    }
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        color="#7fd8f0"
        transparent
        opacity={0.09}
        side={THREE.DoubleSide}
        roughness={0.1}
        metalness={0.6}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <NexusCanvas cameraPosition={[0, 0.4, 7.5]}>
      <fog attach="fog" args={["#0b1020", 8, 26]} />
      <Starfield />
      <ScienceGrid y={-3.4} />
      <PointerParallax>
        <Nucleus />
        <Orbit tilt={[1.2, 0.3, 0]} speed={0.6} radius={2.1} />
        <Orbit tilt={[-0.8, 0.9, 0.4]} speed={0.45} radius={2.8} />
        <Orbit tilt={[0.4, -1.1, 0.9]} speed={0.32} radius={3.5} />
        <Helix />
        <GlassPlate position={[-4.4, 0.6, -2]} rotation={[0, 0.5, 0.05]} />
        <GlassPlate position={[-3.4, -1.2, -3]} rotation={[0, 0.7, -0.08]} />
      </PointerParallax>
    </NexusCanvas>
  );
}
