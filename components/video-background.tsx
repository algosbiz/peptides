"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Seamless looping video background.
 *
 * A plain <video loop> shows a hard cut at the loop point unless the clip is
 * authored to be seamless. To smooth ANY clip, we run two copies of the video
 * and crossfade: when the visible one nears its end, the other restarts from 0
 * and we dissolve between them over `fade` seconds. The result has no visible
 * seam between end and start. `loop` stays on as a no-JS safety net.
 */
export function VideoBackground({
  src,
  fade = 1,
}: {
  src: string;
  fade?: number;
}) {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const frontRef = useRef<"a" | "b">("a");
  const lockRef = useRef(false);
  const [front, setFront] = useState<"a" | "b">("a");

  useEffect(() => {
    const a = aRef.current;
    const b = bRef.current;
    if (!a || !b) return;

    // Respect reduced-motion: hold a single static first frame, no playback.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try {
        a.currentTime = 0;
      } catch {}
      return;
    }

    a.play().catch(() => {});

    const onTime = (e: Event) => {
      const v = e.currentTarget as HTMLVideoElement;
      const which: "a" | "b" = v === a ? "a" : "b";
      if (which !== frontRef.current || lockRef.current) return;
      if (!Number.isFinite(v.duration) || v.duration === 0) return;

      if (v.duration - v.currentTime <= fade) {
        lockRef.current = true;
        const other = which === "a" ? b : a;
        try {
          other.currentTime = 0;
        } catch {}
        other.play().catch(() => {});
        const next = which === "a" ? "b" : "a";
        frontRef.current = next;
        setFront(next);
        // release after the dissolve, and rest the outgoing copy
        window.setTimeout(() => {
          lockRef.current = false;
          v.pause();
        }, fade * 1000);
      }
    };

    a.addEventListener("timeupdate", onTime);
    b.addEventListener("timeupdate", onTime);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      b.removeEventListener("timeupdate", onTime);
    };
  }, [fade]);

  const base =
    "absolute inset-0 h-full w-full object-cover transition-opacity ease-linear motion-reduce:transition-none";

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <video
        ref={aRef}
        className={`${base} ${front === "a" ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDuration: `${fade * 1000}ms` }}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <video
        ref={bRef}
        className={`${base} ${front === "b" ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDuration: `${fade * 1000}ms` }}
        src={src}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
}
