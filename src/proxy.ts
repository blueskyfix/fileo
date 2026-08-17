import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// URLs FR déjà indexées par Google avant la migration i18n (hors home,
// qui garde la détection automatique de langue — décision explicite du
// 2026-08). Redirection 301 permanente et déterministe vers /fr/..., sans
// passer par la détection navigateur : ce contenu est intrinsèquement
// français, indépendamment du visiteur.
// Vérifié via `dir /s /b src\app` + build output du 2026-08 : organize-pdf
// n'a pas de page.tsx, donc pas de route à rediriger pour lui.
const LEGACY_FR_PATHS = [
  "/pdf",
  "/pdf/jpg-to-pdf",
  "/pdf/merge-pdf",
  "/pdf/pdf-to-jpg",
  "/pdf/remove-pages",
  "/pdf/rotate-pdf",
  "/pdf/split-pdf",
  "/privacy",
  "/support",
  "/terms",
  "/word",
  "/word/word-to-pdf",
  "/image/compress-image",
];

const intlMiddleware = createMiddleware(routing);

// Next.js 16 : le fichier "middleware.ts" est déprécié au profit de
// "proxy.ts" (le runtime edge n'est plus supporté ici, proxy tourne
// en Node.js — sans impact pour next-intl qui ne dépend pas de l'edge).
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_FR_PATHS.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/fr${pathname}`;
    return NextResponse.redirect(url, 301);
  }

  // "/" et tout le reste : détection langue standard (cookie NEXT_LOCALE
  // en priorité, sinon Accept-Language, sinon defaultLocale).
  return intlMiddleware(request);
}

export const config = {
  // Exclut /api, les assets internes Next et les fichiers statiques
  // (ex. /og-image.png, /favicon.ico) de la résolution de locale.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};