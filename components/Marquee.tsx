'use client';

import { animate, motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const tiles = [
  { sector: 'Sector 14', bhk: '3 BHK', floor: 'Ground · 1st · 2nd', tone: 'from-amber-100 to-rose-100' },
  { sector: 'Sector 15', bhk: '4 BHK', floor: 'Stilt + 3', tone: 'from-stone-200 to-amber-50' },
  { sector: 'Sector 88', bhk: '3 BHK', floor: '2nd · 3rd', tone: 'from-orange-100 to-amber-100' },
  { sector: 'Sector 75', bhk: '2 BHK', floor: 'Ground · 1st', tone: 'from-rose-100 to-stone-100' },
  { sector: 'Sector 89', bhk: '4 BHK', floor: 'Stilt + 3', tone: 'from-amber-50 to-orange-100' },
  { sector: 'Sector 91', bhk: '3 BHK', floor: '1st · 2nd', tone: 'from-stone-100 to-amber-100' },
  { sector: 'Greenfield', bhk: '4 BHK', floor: 'Stilt + 3', tone: 'from-amber-100 to-stone-200' },
  { sector: 'Sector 78', bhk: '3 BHK', floor: 'Ground · 1st · 2nd', tone: 'from-rose-50 to-amber-100' },
];

const SPEED_PX_PER_SEC = 70;
const DRAG_THRESHOLD = 6;

export function Marquee() {
  const loop = [...tiles, ...tiles, ...tiles];
  const x = useMotionValue(0);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripWidth, setStripWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const pointerStartX = useRef(0);
  const motionStartX = useRef(0);
  const activePointer = useRef<number | null>(null);
  const draggingRef = useRef(false);

  useEffect(() => {
    function measure() {
      if (!stripRef.current) return;
      setStripWidth(stripRef.current.scrollWidth / 3);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (!stripWidth || isDragging) return;
    const start = x.get();
    const controls = animate(x, start - stripWidth, {
      duration: stripWidth / SPEED_PX_PER_SEC,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    });
    return controls.stop;
  }, [stripWidth, isDragging, x]);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (activePointer.current !== null) return;
    activePointer.current = e.pointerId;
    pointerStartX.current = e.clientX;
    motionStartX.current = x.get();
    draggingRef.current = false;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerId !== activePointer.current) return;
    const dx = e.clientX - pointerStartX.current;
    if (!draggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      draggingRef.current = true;
      setIsDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {}
    }
    if (draggingRef.current) {
      x.set(motionStartX.current + dx);
    }
  }

  function endPointer(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerId !== activePointer.current) return;
    if (draggingRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
    }
    draggingRef.current = false;
    activePointer.current = null;
  }

  return (
    <section className="relative overflow-hidden bg-sand py-20 sm:py-24">
      <div className="mx-auto mb-10 max-w-6xl px-5 sm:mb-14 sm:px-8">
        <p className="label">Across the city</p>
        <h2 className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-ink sm:text-3xl">
          All sizes, all budgets.{' '}
          <span className="text-ink/60">Starting from ₹1.5 Cr.</span>
        </h2>
      </div>

      <div className="relative" style={{ perspective: 1200 }}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-sand to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-sand to-transparent sm:w-24" />

        <motion.div
          ref={stripRef}
          style={{ x, transformStyle: 'preserve-3d' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          className={`flex touch-pan-y gap-5 px-5 sm:gap-6 sm:px-8 ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {loop.map((tile, i) => (
            <motion.article
              key={i}
              whileHover={{
                y: -6,
                rotateX: -3,
                rotateY: 2,
                scale: 1.02,
                transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
              }}
              whileTap={{
                y: -14,
                rotateX: -8,
                rotateY: 4,
                scale: 1.05,
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
              }}
              className="group relative flex h-56 w-72 shrink-0 select-none flex-col justify-between overflow-hidden rounded-2xl border border-ink/5 bg-white p-5 shadow-[0_1px_0_rgba(11,37,69,0.04)] transition-shadow hover:shadow-[0_24px_48px_-24px_rgba(11,37,69,0.25)] sm:h-64 sm:w-80"
            >
              <div
                aria-hidden
                className={`absolute inset-0 bg-gradient-to-br ${tile.tone} opacity-90`}
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_60%)]"
              />
              <div
                aria-hidden
                className="absolute right-5 top-5 h-20 w-20 rounded-md border border-ink/10 bg-white/40 backdrop-blur-sm"
              >
                <div className="grid h-full grid-cols-3 gap-[2px] p-2">
                  {Array.from({ length: 9 }).map((_, k) => (
                    <span key={k} className="rounded-[1px] bg-ink/10" />
                  ))}
                </div>
              </div>
              <div className="relative">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink/50">
                  {tile.bhk}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-semibold text-ink">
                  {tile.sector}
                </h3>
              </div>
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.16em] text-ink/55">
                  Floors available
                </p>
                <p className="mt-1 text-sm font-medium text-ink/80">{tile.floor}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
