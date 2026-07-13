import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface RelatedTool {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

interface RelatedToolsProps {
  title?: string;
  tools: RelatedTool[];
}

export function RelatedTools({ title = "Voir aussi", tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border pt-10">
      <h2 className="text-sm font-medium text-foreground-muted">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-3 rounded-xl border border-border bg-elevated p-4 transition-colors hover:border-primary"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">{tool.name}</p>
                <p className="truncate text-sm text-foreground-muted">{tool.description}</p>
              </div>

              <ArrowRight className="h-4 w-4 shrink-0 text-foreground-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}