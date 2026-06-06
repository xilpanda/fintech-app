export default function SecurityDiagram() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-panel">
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#243044" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#151f2e" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="glow-red" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e63946" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#e63946" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-teal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00b4d8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00b4d8" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="#0f1724" />
        <rect width="400" height="300" fill="url(#grid-fade)" />

        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * 37.5}
            x2="400"
            y2={i * 37.5}
            stroke="#243044"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * 40}
            y1="0"
            x2={i * 40}
            y2="300"
            stroke="#243044"
            strokeWidth="0.5"
          />
        ))}

        <circle cx="200" cy="150" r="80" fill="url(#glow-red)" />
        <circle cx="120" cy="100" r="50" fill="url(#glow-teal)" />
        <circle cx="300" cy="200" r="40" fill="url(#glow-teal)" />

        <circle cx="200" cy="150" r="50" fill="none" stroke="#e63946" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
        <circle cx="200" cy="150" r="70" fill="none" stroke="#243044" strokeWidth="1" />

        <path
          d="M200 110 L200 130 L215 145 L200 190 L185 145 Z"
          fill="none"
          stroke="#e63946"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M200 125 L208 145 L200 165 L192 145 Z"
          fill="#e63946"
          fillOpacity="0.3"
        />

        {[
          [80, 80], [320, 70], [60, 220], [340, 240], [200, 50], [150, 250]
        ].map(([cx, cy], i) => (
          <g key={i}>
            <line
              x1="200"
              y1="150"
              x2={cx}
              y2={cy}
              stroke="#243044"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <circle cx={cx} cy={cy} r="6" fill="#151f2e" stroke={i % 2 === 0 ? "#e63946" : "#00b4d8"} strokeWidth="1.5" />
          </g>
        ))}

        <rect x="20" y="20" width="120" height="50" rx="4" fill="#151f2e" stroke="#243044" strokeWidth="1" />
        <text x="30" y="40" fill="#8b9cb3" fontSize="9" fontFamily="monospace">SCAN_STATUS</text>
        <text x="30" y="56" fill="#e63946" fontSize="11" fontFamily="monospace" fontWeight="bold">3 CRITICAL</text>

        <rect x="260" y="230" width="120" height="50" rx="4" fill="#151f2e" stroke="#243044" strokeWidth="1" />
        <text x="270" y="250" fill="#8b9cb3" fontSize="9" fontFamily="monospace">COVERAGE</text>
        <text x="270" y="266" fill="#00b4d8" fontSize="11" fontFamily="monospace" fontWeight="bold">100% SCOPE</text>
      </svg>
    </div>
  );
}
