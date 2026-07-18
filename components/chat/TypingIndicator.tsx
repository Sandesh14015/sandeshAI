"use client";

import { motion } from "framer-motion";
import { AIAvatar } from "@/components/avatar/AIAvatar";
import { Mood } from "@/lib/mood";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ y: -1, scale: 1.005 }}
      className="flex justify-start"
    >
      <div className="flex max-w-[85%] items-start gap-3 rounded-[24px] border border-white/10 bg-slate-900/80 px-4 py-3 shadow-[0_12px_40px_rgba(2,6,23,0.22)]">
        <AIAvatar mood={Mood.Thinking} size={32} />
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">Sandesh AI</p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">Sandesh AI is thinking...</span>
            <div className="flex items-center gap-1">
              {[0, 1, 2].map((dot) => (
                <motion.span
                  key={dot}
                  className="h-2 w-2 rounded-full bg-slate-400"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
