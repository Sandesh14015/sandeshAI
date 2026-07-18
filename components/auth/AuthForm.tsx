"use client";

import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function AuthForm() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-[0_30px_100px_rgba(2,6,23,0.55)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-sky-500/15 p-2 text-sky-300">
          <Sparkles size={18} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="mt-1 text-sm text-slate-400">Sign in or create your premium workspace.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/40"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          minLength={6}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400/40"
        />

        {error ? <p className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 font-medium text-slate-950 transition hover:bg-slate-200 disabled:opacity-70"
        >
          {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          <ArrowRight size={16} />
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-left text-slate-300 hover:text-white">
          {mode === "login" ? "Need an account?" : "Already have an account?"}
        </button>
        <button
          type="button"
          onClick={() => signInWithGoogle().catch(() => setError("Google sign in failed"))}
          className="rounded-2xl border border-white/10 px-3 py-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
