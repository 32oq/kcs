"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Pulsing location marker ─────────────────────────────────────── */
function PulsingMarker({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.5) * 0.5;
    ringRef.current.scale.setScalar(s);
  });

  return (
    <group position={position}>
      {/* dot */}
      <mesh>
        <sphereGeometry args={[0.032, 16, 16]} />
        <meshBasicMaterial color="#f472b6" />
      </mesh>
      {/* pulse ring */}
      <mesh ref={ringRef}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.28} />
      </mesh>
    </group>
  );
}

/* ── Main globe scene ────────────────────────────────────────────── */
function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null!);

  /* frame-rate independent rotation */
  useFrame((_state, delta) => {
    groupRef.current.rotation.y += delta * 0.18;
  });

  /* star-field around globe */
  const starGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const count = 220;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3.8 + Math.random() * 2.2;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  /* Kashmir approx coords on r=1.5 sphere: lat 34°N lon 74°E */
  const kashmirPos: [number, number, number] = [0.334, 0.836, 1.204];

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 6, 6]}   intensity={1.8} color="#ffffff" />
      <pointLight position={[-4, -3, 4]}  intensity={1.2} color="#0ea5e9" />
      <pointLight position={[0, 0, 0]}    intensity={0.6} color="#38bdf8" />

      {/* Rotating group */}
      <group ref={groupRef}>
        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[1.5, 72, 72]} />
          <meshStandardMaterial
            color="#071c3d"
            emissive="#0ea5e9"
            emissiveIntensity={0.18}
            metalness={0.4}
            roughness={0.55}
          />
        </mesh>

        {/* Wireframe grid overlay */}
        <mesh>
          <sphereGeometry args={[1.52, 36, 28]} />
          <meshBasicMaterial
            color="#0ea5e9"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>

        {/* Equatorial ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.68, 1.73, 80]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Tilted orbital ring */}
        <mesh rotation={[Math.PI / 3.2, 0, Math.PI / 5]}>
          <ringGeometry args={[1.78, 1.82, 80]} />
          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.22}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Kashmir marker */}
        <PulsingMarker position={kashmirPos} />
      </group>

      {/* Atmosphere (doesn't rotate) */}
      <mesh>
        <sphereGeometry args={[1.64, 40, 40]} />
        <meshBasicMaterial
          color="#0ea5e9"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer glow haze */}
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.018}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Star field */}
      <points geometry={starGeo}>
        <pointsMaterial
          color="#38bdf8"
          size={0.028}
          transparent
          opacity={0.65}
          sizeAttenuation
        />
      </points>
    </>
  );
}

/* ── Exported Globe wrapper ──────────────────────────────────────── */
export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <GlobeScene />
      </Suspense>
    </Canvas>
  );
}
