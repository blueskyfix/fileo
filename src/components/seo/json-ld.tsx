interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Injecte un bloc JSON-LD. Le `<` est échappé pour empêcher toute sortie de balise <script>. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
