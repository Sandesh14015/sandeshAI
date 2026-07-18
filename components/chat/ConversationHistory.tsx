"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { conversationsService, messagesService } from "@/services/firestore";

export type ConversationItem = {
  id: string;
  title: string;
  updatedAt?: number | string | Date;
  lastMessage?: string;
  isActive?: boolean;
};

function formatRelativeTime(value?: number | string | Date) {
  if (!value) return "just now";

  const date = value instanceof Date ? value : new Date(value);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

export function ConversationHistory({ activeConversationId, onSelectConversation }: { activeConversationId?: string; onSelectConversation?: (id: string) => void }) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const load = async () => {
      setLoading(true);
      const rawConversations = await conversationsService.listConversations(user.uid);

      const mapped = await Promise.all(
        rawConversations.map(async (conversation) => {
          const messages = await messagesService.listMessages(user.uid, conversation.id as string);
          const lastMessage = messages.at(-1)?.content ?? "No messages yet";
          return {
            id: conversation.id as string,
            title: (conversation.title as string) ?? "Untitled conversation",
            updatedAt: conversation.updatedAt as number | string | Date | undefined,
            lastMessage: typeof lastMessage === "string" ? lastMessage : "No messages yet",
          };
        }),
      );

      mapped.sort((a, b) => {
        const aTime = new Date(a.updatedAt ?? 0).getTime();
        const bTime = new Date(b.updatedAt ?? 0).getTime();
        return bTime - aTime;
      });

      setConversations(mapped);
      setLoading(false);
    };

    load();
  }, [user?.uid]);

  const filteredConversations = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return conversations;
    return conversations.filter((conversation) => conversation.title.toLowerCase().includes(value));
  }, [query, conversations]);

  const renameConversation = async (id: string) => {
    const nextTitle = window.prompt("Rename conversation", "Untitled conversation");
    if (!nextTitle || !user?.uid) return;

    await conversationsService.createConversation(user.uid, { id, title: nextTitle, updatedAt: Date.now() });
    setConversations((current) =>
      current.map((conversation) => (conversation.id === id ? { ...conversation, title: nextTitle, updatedAt: Date.now() } : conversation)),
    );
  };

  const deleteConversation = async (id: string) => {
    if (!user?.uid) return;
    if (!window.confirm("Delete this conversation?")) return;

    await fetch(`/api/conversations/${id}`, { method: "DELETE" });
    setConversations((current) => current.filter((conversation) => conversation.id !== id));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
        <Search size={16} className="text-slate-400" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search conversations"
          className="w-full bg-transparent text-sm text-slate-200 outline-none"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="px-2 py-6 text-sm text-slate-400">Loading conversations...</div>
        ) : filteredConversations.length === 0 ? (
          <div className="px-2 py-6 text-sm text-slate-400">No conversations found.</div>
        ) : (
          <div className="space-y-2">
            {filteredConversations.map((conversation) => {
              const isActive = conversation.id === activeConversationId;
              return (
                <motion.button
                  key={conversation.id}
                  whileHover={{ x: 2, scale: 1.01 }}
                  onClick={() => onSelectConversation?.(conversation.id)}
                  className={`w-full rounded-2xl border px-3 py-3 text-left transition ${isActive ? "border-sky-500/30 bg-sky-500/10" : "border-transparent bg-white/5 hover:border-white/10 hover:bg-white/10"}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{conversation.title}</p>
                      <p className="mt-1 truncate text-xs text-slate-400">{conversation.lastMessage}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-slate-500">{formatRelativeTime(conversation.updatedAt)}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        renameConversation(conversation.id);
                      }}
                      className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      aria-label="Rename conversation"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        deleteConversation(conversation.id);
                      }}
                      className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                      aria-label="Delete conversation"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
