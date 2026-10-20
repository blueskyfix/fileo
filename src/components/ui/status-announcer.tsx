"use client";

import { useEffect, useRef } from "react";

/**
 * Région invisible lue par les lecteurs d'écran à chaque changement de message
 * (WCAG 4.1.3) : « traitement en cours », « fichier prêt », etc.
 */
export function StatusAnnouncer({ message }: { message: string }) {
  return (
    <p role="status" aria-live="polite" className="sr-only">
      {message}
    </p>
  );
}

/** Donne le focus à l'élément dès que `active` passe à vrai (ex. bouton Télécharger). */
export function useFocusWhen<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null);
  useEffect(() => {
    if (active) ref.current?.focus();
  }, [active]);
  return ref;
}
