"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, Mic, Send, Sparkles } from "lucide-react";

type ChatComposerProps = {
  onSend: (content: string) => Promise<void> | void;
};

export function ChatComposer({ onSend }: ChatComposerProps) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isEmpty = value.trim().length === 0;

  const rows = useMemo(() => {
    const lines = value.split(/\n/).length;
    return Math.min(6, Math.max(2, lines));
  }, [value]);

  const handleSend = async () => {
    if (isEmpty || isLoading) return;
    setIsLoading(true);

    const content = value.trim();
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    await onSend(content);
    setIsLoading(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="sticky bottom-0 border-t border-white/10 bg-slate-950/80 p-3 backdrop-blur sm:p-4">
      <motion.div whileHover={{ y: -1, scale: 1.002 }} className="mx-auto max-w-3xl rounded-[28px] border border-white/10 bg-slate-900/85 p-2 shadow-[0_10px_50px_rgba(0,0,0,0.35)] sm:p-3">
        <motion.div animate={{ boxShadow: isFocused ? "0 0 0 1px rgba(125,211,252,0.25)" : "0 0 0 0 rgba(255,255,255,0)" }} transition={{ duration: 0.2 }} className="flex items-start gap-2 rounded-[24px] border border-white/10 bg-slate-950/70 px-3 py-2">
          <textarea
            ref={textareaRef}
            rows={rows}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask Sandesh anything..."
            className="max-h-40 min-h-[44px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Attach file">
              <Paperclip size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Voice input">
              <Mic size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="button" disabled={isEmpty || isLoading} onClick={handleSend} className="flex items-center justify-center rounded-full bg-white p-2.5 text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message">
              {isLoading ? <Sparkles size={18} className="animate-pulse" /> : <Send size={18} />}
            </motion.button>
          </div>
        </motion.div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 px-2 pb-1 text-xs text-slate-500">
          <p>Press Enter to send · Shift + Enter for a new line</p>
          {isLoading ? <span className="text-slate-300">Sandesh is responding...</span> : null}
        </div>
      </motion.div>
    </motion.div>
  );
}
