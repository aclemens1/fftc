type Sign = {
  key: string;
  name: string;
  glyph: string; // Unicode symbol
};

const SIGNS: Sign[] = [
  { key: "aries", name: "Aries", glyph: "♈" },
  { key: "taurus", name: "Taurus", glyph: "♉" },
  { key: "gemini", name: "Gemini", glyph: "♊" },
  { key: "cancer", name: "Cancer", glyph: "♋" },
  { key: "leo", name: "Leo", glyph: "♌" },
  { key: "virgo", name: "Virgo", glyph: "♍" },
  { key: "libra", name: "Libra", glyph: "♎" },
  { key: "scorpio", name: "Scorpio", glyph: "♏" },
  { key: "sagittarius", name: "Sagittarius", glyph: "♐" },
  { key: "capricorn", name: "Capricorn", glyph: "♑" },
  { key: "aquarius", name: "Aquarius", glyph: "♒" },
  { key: "pisces", name: "Pisces", glyph: "♓" },
];

type Props = {
  size?: number;                // px
  ringWidth?: number;           // px
  onSelect?: (key: string) => void;
  selectedKey?: string;
};

export default function ZodiacWheel({
  size = 320,
  ringWidth = 56,
  onSelect,
  selectedKey,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 2;
  const innerR = outerR - ringWidth;
  const step = (2 * Math.PI) / 12;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="group"
      aria-label="Zodiac wheel"
      style={{ display: "block", maxWidth: "100%" }}
    >
      <circle cx={cx} cy={cy} r={outerR} fill="#fafafa" stroke="#ddd" />
      {SIGNS.map((s, i) => {
        const a0 = -Math.PI / 2 + i * step;
        const a1 = a0 + step;
        const largeArc = 0;
        const x0o = cx + outerR * Math.cos(a0),
          y0o = cy + outerR * Math.sin(a0);
        const x1o = cx + outerR * Math.cos(a1),
          y1o = cy + outerR * Math.sin(a1);
        const x1i = cx + innerR * Math.cos(a1),
          y1i = cy + innerR * Math.sin(a1);
        const x0i = cx + innerR * Math.cos(a0),
          y0i = cy + innerR * Math.sin(a0);

        const pathD = [
          `M ${x0o} ${y0o}`,
          `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x1o} ${y1o}`,
          `L ${x1i} ${y1i}`,
          `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x0i} ${y0i}`,
          "Z",
        ].join(" ");

        const mid = a0 + step / 2;
        const iconR = (innerR + outerR) / 2;
        const ix = cx + iconR * Math.cos(mid);
        const iy = cy + iconR * Math.sin(mid);

        const isSelected = selectedKey === s.key;

        return (
          <g key={s.key}>
            <path
              d={pathD}
              fill={isSelected ? "#eef6ff" : "white"}
              stroke="#e5e7eb"
              onClick={() => onSelect?.(s.key)}
              role="button"
              tabIndex={0}
              aria-label={s.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onSelect?.(s.key);
              }}
              style={{ cursor: onSelect ? "pointer" : "default" }}
            />
            <text
              x={ix}
              y={iy + 6}
              fontSize={20}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                userSelect: "none",
                fontFamily:
                  "'Segoe UI Symbol', 'Apple Color Emoji', 'Noto Color Emoji', system-ui, sans-serif",
                fill: "#111827",
              }}
              pointerEvents="none"
            >
              {s.glyph}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={innerR - 6} fill="#fff" stroke="#e5e7eb" />
    </svg>
  );
}
