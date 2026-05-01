import { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { ItineraryStop } from '@/lib/journey';

const TOTAL_PTS = 120;

interface Props {
  curve:       THREE.CatmullRomCurve3;
  progressRef: React.MutableRefObject<number>;
  stops:       ItineraryStop[];
}

export default function Path({ curve, progressRef, stops }: Props) {
  // ── Full background tube (static) ──
  const tubeGeo = useMemo(
    () => new THREE.TubeGeometry(curve, 80, 0.028, 4, false),
    [curve],
  );
  const tubeMat = useMemo(
    () => new THREE.MeshLambertMaterial({ color: '#183040', transparent: true, opacity: 0.7 }),
    [],
  );

  // ── Progress line (dynamic draw range) ──
  const { progressGeo, allPts } = useMemo(() => {
    const pts  = curve.getPoints(TOTAL_PTS - 1);
    const buf  = new Float32Array(TOTAL_PTS * 3);
    for (let i = 0; i < TOTAL_PTS; i++) {
      buf[i * 3]     = pts[i].x;
      buf[i * 3 + 1] = pts[i].y + 0.05;
      buf[i * 3 + 2] = pts[i].z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(buf, 3));
    geo.setDrawRange(0, 1);
    return { progressGeo: geo, allPts: pts };
  }, [curve]);

  const progressLine = useMemo(
    () => new THREE.Line(progressGeo, new THREE.LineBasicMaterial({ color: '#38bdf8', linewidth: 2 })),
    [progressGeo],
  );

  useFrame(() => {
    const count = Math.floor(progressRef.current * (TOTAL_PTS - 1)) + 1;
    progressGeo.setDrawRange(0, Math.max(1, count));
  });

  // ── Stop markers ──
  const markerGeo  = useMemo(() => new THREE.SphereGeometry(0.09, 6, 6), []);
  const markerMat  = useMemo(() => new THREE.MeshLambertMaterial({ color: '#0ea5e9', flatShading: true }), []);
  const stickGeo   = useMemo(() => new THREE.CylinderGeometry(0.014, 0.014, 0.22, 4), []);
  const ringGeo    = useMemo(() => new THREE.RingGeometry(0.14, 0.22, 8), []);
  const ringMat    = useMemo(() => new THREE.MeshLambertMaterial({ color: '#0ea5e9', transparent: true, opacity: 0.28, side: THREE.DoubleSide }), []);

  return (
    <group>
      {/* Background tube */}
      <mesh geometry={tubeGeo} material={tubeMat} />

      {/* Progress overlay */}
      <primitive object={progressLine} />

      {/* Destination pin markers — use real stop coords, not raw curve control points */}
      {stops.map((stop, i) => (
        <group key={i} position={[stop.coords[0], 0.04, stop.coords[2]]}>
          <mesh geometry={stickGeo}  material={markerMat} />
          <mesh geometry={markerGeo} material={markerMat} position={[0, 0.2, 0]} />
          <mesh geometry={ringGeo}   material={ringMat}   rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} />
        </group>
      ))}
    </group>
  );
}
