'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { supabase } from '@/lib/supabase';

export default function WelcomePage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        router.replace('/signup');
        return;
      }
      setPhone(user.phone ? `+${user.phone}` : null);

      const { data: profile } = await supabase
        .from('profiles')
        .select('questionnaire_completed')
        .eq('id', user.id)
        .single();

      if (!profile?.questionnaire_completed) {
        router.replace('/questionnaire');
        return;
      }
      setReady(true);
    })();
  }, [router]);

  if (!ready) {
    return (
      <main className="grid min-h-dvh place-items-center bg-sand">
        <Loader2 className="h-6 w-6 animate-spin text-ink/40" />
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-sand">
      <div className="mx-auto flex min-h-dvh max-w-md flex-col px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
        <Logo />

        <div className="mt-16 flex flex-1 flex-col justify-center sm:mt-20">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="relative grid h-20 w-20 place-items-center rounded-3xl bg-accent/15 text-accent-deep"
          >
            <motion.span
              aria-hidden
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-3xl bg-accent/30"
            />
            <motion.div
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Check className="relative h-9 w-9" strokeWidth={2.4} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl"
          >
            You&apos;re in.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg leading-relaxed text-ink/70"
          >
            We&apos;ve listed your preferences. We&apos;ll see you soon in your inbox{phone ? <> at <span className="font-medium text-ink">{phone}</span></> : null} with your property choices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 rounded-3xl border border-line bg-white p-6"
          >
            <p className="label">What happens next</p>
            <ul className="mt-4 space-y-3 text-ink/75">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                We line up floors that fit your brief.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                You scroll, shortlist, and pick what you love.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                We bring the keys. You decide on the visit.
              </li>
            </ul>
          </motion.div>

          <Link href="/" className="mt-10 text-center text-sm text-ink/60 hover:text-ink">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
