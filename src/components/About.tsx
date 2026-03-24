import Gallery from "./Gallery";

export default function About() {
  return (
    <section className="min-h-screen lg:h-screen px-4 lg:px-6 pt-8 pb-8 flex flex-col gap-8 lg:gap-0 lg:justify-between">
      {/* Top — Text */}
      <div className="lg:flex lg:justify-between">
        {/* Left — Heading + paragraph */}
        <div className="max-w-md">
          <h2 className="text-3xl lg:text-4xl font-medium uppercase leading-[1.1] tracking-tight text-foreground">
            ABOUT
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam quis nostrud exercitation.
          </p>
        </div>

        {/* Right — Paragraph (desktop only) */}
        <div className="hidden lg:block max-w-md text-right">
          <p className="text-base leading-relaxed text-foreground-secondary">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident sunt in culpa.
          </p>
        </div>
      </div>

      {/* Center — Image carousel */}
      <Gallery />

      {/* Bottom — Stats */}
      <div className="flex flex-col gap-3 mt-auto lg:mt-0 lg:flex-row lg:justify-between lg:items-end">
        <div className="flex items-baseline justify-between lg:block">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            50M+
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary whitespace-nowrap">
            Total streams
          </p>
        </div>
        <div className="flex items-baseline justify-between lg:block lg:text-center">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            200+
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary">
            Shows played
          </p>
        </div>
        <div className="flex items-baseline justify-between lg:block lg:text-right">
          <p className="text-xl lg:text-6xl font-medium uppercase tracking-tight leading-none text-foreground">
            8 Years
          </p>
          <p className="text-[10px] lg:text-xs lg:mt-1 uppercase tracking-widest leading-tight text-foreground-secondary">
            Years active
          </p>
        </div>
      </div>
    </section>
  );
}
