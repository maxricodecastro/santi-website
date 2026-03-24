"use client";

import { useEffect, useRef, useState } from "react";
import GalleryImage from "./GalleryImage";

const galleryItems = [
  { src: "/Knossos.JPG", label: "KNOSSOS" },
  { src: "/Knossos.JPG", label: "LIVE IN ATHENS" },
  { src: "/Knossos.JPG", label: "BACKSTAGE" },
  { src: "/Knossos.JPG", label: "STUDIO SESSION" },
  { src: "/Knossos.JPG", label: "ON TOUR" },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = el.scrollLeft;
    const speed = 0.5;

    const scroll = () => {
      if (!paused) {
        scrollPos += speed;
        if (scrollPos >= el.scrollWidth / 2) {
          scrollPos = 0;
        }
        el.scrollLeft = scrollPos;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [paused]);

  const allItems = [...galleryItems, ...galleryItems];

  return (
    <div className="relative">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 lg:w-24 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 lg:w-24 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {allItems.map((item, i) => (
          <GalleryImage
            key={i}
            src={item.src}
            label={item.label}
            onHover={setPaused}
          />
        ))}
      </div>
    </div>
  );
}
