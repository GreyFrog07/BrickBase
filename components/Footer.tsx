import { Logo } from './Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="max-w-sm text-sm text-ink/60">
            Every builder floor in Faridabad — 300+ buildings, 1000+ floors, right in your phone.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BrickBase. Built in Faridabad.</p>
          <nav className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/privacy-policy/" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms-and-conditions/" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/delete-account/" className="hover:text-ink">
              Delete account
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
