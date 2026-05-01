"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ItineraryStop } from '@/lib/journey';

interface Props {
  stop: ItineraryStop;
  isLast: boolean;
}

export default function InfoCard({ stop, isLast }: Props) {
  const [imgIdx, setImgIdx] = useState(0);
  const [dir, setDir]       = useState(1);

  // Reset when stop changes
  useEffect(() => { setImgIdx(0); }, [stop.id]);

  // Auto-rotate images
  useEffect(() => {
    if (stop.images.length <= 1) return;
    const t = setInterval(() => {
      setDir(1);
      setImgIdx(p => (p + 1) % stop.images.length);
    }, 3200);
    return () => clearInterval(t);
  }, [stop.id, stop.images.length]);

  const navigate = (d: 1 | -1) => {
    setDir(d);
    setImgIdx(p => (p + d + stop.images.length) % stop.images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 48, scale: 0.94 }}
      animate={{ opacity: 1, x: 0,  scale: 1    }}
      exit={{   opacity: 0, x: 48, scale: 0.94  }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
      className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-72"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background:    'rgba(2,6,23,0.84)',
          backdropFilter: 'blur(22px)',
          border:        '1px solid rgba(14,165,233,0.22)',
          boxShadow:     '0 0 48px rgba(14,165,233,0.12), 0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* ── Image slider ── */}
        <div className="relative h-44 overflow-hidden bg-dark">
          <AnimatePresence mode="popLayout" custom={dir}>
            <motion.img
              key={imgIdx}
              custom={dir}
              variants={{
                enter:  (d: number) => ({ x: d * 60, opacity: 0 }),
                center:             ({ x: 0,       opacity: 1 }),
                exit:   (d: number) => ({ x: d * -60, opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: 'easeInOut' }}
              src={stop.images[imgIdx]}
              alt={stop.place}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Gradient */}
          <div className="absolute inset-0 bg-linear-to-t from-dark/80 to-transparent pointer-events-none" />

          {/* Nav arrows */}
          {stop.images.length > 1 && (
            <>
              <button
                onClick={() => navigate(-1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => navigate(1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-white bg-black/50 hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={14} />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {stop.images.map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-full transition-all duration-300 ${i === imgIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/35'}`}
                  />
                ))}
              </div>
            </>
          )}

          {isLast && (
            <div
              className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
              style={{ background: '#0ea5e9' }}
            >
              Final Stop
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin size={11} className="text-primary-light" />
            <span className="text-primary-light/80 text-[11px] font-mono uppercase tracking-widest">Kashmir</span>
          </div>
          <h3 className="font-playfair text-xl font-bold text-white mb-1.5">{stop.place}</h3>
          <p className="text-white/45 text-xs leading-relaxed mb-3 line-clamp-2">{stop.description}</p>
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}
          >
            <Calendar size={11} className="text-primary-light" />
            <span className="text-primary-light text-xs font-semibold">
              Stay: {stop.days} Night{stop.days !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
