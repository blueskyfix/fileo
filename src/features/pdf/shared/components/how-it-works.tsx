import type { HowItWorksStep } from "@/features/pdf/shared/types";

interface HowItWorksProps {
  title?: string;
  steps: HowItWorksStep[];
}

export function HowItWorks({
  title = "Comment ça marche",
  steps,
}: HowItWorksProps) {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>

      <ol className="mt-8 grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-medium text-primary">
              {index + 1}
            </span>
            <h3 className="font-medium text-foreground">{step.title}</h3>
            <p className="text-sm text-foreground-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}