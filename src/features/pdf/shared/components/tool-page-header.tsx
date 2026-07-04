import { TrustBadge } from "@/components/marketing/trust-badge";

interface ToolPageHeaderProps {
  title: string;
  description: string;
}

export function ToolPageHeader({ title, description }: ToolPageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center md:py-16">
      <TrustBadge />
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="max-w-xl text-foreground-muted">{description}</p>
    </div>
  );
}