import Link from 'next/link';
import { ArrowLeft, Mail } from 'lucide-react';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Delete Account - BrickBase',
  description:
    'Request deletion of your BrickBase account and personal data.',
};

export default function DeleteAccountPage() {
  const requestHref =
    'mailto:hello@brickbase.co.in?subject=BrickBase%20account%20deletion%20request&body=Hi%20BrickBase%2C%0A%0AI%20would%20like%20to%20delete%20my%20BrickBase%20account%20and%20personal%20data.%0A%0ARegistered%20mobile%20number%3A%20%2B91%20%0AFull%20name%3A%20%0A%0AThank%20you.';

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
          Delete Account
        </h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: 24 May 2026</p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-ink/75">
          <p>
            You can request deletion of your BrickBase account and personal data
            at any time. Send us the request from the email or phone number
            associated with your account so we can verify ownership.
          </p>

          <a href={requestHref} className="btn-primary w-full sm:w-auto">
            <Mail className="h-4 w-4" /> Request deletion
          </a>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            How to request deletion
          </h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>
              Email{' '}
              <a
                href="mailto:hello@brickbase.co.in"
                className="underline underline-offset-2 hover:text-ink"
              >
                hello@brickbase.co.in
              </a>{' '}
              with the subject &ldquo;BrickBase account deletion request&rdquo;.
            </li>
            <li>
              Include your registered mobile number and full name so we can find
              the correct account.
            </li>
            <li>
              We will confirm your request and complete deletion within 7 days
              after verification.
            </li>
          </ol>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            What we delete
          </h2>
          <ul className="ml-5 list-disc space-y-2">
            <li>Your BrickBase account profile.</li>
            <li>Your phone number, name, and profession.</li>
            <li>Your saved property preferences and questionnaire responses.</li>
            <li>Any shortlists or account-linked activity stored by BrickBase.</li>
          </ul>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            What may be retained
          </h2>
          <p>
            We may retain limited records only when required for security,
            fraud prevention, legal compliance, or resolving active support
            requests. Any retained data is kept only for as long as necessary.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            Need help?
          </h2>
          <p>
            If you cannot access your registered phone number or are unsure which
            details are on your account, email{' '}
            <a
              href="mailto:hello@brickbase.co.in"
              className="underline underline-offset-2 hover:text-ink"
            >
              hello@brickbase.co.in
            </a>{' '}
            and we&apos;ll help verify the request.
          </p>
        </div>
      </div>
    </main>
  );
}
