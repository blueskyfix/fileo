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
    <section className="relative left-1/2 w-screen -translate-x-1/2 bg-elevated">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-left">
          {title}
        </h2>

        <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
          <div className="absolute left-0 right-0 top-5 hidden h-px bg-border sm:block" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col items-center gap-2 text-center sm:items-start sm:text-left"
            >
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {index + 1}
              </div>
              <h3 className="font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-foreground-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}