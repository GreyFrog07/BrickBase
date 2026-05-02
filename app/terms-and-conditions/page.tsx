import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';

export const metadata = {
  title: 'Terms & Conditions — BrickBase',
};

export default function TermsPage() {
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
          Terms &amp; Conditions
        </h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: 1 May 2026</p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-ink/75">
          <p>
            Welcome to BrickBase. By signing up or using our service, you agree
            to the terms below.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            1. What we do
          </h2>
          <p>
            BrickBase is a discovery platform for builder-floor properties in
            Faridabad. We collect listing information from builders and present
            it to interested buyers. We are not a broker and do not facilitate
            the actual transaction between buyer and seller.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            2. Your account
          </h2>
          <p>
            You sign up using your phone number and verify with a one-time code.
            You are responsible for keeping access to your phone secure. Provide
            accurate details when filling out your preferences.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            3. Acceptable use
          </h2>
          <p>
            Don&apos;t scrape, automate, or attempt to disrupt the service.
            Don&apos;t sign up with phone numbers that aren&apos;t yours. We
            reserve the right to block accounts that abuse the platform.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            4. Listings and pricing
          </h2>
          <p>
            Listing information is provided by builders and may change without
            notice. We make no guarantee about availability, exact pricing, or
            specifications. Always verify details directly with the builder
            before any transaction.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            5. No brokerage
          </h2>
          <p>
            BrickBase does not charge buyers any brokerage fees. Any fees,
            charges, or transactions are strictly between you and the builder.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            6. Liability
          </h2>
          <p>
            BrickBase is provided &ldquo;as is&rdquo;. We are not liable for any
            losses arising from decisions you make based on information on this
            platform. Always do your own due diligence before purchasing
            property.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            7. Changes
          </h2>
          <p>
            We may update these terms from time to time. Continued use of the
            service after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="mt-10 font-serif text-2xl font-semibold text-ink">
            8. Contact
          </h2>
          <p>
            Questions? Reach us at{' '}
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
