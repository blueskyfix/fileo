import type { LucideIcon } from "lucide-react";
import { cn } from "@/core/utils/cn";
import type { ContentItem } from "@/features/pdf/shared/types";

interface FeatureGridProps {
  title: string;
  intro?: string;
  items: ContentItem[];
  icons?: LucideIcon[];
  columns?: 2 | 3;
  emphasized?: boolean;
  iconVariant?: "primary" | "accent";
}

export function FeatureGrid({
  title,
  intro,
  items,
  icons,
  columns = 3,
  emphasized = false,
}: FeatureGridProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-foreground-muted">{intro}</p>
      )}

      <div
        className={cn(
          "mt-8 grid gap-4",
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, index) => {
          const Icon = icons?.[index];
          return (
            <div
              key={item.title}
              className={cn(
                "flex flex-col gap-2 rounded-lg border p-5",
                    emphasized
                    ? "border-accent/40 bg-accent/10"
                    : "border-border bg-elevated",
              )}
            >
              {Icon && (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
              )}
              <h3 className="font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-foreground-muted">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}