"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    void import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error));
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-foreground">
        Une erreur est survenue
      </h2>
      <p className="max-w-md text-foreground-muted">
        Nous avons été notifiés du problème. Essayez de recharger la section.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
      >
        Réessayer
      </button>
    </div>
  );
}