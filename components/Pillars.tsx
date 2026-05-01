'use client';

import { Building2, ShieldCheck, Sparkles } from 'lucide-react';
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

function CountUp({
  to,
  suffix = '+',
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const value = useMotionValue(0);
  const display = useTransform(value, (v) => `${Math.round(v)}${suffix}`);
  const triggered = useRef(false);

  return (
    <motion.span
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => {
        if (triggered.current) return;
        triggered.current = true;
        animate(value, to, {
          duration,
          ease: [0.22, 1, 0.36, 1],
        });
      }}
    >
      {display}
    </motion.span>
  );
}

const pillars = [
  {
    Icon: Building2,
    title: 'Every floor in Faridabad.',
    body: '300+ buildings, 900+ builder floors. If it is a builder floor in Faridabad, it is on BrickBase.',
  },
  {
    Icon: ShieldCheck,
    title: 'Direct from builders.',
    body: 'Verified inventory on every listing. No re-listings, no broker games, no inflated prices.',
  },
  {
    Icon: Sparkles,
    title: 'Visit only what you love.',
    body: 'Scroll calmly. Shortlist privately. Visit on your schedule — never the other way around.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Pillars() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="label">All of Faridabad</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            <span className="text-accent-deep">
              <CountUp to={300} />
            </span>{' '}
            buildings.{' '}
            <span className="text-accent-deep">
              <CountUp to={900} />
            </span>{' '}
            floors.
            <br />
            One scroll away.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
            Stop scrolling 99acres. Stop the broker calls. We have the city's
            entire builder-floor inventory — yours to browse on your terms.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {pillars.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="group"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sand text-ink transition group-hover:bg-ink group-hover:text-sand">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-3 leading-relaxed text-ink/65">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
