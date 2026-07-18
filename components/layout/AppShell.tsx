"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
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
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-transparent">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-slate-950/70 p-6 backdrop-blur-xl lg:block">
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="rounded-2xl bg-sky-500/15 p-2 text-sky-300">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Sandesh AI</p>
            <h2 className="text-base font-semibold text-white">Dashboard</h2>
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center rounded-2xl px-3 py-2.5 text-sm transition ${active ? "bg-sky-500/15 text-white shadow-[inset_0_0_0_1px_rgba(125,211,252,0.15)]" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}
              >
                <span className="flex-1">{item.label}</span>
                {active ? <span className="h-2 w-2 rounded-full bg-sky-400" /> : null}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
          <p className="font-medium text-white">{user?.displayName ?? user?.email ?? "Signed in"}</p>
          <p className="mt-1 text-xs text-slate-400">Premium workspace</p>
          <button onClick={() => signOut()} className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      <main className="lg:ml-72">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
