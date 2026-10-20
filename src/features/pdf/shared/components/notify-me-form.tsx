"use client";

import { useState } from "react";

interface NotifyMeFormProps {
  toolSlug: string;
  toolName: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqvrgzb";

type Mode = "prompt" | "form" | "loading" | "success" | "error";

export function NotifyMeForm({ toolSlug, toolName }: NotifyMeFormProps) {
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<Mode>("prompt");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setMode("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({
          email,
          tool: toolName,
          slug: toolSlug,
        }),
      });

      if (res.ok) {
        setMode("success");
        if (typeof window !== "undefined" && "umami" in window) {
          (window as typeof window & { umami: { track: (name: string, data?: object) => void } }).umami.track(
            "notify_me_submitted",
            { tool: toolSlug }
          );
        }
      } else {
        setMode("error");
      }
    } catch {
      setMode("error");
    }
  };

  if (mode === "success") {
    return (
      <p className="text-[11px] font-medium text-primary md:ml-auto">
        Merci, on vous préviendra !
      </p>
    );
  }

  if (mode === "form" || mode === "loading") {
    return (
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-1.5 md:ml-auto"
      >
        <input
          type="email"
          required
          autoComplete="email"
          autoFocus
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-24 min-w-0 rounded-full border border-border bg-surface px-2 py-1 text-[11px] text-foreground outline-none focus:border-primary md:w-28"
        />
        <button
          type="submit"
          disabled={mode === "loading"}
          className="shrink-0 rounded-full bg-primary px-2 py-1 text-[11px] font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60"
        >
          {mode === "loading" ? "..." : "OK"}
        </button>
      </form>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setMode("form");
      }}
      className="shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-foreground-muted transition-colors hover:border-primary hover:text-primary md:ml-auto"
    >
      Bientôt — être prévenu
    </button>
  );
}