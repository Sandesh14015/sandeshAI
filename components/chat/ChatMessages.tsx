import { Avatar } from "@/components/ui/Avatar";

const sampleMessages = [
  {
    role: "assistant",
    text: "Welcome back. I’m here to help you shape your digital twin experience.",
  },
  {
    role: "user",
    text: "Can you help me design a more polished chat experience?",
  },
];

export function ChatMessages() {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {sampleMessages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex max-w-[80%] items-start gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-3 ${message.role === "user" ? "bg-white/10" : "bg-slate-900/70"}`}>
              {message.role === "assistant" ? <Avatar size="small" alt="Sandesh AI" /> : null}
              <p className="text-sm leading-7 text-slate-200">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
