import type * as SentryModule from "@sentry/nextjs";

// Le SDK Sentry (~130 Ko) est charge hors du chemin critique : apres l'evenement
// `load`, pendant un temps d'inactivite du navigateur. Les erreurs survenues
// avant ce moment ne sont pas capturees (compromis assume pour le score mobile).
let sentry: Promise<typeof SentryModule> | undefined;

function loadSentry() {
  sentry ??= import("@sentry/nextjs").then((Sentry) => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
      enabled: process.env.NODE_ENV === "production",
    });
    return Sentry;
  });
  return sentry;
}

if (process.env.NODE_ENV === "production") {
  const schedule = () =>
    "requestIdleCallback" in window
      ? window.requestIdleCallback(() => void loadSentry(), { timeout: 5000 })
      : setTimeout(() => void loadSentry(), 3000);

  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
}

export function onRouterTransitionStart(
  ...args: Parameters<typeof SentryModule.captureRouterTransitionStart>
) {
  void sentry?.then((Sentry) => Sentry.captureRouterTransitionStart(...args));
}
