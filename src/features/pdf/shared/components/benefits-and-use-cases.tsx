import { Check, ArrowRight } from "lucide-react";
import type { ContentItem } from "@/features/pdf/shared/types";

interface BenefitsAndUseCasesProps {
  benefitsTitle: string;
  benefitsIntro?: string;
  benefits: ContentItem[];
  useCasesTitle: string;
  useCasesIntro?: string;
  useCases: ContentItem[];
}

export function BenefitsAndUseCases({
  benefitsTitle,
  benefitsIntro,
  benefits,
  useCasesTitle,
  useCasesIntro,
  useCases,
}: BenefitsAndUseCasesProps) {
  return (
    <section className="grid gap-12 py-12 md:grid-cols-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {benefitsTitle}
        </h2>
        {benefitsIntro && (
          <p className="mt-3 text-foreground-muted">{benefitsIntro}</p>
        )}

        <ul className="mt-6 flex flex-col gap-4">
          {benefits.map((item) => (
            <li key={item.title} className="flex gap-3">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.5} />
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-foreground-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {useCasesTitle}
        </h2>
        {useCasesIntro && (
          <p className="mt-3 text-foreground-muted">{useCasesIntro}</p>
        )}

        <ul className="mt-6 flex flex-col gap-4">
          {useCases.map((item) => (
            <li key={item.title} className="flex gap-3">
              <ArrowRight className="mt-0.5 h-5 w-5 shrink-0 text-foreground-muted" strokeWidth={2} />
              <div>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="text-sm text-foreground-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}