import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers localisés de next/link, next/navigation.
// `Link` préfixe automatiquement le href avec la locale active
// (via routing.localePrefix = "always") — remplace tout `next/link`
// utilisé pour un lien interne au site.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);