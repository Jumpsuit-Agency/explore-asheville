"use client";

import { useMemo, useState, useCallback } from "react";
import { useSlideSequence } from "../SlideSequence";

/**
 * The creative slides nest tab -> section -> item, and the deck's forward key
 * used to walk only the items of whichever section happened to be open. That
 * left most of the artwork reachable by mouse alone — which, from the podium,
 * means unreachable, since a presentation clicker sends one key.
 *
 * Flattening the tree into a single ordered list of stops makes one cursor
 * span the whole thing: `useSlideSequence` clamps at either end and the deck
 * takes over, so the last stop hands off to the next slide for free.
 */
export type Stop =
  | { kind: "item"; tab: number; section: number; item: number }
  | { kind: "script"; tab: number; script: number };

interface SectionLike {
  items: unknown[];
}
interface ScriptLike {
  lines: unknown[] | null;
}

/**
 * Depth-first over every tab, section and item, then the scripts.
 *
 * Scripts that are still placeholders are deliberately NOT stops. They remain
 * selectable from their pill, but a linear pass should never strand the room
 * on a "Coming Soon" screen mid-pitch.
 */
export function buildStops(
  tabs: { sections: SectionLike[] }[],
  scripts: ScriptLike[],
  scriptsTabIndex: number
): Stop[] {
  const stops: Stop[] = [];
  tabs.forEach((tab, ti) =>
    tab.sections.forEach((section, si) =>
      section.items.forEach((_, ii) =>
        stops.push({ kind: "item", tab: ti, section: si, item: ii })
      )
    )
  );
  scripts.forEach((script, i) => {
    if (script.lines) stops.push({ kind: "script", tab: scriptsTabIndex, script: i });
  });
  return stops;
}

export function useCreativeStops(
  tabs: { sections: SectionLike[] }[],
  scripts: ScriptLike[],
  scriptsTabIndex: number
) {
  const stops = useMemo(
    () => buildStops(tabs, scripts, scriptsTabIndex),
    [tabs, scripts, scriptsTabIndex]
  );

  const [stopIdx, setStopIdx] = useState(0);
  // Placeholder scripts are not stops, so which script pill is selected is
  // tracked separately and only follows the cursor when the cursor is on one.
  const [pickedScript, setPickedScript] = useState(0);

  useSlideSequence(stops.length, stopIdx, setStopIdx);

  const stop = stops[Math.min(stopIdx, stops.length - 1)] ?? {
    kind: "item" as const,
    tab: 0,
    section: 0,
    item: 0,
  };

  const jumpTo = useCallback(
    (predicate: (s: Stop) => boolean) => {
      const i = stops.findIndex(predicate);
      if (i >= 0) setStopIdx(i);
      return i;
    },
    [stops]
  );

  const changeTab = useCallback(
    (ti: number) => {
      const i = jumpTo((s) => s.tab === ti);
      // A tab whose scripts are all placeholders has no stop of its own;
      // land on its first pill anyway rather than ignoring the click.
      if (i < 0 && ti === scriptsTabIndex) setPickedScript(0);
    },
    [jumpTo, scriptsTabIndex]
  );

  const changeSection = useCallback(
    (si: number) =>
      jumpTo((s) => s.kind === "item" && s.tab === stop.tab && s.section === si),
    [jumpTo, stop.tab]
  );

  const changeScript = useCallback(
    (i: number) => {
      setPickedScript(i);
      jumpTo((s) => s.kind === "script" && s.script === i);
    },
    [jumpTo]
  );

  return {
    tabIdx: stop.tab,
    sectionIdx: stop.kind === "item" ? stop.section : 0,
    itemIdx: stop.kind === "item" ? stop.item : 0,
    scriptIdx: stop.kind === "script" ? stop.script : pickedScript,
    changeTab,
    changeSection,
    changeScript,
    stopCount: stops.length,
  };
}
