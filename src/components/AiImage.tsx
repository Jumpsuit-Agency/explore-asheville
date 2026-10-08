"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A creative comp with an "AI" provenance mark in its lower-right corner.
 *
 * Every image under /creative/ is AI-generated, so the badge is opt-out
 * rather than opt-in: new comps are marked the moment they are dropped in,
 * without anyone remembering to flag them. Real photography (the team
 * headshots under /team/) never matches the prefix and renders as a bare
 * <img>, so nothing about its layout can shift.
 */
function isGenerated(src: string) {
  return src.startsWith("/creative/");
}

/**
 * Deliberately NOT a wrapper around the image.
 *
 * The comps are sized a dozen different ways across the deck — percentage
 * max-widths against a flex parent, 100%/100% inside a grid cell, intrinsic
 * sizing in a centred column. An extra element in that chain re-resolves
 * every one of those percentages against the wrapper instead of the real
 * parent; measured against a pre-change baseline, that moved or resized 58
 * of the deck's 110 images.
 *
 * So the <img> keeps its exact styles and its exact place in the tree, and
 * the badge is an absolutely positioned sibling. Out-of-flow means flex and
 * grid skip it entirely: it cannot shift what it is marking.
 *
 * The two agree on coordinates for free: `offsetLeft`/`offsetTop` are
 * measured from the image's `offsetParent`, which is the nearest positioned
 * ancestor — exactly the containing block the sibling badge resolves its own
 * `left`/`top` against. Nothing needs to be promoted to `position: relative`.
 */
interface Props {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

export function AiImage({ src, alt, style, className, onError }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const ir = el.getBoundingClientRect();
    if (!ir.width || !ir.height) return;
    // The deck scales its canvas, so bounding rects are in scaled pixels
    // while offsetLeft/offsetTop are unscaled layout pixels. Convert.
    const scale = el.offsetWidth ? ir.width / el.offsetWidth : 1;

    // `object-fit: contain` letterboxes: the element box can be wider or
    // taller than the pixels inside it, and a badge pinned to the box corner
    // would float in the empty margin beside the artwork.
    let insetX = 0;
    let insetY = 0;
    const { naturalWidth: nw, naturalHeight: nh } = el;
    if (nw && nh && getComputedStyle(el).objectFit === "contain") {
      const s = Math.min(ir.width / nw, ir.height / nh);
      insetX = (ir.width - nw * s) / 2;
      insetY = (ir.height - nh * s) / 2;
    }

    let right = ir.right - insetX;
    let bottom = ir.bottom - insetY;
    let minLeft = ir.left + insetX;
    let minTop = ir.top + insetY;

    // Clamp inside every clipping ancestor. The carousel stage sets
    // overflow:hidden and crops tall artwork, so the image's true corner can
    // sit outside the visible area — and a badge pinned to it is clipped away
    // with the part of the image nobody sees. Pin to the visible corner.
    for (let a: HTMLElement | null = el.parentElement; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (/hidden|auto|scroll|clip/.test(cs.overflow + cs.overflowX + cs.overflowY)) {
        const cr = a.getBoundingClientRect();
        if (!cr.width || !cr.height) continue;
        right = Math.min(right, cr.right);
        bottom = Math.min(bottom, cr.bottom);
        minLeft = Math.max(minLeft, cr.left);
        minTop = Math.max(minTop, cr.top);
      }
    }
    right = Math.max(right, minLeft);
    bottom = Math.max(bottom, minTop);

    const left = el.offsetLeft + (right - ir.left) / scale;
    const top = el.offsetTop + (bottom - ir.top) / scale;
    // Bail when nothing moved. This runs from a ResizeObserver, so handing
    // back a fresh object every tick would re-render on a loop.
    setPos((prev) => (prev && prev.left === left && prev.top === top ? prev : { left, top }));
  }, []);

  const marked = isGenerated(src);

  useEffect(() => {
    if (!marked) return;
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    measure();
    // The deck scales to the window and slides animate in, so the fit is not
    // settled at mount. Watching the parent catches reflows the image's own
    // box does not change through.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(parent);
    for (let a: HTMLElement | null = parent; a; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (/hidden|auto|scroll|clip/.test(cs.overflow + cs.overflowX + cs.overflowY)) {
        ro.observe(a);
        break;
      }
    }
    return () => ro.disconnect();
  }, [marked, measure, src]);

  const img = (
    <img
      ref={ref}
      src={src}
      alt={alt}
      style={style}
      className={className}
      onLoad={measure}
      onError={onError}
    />
  );

  if (!marked) return img;

  return (
    <>
      {img}
      {pos && (
        <span className="ai-badge" style={{ left: pos.left, top: pos.top }} aria-hidden="true">
          AI
        </span>
      )}
    </>
  );
}
