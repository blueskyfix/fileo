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
      <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        <p className="max-w-md text-lg text-foreground-muted md:max-w-none">
          {description}
        </p>

        {highlights && highlights.length > 0 && (
          <ul className="mt-2 hidden flex-col gap-2 text-sm font-semibold text-foreground md:flex md:items-start">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span className="text-primary">•</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mx-auto w-full max-w-md md:mx-0 md:max-w-none">
        {children}
      </div>
    </section>
  );
}