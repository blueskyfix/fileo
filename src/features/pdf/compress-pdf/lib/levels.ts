export interface CompressionLevel {
  /** Plus grand côté maximal d'une image, en pixels (≈ 200, 140 et 95 dpi sur une page A4). */
  maxSide: number;
  /** Qualité JPEG, de 0 à 1. */
  quality: number;
}

/**
 * Les 3 premiers niveaux sont proposés à l'utilisateur. Le dernier ne sert que
 * lorsqu'une taille cible est demandée et que les précédents ne suffisent pas.
 */
export const COMPRESSION_LEVELS: CompressionLevel[] = [
  { maxSide: 2400, quality: 0.82 },
  { maxSide: 1600, quality: 0.7 },
  { maxSide: 1100, quality: 0.55 },
  { maxSide: 800, quality: 0.45 },
];

export const SELECTABLE_LEVELS = ["light", "balanced", "strong"] as const;
export type SelectableLevel = (typeof SELECTABLE_LEVELS)[number];
