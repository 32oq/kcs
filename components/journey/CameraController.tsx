import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import type { JourneyPhase } from '@/lib/journey';

const INTRO_DURATION = 2.4;
const CAM_INTRO      = new THREE.Vector3(0, 16, 13);
const CAM_OFFSET     = new THREE.Vector3(-1.8, 3.0, 3.8); // follow offset

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

interface Props {
  phase:            JourneyPhase;
  vehicleRef:       React.MutableRefObject<THREE.Group>;
  onIntroComplete:  () => void;
}

export default function CameraController({ phase, vehicleRef, onIntroComplete }: Props) {
  const { camera } = useThree();
  const introTimer  = useRef(0);
  const introDone   = useRef(false);
  const phaseRef    = useRef(phase);
  const onIntroRef  = useRef(onIntroComplete);
  const lookTarget  = useRef(new THREE.Vector3());

  useEffect(() => { phaseRef.current   = phase; }, [phase]);
  useEffect(() => { onIntroRef.current = onIntroComplete; }, [onIntroComplete]);

  // Position camera at intro start
  useEffect(() => {
    camera.position.copy(CAM_INTRO);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Priority 1 → runs after Vehicle (priority 0) updates the vehicle position
  useFrame((_, delta) => {
    const ph      = phaseRef.current;
    const vehicle = vehicleRef.current;
    if (!vehicle) return;

    const vPos = vehicle.position;
    lookTarget.current.lerp(vPos, delta * 4);

    // ── Intro zoom-in ──
    if (ph === 'intro' && !introDone.current) {
      introTimer.current = Math.min(introTimer.current + delta, INTRO_DURATION);
      const t       = easeOutCubic(introTimer.current / INTRO_DURATION);
      const desired = vPos.clone().add(CAM_OFFSET);
      camera.position.lerpVectors(CAM_INTRO, desired, t);
      camera.lookAt(lookTarget.current);

      if (introTimer.current >= INTRO_DURATION) {
        introDone.current = true;
        onIntroRef.current();
      }
      return;
    }

    // ── Traveling: cinematic follow ──
    if (ph === 'traveling') {
      const desired = vPos.clone().add(CAM_OFFSET);
      camera.position.lerp(desired, delta * 2.8);
      camera.lookAt(lookTarget.current);
      return;
    }

    // ── Stopped / complete: slight pull-back + look at destination ──
    const staticOffset = new THREE.Vector3(-0.6, 3.8, 4.2);
    const desired      = vPos.clone().add(staticOffset);
    camera.position.lerp(desired, delta * 1.6);
    camera.lookAt(lookTarget.current);
  }, 1);

  return null;
}
