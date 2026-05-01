'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { supabase } from '@/lib/supabase';

const SIZE_OPTIONS = [125, 150, 180, 250, 300, 350, 400, 450, 500, 600];

const TIMELINE_OPTIONS: { value: string; label: string }[] = [
  { value: '3_months', label: 'In 3 months' },
  { value: '6_months', label: 'In 6 months' },
  { value: '1_year', label: 'In a year' },
];

const BUDGET_MIN_FLOOR = 1.25;
const BUDGET_MIN_CEIL = 5;
const BUDGET_MAX_FLOOR = 1.5;
const BUDGET_MAX_CEIL = 10;
const BUDGET_STEP = 0.05;

function formatCr(v: number) {
  return `₹${v.toFixed(2)} Cr`;
}

export default function QuestionnairePage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [budgetMin, setBudgetMin] = useState(1.25);
  const [budgetMax, setBudgetMax] = useState(2.5);
  const [sizes, setSizes] = useState<number[]>([]);
  const [location, setLocation] = useState('');
  const [timeline, setTimeline] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.replace('/signup');
        return;
      }
      setAuthChecked(true);
    });
  }, [router]);

  function toggleSize(size: number) {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  }

  function validate(): string | null {
    if (budgetMin < BUDGET_MIN_FLOOR) return 'Minimum budget should be at least ₹1.25 Cr.';
    if (budgetMax <= budgetMin) return 'Max budget should be higher than min.';
    if (sizes.length === 0) return 'Pick at least one preferred size.';
    if (!location.trim()) return 'Tell us your preferred location.';
    if (!timeline) return 'Pick a buying timeline.';
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);

    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) {
      setSubmitting(false);
      router.replace('/signup');
      return;
    }

    const { error: upsertErr } = await supabase
      .from('profiles')
      .update({
        budget_min_cr: budgetMin,
        budget_max_cr: budgetMax,
        preferred_sizes_gaj: sizes,
        location_preference: location.trim(),
        buying_timeline: timeline,
        questionnaire_completed: true,
        questionnaire_completed_at: new Date().toISOString(),
      })
      .eq('id', uid);

    setSubmitting(false);

    if (upsertErr) {
      setError(upsertErr.message);
      return;
    }
    router.push('/welcome');
  }

  if (!authChecked) {
    return (
      <main className="grid min-h-dvh place-items-center bg-sand">
        <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-sand">
      <div className="mx-auto flex max-w-xl flex-col px-5 pt-5 pb-6 sm:px-8">
        <Logo />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4"
        >
          <p className="label">Almost there</p>
          <h1 className="mt-1 font-serif text-2xl font-semibold leading-tight text-ink">
            Answer these <span className="italic text-accent-deep">4 quick questions</span> and you&apos;re done.
          </h1>
        </motion.div>

        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          {/* 1. Budget */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-2xl border border-line bg-white px-4 py-3"
          >
            <p className="label text-xs">01 · Budget range</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink/60">Min</span>
                <span className="font-serif text-sm font-semibold text-ink">{formatCr(budgetMin)}</span>
              </div>
              <input
                type="range"
                min={BUDGET_MIN_FLOOR}
                max={BUDGET_MIN_CEIL}
                step={BUDGET_STEP}
                value={budgetMin}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setBudgetMin(v);
                  if (v >= budgetMax) setBudgetMax(Math.min(BUDGET_MAX_CEIL, v + 0.5));
                }}
                className="range-slider w-full accent-ink"
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-ink/60">Max</span>
                <span className="font-serif text-sm font-semibold text-ink">{formatCr(budgetMax)}</span>
              </div>
              <input
                type="range"
                min={BUDGET_MAX_FLOOR}
                max={BUDGET_MAX_CEIL}
                step={BUDGET_STEP}
                value={budgetMax}
                onChange={(e) => setBudgetMax(parseFloat(e.target.value))}
                className="range-slider w-full accent-ink"
              />
            </div>
          </motion.section>

          {/* 2. Size */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-2xl border border-line bg-white px-4 py-3"
          >
            <p className="label text-xs">02 · Preferred size <span className="font-normal text-ink/50">(in gaj)</span></p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SIZE_OPTIONS.map((size) => {
                const selected = sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                      selected
                        ? 'border-ink bg-ink text-sand'
                        : 'border-line bg-sand text-ink/70 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </motion.section>

          {/* 3. Location */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.11 }}
            className="rounded-2xl border border-line bg-white px-4 py-3"
          >
            <p className="label text-xs">03 · Location in Faridabad</p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Sector or gated society?"
              className="input mt-2 text-sm"
            />
          </motion.section>

          {/* 4. Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="rounded-2xl border border-line bg-white px-4 py-3"
          >
            <p className="label text-xs">04 · Buying timeline</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {TIMELINE_OPTIONS.map((opt) => {
                const selected = timeline === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTimeline(opt.value)}
                    className={`rounded-xl border px-2 py-2 text-xs font-medium transition ${
                      selected
                        ? 'border-ink bg-ink text-sand'
                        : 'border-line bg-sand text-ink/70 hover:border-ink/40 hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </motion.section>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-2 text-xs text-red-700">{error}</p>
          )}

          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "I'm done"}
          </button>
        </form>
      </div>
    </main>
  );
}
