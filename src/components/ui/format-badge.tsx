import { formatTint } from "@/data/tools/formats";

/**
 * Badge de format en JetBrains Mono. Texte en Charcoal sur fond teinté :
 * le blanc sur Violet, Deep Teal ou Burnt Orange passe sous 4,5:1 à 12 px.
 */
export function FormatBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-[5px] px-1.5 py-0.5 font-mono text-xs font-medium text-foreground"
      style={{ backgroundColor: formatTint(color) }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      {label}
    </span>
  );
}
