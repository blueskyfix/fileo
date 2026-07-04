export function sanitizeFilename(name: string, fallback = "merged"): string {
  const withoutExtension = name.replace(/\.pdf$/i, "");

  const sanitized = withoutExtension
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // retire les accents
    .replace(/[^a-zA-Z0-9-_ ]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  return `${sanitized || fallback}.pdf`;
}