"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <section className="relative flex flex-col h-svh lg:h-screen overflow-hidden bg-background">
      {/* Top Bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex justify-center gap-6 py-4 text-xs font-medium uppercase tracking-widest text-foreground-secondary lg:justify-start lg:gap-0">
        <a href="#" className="underline underline-offset-4 hover:text-white transition-colors lg:absolute lg:left-6">WORK</a>
        <a href="#" className="underline underline-offset-4 hover:text-white transition-colors lg:absolute lg:left-44">CONTACT</a>
        <a href="#" className="hidden lg:inline underline underline-offset-4 hover:text-white transition-colors lg:absolute lg:right-1/2 lg:mr-8">SOUNDCLOUD</a>
      </div>

      {/* Main Hero Content */}
      <div className="relative flex flex-col flex-1 lg:flex-row">
        {/* Text — top half on mobile (white bg, left-aligned), right column on desktop */}
        <div className="relative z-10 flex flex-col justify-center items-start px-6 pt-16 pb-4 w-full h-1/2 lg:h-auto lg:w-1/2 lg:ml-auto lg:justify-start lg:pl-8 lg:pr-16 lg:pt-8">
          <h1 className="text-3xl lg:text-5xl font-medium uppercase leading-[1.1] tracking-tight text-foreground">
            YOUR HEADLINE
            <br />
            GOES RIGHT
            <br />
            HERE
          </h1>
          <div className="mt-3 max-w-md flex flex-col gap-4 text-base leading-relaxed text-foreground-secondary">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam quis nostrud exercitation.
            </p>
            <p className="hidden lg:block">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident sunt in culpa.
            </p>
          </div>
        </div>

        {/* Image — bottom half on mobile, left column on desktop */}
        <div className="relative h-1/2 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:h-full order-first lg:order-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Knossos.JPG"
            alt="Knossos"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* SANTIAGO — Base text layer (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:flex absolute bottom-0 left-0 right-0 z-20 justify-center overflow-hidden leading-[0.85]">
        <span className="text-[21vw] font-bold uppercase tracking-tighter text-foreground whitespace-nowrap flex">
          {"Santiago".split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-700 ease-out"
              style={{
                transform: visible ? "translateY(0)" : "translateY(100%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
      {/* SANTIAGO — White text layer, clipped to left 50% (desktop only) */}
      <div
        className="hidden lg:flex absolute bottom-0 left-0 right-0 z-30 justify-center overflow-hidden leading-[0.85] pointer-events-none"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <span className="text-[21vw] font-bold uppercase tracking-tighter text-white whitespace-nowrap flex">
          {"Santiago".split("").map((letter, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-700 ease-out"
              style={{
                transform: visible ? "translateY(0)" : "translateY(100%)",
                opacity: visible ? 1 : 0,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {letter}
            </span>
          ))}
        </span>
      </div>
    </section>
  );
}
