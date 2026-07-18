import { Sparkles } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="rounded-full border border-sky-400/20 bg-sky-500/10 p-3 text-sky-300 shadow-[0_0_40px_rgba(56,189,248,0.12)]">
        <Sparkles size={24} />
      </div>
      <div className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-400">
        New conversation ready
      </div>
      <h2 className="mt-5 text-3xl font-semibold text-white">How can Sandesh help today?</h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
        Start a conversation, capture ideas, shape your personality, and build your digital twin experience.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {[
          "Plan a smart project workflow",
          "Draft a polished response",
          "Summarize my notes",
          "Help shape my digital personality",
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition hover:border-sky-400/20 hover:bg-sky-500/10">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
