"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X, ExternalLink, ShoppingBag } from 'lucide-react';
import type { JourneyPhase } from '@/lib/journey';

interface Props {
  phase: JourneyPhase;
  stopIndex: number;
  totalStops: number;
  onNext: () => void;
  onSkip: () => void;
  onBook: () => void;
  onViewDetails?: () => void;
}

export default function Controls({ phase, stopIndex, totalStops, onNext, onSkip, onBook, onViewDetails }: Props) {
  const isTraveling = phase === 'traveling';
  const isLastStop  = stopIndex === totalStops - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalStops }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: i === stopIndex ? 1.35 : 1, opacity: i <= stopIndex ? 1 : 0.3 }}
            transition={{ duration: 0.25 }}
            className="rounded-full bg-primary"
            style={{ width: i === stopIndex ? 10 : 6, height: i === stopIndex ? 10 : 6 }}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Skip */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSkip}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white/60 hover:text-white text-sm border border-white/10 hover:border-white/25 transition-colors"
          style={{ background: 'rgba(2,6,23,0.65)', backdropFilter: 'blur(12px)' }}
        >
          <X size={13} />
          Skip Tour
        </motion.button>

        {/* View Details */}
        {onViewDetails && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewDetails}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-white/70 hover:text-white text-sm border border-white/12 hover:border-primary/40 transition-colors"
            style={{ background: 'rgba(2,6,23,0.65)', backdropFilter: 'blur(12px)' }}
          >
            <ExternalLink size={13} />
            Details
          </motion.button>
        )}

        {/* Next stop / Book Package */}
        <motion.button
          whileHover={!isTraveling ? { scale: 1.05, x: 2 } : {}}
          whileTap={!isTraveling ? { scale: 0.95 } : {}}
          onClick={isLastStop ? onBook : onNext}
          disabled={isTraveling}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold transition-all disabled:opacity-45 disabled:cursor-not-allowed"
          style={{ background: isTraveling ? 'rgba(14,165,233,0.35)' : '#0ea5e9' }}
        >
          <AnimatePresence mode="wait">
            {isTraveling ? (
              <motion.span key="traveling" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                  className="block w-3.5 h-3.5 border-2 border-white/35 border-t-white rounded-full"
                />
                Traveling…
              </motion.span>
            ) : isLastStop ? (
              <motion.span key="book" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                <ShoppingBag size={13} />
                Book Package
              </motion.span>
            ) : (
              <motion.span key="next" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5">
                Next Stop
                <ChevronRight size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
}
