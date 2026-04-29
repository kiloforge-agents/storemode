"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { AISLES, PINS, PROMOTIONS, STORE, type Pin } from "@/lib/store-data";

type Props = {
  activePinId?: string | null;
  onPinTap?: (p: Pin) => void;
  showRoute?: boolean;
  className?: string;
};

// We use a viewBox of 0 0 100 160 (taller than wide → portrait map)
export function StoreMap({ activePinId, onPinTap, showRoute = true, className }: Props) {
  const target = PINS.find((p) => p.id === activePinId) ?? null;

  const route =
    target && showRoute
      ? buildRoute(STORE.user, target.position)
      : null;

  return (
    <div className={clsx("relative h-full w-full overflow-hidden rounded-[28px] border border-line bg-[#0d110c]", className)}>
      {/* subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />
      {/* axis labels */}
      <div className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        N ↑
      </div>
      <div className="pointer-events-none absolute right-3 top-3 font-mono text-[10px] tracking-[0.18em] text-ink-mute">
        1:240
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
        Eastfield · floor 1
      </div>

      <svg viewBox="0 0 100 160" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id="hatch" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="3" stroke="rgba(214,255,58,0.18)" strokeWidth="0.6" />
          </pattern>
          <linearGradient id="floorFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101510" />
            <stop offset="100%" stopColor="#0a0d0b" />
          </linearGradient>
          <radialGradient id="userPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d6ff3a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d6ff3a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* outer wall */}
        <rect x="2" y="2" width="96" height="156" rx="3" fill="url(#floorFade)" stroke="#2c2f25" strokeWidth="0.6" />

        {/* aisles */}
        {AISLES.map((a) => {
          const isFront = a.id === "entry" || a.id === "checkout";
          return (
            <g key={a.id}>
              <rect
                x={a.rect.x}
                y={a.rect.y}
                width={a.rect.w}
                height={a.rect.h}
                rx={1.4}
                fill={isFront ? "rgba(214,255,58,0.05)" : "rgba(245,241,232,0.04)"}
                stroke="rgba(245,241,232,0.16)"
                strokeWidth="0.35"
              />
              <text
                x={a.rect.x + a.rect.w / 2}
                y={a.rect.y + a.rect.h / 2 + 1.2}
                textAnchor="middle"
                fontSize={a.rect.h < 10 ? 2.4 : 3.2}
                fill="rgba(245,241,232,0.55)"
                fontFamily="var(--font-mono), ui-monospace"
                style={{ letterSpacing: 0.2 }}
              >
                {a.label}
              </text>
            </g>
          );
        })}

        {/* doors / arrows at front */}
        <g>
          <path d="M 18 152 L 18 144 L 22 148 Z" fill="rgba(214,255,58,0.6)" />
          <path d="M 80 144 L 80 152 L 76 148 Z" fill="rgba(245,241,232,0.4)" />
        </g>

        {/* promotions zones */}
        {PROMOTIONS.map((p) => (
          <g key={p.id} opacity="0.85">
            <circle
              cx={p.position.x}
              cy={p.position.y}
              r="4.5"
              fill={
                p.color === "lime"
                  ? "rgba(214,255,58,0.18)"
                  : p.color === "orange"
                  ? "rgba(255,138,61,0.18)"
                  : "rgba(122,216,255,0.18)"
              }
              stroke={
                p.color === "lime"
                  ? "rgba(214,255,58,0.7)"
                  : p.color === "orange"
                  ? "rgba(255,138,61,0.7)"
                  : "rgba(122,216,255,0.7)"
              }
              strokeDasharray="0.8 0.8"
              strokeWidth="0.4"
            />
          </g>
        ))}

        {/* route */}
        {route && (
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            d={route}
            fill="none"
            stroke="#d6ff3a"
            strokeWidth="0.9"
            strokeLinecap="round"
            strokeDasharray="2 1.4"
          />
        )}

        {/* product pins */}
        {PINS.map((pin) => {
          const isActive = pin.id === activePinId;
          return (
            <g
              key={pin.id}
              onClick={() => onPinTap?.(pin)}
              style={{ cursor: onPinTap ? "pointer" : "default" }}
            >
              {pin.deal && (
                <circle
                  cx={pin.position.x}
                  cy={pin.position.y}
                  r="3.6"
                  fill="url(#hatch)"
                  className="pulse-ring"
                  style={{ transformOrigin: `${pin.position.x}px ${pin.position.y}px` }}
                />
              )}
              <circle
                cx={pin.position.x}
                cy={pin.position.y}
                r={isActive ? 1.8 : 1.2}
                fill={isActive ? "#d6ff3a" : pin.deal ? "#d6ff3a" : "#f5f1e8"}
                stroke="#0a0d0b"
                strokeWidth="0.4"
              />
            </g>
          );
        })}

        {/* user marker */}
        <g>
          <circle cx={STORE.user.x} cy={STORE.user.y} r="6" fill="url(#userPulse)" />
          <circle
            cx={STORE.user.x}
            cy={STORE.user.y}
            r="1.6"
            fill="#d6ff3a"
            stroke="#0a0d0b"
            strokeWidth="0.5"
          />
          {/* heading cone */}
          <g transform={`rotate(${STORE.heading} ${STORE.user.x} ${STORE.user.y})`}>
            <path
              d={`M ${STORE.user.x} ${STORE.user.y - 2} L ${STORE.user.x - 2.4} ${STORE.user.y + 2.4} L ${STORE.user.x + 2.4} ${STORE.user.y + 2.4} Z`}
              fill="#d6ff3a"
              opacity="0.5"
            />
          </g>
        </g>
      </svg>

      {/* legend */}
      <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-3 rounded-full border border-line bg-bg-elev/80 px-3 py-1.5 backdrop-blur">
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> You
        </span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-accent ring-1 ring-accent/30" /> Deal
        </span>
        <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-ink" /> Item
        </span>
      </div>
    </div>
  );
}

// Simple Manhattan-ish route through aisle corridors
function buildRoute(from: { x: number; y: number }, to: { x: number; y: number }) {
  // pick a corridor row near the target
  const rowY = to.y;
  const upY = Math.min(from.y, rowY);

  // Routes via the main corridor at x=4..96, then up/down
  const points: { x: number; y: number }[] = [
    { x: from.x, y: from.y },
    { x: from.x, y: 130 }, // step into front aisle
    { x: 8, y: 130 }, // enter perimeter
    { x: 8, y: rowY }, // along left perimeter
    { x: to.x, y: rowY }, // across to target
    { x: to.x, y: to.y },
  ];
  // Smooth: convert to "M x y L x y..." with bezier rounding using line-to
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  // unused placeholders to keep lint quiet on shadowed vars
  void upY;
}
