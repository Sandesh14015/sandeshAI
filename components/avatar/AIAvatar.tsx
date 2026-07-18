"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mood } from "@/lib/mood";
import { AvatarService } from "@/services/avatarService";

type AIAvatarProps = {
  mood?: Mood | string;
  size?: number;
  className?: string;
  alt?: string;
};

export function AIAvatar({
  mood = Mood.Neutral,
  size = 32,
  className = "",
  alt = "Sandesh AI avatar",
}: AIAvatarProps) {
  const requestedSource = AvatarService.getAvatarPath(mood);
  const [source, setSource] = useState(requestedSource);

  useEffect(() => {
    setSource(requestedSource);
  }, [requestedSource]);

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-slate-700 bg-slate-900 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] ${className}`}
      style={{ width: size, height: size }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={source}
          src={source}
          alt={alt}
          width={size}
          height={size}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          onError={() => setSource(AvatarService.getAvatarPath(Mood.Neutral))}
        />
      </AnimatePresence>
    </div>
  );
}
