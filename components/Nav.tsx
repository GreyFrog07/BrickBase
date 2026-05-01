import Link from 'next/link';
import { Logo } from './Logo';

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <Logo />
        <Link
          href="/signup"
          className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink hover:text-sand sm:px-5"
        >
          Sign up free
        </Link>
      </div>
    </header>
  );
}
