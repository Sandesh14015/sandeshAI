"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { conversationsService, messagesService } from "@/services/firestore";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatWelcome } from "@/components/chat/ChatWelcome";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { Skeleton } from "@/components/ui/Skeleton";
import type { Mood } from "@/lib/mood";

type ChatMessageState = {
  id: string;
  role: "assistant" | "user";
  content: string;
  mood?: Mood | string;
  createdAt?: string | number | Date;
};

export function ChatPageContent() {
  const { user } = useAuth();
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessageState[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [activeConversation, setActiveConversation] = useState("New conversation");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!user?.uid) return;

    const initConversation = async () => {
      const existing = await conversationsService.listConversations(user.uid);
      const first = existing[0];
      const id = first?.id as string | undefined;
      const nextConversationId = id ?? `conv-${Date.now()}`;
      setConversationId(nextConversationId);

      await conversationsService.createConversation(user.uid, {
        id: nextConversationId,
        title: "New conversation",
        updatedAt: Date.now(),
      });
    };

    initConversation();
  }, [user?.uid]);

  useEffect(() => {
    if (!conversationId || !user?.uid) return;

    let active = true;
    setLoading(true);

    const loadMessages = async () => {
      const currentMessages = (await messagesService.listMessages(user.uid, conversationId)) as Array<
        { id: string; role?: string; content?: string; mood?: Mood | string; createdAt?: string | number | Date }
      >;
      if (!active) return;
      setMessages(
        currentMessages.map((message) => ({
          id: message.id,
          role: (message.role as "assistant" | "user") ?? "user",
          content: (message.content as string) ?? "",
          mood: message.mood,
          createdAt: message.createdAt as string | number | Date | undefined,
        })),
      );
      setLoading(false);
    };

    loadMessages();

    return () => {
      active = false;
    };
  }, [conversationId, user?.uid]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim() || !conversationId || !user?.uid) return;

    const newMessage = {
      role: "user" as const,
      content: content.trim(),
      createdAt: Date.now(),
    };

    setMessages((current) => [...current, { id: `local-${Date.now()}`, ...newMessage }]);
    setIsTyping(true);

    await messagesService.addMessage(user.uid, conversationId, newMessage);
    await conversationsService.createConversation(user.uid, {
      id: conversationId,
      title: content.trim().slice(0, 40) || "New conversation",
      updatedAt: Date.now(),
    });

    setIsTyping(false);
  };

  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="flex min-h-[calc(100vh-3rem)] overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/60 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="flex min-h-0 flex-1">
        <div className="hidden lg:block">
          <ChatSidebar onSelectConversation={setActiveConversation} />
        </div>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 lg:hidden">
            <div className="text-sm font-semibold text-white">{activeConversation}</div>
            <ChatSidebar onSelectConversation={setActiveConversation} />
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto flex h-full max-w-3xl flex-col gap-4 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-16 w-[78%]" />
              </motion.div>
            ) : messages.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto flex h-full max-w-3xl items-center justify-center">
                <ChatWelcome />
              </motion.div>
            ) : (
              <div key={activeConversation} className="mx-auto flex max-w-3xl flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <ChatMessage role={message.role} content={message.content} mood={message.mood} timestamp={typeof message.createdAt === "number" ? new Date(message.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : undefined} />
                    </div>
                  ))}
                </AnimatePresence>
                <AnimatePresence>{isTyping ? <TypingIndicator /> : null}</AnimatePresence>
              </div>
            )}
          </div>

          <ChatComposer onSend={handleSend} />
        </div>
      </div>
    </motion.section>
  );
}
