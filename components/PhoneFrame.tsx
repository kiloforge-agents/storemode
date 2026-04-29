"use client";

import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  showStatus?: boolean;
};

export function PhoneFrame({ children, className, showStatus = true }: Props) {
  return (
    <div
      className={clsx(
        "relative mx-auto w-full max-w-[400px] aspect-[9/19.5] overflow-hidden rounded-[44px] border border-line bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="notch" />
      {showStatus && (
        <div className="pointer-events-none absolute inset-x-0 top-2 z-50 flex items-center justify-between px-7 font-mono text-[10px] tracking-tight text-ink/90">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_6px_rgba(214,255,58,0.7)]" />
            <span className="font-sans text-[10px] uppercase tracking-widest text-ink-dim">5G</span>
            <span className="font-sans text-[10px] uppercase tracking-widest text-ink-dim">82%</span>
          </span>
        </div>
      )}
      <div className="absolute inset-0 overflow-hidden rounded-[44px]">{children}</div>
    </div>
  );
}
