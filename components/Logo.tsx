import Link from 'next/link';

const BRICK_W = 6;
const BRICK_H = 3;
const COL_GAP = 0.6;
const ROW_GAP = 0.6;

const bShape = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1],
];

const COLS = bShape[0].length;
const ROWS = bShape.length;
const B_WIDTH = COLS * BRICK_W + (COLS - 1) * COL_GAP;
const B_GAP = 4;
const TOTAL_W = 2 * B_WIDTH + B_GAP;
const TOTAL_H = ROWS * BRICK_H + (ROWS - 1) * ROW_GAP;

function renderB(offsetX: number, keyPrefix: string) {
  return bShape.flatMap((row, y) =>
    row
      .map((on, x) =>
        on ? (
          <rect
            key={`${keyPrefix}-${y}-${x}`}
            x={offsetX + x * (BRICK_W + COL_GAP)}
            y={y * (BRICK_H + ROW_GAP)}
            width={BRICK_W}
            height={BRICK_H}
            rx={0.7}
          />
        ) : null
      )
      .filter(Boolean)
  );
}

export function BrickMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${TOTAL_W} ${TOTAL_H}`}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {renderB(0, 'b1')}
      {renderB(B_WIDTH + B_GAP, 'b2')}
    </svg>
  );
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${className}`}>
      <BrickMark className="h-[18px] w-auto text-ink" />
      <span className="font-serif text-xl font-semibold tracking-tight text-ink">
        BrickBase
      </span>
    </Link>
  );
}
