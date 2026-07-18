"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const conversations = [
  "Project planning",
  "UI polish ideas",
  "Memory system notes",
  "Knowledge base outline",
];

type ChatSidebarProps = {
  onSelectConversation?: (title: string) => void;
};

export function ChatSidebar({ onSelectConversation }: ChatSidebarProps) {
  const [open, setOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const handleSelectConversation = (item: string) => {
    setActiveConversation(item);
    onSelectConversation?.(item);
    setOpen(false);
  };

  const sidebarContent = (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="flex h-full flex-col">
      <div className="flex items-center gap-3">
        <Avatar size="medium" alt="Sandesh AI" />
        <div>
          <p className="text-lg font-semibold text-white">Sandesh AI</p>
          <p className="text-sm text-slate-400">Digital twin workspace</p>
        </div>
      </div>

      <motion.button whileHover={{ y: -1, scale: 1.01 }} whileTap={{ scale: 0.98 }} className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/20">
        + New chat
      </motion.button>

      <div className="mt-6">
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">Search conversations</label>
        <motion.input whileFocus={{ scale: 1.01 }} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none" placeholder="Search" />
      </div>

      <div className="mt-6 flex-1 overflow-auto">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">History</p>
        <div className="space-y-2">
          {conversations.map((item) => {
            const isActive = item === activeConversation;

            return (
              <motion.button
                key={item}
                layout
                whileHover={{ y: -1, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectConversation(item)}
                className={`w-full rounded-2xl border px-3 py-3 text-left text-sm transition ${isActive ? "border-sky-500/30 bg-sky-500/10 text-white shadow-[0_8px_24px_rgba(14,165,233,0.12)]" : "border-transparent bg-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"}`}
              >
                <span className="block truncate">{item}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div whileHover={{ y: -1, scale: 1.005 }} className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <Avatar size="small" alt="User profile" />
          <div>
            <p className="text-sm font-medium text-white">You</p>
            <p className="text-xs text-slate-400">Premium workspace</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <motion.button type="button" whileTap={{ scale: 0.95 }} className="rounded-full border border-white/10 bg-slate-900/80 p-2 text-slate-200 lg:hidden" onClick={() => setOpen(true)}>
        <Menu size={18} />
      </motion.button>

      <motion.aside initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="hidden h-full w-80 flex-col border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur lg:flex">
        {sidebarContent}
      </motion.aside>

      <AnimatePresence>
        {open ? (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
            <motion.div initial={{ x: -24, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -24, opacity: 0 }} transition={{ duration: 0.2, ease: "easeOut" }} className="h-full w-[85%] max-w-sm border-r border-white/10 bg-slate-950 p-5" onClick={(event) => event.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Navigation</p>
                <motion.button type="button" whileTap={{ scale: 0.95 }} onClick={() => setOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                  <X size={18} />
                </motion.button>
              </div>
              <div className="flex h-[calc(100%-2rem)] flex-col">{sidebarContent}</div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
