import Image from "next/image";
import { AvatarService, Mood } from "@/services/avatarService";

type AvatarProps = {
  mood?: Mood | string;
  size?: number;
  className?: string;
};

export function Avatar({ mood = Mood.Neutral, size = 64, className }: AvatarProps) {
  const src = AvatarService.getAvatarPath(mood);

  return (
    <Image
      src={src}
      alt={`${mood} avatar`}
      width={size}
      height={size}
      className={className}
      unoptimized
      onError={(event) => {
        const target = event.currentTarget as HTMLImageElement;
        target.src = AvatarService.getAvatarPath(Mood.Neutral);
      }}
    />
  );
}
