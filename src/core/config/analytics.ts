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