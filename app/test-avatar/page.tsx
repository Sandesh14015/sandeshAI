import { Avatar } from "@/components/avatar/Avatar";
import { Mood } from "@/services/avatarService";

export default function TestAvatarPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 p-8 text-white">
      <h1 className="text-2xl font-semibold">Mood Avatar System</h1>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {Object.values(Mood).map((mood) => (
          <div key={mood} className="flex flex-col items-center gap-2 rounded-lg border border-slate-800 p-4">
            <Avatar mood={mood} size={64} className="rounded-full border border-slate-700" />
            <span className="text-sm text-slate-400">{mood}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
