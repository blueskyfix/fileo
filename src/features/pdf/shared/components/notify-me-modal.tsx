"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

interface NotifyMeModalProps {
  toolSlug: string;
  toolName: string;
  onClose: () => void;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpqvrgzb";

type Status = "idle" | "loading" | "success" | "error";

export function NotifyMeModal({ toolSlug, toolName, onClose }: NotifyMeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new URLSearchParams({ email, tool: toolName, slug: toolSlug }),
      });

      if (res.ok) {
        setStatus("success");
        if (typeof window !== "undefined" && "umami" in window) {
          (window as typeof window & { umami: { track: (name: string, data?: object) => void } }).umami.track(
            "notify_me_submitted",
            { tool: toolSlug }
          );
        }
        setTimeout(() => onClose(), 1500);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 transition-opacity duration-200 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-sm rounded-xl border border-border bg-elevated p-7 text-center shadow-lg transition-all duration-200 ${
          mounted ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <h3 className="mt-4 text-base font-semibold text-foreground">{toolName}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
          Cet outil arrive bientôt. Laissez votre email pour être prévenu·e dès sa sortie.
        </p>

        {status === "success" ? (
          <p className="mt-5 text-sm font-medium text-primary">
            Merci, on vous préviendra dès que {toolName} sera disponible !
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center gap-2 sm:flex-row">
            <input
              type="email"
              required
              autoComplete="email"
              autoFocus
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-w-0 flex-1 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full shrink-0 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover disabled:opacity-60 sm:w-auto"
            >
              {status === "loading" ? "..." : "OK"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="mt-2 text-xs text-red-600">Une erreur est survenue, réessayez.</p>
        )}
      </div>
    </div>
  );
}