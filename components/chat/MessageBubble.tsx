import { Avatar } from "@/components/avatar/Avatar";
import type { AiResponse } from "@/types/ai";

type MessageBubbleProps = {
  message: AiResponse;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <Avatar mood={message.mood} size={48} className="rounded-full border border-slate-700" />
      <div className="space-y-1">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{message.mood}</p>
        <p className="text-sm leading-6 text-slate-200">{message.response}</p>
      </div>
    </div>
  );
}
