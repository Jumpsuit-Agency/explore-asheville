"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { MountainParallax } from "./MountainParallax";
import { CreativeAdvisor, CreativeAdvisorHandle } from "./CreativeAdvisor";
import { SlideSequenceContext, SequenceApi } from "./SlideSequence";
import { TitleSlide } from "./slides/TitleSlide";
import { AboutSlide } from "./slides/AboutSlide";
import { AssignmentSlide } from "./slides/AssignmentSlide";
import { TerritoriesSlide } from "./slides/TerritoriesSlide";
import { Territory1DescSlide } from "./slides/Territory1DescSlide";
import { Territory1Slide } from "./slides/Territory1Slide";
import { Territory2DescSlide } from "./slides/Territory2DescSlide";
import { Territory3DescSlide } from "./slides/Territory3DescSlide";
import { Territory3MontageSlide } from "./slides/Territory3MontageSlide";
import { Territory3InDestinationSlide } from "./slides/Territory3InDestinationSlide";
import { Territory3DigitalMontageSlide } from "./slides/Territory3DigitalMontageSlide";
import { Territory3SocialSlide } from "./slides/Territory3SocialSlide";
import { Territory3GuerillaIntroSlide } from "./slides/Territory3GuerillaIntroSlide";
import { RationaleSlide } from "./slides/RationaleSlide";
import { ClientRubricSlide } from "./slides/ClientRubricSlide";
import { Territory2CreativeSlide } from "./slides/Territory2CreativeSlide";
import { Territory3SasStorySlide } from "./slides/Territory3SasStorySlide";
import { Territory3ActivationsSlide } from "./slides/Territory3ActivationsSlide";
import { Territory3CompostSlide } from "./slides/Territory3CompostSlide";
import { Territory3CreativeSlide } from "./slides/Territory3CreativeSlide";
import { ProductionScheduleSlide } from "./slides/ProductionScheduleSlide";
import { WhyItWorksSlide } from "./slides/WhyItWorksSlide";
import { ClosingSlide } from "./slides/ClosingSlide";

export interface SlideProps {
  onDepthOpen?: (panelId: string) => void;
  onNavigate?: (slideId: SlideId) => void;
  onOpenAdvisor?: () => void;
}

interface SlideConfig {
  id: string;
  title: string;
  component: React.ComponentType<SlideProps>;
  depthPanels?: string[];
}

const SLIDES = [
  { id: "title", title: "Title", component: TitleSlide },
  { id: "about", title: "About Jumpsuit", component: AboutSlide },
  { id: "assignment", title: "The Assignment", component: AssignmentSlide },
  { id: "territories", title: "Three Territories", component: TerritoriesSlide },
  { id: "territory-1-desc", title: "Make Something of It", component: Territory1DescSlide },
  { id: "territory-1", title: "T1 Creative", component: Territory1Slide },
  { id: "territory-2-desc", title: "Sounds Made Up", component: Territory2DescSlide },
  { id: "territory-2-creative", title: "T2 Creative", component: Territory2CreativeSlide },
  { id: "territory-3-desc", title: "How Many Signs Do You Need?", component: Territory3DescSlide },
  { id: "territory-3-montage", title: "Signs — OOH", component: Territory3MontageSlide },
  { id: "territory-3-digital", title: "Signs — Digital", component: Territory3DigitalMontageSlide },
  { id: "territory-3-in-destination", title: "Signs — In-Destination", component: Territory3InDestinationSlide },
  { id: "territory-3-social", title: "Signs — Social", component: Territory3SocialSlide },
  { id: "territory-3-guerrilla-intro", title: "Guerrilla", component: Territory3GuerillaIntroSlide },
  { id: "territory-3-sas-story", title: "The Sasquatch Story", component: Territory3SasStorySlide },
  { id: "territory-3-activations", title: "Sas Activations", component: Territory3ActivationsSlide },
  { id: "territory-3-compost", title: "Composting the Campaign", component: Territory3CompostSlide },
  { id: "why-it-works", title: "Why This Works", component: WhyItWorksSlide },
  // { id: "production-schedule", title: "Production Schedule", component: ProductionScheduleSlide }, // PARKED — proposal deck
  // { id: "territory-3-creative", title: "T3 Creative", component: Territory3CreativeSlide }, // PARKED — revisit later
  // { id: "rationale", title: "Our Recommendation", component: RationaleSlide }, // PARKED — proposal deck
  // { id: "client-rubric", title: "Against Your Criteria", component: ClientRubricSlide }, // PARKED — proposal deck
  { id: "closing", title: "Let's Talk", component: ClosingSlide },
] as const satisfies readonly SlideConfig[];

/** Every slide id, derived from SLIDES — navigate by name, never by index. */
export type SlideId = (typeof SLIDES)[number]["id"];

const SLIDE_INDEX = Object.fromEntries(
  SLIDES.map((s, i) => [s.id, i])
) as Record<SlideId, number>;

/** Resolve a slide id to its position. Keeps callers free of magic numbers. */
export function slideIndexById(id: SlideId): number {
  return SLIDE_INDEX[id];
}

