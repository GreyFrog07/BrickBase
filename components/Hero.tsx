'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const headlineLine1 = 'Builder floors?'.split(' ');
const headlineLine2 = '0% Brokerage?'.split(' ');
const headlineLine3 = 'BrickBase.'.split(' ');

const wordVariant = {
  hidden: { y: '110%', opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-sand pt-16 pb-28 sm:pt-20 sm:pb-36"
    >
      <motion.div
        aria-hidden
        style={{ y: orbY1, scale: orbScale }}
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-accent/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: orbY2 }}
        className="pointer-events-none absolute -left-32 bottom-0 h-[440px] w-[440px] rounded-full bg-ink/10 blur-3xl"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-6xl px-5 sm:px-8"
      >
        <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-7xl">
          <span className="block overflow-hidden">
            <motion.span
              initial="hidden"
              animate="show"
              className="inline-block"
            >
              {headlineLine1.map((word, i) => (
                <motion.span
                  key={`l1-${i}`}
                  custom={i}
                  variants={wordVariant}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em]">
            <motion.span initial="hidden" animate="show" className="inline-block text-accent">
              {headlineLine2.map((word, i) => (
                <motion.span
                  key={`l2-${i}`}
                  custom={i + headlineLine1.length}
                  variants={wordVariant}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span initial="hidden" animate="show" className="inline-block italic text-accent-deep">
              {headlineLine3.map((word, i) => (
                <motion.span
                  key={`l3-${i}`}
                  custom={i + headlineLine1.length + headlineLine2.length}
                  variants={wordVariant}
                  className="mr-[0.25em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-x-10 gap-y-4"
        >
          {[
            { stat: '300+', label: 'Buildings' },
            { stat: '900+', label: 'Floors listed' },
            { stat: '100%', label: 'Builder floor inventory' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="font-serif text-4xl font-semibold text-ink sm:text-5xl">{stat}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-widest text-ink/50">{label}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link href="/signup" className="btn-primary group">
            Be among the first 100 to sign up for 0% brokerage
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
