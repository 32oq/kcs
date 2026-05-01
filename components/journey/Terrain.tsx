import { useMemo } from 'react';
import * as THREE from 'three';

function Mountain({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh position={position} receiveShadow>
      <coneGeometry args={[scale * 0.7, scale * 1.6, 5, 1]} />
      <meshLambertMaterial color="#2a4a3d" flatShading />
    </mesh>
  );
}

function DalLake() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0.2]}
      position={[0.3, 0.015, 0.4]}
      scale={[1.3, 1, 0.75]}
    >
      <circleGeometry args={[1, 8]} />
      <meshLambertMaterial color="#1a3d5c" transparent opacity={0.85} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Terrain() {
  // Procedural low-poly ground
  const groundGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(30, 30, 26, 26);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i); // Y = Z in world after rotation
      const edgeFactor = Math.max(Math.abs(x) / 15, Math.abs(y) / 15);
      const wave =
        Math.sin(x * 0.7) * Math.cos(y * 0.55) * 0.1 +
        Math.sin(x * 1.4 + y * 1.1) * 0.06;
      const height = edgeFactor > 0.58 ? Math.pow((edgeFactor - 0.58) * 2.4, 2) + wave : wave * 0.25;
      pos.setZ(i, height);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const mountains = useMemo<{ position: [number, number, number]; scale: number }[]>(() => [
    { position: [-8.5, 0, -8  ], scale: 3.8 },
    { position: [-5.5, 0, -9  ], scale: 2.9 },
    { position: [ 7.5, 0, -7  ], scale: 3.4 },
    { position: [ 9.5, 0, -4  ], scale: 2.6 },
    { position: [-9.5, 0,  4  ], scale: 2.1 },
    { position: [ 8.5, 0,  6  ], scale: 3.0 },
    { position: [-6.5, 0,  7  ], scale: 1.9 },
    { position: [ 6.0, 0, -10 ], scale: 4.0 },
    { position: [-10,  0, -3  ], scale: 2.4 },
    { position: [ 10,  0,  2  ], scale: 2.8 },
    { position: [-4,   0, -10 ], scale: 3.2 },
  ], []);

  return (
    <group>
      {/* Ground */}
      <mesh geometry={groundGeo} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshLambertMaterial color="#1a3326" flatShading />
      </mesh>

      {/* Subtle grid for low-poly map feel */}
      <gridHelper
        args={[30, 30, '#0d2218', '#0d2218']}
        position={[0, 0.02, 0]}
      />

      {/* Dal Lake */}
      <DalLake />

      {/* Background mountains */}
      {mountains.map((m, i) => (
        <Mountain key={i} position={m.position} scale={m.scale} />
      ))}
    </group>
  );
}
