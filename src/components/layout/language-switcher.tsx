"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const labels: Record<AppLocale, string> = {
  fr: "FR",
  en: "EN",
};

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname(); // ex: /fr/pdf/merge-pdf
  const router = useRouter();

  // Retire le préfixe de locale courant pour obtenir le chemin "nu",
  // puis le reconstruit avec l'autre locale. Reste sur l'équivalent
  // exact de la page courante (pas de retour à la home).
  const segments = pathname.split("/");
  const rest = segments.slice(2).join("/"); // enlève "" et le préfixe locale

  function switchTo(nextLocale: AppLocale) {
    // Pose le cookie NEXT_LOCALE : persistance du choix manuel, respecté
    // par le proxy même si Accept-Language dit autre chose ensuite.
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;
    router.push(`/${nextLocale}${rest ? `/${rest}` : ""}`);
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium text-foreground-muted">
      {routing.locales.map((loc, index) => (
        <div key={loc} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === locale ? "true" : undefined}
            className={
              loc === locale
                ? "text-foreground"
                : "transition-colors hover:text-foreground"
            }
          >
            {labels[loc]}
          </button>
        </div>
      ))}
    </div>
  );
}