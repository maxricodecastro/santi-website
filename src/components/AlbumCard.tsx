interface AlbumCardProps {
  src: string;
  title: string;
  size?: "small" | "large";
  active?: boolean;
  spinning?: boolean;
}

const sizeMap = {
  small: { cd: 80, hole: 12, ring: 40 },
  large: { cd: "88%", hole: 24, ring: 80 },
};

export default function AlbumCard({ src, title, size = "large", active = false, spinning = false }: AlbumCardProps) {
  const s = sizeMap[size];
  const isSmall = size === "small";

  return (
    <div className="group flex flex-col items-center">
      <div
        className={isSmall ? "relative" : "relative w-full aspect-square"}
        style={isSmall ? { width: 96, height: 96 } : undefined}
      >
        {/* CD — sits behind the album art, slides up on hover / stays out when active */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cd.webp"
          alt=""
          className={`absolute left-1/2 -translate-x-1/2 bottom-0 z-0 rounded-full transition-[translate] duration-700 ease-out object-contain ${
            active
              ? `-translate-y-[55%] ${spinning ? "animate-spin-slow" : ""}`
              : "group-hover:-translate-y-[55%]"
          }`}
          style={isSmall ? { width: s.cd, height: s.cd as number } : { width: s.cd, aspectRatio: 1 }}
        />

        {/* Album art — in front */}
        <div
          className={isSmall ? "relative z-10 overflow-hidden" : "relative z-10 overflow-hidden w-full h-full"}
          style={isSmall ? { width: 96, height: 96 } : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover"
          />
          {/* Glossy plastic wrap effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 25%, transparent 50%)",
                "linear-gradient(315deg, rgba(255,255,255,0.25) 0%, transparent 30%)",
                "linear-gradient(245deg, rgba(255,255,255,0.1) 0%, transparent 40%)",
                "linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.15) 100%)",
              ].join(", "),
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.3), inset 0 2px 0 0 rgba(255,255,255,0.4), inset 0 -1px 0 0 rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>

      {/* Title only for small shelf cards */}
      {isSmall && (
        <p className="mt-2 text-xs font-medium uppercase tracking-tight text-neutral-400 group-hover:text-white transition-colors">
          {title}
        </p>
      )}
    </div>
  );
}
