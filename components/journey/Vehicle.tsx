import { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { JourneyPhase } from '@/lib/journey';

const SPEED = 0.25; // curve-progress units per second

interface Props {
  vehicleRef:   React.MutableRefObject<THREE.Group>;
  progressRef:  React.MutableRefObject<number>;
  curve:        THREE.CatmullRomCurve3;
  phase:        JourneyPhase;
  targetProgress: number;
  onArrived:    () => void;
}

export default function Vehicle({ vehicleRef, progressRef, curve, phase, targetProgress, onArrived }: Props) {
  // Stable refs to avoid stale closures inside useFrame
  const phaseRef      = useRef(phase);
  const targetRef     = useRef(targetProgress);
  const onArrivedRef  = useRef(onArrived);
  const bounceTimer   = useRef(0);
  const isBouncing    = useRef(false);
  const arrivedFired  = useRef(false);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { targetRef.current = targetProgress; }, [targetProgress]);
  useEffect(() => { onArrivedRef.current = onArrived; }, [onArrived]);

  // Trigger bounce when vehicle stops
  useEffect(() => {
    if (phase === 'stopped' || phase === 'celebration') {
      isBouncing.current  = true;
      bounceTimer.current = 0;
      arrivedFired.current = false;
    }
    if (phase === 'traveling') {
      arrivedFired.current = false;
    }
  }, [phase]);

  useFrame((_, delta) => {
    if (!vehicleRef.current) return;
    const ph = phaseRef.current;

    // ── Advance along curve ──
    if (ph === 'traveling') {
      progressRef.current = Math.min(progressRef.current + SPEED * delta, targetRef.current);
      if (progressRef.current >= targetRef.current && !arrivedFired.current) {
        arrivedFired.current = true;
        onArrivedRef.current();
      }
    }

    const t  = Math.max(0, Math.min(1, progressRef.current));
    const pt = curve.getPoint(t);

    // ── Bounce on arrival ──
    let bounceY = 0;
    if (isBouncing.current) {
      bounceTimer.current += delta * 7;
      bounceY = Math.max(0, Math.sin(bounceTimer.current) * 0.28 * Math.exp(-bounceTimer.current * 0.35));
      if (bounceTimer.current > Math.PI * 2.8) isBouncing.current = false;
    }

    vehicleRef.current.position.set(pt.x, 0.2 + bounceY, pt.z);

    // ── Yaw toward travel direction ──
    if (ph === 'traveling' && t > 0.001 && t < 0.999) {
      const tangent = curve.getTangent(t);
      vehicleRef.current.rotation.y = Math.atan2(tangent.x, tangent.z);
    }
  });

  // ── Low-poly car geometry (memoized) ──
  const bodyGeo  = useMemo(() => new THREE.BoxGeometry(0.40, 0.13, 0.24), []);
  const cabGeo   = useMemo(() => new THREE.BoxGeometry(0.24, 0.11, 0.22), []);
  const wheelGeo = useMemo(() => new THREE.CylinderGeometry(0.058, 0.058, 0.045, 6), []);

  const bodyMat  = useMemo(() => new THREE.MeshLambertMaterial({ color: '#e2e8f0', flatShading: true }), []);
  const cabMat   = useMemo(() => new THREE.MeshLambertMaterial({ color: '#f1f5f9', flatShading: true }), []);
  const wheelMat = useMemo(() => new THREE.MeshLambertMaterial({ color: '#334155', flatShading: true }), []);

  const wheelPos: [number, number, number][] = [
    [ 0.14, -0.075,  0.135],
    [ 0.14, -0.075, -0.135],
    [-0.14, -0.075,  0.135],
    [-0.14, -0.075, -0.135],
  ];

  return (
    <group ref={vehicleRef}>
      {/* Body */}
      <mesh geometry={bodyGeo} material={bodyMat} castShadow />
      {/* Cab */}
      <mesh geometry={cabGeo}  material={cabMat}  position={[0.04, 0.12, 0]} castShadow />
      {/* Wheels */}
      {wheelPos.map((pos, i) => (
        <mesh
          key={i}
          geometry={wheelGeo}
          material={wheelMat}
          position={pos}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
        />
      ))}
      {/* Headlights glow */}
      <pointLight position={[0.22, 0.05, 0]} intensity={1.8} color="#0ea5e9" distance={2.5} />
    </group>
  );
}
