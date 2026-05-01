import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CloudProps {
  position: [number, number, number];
  scale: number;
  speed: number;
  phase: number;
}

function Cloud({ position, scale, speed, phase }: CloudProps) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed + phase) * 0.18;
    // Slow horizontal drift
    groupRef.current.position.x = position[0] + Math.sin(clock.elapsedTime * speed * 0.3 + phase) * 0.12;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.55, 5, 4]} />
        <meshLambertMaterial color="#172438" transparent opacity={0.55} flatShading />
      </mesh>
      <mesh position={[0.5, -0.08, 0.1]}>
        <sphereGeometry args={[0.38, 5, 4]} />
        <meshLambertMaterial color="#172438" transparent opacity={0.5} flatShading />
      </mesh>
      <mesh position={[-0.42, -0.1, -0.05]}>
        <sphereGeometry args={[0.32, 5, 4]} />
        <meshLambertMaterial color="#172438" transparent opacity={0.5} flatShading />
      </mesh>
      <mesh position={[0.08, 0.2, 0.05]}>
        <sphereGeometry args={[0.28, 5, 4]} />
        <meshLambertMaterial color="#1a2d44" transparent opacity={0.45} flatShading />
      </mesh>
    </group>
  );
}

const CLOUD_DATA: CloudProps[] = [
  { position: [-5.5, 3.8, -3.0], scale: 1.2, speed: 0.18, phase: 0.0 },
  { position: [ 3.0, 4.2, -4.5], scale: 0.9, speed: 0.14, phase: 1.1 },
  { position: [-2.0, 3.5,  3.0], scale: 1.5, speed: 0.20, phase: 2.3 },
  { position: [ 6.5, 4.0,  1.2], scale: 1.0, speed: 0.16, phase: 0.7 },
  { position: [-7.0, 4.5,  2.0], scale: 0.85,speed: 0.12, phase: 3.1 },
  { position: [ 1.5, 3.6, -5.5], scale: 1.1, speed: 0.19, phase: 1.8 },
  { position: [-3.5, 4.1, -1.0], scale: 0.75,speed: 0.15, phase: 4.2 },
];

export default function Clouds() {
  const data = useMemo(() => CLOUD_DATA, []);
  return (
    <group>
      {data.map((c, i) => <Cloud key={i} {...c} />)}
    </group>
  );
}
