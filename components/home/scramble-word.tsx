"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const TICK_MS = 55;

/**
 * A single hoverable word. While the pointer is over it, every letter is
 * continuously randomised; on leave it snaps back to the original text.
 * Non-letters (hyphens, periods, spaces) are preserved so layout & punctuation
 * stay put. Letters are randomised — the headline's CSS `uppercase` handles case.
 */
export function ScrambleWord({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = useCallback(() => {
    setDisplay(
      text
        .split("")
        .map((ch) =>
          /[a-z]/i.test(ch)
            ? CHARS[Math.floor(Math.random() * CHARS.length)]
            : ch,
        )
        .join(""),
    );
  }, [text]);

  const start = useCallback(() => {
    if (timer.current) return;
    scramble();
    timer.current = setInterval(scramble, TICK_MS);
  }, [scramble]);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setDisplay(text);
  }, [text]);

  // clear the interval if the component unmounts mid-hover
  useEffect(() => stop, [stop]);

  return (
    <span
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={text}
      className={`inline-block cursor-pointer whitespace-nowrap ${className}`}
    >
      <span aria-hidden>{display}</span>
    </span>
  );
}
