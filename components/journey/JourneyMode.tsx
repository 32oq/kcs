"use client";

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { JourneyData, JourneyPhase } from '@/lib/journey';
import InfoCard from './InfoCard';
import Controls from './Controls';

const JourneyScene = dynamic(() => import('./JourneyScene'), { ssr: false });

interface Props {
  journey:        JourneyData;
  onClose:        () => void;
  onBook:         () => void;
  onViewDetails?: () => void;
}

export default function JourneyMode({ journey, onClose, onBook, onViewDetails }: Props) {
  const [phase,          setPhase]          = useState<JourneyPhase>('intro');
  const [stopIndex,      setStopIndex]      = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [showCard,       setShowCard]       = useState(false);

  const nextStopRef  = useRef(0);
  const totalStops   = journey.stops.length;

  // ── Show info card on arrival ──
  useEffect(() => {
    if (phase === 'stopped') {
      const t = setTimeout(() => setShowCard(true), 480);
      return () => clearTimeout(t);
    }
    setShowCard(false);
  }, [phase, stopIndex]);

  // ── Intro complete callback (from CameraController) ──
  const handleIntroComplete = useCallback(() => {
    // Single-stop destination preview: vehicle is already at the destination
    // (the stub curve puts it there). Go straight to stopped so InfoCard appears.
    setPhase('stopped');
  }, []);

  // ── Vehicle arrived at target stop ──
  const handleArrived = useCallback(() => {
    const idx = nextStopRef.current;
    setStopIndex(idx);
    if (idx >= totalStops - 1) {
      setPhase('celebration');
      setTimeout(() => setPhase('complete'), 2800);
    } else {
      setPhase('stopped');
    }
  }, [totalStops]);

  // ── User clicks "Next Stop" ──
  const handleNext = useCallback(() => {
    if (phase === 'traveling') return;
    const nextIdx = stopIndex + 1;
    if (nextIdx >= totalStops) return;
    nextStopRef.current = nextIdx;
    setTargetProgress(nextIdx / (totalStops - 1));
    setPhase('traveling');
  }, [phase, stopIndex, totalStops]);

  const currentStop = journey.stops[stopIndex];
  const isLastStop  = stopIndex === totalStops - 1;

  return (
    <div className="fixed inset-0 z-200 overflow-hidden" style={{ background: '#020617' }}>
      {/* ── 3D Scene (full-bleed) ── */}
      <div className="absolute inset-0">
        <JourneyScene
          journey={journey}
          phase={phase}
          targetProgress={targetProgress}
          onArrived={handleArrived}
          onIntroComplete={handleIntroComplete}
        />
      </div>

      {/* ── Top bar ── */}
      <div
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(to bottom, rgba(2,6,23,0.85) 0%, transparent 100%)' }}
      >
        <div>
          <div className="text-primary text-[11px] font-mono uppercase tracking-[0.2em] mb-0.5">
            Journey Preview
          </div>
          <h2 className="font-playfair text-xl font-bold text-white leading-tight">
            {journey.title}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full flex items-center justify-center text-white/55 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
          aria-label="Close journey"
        >
          <X size={15} />
        </button>
      </div>

      {/* ── Destination Info Card ── */}
      <AnimatePresence>
        {showCard && phase === 'stopped' && (
          <InfoCard stop={currentStop} isLast={isLastStop} />
        )}
      </AnimatePresence>

      {/* ── Controls ── */}
      <AnimatePresence>
        {phase !== 'complete' && phase !== 'celebration' && (
          <Controls
            phase={phase}
            stopIndex={stopIndex}
            totalStops={totalStops}
            onNext={handleNext}
            onSkip={onClose}
            onBook={onBook}
            onViewDetails={onViewDetails}
          />
        )}
      </AnimatePresence>

      {/* ── Celebration banner ── */}
      <AnimatePresence>
        {phase === 'celebration' && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 z-30"
          >
            <div
              className="px-6 py-3 rounded-full text-center"
              style={{
                background:     'rgba(14,165,233,0.14)',
                border:         '1px solid rgba(14,165,233,0.35)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <span className="text-primary-light font-bold text-sm">
                🎉 You&apos;ve arrived at {journey.stops[totalStops - 1].place}!
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Completion overlay ── */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30"
            style={{ background: 'rgba(2,6,23,0.55)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-center rounded-3xl px-10 py-10 w-80"
              style={{
                background:     'rgba(2,6,23,0.94)',
                border:         '1px solid rgba(14,165,233,0.28)',
                boxShadow:      '0 0 70px rgba(14,165,233,0.18), 0 30px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div className="text-5xl mb-5">🎉</div>
              <h2 className="font-playfair text-3xl font-bold text-white mb-2">
                Journey Complete!
              </h2>
              <p className="text-white/45 text-sm mb-1">{journey.title}</p>
              <p className="text-primary-light font-bold text-sm mb-8">
                {journey.totalDays} Nights · {totalStops} Destinations
              </p>

              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onBook}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold transition-colors shadow-lg shadow-primary/30"
                >
                  Book This Package
                </motion.button>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-full text-white/45 hover:text-white text-sm transition-colors"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
