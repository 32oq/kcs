"use client";

import { Suspense, useMemo, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import type { JourneyData, JourneyPhase } from '@/lib/journey';
import Vehicle          from './Vehicle';
import Path             from './Path';
import CameraController from './CameraController';
import Terrain          from './Terrain';
import Clouds           from './Clouds';
import Celebration      from './Celebration';

interface Props {
  journey:        JourneyData;
  phase:          JourneyPhase;
  targetProgress: number;
  onArrived:      () => void;
  onIntroComplete:() => void;
}

// Inner component — lives inside the Canvas context
function SceneContent({ journey, phase, targetProgress, onArrived, onIntroComplete }: Props) {
  const isSingleStop = journey.stops.length === 1;

  const curve = useMemo(() => {
    const pts = journey.stops.map(s => new THREE.Vector3(...s.coords));
    // CatmullRomCurve3 / TubeGeometry need ≥ 2 distinct points.
    // For single-stop destinations the vehicle parks at the destination
    // from the start — add a tiny second point just to satisfy THREE.
    if (pts.length === 1) {
      pts.push(new THREE.Vector3(pts[0].x + 0.01, 0, pts[0].z + 0.01));
    }
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
  }, [journey.stops]);

  // Shared mutable refs passed as plain props (not React refs)
  const vehicleRef  = useRef<THREE.Group>(null!);
  const progressRef = useRef(0);

  const lastStop = journey.stops[journey.stops.length - 1];

  return (
    <>
      <fog attach="fog" args={['#020617', 20, 38]} />
      <ambientLight intensity={0.55} color="#aac8e0" />
      <directionalLight
        position={[8, 14, 6]}
        intensity={1.1}
        color="#ddeeff"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <pointLight position={[-6, 5, -4]} intensity={0.35} color="#4a7aaa" />

      <Terrain />
      <Clouds />

      {!isSingleStop && <Path curve={curve} progressRef={progressRef} stops={journey.stops} />}

      <Vehicle
        vehicleRef={vehicleRef}
        progressRef={progressRef}
        curve={curve}
        phase={phase}
        targetProgress={targetProgress}
        onArrived={onArrived}
      />

      <CameraController
        phase={phase}
        vehicleRef={vehicleRef}
        onIntroComplete={onIntroComplete}
      />

      {(phase === 'celebration' || phase === 'complete') && (
        <Celebration position={lastStop.coords} />
      )}
    </>
  );
}

export default function JourneyScene(props: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 16, 13], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      style={{ width: '100%', height: '100%', background: '#020617' }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
