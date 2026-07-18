import type { HTMLAttributes, ReactNode } from "react";

type PanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = "", ...props }: PanelProps) {
  return (
    <div
      className={`rounded-[24px] border border-white/10 bg-slate-900/70 shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
