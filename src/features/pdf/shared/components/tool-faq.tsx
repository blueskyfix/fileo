import type { FaqItem } from "@/features/pdf/shared/types";

interface ToolFaqProps {
  items: FaqItem[];
}

export function ToolFaq({ items }: ToolFaqProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Questions fréquentes
      </h2>

      <div className="mt-6 divide-y divide-border">
        {items.map((item) => (
          <details key={item.question} className="group py-4">
            <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none">
              {item.question}
            </summary>
            <p className="mt-2 text-sm text-foreground-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}