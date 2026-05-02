'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-sand sm:py-20">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.2 }}
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full bg-accent-deep/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl font-semibold leading-tight sm:text-6xl"
        >
          Your home in Faridabad
          <br />
          <span className="italic text-accent">is already on BrickBase.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-sand/70"
        >
          300+ buildings. 900+ floors. One scroll away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <MagneticButton
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-medium tracking-wide text-ink transition-colors hover:bg-accent-deep hover:text-sand"
          >
            Be among the first 100 to sign up for 0% brokerage
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
