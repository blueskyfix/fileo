export type CompressionLevel = "light" | "balanced" | "strong";

export interface CompressionLevelConfig {
  id: CompressionLevel;
  label: string;
  description: string;
  quality: number; // 0-1, utilisé par canvas.convertToBlob
  maxWidth: number | null; // null = pas de redimensionnement
}

export const COMPRESSION_LEVELS: CompressionLevelConfig[] = [
  {
    id: "light",
    label: "Léger",
    description: "Taille quasi intacte",
    quality: 0.85,
    maxWidth: null,
  },
  {
    id: "balanced",
    label: "Équilibré",
    description: "Bon compromis",
    quality: 0.7,
    maxWidth: 1920,
  },
  {
    id: "strong",
    label: "Fort",
    description: "Taille minimale",
    quality: 0.5,
    maxWidth: 1280,
  },
];