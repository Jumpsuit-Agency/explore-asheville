"use client";

import { createContext, useContext, useEffect, useRef } from "react";

/**
 * A slide's inner sequence — carousel items, story beats, schedule phases.
 *
 * The deck asks the registered sequence before it changes slide, so one
 * forward key walks the whole deck including everything nested inside it.
 * That matters because a presentation clicker can only send PageDown: if
 * carousel items were reachable another way, they would not be reachable at
 * all from the podium.
 *
 * `next`/`prev` return whether they consumed the step. `false` means the
 * sequence is exhausted and the deck should move on.
 */
export interface SequenceApi {
  next: () => boolean;
  prev: () => boolean;
}

interface SequenceContextValue {
  register: (api: SequenceApi | null) => void;
  /** Which way the deck was travelling when this slide mounted. */
  entryDirection: React.RefObject<"forward" | "backward">;
}

export const SlideSequenceContext =
  createContext<SequenceContextValue | null>(null);

/**
 * Lends a slide's inner sequence to the deck's navigation.
 *
 * `setIndex` must be stable (a `useState` setter is). Walking stops at each
 * end rather than wrapping, so the deck can take over — the on-screen arrows
 * keep their own wrap-around behaviour.
 */
export function useSlideSequence(
  length: number,
  index: number,
  setIndex: (i: number) => void
) {
  const ctx = useContext(SlideSequenceContext);

  // Re-registered whenever the position changes, so the closures are always
  // current without writing refs during render.
  useEffect(() => {
    if (!ctx) return;
    ctx.register({
      next: () => {
        if (index < length - 1) {
          setIndex(index + 1);
          return true;
        }
        return false;
      },
      prev: () => {
        if (index > 0) {
          setIndex(index - 1);
          return true;
        }
        return false;
      },
    });
    return () => ctx.register(null);
  }, [ctx, index, length, setIndex]);

  // Arriving backwards should land on the last item, so the next back-press
  // keeps walking instead of skipping the slide's contents.
  const entered = useRef(false);
  useEffect(() => {
    if (entered.current || !ctx) return;
    entered.current = true;
    if (ctx.entryDirection.current === "backward" && length > 1) {
      setIndex(length - 1);
    }
  }, [ctx, length, setIndex]);
}
