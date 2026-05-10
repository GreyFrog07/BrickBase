import Link from 'next/link';
import Image from 'next/image';

const LOGO_W = 688;
const LOGO_H = 372;

export function BrickMark({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/brickbase-logo.png"
      alt="BrickBase"
      width={LOGO_W}
      height={LOGO_H}
      className={`h-10 w-auto ${className}`}
      priority
    />
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`} aria-label="BrickBase">
      <Image
        src="/brickbase-logo.png"
        alt="BrickBase"
        width={LOGO_W}
        height={LOGO_H}
        className="h-9 w-auto sm:h-11"
        priority
      />
    </Link>
  );
}
