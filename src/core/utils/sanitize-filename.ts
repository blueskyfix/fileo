interface SanitizeFilenameOptions {
  fallback?: string;
  extension?: string;
}

/**
 * Nettoie un nom de fichier et retourne le nom final avec extension.
 * Compatible avec l'ancien appel `sanitizeFilename(name, "merged")`
 * (fallback en string = raccourci pour { fallback }, extension "pdf" par défaut).
 */
export function sanitizeFilename(
  name: string,
  fallbackOrOptions?: string | SanitizeFilenameOptions
): string {
  const options =
    typeof fallbackOrOptions === "string"
      ? { fallback: fallbackOrOptions }
      : fallbackOrOptions;

  const fallback = options?.fallback ?? "document";
  const extension = options?.extension ?? "pdf";

  const withoutExtension = name.replace(/\.[^/.]+$/, "");

  const sanitized = withoutExtension
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `${sanitized || fallback}.${extension}`;
}