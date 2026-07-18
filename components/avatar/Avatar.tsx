"use client";

import { AIAvatar } from "@/components/avatar/AIAvatar";
import { Mood } from "@/lib/mood";

type AvatarProps = {
  mood?: Mood | string;
  size?: number;
  className?: string;
};

export function Avatar({ mood = Mood.Neutral, size = 64, className }: AvatarProps) {
  return <AIAvatar mood={mood} size={size} className={className} alt={`${mood} avatar`} />;
}
