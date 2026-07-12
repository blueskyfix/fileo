import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface RelatedTool {
  name: string;
  description: string;
  href: string;
}

interface RelatedToolsProps {
  title?: string;
  tools: RelatedTool[];
}

export function RelatedTools({ title = "Voir aussi", tools }: RelatedToolsProps) {
  if (tools.length === 0) return null;

  return (
    <div className="mt-16 border-t border-border pt-8">
      <h2 className="text-sm font-medium text-foreground-muted">{title}</h2>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:gap-8">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex items-center gap-2 text-foreground transition-colors hover:text-primary"
          >
            <span>
              <span className="font-medium">{tool.name}</span>
              <span className="block text-sm text-foreground-muted">{tool.description}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground-muted transition-colors group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}