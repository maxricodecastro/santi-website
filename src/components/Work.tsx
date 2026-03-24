"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import AlbumCard from "./AlbumCard";

/* ─── Album data — add new albums here ─── */
const albums = [
  { id: "album-1", src: "/Knossos.JPG", title: "Album One", duration: 225 },
  { id: "album-2", src: "/Knossos.JPG", title: "Album Two", duration: 198 },
  { id: "album-3", src: "/Knossos.JPG", title: "Album Three", duration: 254 },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Work() {
  const [activeId, setActiveId] = useState(albums[0].id);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeAlbum = albums.find((a) => a.id === activeId)!;

  const selectAlbum = useCallback((id: string) => {
    setActiveId(id);
    setProgress(0);
    setPlaying(true);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setProgress((p) => (p >= 1 ? 0 : p + 1 / (activeAlbum.duration * 10)));
    }, 100);
    return () => clearInterval(interval);
  }, [playing, activeAlbum.duration]);

  const currentTime = progress * activeAlbum.duration;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgress(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
  };

  return (
    <section className="relative min-h-screen lg:h-screen px-4 lg:px-6 pt-8 pb-8 flex flex-col items-center lg:flex-row lg:items-stretch" style={{ background: "#1a1a1a" }}>
      {/* Top-left — secondary text (desktop only) */}
      <p className="hidden lg:block absolute top-8 left-6 max-w-sm text-base leading-relaxed text-neutral-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      {/* Left — Bottom-aligned heading + paragraph (desktop only) */}
      <div className="hidden lg:flex w-1/3 flex-col justify-end pb-8">
        <h2 className="text-8xl font-medium uppercase leading-[0.9] tracking-tight text-white">
          EXPERIENCE
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Mobile-only heading */}
      <h2 className="lg:hidden text-2xl font-medium uppercase tracking-tight text-white text-center mb-6">
        EXPERIENCE
      </h2>

      {/* Right — Featured + shelf */}
      <div className="w-full lg:w-2/3 flex flex-col items-center lg:flex-row lg:items-center lg:justify-end lg:gap-10 lg:pt-16">
        {/* Featured display + controls */}
        <div className="flex-shrink-0 flex flex-col w-full max-w-[300px] lg:max-w-none lg:w-[420px]">
          {/* Album display */}
          <div className="relative aspect-square">
            {albums.map((album) => (
              <motion.div
                key={album.id}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: album.id === activeId ? 1 : 0,
                  scale: album.id === activeId ? 1 : 0.9,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                style={{ pointerEvents: album.id === activeId ? "auto" : "none" }}
              >
                <AlbumCard
                  src={album.src}
                  title={album.title}
                  size="large"
                  active={album.id === activeId}
                  spinning={playing && album.id === activeId}
                />
              </motion.div>
            ))}
          </div>

          {/* Title — left-aligned */}
          <p className="mt-3 text-sm font-medium uppercase tracking-tight text-white">
            {activeAlbum.title}
          </p>

          {/* Playback controls row */}
          <div className="mt-2 flex items-center gap-3">
            {/* Play / Pause */}
            <button
              onClick={() => setPlaying(!playing)}
              className="flex-shrink-0 cursor-pointer text-white hover:text-neutral-400 transition-colors"
            >
              {playing ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="3" y="2" width="4" height="12" rx="1" />
                  <rect x="9" y="2" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
              )}
            </button>

            {/* Current time */}
            <span className="flex-shrink-0 text-xs tabular-nums text-neutral-500 w-8">
              {formatTime(currentTime)}
            </span>

            {/* Progress bar */}
            <div
              className="flex-1 relative h-1 bg-neutral-700 rounded-full cursor-pointer group/bar"
              onClick={handleProgressClick}
            >
              <div
                className="absolute left-0 top-0 h-full bg-white rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
                style={{ left: `${progress * 100}%`, marginLeft: -5 }}
              />
            </div>

            {/* Total time */}
            <span className="flex-shrink-0 text-xs tabular-nums text-neutral-500 w-8 text-right">
              {formatTime(activeAlbum.duration)}
            </span>

            {/* Links */}
            <div className="flex-shrink-0 flex items-center gap-2 ml-1">
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </a>
              <a href="#" className="text-neutral-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Shelf — album list with dots */}
        <div className="flex flex-row gap-2 mt-6 justify-center scale-75 lg:scale-100 lg:flex-col lg:gap-12 lg:mt-0 flex-shrink-0">
          {albums.map((album) => (
            <motion.button
              key={album.id}
              onClick={() => selectAlbum(album.id)}
              className="cursor-pointer flex items-center gap-3"
              animate={{
                opacity: album.id === activeId ? 1 : 0.5,
                scale: album.id === activeId ? 1.05 : 1,
              }}
              whileHover={{ opacity: 0.85 }}
              transition={{ duration: 0.3 }}
            >
              <AlbumCard src={album.src} title={album.title} size="small" />
              <span
                className="hidden lg:block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: album.id === activeId ? "#ffffff" : "#555555" }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
