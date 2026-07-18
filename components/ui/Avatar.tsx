import Image from "next/image";

export type AvatarSize = "small" | "medium" | "large";

type AvatarProps = {
  size?: AvatarSize;
  alt?: string;
  className?: string;
};

const sizeMap: Record<AvatarSize, number> = {
  small: 32,
  medium: 40,
  large: 56,
};

export function Avatar({ size = "medium", alt = "Sandesh AI avatar", className }: AvatarProps) {
  const pixelSize = sizeMap[size];

  return (
    <div className={`relative overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition duration-200 hover:shadow-[0_0_16px_rgba(255,255,255,0.12)] ${className ?? ""}`}>
      <Image
        src="/images/neutral.png"
        alt={alt}
        width={pixelSize}
        height={pixelSize}
        className="h-full w-full object-cover"
        unoptimized
      />
    </div>
  );
}
