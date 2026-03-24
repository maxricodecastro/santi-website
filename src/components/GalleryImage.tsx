interface GalleryImageProps {
  src: string;
  label: string;
  onHover: (hovered: boolean) => void;
}

export default function GalleryImage({ src, label, onHover }: GalleryImageProps) {
  return (
    <div
      className="group relative h-36 lg:h-48 flex-shrink-0 cursor-pointer overflow-hidden"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        className="h-full w-auto object-cover transition-[filter] duration-300 lg:group-hover:blur-sm lg:group-hover:brightness-50"
      />
      {/* Text overlay — always visible on mobile, hover on desktop */}
      <div className="absolute inset-0 flex items-end justify-center pb-2 lg:items-center lg:pb-0 opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
        <span className="text-sm lg:text-lg font-medium uppercase tracking-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
          {label}
        </span>
      </div>
    </div>
  );
}
