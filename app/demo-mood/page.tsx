import { MessageBubble } from "@/components/chat/MessageBubble";
import { AiResponseService } from "@/services/aiResponseService";
import { Mood } from "@/lib/mood";

const samples = [
  "That's actually a really smart approach. Let's build it step by step.",
  "Hmm... let me think about that for a second.",
  "😂 Bro, that bug has been haunting developers for years.",
  "Absolutely — I can help you ship this cleanly.",
];

export default function DemoMoodPage() {
  const service = new AiResponseService();
  const messages = samples.map((sample) => service.buildResponse(sample));

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <h1 className="text-2xl font-semibold">Mood-aware AI responses</h1>
        <p className="text-sm text-slate-400">
          Each message now carries its own mood, which drives the avatar and future voice/animation layers.
        </p>
        {messages.map((message, index) => (
          <MessageBubble key={`${message.mood}-${index}`} message={message} />
        ))}
      </div>
    </main>
  );
}
