import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWelcome } from "@/components/chat/ChatWelcome";

export default function ChatPage() {
  return (
    <section className="flex min-h-[calc(100vh-3rem)] overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/60 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <ChatSidebar />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-hidden">
          <ChatMessages />
        </div>

        <ChatComposer />
      </div>
    </section>
  );
}
