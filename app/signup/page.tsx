'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/lib/supabase';

type Step = 'details' | 'otp' | 'registered';

const RATE_LIMIT_KEY = 'bb_attempted_phones';
const RATE_LIMIT_MAX = 7;

function getAttemptedPhones(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function recordAttempt(phone: string) {
  const phones = getAttemptedPhones();
  if (!phones.includes(phone)) {
    phones.push(phone);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(phones));
  }
}

function isDeviceBlocked(phone: string): boolean {
  const phones = getAttemptedPhones();
  const uniqueWithoutCurrent = phones.filter((p) => p !== phone);
  return uniqueWithoutCurrent.length >= RATE_LIMIT_MAX;
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fullPhone = `+91${phone}`;

  async function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!profession.trim()) { setError('Please enter your profession.'); return; }
    if (!/^\d{10}$/.test(phone)) { setError('Enter a 10-digit mobile number.'); return; }

    if (isDeviceBlocked(phone)) {
      setError('Too many sign-up attempts from this device. Please contact support.');
      return;
    }

    setLoading(true);

    // Check if already registered before burning a Twilio token
    const { data: alreadyRegistered, error: rpcErr } = await supabase
      .rpc('check_phone_registered', { p_phone: fullPhone });

    if (rpcErr) {
      setLoading(false);
      setError(rpcErr.message);
      return;
    }

    if (alreadyRegistered) {
      setLoading(false);
      setStep('registered');
      return;
    }

    recordAttempt(fullPhone);

    const { error: otpErr } = await supabase.auth.signInWithOtp({ phone: fullPhone });
    setLoading(false);
    if (otpErr) { setError(otpErr.message); return; }
    setStep('otp');
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit code we just texted you.');
      return;
    }
    setLoading(true);
    const { data, error: verifyErr } = await supabase.auth.verifyOtp({
      phone: fullPhone,
      token: otp,
      type: 'sms',
    });
    if (verifyErr) {
      setLoading(false);
      setError(verifyErr.message);
      return;
    }

    // Save name, profession, phone to profile
    const uid = data.user?.id;
    if (uid) {
      await supabase.from('profiles').update({
        name: name.trim(),
        profession: profession.trim(),
        phone: fullPhone,
      }).eq('id', uid);
    }

    setLoading(false);
    router.push('/questionnaire');
  }

  return (
    <main className="min-h-dvh bg-sand">
      <div className="mx-auto flex max-w-md flex-col px-5 pt-8 pb-16 sm:px-8 sm:pt-12">
        <Logo />

        <div className="mt-16 sm:mt-20">
          {step === 'details' && (
            <form onSubmit={sendOtp} className="space-y-5">
              <div>
                <p className="label">Step 1 of 2</p>
                <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink">
                  Let's get you<br />started.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink/60">
                  We'll text you a 6-digit code to confirm. No password needed.
                </p>
              </div>

              <div>
                <label htmlFor="name" className="label">Full name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  placeholder="Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input mt-1"
                />
              </div>

              <div>
                <label htmlFor="profession" className="label">Profession</label>
                <input
                  id="profession"
                  type="text"
                  autoComplete="organization-title"
                  placeholder="e.g. Business owner, Engineer…"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="input mt-1"
                />
              </div>

              <div>
                <label htmlFor="phone" className="label">Mobile number</label>
                <div className="flex items-stretch gap-2 mt-1">
                  <span className="grid place-items-center rounded-2xl border border-line bg-white px-4 text-base font-medium text-ink/70">
                    +91
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="input flex-1"
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify via OTP <ArrowRight className="h-4 w-4" /></>}
              </button>

              <p className="text-center text-xs leading-relaxed text-ink/50">
                By continuing, you agree to our{' '}
                <a href="/terms-and-conditions/" className="underline underline-offset-2 hover:text-ink">Terms</a>{' '}
                and{' '}
                <a href="/privacy-policy/" className="underline underline-offset-2 hover:text-ink">Privacy Policy</a>.
              </p>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={verifyOtp} className="space-y-7">
              <div>
                <button
                  type="button"
                  onClick={() => { setStep('details'); setOtp(''); setError(null); }}
                  className="-ml-1 inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Change number
                </button>
                <p className="mt-6 label">Step 2 of 2</p>
                <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink">
                  Enter the<br />6-digit code.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink/60">
                  We sent it to <span className="font-medium text-ink">{fullPhone}</span>.
                </p>
              </div>

              <div>
                <label htmlFor="otp" className="label">Verification code</label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  autoFocus
                  placeholder="● ● ● ● ● ●"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="input text-center text-2xl tracking-[0.5em]"
                />
              </div>

              {error && <p className="text-sm text-red-700">{error}</p>}

              <button type="submit" className="btn-primary w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Verify <ArrowRight className="h-4 w-4" /></>}
              </button>
            </form>
          )}

          {step === 'registered' && (
            <div className="space-y-6">
              <div>
                <p className="label">Already with us</p>
                <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink">
                  No need to worry.
                </h1>
                <p className="mt-4 text-base leading-relaxed text-ink/60">
                  You're already registered with us. We'll be in touch with the right listings for you.
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setStep('details'); setPhone(''); setError(null); }}
                className="-ml-1 inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Use a different number
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
