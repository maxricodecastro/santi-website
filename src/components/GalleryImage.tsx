"use client";

import { useEffect, useRef, useCallback } from "react";

let audioUnlocked = false;

if (typeof window !== "undefined") {
  const unlock = () => {
    audioUnlocked = true;
    window.removeEventListener("click", unlock);
    window.removeEventListener("touchstart", unlock);
  };
  window.addEventListener("click", unlock);
  window.addEventListener("touchstart", unlock);
}

interface GalleryImageProps {
  src: string;
  label: string;
  type?: "image" | "video";
  isHovered?: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function GalleryImage({
  src,
  label,
  type = "image",
  isHovered = false,
  onMouseEnter,
  onMouseLeave,
}: GalleryImageProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const ensurePlaying = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.paused) return;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (type !== "video" || !video) return;

    if (isHovered && audioUnlocked) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      video.muted = true;
      ensurePlaying();
    }
  }, [isHovered, type, ensurePlaying]);

  return (
    <div
      className="group relative h-36 lg:h-48 flex-shrink-0 cursor-pointer overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {type === "video" ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-auto object-cover"
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={label}
          className="h-full w-auto object-cover transition-[filter] duration-300 lg:group-hover:blur-sm lg:group-hover:brightness-50"
        />
      )}
      {label && (
        <div className="absolute inset-0 flex items-end justify-center pb-2 lg:items-center lg:pb-0 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
          <span className="text-sm lg:text-lg font-medium uppercase tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
