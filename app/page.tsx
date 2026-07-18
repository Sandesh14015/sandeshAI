import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-slate-400">Sandesh AI</p>
        <h1 className="text-4xl font-semibold text-white">Your personal AI companion</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          A scalable foundation for chat, memory, knowledge, personality, and settings.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/chat" className="rounded-lg bg-white px-4 py-2 font-medium text-slate-950">
            Open chat
          </Link>
          <Link href="/login" className="rounded-lg border border-slate-700 px-4 py-2 font-medium text-slate-200">
            Go to login
          </Link>
        </div>
      </div>
    </main>
  );
}
