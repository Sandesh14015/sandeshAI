"use client";

import { useMemo, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export type ChatMessageRole = "assistant" | "user";

export type ChatMessageProps = {
  role: ChatMessageRole;
  content: string;
  timestamp?: string;
  showAuthor?: boolean;
  authorName?: string;
  className?: string;
};

export function ChatMessage({
  role,
  content,
  timestamp,
  showAuthor = false,
  authorName = role === "assistant" ? "Sandesh AI" : "You",
  className,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);

  const isAssistant = role === "assistant";

  const formattedTimestamp = useMemo(() => {
    if (timestamp) return timestamp;
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }, [timestamp]);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isAssistant ? "justify-start" : "justify-end"} ${className ?? ""}`}
    >
      <div className={`flex max-w-[85%] flex-col gap-2 ${isAssistant ? "items-start" : "items-end"}`}>
        {showAuthor ? (
          <div className={`text-xs font-medium uppercase tracking-[0.24em] text-slate-500 ${isAssistant ? "self-start" : "self-end"}`}>
            {authorName}
          </div>
        ) : null}

        <div className={`flex items-start gap-3 ${isAssistant ? "flex-row" : "flex-row-reverse"}`}>
          {isAssistant ? <Avatar size="small" alt="Sandesh AI" /> : <Avatar size="small" alt="You" />}

          <div className={`rounded-[24px] border px-4 py-3 shadow-sm ${isAssistant ? "border-white/10 bg-slate-900/80 text-slate-100" : "border-sky-500/20 bg-sky-600/90 text-white"}`}>
            <div className="prose prose-invert max-w-none prose-p:my-2 prose-headings:mt-3 prose-headings:mb-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-blockquote:border-l-sky-500 prose-blockquote:pl-3 prose-blockquote:italic prose-table:border prose-table:border-slate-700 prose-th:p-2 prose-td:p-2 prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-slate-950/80 prose-pre:p-3 prose-code:rounded prose-code:bg-white/10 prose-code:px-1 prose-code:py-0.5">
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code({ className, children, ...props }: ComponentPropsWithoutRef<"code"> & { children?: ReactNode }) {
                    const content = String(children).replace(/\n$/, "");
                    const inline = !String(className || "").includes("language-");

                    if (inline) {
                      return (
                        <code className="rounded bg-white/10 px-1 py-0.5" {...props}>
                          {children}
                        </code>
                      );
                    }

                    const language = className?.replace("language-", "") ?? "text";

                    return (
                      <div className="my-3 overflow-hidden rounded-xl border border-white/10 bg-slate-950/90">
                        <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-slate-400">
                          <span>{language}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(content)}
                            className="flex items-center gap-1 rounded-full px-2 py-1 transition hover:bg-white/10"
                          >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            <span>{copied ? "Copied" : "Copy"}</span>
                          </button>
                        </div>
                        <pre className="overflow-x-auto p-3 text-sm">
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            <div className={`mt-3 flex items-center justify-end gap-2 text-[11px] ${isAssistant ? "text-slate-400" : "text-sky-100/80"}`}>
              <span>{formattedTimestamp}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(content)}
                className="rounded-full p-1 transition hover:bg-white/10"
                aria-label="Copy message"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
