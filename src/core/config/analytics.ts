export const analyticsConfig = {
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
} as const;

const isProd = process.env.NODE_ENV === "production";

export function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;
  if (!isProd) return;

  const umami = (
    window as typeof window & {
      umami?: { track: (event: string, data?: Record<string, string>) => void };
    }
  ).umami;

  umami?.track(eventName, data);
}

// L'outil se lit dans l'URL (/fr/pdf/merge-pdf -> merge-pdf) : une seule instrumentation pour tous les dropzones.
export function trackFileDrop(acceptedCount: number, rejectedCount: number) {
  if (typeof window === "undefined") return;
  const tool = window.location.pathname.split("/").filter(Boolean).pop() ?? "";
  if (rejectedCount > 0) trackEvent("file_rejected", { tool });
  if (acceptedCount > 0) trackEvent("file_added", { tool, count: String(acceptedCount) });
}
