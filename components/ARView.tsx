"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronUp, MapPin, Sparkles, Tag, Navigation2 } from "lucide-react";
import clsx from "clsx";
import { PINS, PROMOTIONS, type Pin } from "@/lib/store-data";

type Props = {
  activePinId?: string | null;
  onPinTap?: (p: Pin) => void;
  onScan?: () => void;
};

export function ARView({ activePinId, onPinTap, onScan }: Props) {
  const target = PINS.find((p) => p.id === activePinId) ?? null;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(id);
  }, []);

  // Anchor positions in % across the AR viewport for floating overlays.
  // Each pin gets a horizontal bearing-based offset.
  const visiblePins = PINS.slice(0, 5).map((p, i) => {
    const left = 12 + ((i * 21) % 70);
    const top = 18 + ((i * 17) % 50);
    return { ...p, _left: left, _top: top };
  });

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-line bg-black">
      {/* Faux camera background — gradient + perspective floor lines */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, #1a1f17 0%, #0c0f0a 55%, #06080a 100%)",
          }}
        />
        {/* perspective floor */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-3/5 w-full opacity-50"
        >
          <defs>
            <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c0f0a" stopOpacity="0" />
              <stop offset="60%" stopColor="#0c0f0a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0c0f0a" stopOpacity="1" />
            </linearGradient>
          </defs>
          {[...Array(10)].map((_, i) => (
            <line
              key={`h${i}`}
              x1="-10"
              x2="110"
              y1={20 + i * 8}
              y2={20 + i * 8}
              stroke="rgba(214,255,58,0.16)"
              strokeWidth="0.2"
            />
          ))}
          {[...Array(11)].map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 10}
              x2={50 + (i * 10 - 50) * 5}
              y1="20"
              y2="100"
              stroke="rgba(214,255,58,0.14)"
              strokeWidth="0.2"
            />
          ))}
          <rect x="0" y="0" width="100" height="100" fill="url(#floor)" />
        </svg>

        {/* fake shelf silhouettes */}
        <div className="absolute inset-x-0 top-1/4 flex justify-between px-6 opacity-50">
          <div className="h-44 w-12 rounded-md bg-gradient-to-b from-[#1a1f17] to-[#0a0d0b]" />
          <div className="h-32 w-16 rounded-md bg-gradient-to-b from-[#1a1f17] to-[#0a0d0b]" />
          <div className="h-48 w-10 rounded-md bg-gradient-to-b from-[#1a1f17] to-[#0a0d0b]" />
        </div>

        {/* scan line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-accent/15 to-transparent scan-line" />

        {/* grain */}
        <div className="grain absolute inset-0" />
      </div>

      {/* HUD: top reticle + status */}
      <div className="pointer-events-none absolute inset-x-0 top-3 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 rounded-full border border-line-bright bg-bg-elev/70 px-2.5 py-1 backdrop-blur">
          <span className="relative inline-flex">
            <span className="absolute inset-0 rounded-full bg-accent/40 blur-sm" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
            AR · GPS lock
          </span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
          5 · 14m · 0.3°
        </div>
      </div>

      {/* center reticle */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <div className="relative h-44 w-44">
          <div className="absolute inset-0 rounded-full border border-accent/30 spin-slow" style={{
            background:
              "conic-gradient(from 0deg, rgba(214,255,58,0.0), rgba(214,255,58,0.18), rgba(214,255,58,0.0) 60%)",
          }} />
          <div className="absolute inset-4 rounded-full border border-dashed border-accent/40" />
          <div className="absolute inset-12 rounded-full border border-line-bright" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
          <div className="absolute -left-3 top-1/2 h-px w-3 -translate-y-1/2 bg-accent/50" />
          <div className="absolute -right-3 top-1/2 h-px w-3 -translate-y-1/2 bg-accent/50" />
          <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-accent/50" />
          <div className="absolute -bottom-3 left-1/2 h-3 w-px -translate-x-1/2 bg-accent/50" />
        </div>
      </div>

      {/* Floating product overlays */}
      {visiblePins.map((p, i) => (
        <motion.button
          key={p.id}
          onClick={() => onPinTap?.(p)}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
          className={clsx(
            "group absolute z-30 origin-bottom-left text-left",
          )}
          style={{ left: `${p._left}%`, top: `${p._top}%` }}
        >
          <div
            className={clsx(
              "floaty",
              "relative flex max-w-[180px] items-start gap-2 rounded-2xl border bg-black/70 p-2.5 pr-3 backdrop-blur-md transition",
              activePinId === p.id
                ? "border-accent shadow-[0_0_0_4px_rgba(214,255,58,0.18)]"
                : "border-white/15 hover:border-white/30"
            )}
            style={{ ["--rot" as string]: `${(i % 2 === 0 ? 1 : -1) * 1}deg` }}
          >
            <div
              className={clsx(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
                p.deal ? "bg-accent text-black" : "bg-white/10 text-white"
              )}
            >
              {p.deal ? <Tag size={12} strokeWidth={2.5} /> : <MapPin size={12} strokeWidth={2.5} />}
            </div>
            <div className="min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-mute">
                {p.category} · {p.distance}m
              </div>
              <div className="truncate text-[12px] font-medium leading-tight text-white">
                {p.name}
              </div>
              {p.deal ? (
                <div className="mt-0.5 text-[11px] text-accent">{p.deal}</div>
              ) : (
                <div className="mt-0.5 text-[11px] text-ink-dim">${p.price.toFixed(2)}</div>
              )}
            </div>
            {/* leader line */}
            <span className="absolute -bottom-3 left-3 h-3 w-px bg-white/40" />
            <span className="absolute -bottom-[14px] left-[10px] h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </motion.button>
      ))}

      {/* Promotion floor decal */}
      <AnimatePresence>
        <motion.div
          key={`promo-${tick % PROMOTIONS.length}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="pointer-events-none absolute bottom-32 left-1/2 z-30 -translate-x-1/2 px-3"
        >
          {(() => {
            const promo = PROMOTIONS[tick % PROMOTIONS.length];
            return (
              <div
                className="rounded-2xl border border-line-bright bg-black/70 px-3 py-2 backdrop-blur-md"
                style={{ transform: "perspective(380px) rotateX(28deg)" }}
              >
                <div className="flex items-center gap-2 text-[11px]">
                  <Sparkles size={12} className="text-accent" />
                  <span className="font-medium text-white">{promo.title}</span>
                  <span className="text-ink-dim">·</span>
                  <span className="text-ink-dim">{promo.subtitle}</span>
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Big nav arrow if there's a target */}
      <AnimatePresence>
        {target && (
          <motion.div
            key={target.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-x-0 top-24 z-30 flex justify-center"
          >
            <div
              className="rotate-arrow rounded-full border-2 border-accent/60 p-3"
              style={{ transform: `rotate(${target.bearing}deg)` }}
            >
              <ChevronUp className="text-accent" size={26} strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom action: navigate */}
      <div className="absolute inset-x-0 bottom-3 z-40 flex items-center justify-between gap-2 px-3">
        <button
          onClick={onScan}
          className="flex items-center gap-2 rounded-full border border-line-bright bg-bg-elev/80 px-3 py-2 text-[11px] font-medium text-ink-dim backdrop-blur transition hover:text-ink"
        >
          <span className="relative">
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent blink" />
          </span>
          Scan a shelf tag
        </button>
        {target ? (
          <div className="flex items-center gap-2 rounded-full bg-accent px-3 py-2 text-[11px] font-semibold text-black">
            <Navigation2 size={12} strokeWidth={3} />
            {target.distance}m to {target.name.split(" ")[0]}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-medium text-ink-dim backdrop-blur">
            Look around to surface deals
          </div>
        )}
      </div>
    </div>
  );
}
