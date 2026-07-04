import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  // Le traitement PDF passera par des Web Workers (feature Merge) :
  // headers COOP/COEP nécessaires si on utilise SharedArrayBuffer plus tard.
  // Pas activé maintenant pour ne pas bloquer des ressources externes
  // (Plausible, etc.) sans raison — on l'ajoutera si pdf-lib/pdfjs l'exige.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;