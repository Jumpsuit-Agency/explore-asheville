"use client";

// Uses the actual mountain image as a persistent background.
// As slides advance, the image shifts upward — you "descend"
// into the Blue Ridge. Each slide reveals more mountain.

interface MountainParallaxProps {
  currentSlide: number;
  totalSlides: number;
}

export function MountainParallax({ currentSlide, totalSlides }: MountainParallaxProps) {
  // Start with sky visible (image positioned low), end with mountains filling frame
  // backgroundPosition Y goes from 100% (sky) to 0% (mountains) as slides progress
  const progress = currentSlide / (totalSlides - 1);
  const yPosition = 100 - (progress * 100);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Persistent sky base */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#9EA6CB",
        }}
      />

      {/* Mountain image — shifts as slides progress */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/ridge-bg.jpg)",
          // 2816x1536 source in a 1920x1080 box: "cover" yields 1980x1080 and
          // zero vertical overflow, so the Y pan below had nothing to move
          // through. An explicit height gives it room to travel.
          backgroundSize: "auto 140%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `center ${yPosition}%`,
          transition: "background-position 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}
