interface ToolHeroSplitProps {
  title: string;
  description: string;
  highlights?: string[];
  children: React.ReactNode;
}

export function ToolHeroSplit({
  title,
  description,
  highlights,
  children,
}: ToolHeroSplitProps) {
  return (
    <section className="grid gap-10 py-12 md:grid-cols-2 md:items-start md:gap-12 md:py-16">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="text-lg text-foreground-muted">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground-muted">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="text-primary">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>{children}</div>
    </section>
  );
}