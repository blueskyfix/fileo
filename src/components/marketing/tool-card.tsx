import Link from "next/link";
import { FileStack, Scissors, FileMinus, ImagePlus, FileImage, FileType, ArrowRight } from "lucide-react";
import { cn } from "@/core/utils/cn";
import type { Tool } from "@/data/tools/tools";

const icons = {
  merge: FileStack,
  split: Scissors,
  "remove-pages": FileMinus,
  "jpg-to-pdf": FileImage,
  "pdf-to-jpg": ImagePlus,
  "pdf-to-word": FileType,
} as const;

export function ToolCard({ tool }: { tool: Tool }) {
  const Icon = icons[tool.icon];
  const isAvailable = tool.status === "available";

  const content = (
    <div
      className={cn(
        "group flex h-full flex-col gap-4 rounded-xl border bg-elevated p-6 transition-colors",
        isAvailable
          ? "border-border hover:border-primary"
          : "border-border opacity-60",
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        {!isAvailable && (
          <span className="rounded-lg border border-border px-2 py-0.5 text-xs text-foreground-muted">
            Bientôt
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground sm:text-base">{tool.name}</h3>
        <p className="mt-1 text-base text-foreground-muted sm:text-sm">{tool.description}</p>
      </div>

      {isAvailable && (
        <span className="flex items-center gap-1 text-base font-medium text-primary sm:text-sm">
          Ouvrir l&apos;outil
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      )}
    </div>
  );

  if (!isAvailable) {
    return <div aria-disabled="true">{content}</div>;
  }

  return (
    <Link href={tool.href} className="block h-full">
      {content}
    </Link>
  );
}