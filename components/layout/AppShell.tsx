"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/chat", label: "Chat" },
  { href: "/settings", label: "Settings" },
  { href: "/personality", label: "Personality" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/memories", label: "Memories" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-800 bg-slate-900/80 p-6 lg:block">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sandesh AI</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Dashboard</h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-sm text-slate-300">
          <p className="font-medium text-white">{user?.displayName ?? user?.email ?? "Signed in"}</p>
          <button onClick={() => signOut()} className="mt-3 text-slate-400 hover:text-white">
            Sign out
          </button>
        </div>
      </aside>

      <main className="lg:ml-64">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
