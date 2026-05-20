"use client";

import { useEffect } from "react";

type NoticeVariant = "success" | "error" | "info";

type Props = {
  open: boolean;
  title: string;
  message?: string;
  variant?: NoticeVariant;
  duration?: number;
  onClose: () => void;
};

const styles: Record<NoticeVariant, { icon: string; border: string; bg: string; title: string }> = {
  success: {
    icon: "✓",
    border: "border-mint/40",
    bg: "bg-mint/10",
    title: "text-mint",
  },
  error: {
    icon: "!",
    border: "border-red-200",
    bg: "bg-red-50",
    title: "text-red-600",
  },
  info: {
    icon: "i",
    border: "border-coral/25",
    bg: "bg-coral/10",
    title: "text-coral",
  },
};

export function AdminNotice({
  open,
  title,
  message,
  variant = "info",
  duration = 6500,
  onClose,
}: Props) {
  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [duration, onClose, open, title, message]);

  if (!open) return null;

  const style = styles[variant];

  return (
    <div className="fixed right-4 top-4 z-[100] w-[calc(100vw-2rem)] max-w-sm animate-[fadeIn_180ms_ease-out]">
      <div className={`relative overflow-hidden rounded-2xl border-2 ${style.border} ${style.bg} bg-white p-4 pr-11 shadow-soft backdrop-blur`}>
        <div className="flex gap-3">
          <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${style.bg} text-sm font-black ${style.title}`}>
            {style.icon}
          </span>
          <div className="min-w-0">
            <p className={`text-sm font-black ${style.title}`}>{title}</p>
            {message ? <p className="mt-1 text-sm font-semibold leading-5 text-ink/75">{message}</p> : null}
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-lg font-black leading-none text-red-500 transition-colors hover:bg-red-100"
          aria-label="Fechar aviso"
        >
          ×
        </button>
      </div>
    </div>
  );
}
