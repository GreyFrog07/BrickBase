import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="max-w-sm text-sm text-ink/60">
            Every builder floor in Faridabad — 300+ buildings, 900+ floors, right in your phone.
          </p>
        </div>
        <p className="mt-10 text-xs text-ink/40">
          © {new Date().getFullYear()} BrickBase. Built in Faridabad.
        </p>
      </div>
    </footer>
  );
}
