import { FaqAccordionItem } from "@/features/pdf/shared/components/faq-accordion-item";
import type { FaqItem } from "@/features/pdf/shared/types";

interface ToolFaqProps {
  items: FaqItem[];
}

export function ToolFaq({ items }: ToolFaqProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-12">
      {/*
        FAQPage structured data. Depuis août 2023, Google ne montre ce rich
        result que sur des sites gouvernementaux/santé — pas d'impact visuel
        SERP attendu ici, mais aide la compréhension sémantique (Google +
        moteurs IA). Coût nul, aucune raison de l'omettre.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

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