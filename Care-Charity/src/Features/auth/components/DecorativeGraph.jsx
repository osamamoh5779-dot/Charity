const NODES = [
  { x: 160, y: 125 },
  { x: 220, y: 110 },
  { x: 285, y: 80 },
  { x: 365, y: 40 },
  { x: 315, y: 165 },
];

export default function DecorativeGraph() {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      className="pointer-events-none absolute bottom-8 end-0 hidden rtl:-scale-x-100 w-[72%] max-w-[420px] text-primary opacity-40 lg:block"
      aria-hidden="true"
    >
      <path
        d="M5 190 C85 185 112 130 160 125 S245 100 285 80 S340 65 400 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />
      <path
        d="M65 210 C130 175 160 115 205 135 S295 110 335 65 S380 35 405 0"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M155 210 C185 180 235 200 280 165 S345 135 390 100"
        stroke="currentColor"
        strokeWidth="1.2"
      />

      {NODES.map(({ x, y }) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="var(--color-card)" stroke="currentColor" strokeWidth="1.5" />
          <circle cx={x} cy={y} r="1.6" fill="currentColor" />
        </g>
      ))}

      <circle cx="105" cy="172" r="2.5" fill="currentColor" />
      <circle cx="65" cy="205" r="2.5" fill="currentColor" />
    </svg>
  );
}
