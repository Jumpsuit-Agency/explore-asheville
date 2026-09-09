"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MountainParallax } from "./MountainParallax";
import { TitleSlide } from "./slides/TitleSlide";
import { AboutSlide } from "./slides/AboutSlide";
import { AssignmentSlide } from "./slides/AssignmentSlide";
import { TerritoriesSlide } from "./slides/TerritoriesSlide";
import { Territory1DescSlide } from "./slides/Territory1DescSlide";
import { Territory1Slide } from "./slides/Territory1Slide";
import { Territory2DescSlide } from "./slides/Territory2DescSlide";
import { Territory3DescSlide } from "./slides/Territory3DescSlide";
import { RationaleSlide } from "./slides/RationaleSlide";
import { ClientRubricSlide } from "./slides/ClientRubricSlide";
import { HeroFilmSlide } from "./slides/HeroFilmSlide";
import { ActivationsSlide } from "./slides/ActivationsSlide";
import { Territory1FilmSlide } from "./slides/Territory1FilmSlide";
import { Territory2CreativeSlide } from "./slides/Territory2CreativeSlide";
import { Territory2FilmSlide } from "./slides/Territory2FilmSlide";
import { Territory3CreativeSlide } from "./slides/Territory3CreativeSlide";
import { B30Slide } from "./slides/B30Slide";

export interface SlideProps {
  onDepthOpen?: (panelId: string) => void;
  onNavigate?: (slideIndex: number) => void;
}

interface SlideConfig {
  id: string;
  title: string;
  component: React.ComponentType<SlideProps>;
  depthPanels?: string[];
}

const SLIDES: SlideConfig[] = [
  { id: "title", title: "Title", component: TitleSlide },                                    // 0
  { id: "about", title: "About Jumpsuit", component: AboutSlide },                           // 1
  { id: "assignment", title: "The Assignment", component: AssignmentSlide },                  // 2
  { id: "territories", title: "Three Territories", component: TerritoriesSlide },             // 3
  { id: "territory-1-desc", title: "Make Something of It", component: Territory1DescSlide },  // 4
  { id: "territory-1", title: "T1 Creative", component: Territory1Slide },                    // 5
  { id: "territory-1-film", title: "T1 Film", component: Territory1FilmSlide },               // 6
  { id: "territory-2-desc", title: "Sounds Made Up", component: Territory2DescSlide },        // 7
  { id: "territory-2-creative", title: "T2 Creative", component: Territory2CreativeSlide },   // 8
  { id: "territory-2-film", title: "T2 Film", component: Territory2FilmSlide },              // 9
  { id: "territory-3-desc", title: "How Many Signs Do You Need?", component: Territory3DescSlide }, // 10
  { id: "territory-3-creative", title: "T3 Creative", component: Territory3CreativeSlide },   // 10
  { id: "hero-film", title: "Hero Film", component: HeroFilmSlide },                         // 11
  { id: "rationale", title: "Our Recommendation", component: RationaleSlide },                // 12
  { id: "client-rubric", title: "Against Your Criteria", component: ClientRubricSlide },      // 13
  { id: "activations", title: "Cross-Platform Activations", component: ActivationsSlide },    // 14
  { id: "b30", title: "Business 3.0 Lens", component: B30Slide },                            // 15
];

export default function Deck() {
  const [current, setCurrent] = useState(0);
  const [overview, setOverview] = useState(false);
  const [depthOpen, setDepthOpen] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

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

  // Hash-based deep linking
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = SLIDES.findIndex((s) => s.id === hash);
      if (idx >= 0) setCurrent(idx);
    }
  }, []);

  useEffect(() => {
    window.location.hash = SLIDES[current].id;
  }, [current]);

  const navigate = useCallback(
    (dir: "next" | "prev") => {
      if (depthOpen) return; // depth open blocks surface navigation
      setCurrent((c) =>
        dir === "next"
          ? Math.min(c + 1, SLIDES.length - 1)
          : Math.max(c - 1, 0)
      );
    },
    [depthOpen]
  );

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setOverview(false);
    setDepthOpen(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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

      // Surface navigation
      if (
        e.key === "ArrowRight" ||
        e.key === "ArrowDown" ||
        e.key === " "
      ) {
        e.preventDefault();
        navigate("next");
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate("prev");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate, depthOpen, overview]);

  const SlideComponent = SLIDES[current].component;

  // Overview mode
  if (overview) {
    return (
      <div className="overview-grid">
        {SLIDES.map((slide, i) => (
          <div
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
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="deck-viewport" ref={viewportRef}>
      <div className="slide-canvas" ref={canvasRef}>
        {/* Persistent mountain parallax background */}
        <MountainParallax
          currentSlide={current}
          totalSlides={SLIDES.length}
        />

        {/* Slide content layer */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          <SlideComponent
            onDepthOpen={(panelId) => setDepthOpen(panelId)}
            onNavigate={goTo}
          />
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
              className="absolute top-6 right-8 z-60 text-ink opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => setDepthOpen(null)}
              style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 600, background: "none", border: "none", cursor: "pointer", color: "var(--color-ink)" }}
            >
              ESC to close
            </button>
          </div>
        )}

        {/* Progress bar */}
        <div
          className="progress-bar"
          style={{
            width: `${((current + 1) / SLIDES.length) * 100}%`,
          }}
        />

        {/* Navigation counter */}
        <div className="nav-controls">
          <span className="nav-counter">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
