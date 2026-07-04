"use client";

import { useEffect, useState } from "react";

export function DebugSentryTest() {
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("test-sentry")) {
      setShouldThrow(true);
    }
  }, []);

  if (shouldThrow) {
    throw new Error("Test Sentry — à retirer après vérification");
  }

  return null;
}