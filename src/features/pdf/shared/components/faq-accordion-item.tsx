"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/core/utils/cn";

interface FaqAccordionItemProps {
  question: string;
  answer: string;
}

export function FaqAccordionItem({ question, answer }: FaqAccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-lg border bg-elevated transition-colors",
        open ? "border-primary/40" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "rotate-180 text-primary" : "text-foreground-muted",
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p className="border-t border-border px-5 pb-4 pt-3 text-sm text-foreground-muted">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}