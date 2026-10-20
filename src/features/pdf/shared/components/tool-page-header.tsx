interface ToolPageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
}

export function ToolPageHeader({
  eyebrow,
  title,
  description,
}: ToolPageHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center md:py-16">
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-wide text-accent">
          {eyebrow}
        </span>
      )}
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        {title}
      </h1>
      <p className="max-w-xl text-foreground-muted">{description}</p>
    </div>
  );
}