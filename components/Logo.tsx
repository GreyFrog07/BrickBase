import Link from 'next/link';

export function BrickMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 265 210"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Staggered brick wall — bottom to top, right bricks bleed into B stem */}
      <rect x="5"   y="155" width="52" height="26" rx="4" />
      <rect x="62"  y="155" width="52" height="26" rx="4" />
      <rect x="13"  y="124" width="46" height="26" rx="4" />
      <rect x="64"  y="124" width="46" height="26" rx="4" />
      <rect x="115" y="124" width="22" height="26" rx="4" />
      <rect x="5"   y="93"  width="46" height="26" rx="4" />
      <rect x="56"  y="93"  width="46" height="26" rx="4" />
      <rect x="107" y="93"  width="24" height="26" rx="4" />
      <rect x="21"  y="62"  width="40" height="24" rx="4" />
      <rect x="66"  y="62"  width="40" height="24" rx="4" />
      <rect x="111" y="62"  width="18" height="24" rx="4" />
      <rect x="37"  y="33"  width="34" height="22" rx="4" />
      <rect x="76"  y="33"  width="34" height="22" rx="4" />
      <rect x="9"   y="33"  width="24" height="20" rx="3" />
      <rect x="13"  y="8"   width="20" height="16" rx="3" />

      {/*
        Left B — stem x 108-128, bumps y 12-192 (H=180, each bump chord=90 → ry=45)
        Counters: chord=58 → ry=29
        fill-rule="evenodd" punches the counter holes
      */}
      <path
        fillRule="evenodd"
        d="
          M 108 12 L 128 12
          A 62 45 0 0 1 128 102
          A 64 45 0 0 1 128 192
          L 108 192 Z
          M 128 28 A 46 29 0 0 1 128 86  L 113 86  L 113 28  Z
          M 128 118 A 48 29 0 0 1 128 176 L 113 176 L 113 118 Z
        "
      />

      {/*
        Right B — stem x 164-190, bumps y 5-205 (H=200, each bump chord=100 → ry=50)
        Counters: chord=66 → ry=33
      */}
      <path
        fillRule="evenodd"
        d="
          M 164 5 L 190 5
          A 70 50 0 0 1 190 105
          A 72 50 0 0 1 190 205
          L 164 205 Z
          M 190 23 A 54 33 0 0 1 190 89  L 171 89  L 171 23  Z
          M 190 121 A 56 33 0 0 1 190 187 L 171 187 L 171 121 Z
        "
      />
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <BrickMark className="h-[22px] w-auto text-ink" />
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        BrickBase
      </span>
    </Link>
  );
}