const LEGEND_SEEN_KEY = "ea-deck-legend-seen";
const CHROME_IDLE_MS = 2500;
const WHEEL_COOLDOWN_MS = 600;
const SWIPE_MIN_PX = 50;

/** Regions that own their own scrolling and must not drive slide navigation. */
const SCROLL_REGIONS = ".advisor-panel, .advisor-trigger, [data-scroll-region]";

export default function Deck() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [depthOpen, setDepthOpen] = useState<string | null>(null);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const advisorRef = useRef<CreativeAdvisorHandle>(null);

  // Mirrors `current` so event handlers read it without re-binding listeners.
  const currentRef = useRef(0);
  // The current slide's inner sequence, if it lent one to the deck.
  const sequenceRef = useRef<SequenceApi | null>(null);
  const entryDirection = useRef<"forward" | "backward">("forward");
  const hideChromeTimer = useRef<number | null>(null);
  const wheelLock = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Scale 1920x1080 canvas to viewport
  const updateScale = useCallback(() => {
    if (!canvasRef.current || !viewportRef.current) return;
    const vw = viewportRef.current.clientWidth;
    const vh = viewportRef.current.clientHeight;
    const scale = Math.min(vw / 1920, vh / 1080);
    canvasRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  // Reveal the chrome, then fade it back out once the pointer settles.
  const wakeChrome = useCallback(() => {
    setChromeVisible(true);
    if (hideChromeTimer.current) window.clearTimeout(hideChromeTimer.current);
    hideChromeTimer.current = window.setTimeout(
      () => setChromeVisible(false),
      CHROME_IDLE_MS
    );
  }, []);

  useEffect(
    () => () => {
      if (hideChromeTimer.current) window.clearTimeout(hideChromeTimer.current);
    },
    []
  );

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, SLIDES.length - 1));
    // A jump (overview, deep link, CTA) is not a walk — start at the top.
    entryDirection.current = "forward";
    sequenceRef.current = null;
    currentRef.current = clamped;
    setCurrent(clamped);
    setOverview(false);
    setDepthOpen(null);
    setAtEnd(false);
    // Written here rather than in an effect: a mount-time write races the hash
    // read below and, under StrictMode's double invoke, clobbers deep links.
    if (window.location.hash.slice(1) !== SLIDES[clamped].id) {
      window.location.hash = SLIDES[clamped].id;
    }
  }, []);

  const goToId = useCallback((id: SlideId) => goTo(slideIndexById(id)), [goTo]);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (depthOpen) return; // depth open blocks surface navigation

      // The slide's own sequence gets the step first. Only once it is
      // exhausted does the deck move — so one forward key walks carousel
      // items, story beats and phases without anything being unreachable.
      const seq = sequenceRef.current;
      if (seq && (dir === "next" ? seq.next() : seq.prev())) return;

      const next = dir === "next" ? currentRef.current + 1 : currentRef.current - 1;
      if (next < 0) return;
      if (next > SLIDES.length - 1) {
        setAtEnd(true);
        window.setTimeout(() => setAtEnd(false), 1600);
        return;
      }
      goTo(next);
      // goTo resets this for jumps; a walk overrides it straight after.
      entryDirection.current = dir === "next" ? "forward" : "backward";
    },
    [depthOpen, goTo]
  );

  // Deep link on load, and keep Back/Forward in sync with the deck.
  useEffect(() => {
    const readHash = () => {
      const id = window.location.hash.slice(1);
      const idx = SLIDES.findIndex((s) => s.id === id);
      if (idx >= 0) {
        currentRef.current = idx;
        setCurrent(idx);
      }
    };
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, []);

  // First visit only: show the keyboard legend, then get out of the way.
  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(LEGEND_SEEN_KEY) === "1";
    } catch {
      // Private mode or blocked storage — show it, just don't remember.
    }
    if (seen) return;
    // Deferred a frame so the legend fades in after first paint rather than
    // forcing a cascading render on mount.
    const raf = requestAnimationFrame(() => setShowLegend(true));
    const t = window.setTimeout(() => {
      setShowLegend(false);
      try {
        window.localStorage.setItem(LEGEND_SEEN_KEY, "1");
      } catch {
        /* nothing to persist to */
      }
    }, 4000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't capture keys while typing in the advisor.
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      // Overview mode
      if (e.key === "o" || e.key === "O") {
        if (!depthOpen) {
          e.preventDefault();
          setOverview((o) => !o);
          return;
        }
      }

      // Escape closes depth first, then overview
      if (e.key === "Escape") {
        e.preventDefault();
        if (depthOpen) {
          setDepthOpen(null);
        } else if (overview) {
          setOverview(false);
        }
        return;
      }

      if (overview) return; // no navigation in overview mode

      // Surface navigation. PageDown/PageUp are what presentation clickers send.
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === " " ||
        e.key === "PageDown"
      ) {
        e.preventDefault();
        navigate("next");
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        navigate("prev");
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        goTo(SLIDES.length - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, goTo, depthOpen, overview]);

  // Trackpad / wheel — one gesture moves one slide.
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (overview || depthOpen) return;
      // The advisor scrolls its own conversation; don't steal that.
      if ((e.target as HTMLElement)?.closest?.(SCROLL_REGIONS)) return;
      const now = Date.now();
      if (now < wheelLock.current) return;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 12) return;
      wheelLock.current = now + WHEEL_COOLDOWN_MS;
      navigate(delta > 0 ? "next" : "prev");
    },
    [navigate, overview, depthOpen]
  );

  // Touch — horizontal swipe only, so vertical intent is left alone.
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if ((e.target as HTMLElement)?.closest?.(SCROLL_REGIONS)) {
      touchStart.current = null;
      return;
    }
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start || overview || depthOpen) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
      navigate(dx < 0 ? "next" : "prev");
    },
    [navigate, overview, depthOpen]
  );

  const registerSequence = useCallback((api: SequenceApi | null) => {
    sequenceRef.current = api;
  }, []);

  const advance = useCallback(() => navigate("next"), [navigate]);
  const retreat = useCallback(() => navigate("prev"), [navigate]);

  const sequenceContext = useMemo(
    () => ({ register: registerSequence, advance, retreat, entryDirection }),
    [registerSequence, advance, retreat]
  );

  const SlideComponent = SLIDES[current].component;

  return (
    <div
      className="deck-viewport"
      ref={viewportRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseMove={wakeChrome}
    >
      <div className="slide-canvas" ref={canvasRef}>
        {/* Persistent mountain parallax background */}
        <MountainParallax currentSlide={current} totalSlides={SLIDES.length} />

        {/*
          Navigation layer, beneath the slide content. The content layer above
          is `pointer-events: none`, so anything that isn't a control lets the
          click fall through to here. A new control that nobody marks up still
          advances the deck — never a dead click.

          Split into two zones so the cursor can point the way it will move.
          Zone width is --nav-prev-zone in globals.css.
        */}
        <div className="nav-layer" aria-hidden="true">
          <div
            className={`nav-zone nav-zone-prev ${current === 0 ? "is-disabled" : ""}`}
            onClick={() => navigate("prev")}
          />
          <div className="nav-zone nav-zone-next" onClick={() => navigate("next")} />
        </div>

        {/* Slide content layer — above the nav layer so controls stay clickable */}
        <div className="slide-content">
          <SlideSequenceContext.Provider value={sequenceContext}>
            <SlideComponent
              key={SLIDES[current].id}
              onDepthOpen={(panelId) => setDepthOpen(panelId)}
              onNavigate={goToId}
              onOpenAdvisor={() => advisorRef.current?.open()}
            />
          </SlideSequenceContext.Provider>
        </div>

        {/* Depth overlay */}
        {depthOpen && (
          <div
            className="depth-overlay depth-enter"
            onClick={(e) => {
              if (e.target === e.currentTarget) setDepthOpen(null);
            }}
          >
            <button
              className="absolute top-6 right-8 z-60 opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setDepthOpen(null)}
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, background: "none", border: "none", cursor: "pointer", color: "var(--color-ink)" }}
            >
              ESC to close
            </button>
          </div>
        )}

        {/* AI Advisor — z-44/45, above the nav layer, so it keeps its own clicks */}
        <CreativeAdvisor
          ref={advisorRef}
          slideId={SLIDES[current].id}
          slideTitle={SLIDES[current].title}
        />
      </div>

      {/*
        Chrome lives outside .slide-canvas so it renders at true size — inside,
        the canvas transform shrank the 13px counter to ~9px on a laptop.
      */}
      <div className="deck-chrome">
        <div
          className="progress-bar"
          style={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
        />

        <div className={`nav-controls ${chromeVisible ? "is-visible" : ""}`}>
          <button
            className="nav-arrow"
            onClick={() => navigate("prev")}
            disabled={current === 0}
            aria-label="Previous slide"
          >
            &#8592;
          </button>
          <span className="nav-counter">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
          <button
            className="nav-arrow"
            onClick={() => navigate("next")}
            disabled={current === SLIDES.length - 1}
            aria-label="Next slide"
          >
            &#8594;
          </button>
        </div>

        {atEnd && <div className="deck-end-toast">End of deck &middot; press O for overview</div>}

        {showLegend && (
          <div className="key-legend" role="status">
            <span>
              <kbd>&#8592;</kbd>
              <kbd>&#8594;</kbd> or click to move
            </span>
            <span>
              <kbd>O</kbd> overview
            </span>
          </div>
        )}
      </div>

      {/*
        Overview renders as a sibling of the canvas, not in place of it, so
        carousel positions, card flips and expanded rows survive a peek.
        It must stay outside .slide-canvas: that element has a transform, which
        would make it the containing block for this position:fixed grid.
      */}
      {overview && (
        <div className="overview-grid">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              className={`overview-thumb ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="type-label text-white/40 text-[10px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="type-label text-white/70 text-[11px] mt-1">
                {slide.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
