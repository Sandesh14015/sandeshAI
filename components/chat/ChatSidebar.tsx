import { Avatar } from "@/components/ui/Avatar";

const conversations = [
  "Project planning",
  "UI polish ideas",
  "Memory system notes",
  "Knowledge base outline",
];

export function ChatSidebar() {
  return (
    <aside className="hidden h-full w-80 flex-col border-r border-white/10 bg-slate-950/70 p-5 backdrop-blur xl:flex">
      <div className="flex items-center gap-3">
        <Avatar size="medium" alt="Sandesh AI" />
        <div>
          <p className="text-lg font-semibold text-white">Sandesh AI</p>
          <p className="text-sm text-slate-400">Digital twin workspace</p>
        </div>
      </div>

      <button className="mt-6 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-white/20">
        + New chat
      </button>

      <div className="mt-6">
        <label className="mb-2 block text-xs uppercase tracking-[0.25em] text-slate-500">
          Search conversations
        </label>
        <input
          className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none ring-0"
          placeholder="Search"
        />
      </div>

      <div className="mt-6 flex-1 overflow-auto">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-slate-500">History</p>
        <div className="space-y-2">
          {conversations.map((item) => (
            <button
              key={item}
              className="w-full rounded-2xl border border-transparent bg-transparent px-3 py-3 text-left text-sm text-slate-300 transition hover:border-white/10 hover:bg-white/5 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <Avatar size="small" alt="User profile" />
          <div>
            <p className="text-sm font-medium text-white">You</p>
            <p className="text-xs text-slate-400">Premium workspace</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
