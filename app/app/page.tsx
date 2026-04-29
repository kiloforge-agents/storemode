import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { InStoreApp } from "@/components/InStoreApp";

export const metadata = {
  title: "StoreMode · Live demo",
  description:
    "Walk through Eastfield Market with StoreMode's in-store mode. AR overlays, map routing, and live promotions — fully interactive.",
};

export default function AppPage() {
  return (
    <main className="relative min-h-screen bg-bg text-ink">
      {/* Mobile (<= md) — fullscreen native-feel */}
      <div className="md:hidden">
        <div className="relative h-[100svh] w-full">
          <InStoreApp />
        </div>
      </div>

      {/* Desktop — show phone frame in a contextual environment */}
      <div className="hidden md:block">
        <div className="relative">
          {/* gradient stage */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
          </div>

          <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/70 backdrop-blur-xl">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
              <Link
                href="/"
                className="flex items-center gap-2 text-[12px] text-ink-dim hover:text-ink"
              >
                <ArrowLeft size={14} />
                Back to overview
              </Link>
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-accent text-black">
                  <span className="font-display text-[11px] font-bold tracking-tight">SM</span>
                </div>
                <span className="font-display text-sm font-medium tracking-tight">StoreMode</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                Demo · live
              </span>
            </div>
          </header>

          <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1fr_0.9fr]">
            {/* Copy */}
            <div className="md:pr-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                Walk-through · Eastfield Market
              </div>
              <h1 className="mt-3 font-display text-4xl leading-[1.02] tracking-tight md:text-5xl">
                Try the in-store mode <br />
                <span className="text-accent">in your browser.</span>
              </h1>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-ink-dim md:text-[15px]">
                The phone on the right is the live demo. Tap a card to open product details, switch
                between AR / Map / List, search a category, and watch the route render onto the
                store map. On a real device, the same screens use the camera, GPS, and beacons.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 md:max-w-md">
                {[
                  { t: "AR view", d: "Floating overlays + reticle lock" },
                  { t: "Map view", d: "Aisle plan + walk routing" },
                  { t: "Live promotions", d: "Triggered by aisle entry" },
                  { t: "Smart list", d: "Stock + distance aware" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded-2xl border border-line bg-bg-elev p-3"
                  >
                    <div className="text-sm font-medium">{x.t}</div>
                    <div className="mt-0.5 text-[12px] text-ink-dim">{x.d}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2 rounded-2xl border border-line-bright bg-bg-elev/60 p-3 text-[12px] text-ink-dim">
                <Smartphone size={14} className="text-accent" />
                Tip: open this page on a phone for the full experience.
              </div>
            </div>

            {/* Phone */}
            <div className="relative mx-auto">
              <PhoneFrame>
                <InStoreApp />
              </PhoneFrame>
              <div className="pointer-events-none absolute -bottom-6 left-6 right-6 h-12 rounded-[40px] bg-accent/30 blur-2xl" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
