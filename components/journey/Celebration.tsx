import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT = 72;
const PALETTE = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#fbbf24', '#34d399', '#f0abfc', '#fb923c'];

interface Props {
  position: [number, number, number];
}

export default function Celebration({ position }: Props) {
  const meshRef  = useRef<THREE.InstancedMesh>(null!);
  const timeRef  = useRef(0);
  const dummy    = useMemo(() => new THREE.Object3D(), []);

  const { velocities, origins } = useMemo(() => {
    const v: THREE.Vector3[] = [];
    const o: THREE.Vector3[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI * 0.9;
      const speed = 1.8 + Math.random() * 2.2;
      v.push(new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta) * speed,
        Math.cos(phi) * speed * 0.4 + 2.2,
        Math.sin(phi) * Math.sin(theta) * speed,
      ));
      o.push(new THREE.Vector3(...position));
    }
    return { velocities: v, origins: o };
  }, [position]);

  // Set per-instance colors once on mount
  useEffect(() => {
    if (!meshRef.current) return;
    const color = new THREE.Color();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      color.set(PALETTE[i % PALETTE.length]);
      meshRef.current.setColorAt(i, color);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const t = timeRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = velocities[i];
      const o = origins[i];
      const x = o.x + v.x * t;
      const y = o.y + v.y * t - 2.8 * t * t; // arc under gravity
      const z = o.z + v.z * t;
      const s = Math.max(0, (1 - t * 0.38)) * 0.14;

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
}
