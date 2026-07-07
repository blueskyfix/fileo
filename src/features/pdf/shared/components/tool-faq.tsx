import { FaqAccordionItem } from "@/features/pdf/shared/components/faq-accordion-item";
import type { FaqItem } from "@/features/pdf/shared/types";

interface ToolFaqProps {
  items: FaqItem[];
}

export function ToolFaq({ items }: ToolFaqProps) {
  return (
    <section id="faq" className="py-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Questions fréquentes
      </h2>

      <div className="mt-6 flex flex-col gap-3">
        {items.map((item) => (
          <FaqAccordionItem
            key={item.question}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
}