export const analyticsConfig = {
  umamiWebsiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
} as const;

export function trackEvent(eventName: string, data?: Record<string, string>) {
  if (typeof window === "undefined") return;

  const umami = (
    window as typeof window & {
      umami?: { track: (event: string, data?: Record<string, string>) => void };
    }
  ).umami;

  umami?.track(eventName, data);
}