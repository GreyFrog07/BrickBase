import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Privacy Policy — BrickBase',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh bg-sand">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <Logo />

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-1 text-sm text-ink/60 hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back home
        </Link>

        <h1 className="mt-6 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: 1 May 2026</p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-ink/75">
          <p>
            We respect your privacy. This policy explains what we collect, why,
            and what we do with it.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            1. What we collect
          </h2>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Phone number</strong> — to send you a one-time verification
              code and to identify your account.
            </li>
            <li>
              <strong>Name and profession</strong> — provided by you during
              signup.
            </li>
            <li>
              <strong>Buying preferences</strong> — budget, location, size, and
              timeline you tell us during the questionnaire.
            </li>
            <li>
              <strong>Basic device info</strong> — browser type and IP, only for
              security and rate-limiting against abuse.
            </li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            2. How we use it
          </h2>
          <p>We use your information to:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Match you with builder floors that fit your preferences.</li>
            <li>
              Contact you about properties relevant to your stated interest.
            </li>
            <li>Improve the service and prevent abuse.</li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            3. Who we share with
          </h2>
          <p>
            We may share your name and phone number with the builder of a
            property you express interest in, so they can connect with you
            directly. We do not sell your data to third parties.
          </p>
          <p>
            We use Supabase to store data and Twilio to send verification codes.
            Both are reputable infrastructure providers with their own privacy
            commitments.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            4. How long we keep it
          </h2>
          <p>
            We keep your account and preferences as long as you have an active
            account. You can request deletion at any time (see below).
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            5. Your rights
          </h2>
          <p>
            You can request a copy of your data, ask us to correct inaccuracies,
            or have your account fully deleted. Email{' '}
            <a
              href="mailto:hello@brickbase.co.in"
              className="underline underline-offset-2 hover:text-ink"
            >
              hello@brickbase.co.in
            </a>{' '}
            and we&apos;ll respond within 7 days.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            6. Cookies and tracking
          </h2>
          <p>
            We use only the cookies and local storage strictly required to keep
            you logged in and to enforce rate limits. We do not run third-party
            advertising or analytics trackers.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            7. Updates
          </h2>
          <p>
            If we change this policy meaningfully, we&apos;ll let registered
            users know. Continued use after changes means you accept them.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            8. Contact
          </h2>
          <p>
            Questions or concerns? Email{' '}
            <a
              href="mailto:hello@brickbase.co.in"
              className="underline underline-offset-2 hover:text-ink"
            >
              hello@brickbase.co.in
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
