"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export interface AvatarProps {
  /** 0–100; tints the model from red (low) to green (high). */
  score: number;
  /** Body-fat % if known. */
  bodyFatPct?: number | null;
  /** Fallback adiposity signal. */
  waistToHeight?: number | null;
  sex?: "male" | "female";
}

function scoreColor(score: number): string {
  const t = Math.max(0, Math.min(1, score / 100));
  const red = new THREE.Color("#ef4444");
  const amber = new THREE.Color("#f59e0b");
  const green = new THREE.Color("#10b981");
  const c = t < 0.5 ? red.clone().lerp(amber, t / 0.5) : amber.clone().lerp(green, (t - 0.5) / 0.5);
  return `#${c.getHexString()}`;
}

/** Adiposity 0 (lean) .. 1 (high) from body fat or waist-to-height. */
function adiposity({ bodyFatPct, waistToHeight, sex }: AvatarProps): number {
  if (bodyFatPct != null) {
    const lo = sex === "female" ? 21 : 12;
    return Math.max(0, Math.min(1, (bodyFatPct - lo) / 28));
  }
  if (waistToHeight != null) return Math.max(0, Math.min(1, (waistToHeight - 0.45) / 0.25));
  return 0.4;
}

function Figure(props: AvatarProps) {
  const a = adiposity(props);
  const color = scoreColor(props.score);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.1 }),
    [color],
  );

  const torsoW = 1 + a * 0.7; // width multiplier
  const bellyR = 0.18 + a * 0.42;
  const limbW = 1 + a * 0.25;

  const cap = (r: number, len: number) => new THREE.CapsuleGeometry(r, len, 6, 16);

  return (
    <group position={[0, -1.1, 0]} scale={1.05}>
      {/* Head */}
      <mesh material={mat} position={[0, 2.62, 0]} geometry={new THREE.SphereGeometry(0.3, 24, 24)} />
      {/* Neck */}
      <mesh material={mat} position={[0, 2.32, 0]} geometry={cap(0.1, 0.12)} />
      {/* Torso */}
      <mesh material={mat} position={[0, 1.78, 0]} scale={[torsoW, 1, torsoW * 0.8]} geometry={cap(0.32, 0.62)} />
      {/* Belly (grows with adiposity) */}
      <mesh material={mat} position={[0, 1.5, 0.12 + a * 0.12]} geometry={new THREE.SphereGeometry(bellyR, 20, 20)} />
      {/* Hips */}
      <mesh material={mat} position={[0, 1.18, 0]} scale={[torsoW * 0.95, 0.7, torsoW * 0.8]} geometry={cap(0.3, 0.18)} />
      {/* Shoulders */}
      <mesh material={mat} position={[-0.42 * torsoW, 2.05, 0]} geometry={new THREE.SphereGeometry(0.14, 16, 16)} />
      <mesh material={mat} position={[0.42 * torsoW, 2.05, 0]} geometry={new THREE.SphereGeometry(0.14, 16, 16)} />
      {/* Arms */}
      <mesh material={mat} position={[-0.52 * torsoW, 1.5, 0]} rotation={[0, 0, 0.18]} scale={[limbW, 1, limbW]} geometry={cap(0.11, 0.9)} />
      <mesh material={mat} position={[0.52 * torsoW, 1.5, 0]} rotation={[0, 0, -0.18]} scale={[limbW, 1, limbW]} geometry={cap(0.11, 0.9)} />
      {/* Legs */}
      <mesh material={mat} position={[-0.2, 0.55, 0]} scale={[limbW, 1, limbW]} geometry={cap(0.14, 1.0)} />
      <mesh material={mat} position={[0.2, 0.55, 0]} scale={[limbW, 1, limbW]} geometry={cap(0.14, 1.0)} />
    </group>
  );
}

export default function BodyAvatar(props: AvatarProps) {
  return (
    <Canvas camera={{ position: [0, 1.1, 4.4], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#34d399" />
      <Figure {...props} />
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={1.6} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 1.8} />
    </Canvas>
  );
}
