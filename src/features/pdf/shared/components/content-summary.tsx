export function ContentSummary({ text }: { text: string }) {
  return (
    <section className="py-8">
      <p className="rounded-lg border border-border bg-unelevated px-6 py-5 text-center text-sm text-foreground-muted">
        {text}
      </p>
    </section>
  );
}