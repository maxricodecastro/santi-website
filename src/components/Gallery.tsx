"use client";

import { useEffect, useRef, useState } from "react";
import GalleryImage from "./GalleryImage";

const galleryItems: { src: string; label: string; type: "image" | "video" }[] = [
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319369/IMG_0324_bnc6b2.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319369/IMG_0316_fgpenw.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319426/250702_Clip_2_v1_iyvojg.mp4", label: "", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319281/IMG_0847_zmimfq.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319243/IMG_0863_yrjrxe.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319312/Santi_Clip_1_v1_puuvs8.mp4", label: "", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319242/_P1A9944_Original_2_flhcmx.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319242/WhatsApp_Image_2026-03-09_at_19.29.59_pufmrm.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/video/upload/v1774319269/CANVAS_GUITAR_SOLO_INSTA_jlsbgz.mp4", label: "", type: "video" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/WhatsApp_Image_2026-03-09_at_19.31.05_nsj6cx.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/IMG_0260_rma2n7.jpg", label: "", type: "image" },
  { src: "https://res.cloudinary.com/dxv6sw1ce/image/upload/v1774319240/WhatsApp_Image_2026-03-09_at_19.28.37_tbmmot.jpg", label: "", type: "image" },
];

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const paused = hoveredIndex !== null;

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
        onTouchStart={() => setHoveredIndex(null)}
        onTouchEnd={() => setHoveredIndex(null)}
      >
        {allItems.map((item, i) => (
          <GalleryImage
            key={i}
            src={item.src}
            label={item.label}
            type={item.type}
            isHovered={hoveredIndex === i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
    </div>
  );
}
