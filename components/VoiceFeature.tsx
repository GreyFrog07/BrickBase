'use client';

import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

const transcript = [
  'Show me 3 BHK builder floors',
  'in Sector 88, ground or first floor,',
  'around 1.6 to 1.8 crore.',
];

const bars = Array.from({ length: 28 });

export function VoiceFeature() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 sm:grid-cols-2 sm:items-center sm:gap-20 sm:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="label"
          >
            Coming in the app
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl"
          >
            Just speak.
            <br />
            <span className="italic text-accent-deep">
              We&apos;ll handle the rest.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-7 max-w-md text-lg leading-relaxed text-ink/65"
          >
            Tell our app what you want, the way you&apos;d tell a friend.
            No filters, no menus — just your voice. We surface the floors
            that fit, in seconds.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 space-y-3 text-sm text-ink/70"
          >
            {[
              '“3 BHK in Sector 88, around 1.7 cr.”',
              '“Stilt + 3, near a park, gated society.”',
              '“Anything in Greenfield under 2 cr?”',
            ].map((line) => (
              <li key={line} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-deep" />
                {line}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[9/14] w-full max-w-[320px] overflow-hidden rounded-[2.5rem] border border-ink/10 bg-sand p-5 shadow-[0_30px_80px_-30px_rgba(11,37,69,0.35)]">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/30 blur-3xl"
            />
            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50">
              <span>BrickBase</span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-deep" />
                Listening
              </span>
            </div>

            <div className="relative mt-12">
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.95, 0.55] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
                className="absolute inset-0 mx-auto h-32 w-32 rounded-full bg-accent/30 blur-2xl"
              />
              <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink text-sand shadow-lg sm:h-28 sm:w-28">
                <Mic className="h-9 w-9" strokeWidth={1.6} />
              </div>
            </div>

            <div className="mt-10 flex h-14 items-end justify-center gap-[3px]">
              {bars.map((_, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-full bg-ink/70"
                  animate={{
                    height: [
                      `${10 + ((i * 13) % 30)}%`,
                      `${40 + ((i * 17) % 60)}%`,
                      `${10 + ((i * 13) % 30)}%`,
                    ],
                  }}
                  transition={{
                    duration: 1.4 + (i % 4) * 0.18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.04,
                  }}
                />
              ))}
            </div>

            <div className="mt-8 space-y-2">
              {transcript.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[15px] leading-snug text-ink/80"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
