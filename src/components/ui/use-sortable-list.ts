"use client";

import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Announcements,
  type ScreenReaderInstructions,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useTranslations } from "next-intl";

/**
 * Capteurs et annonces partagés par les listes réordonnables.
 * Le clavier est un capteur à part entière (WCAG 2.1.1 et 2.5.7) :
 * Espace pour saisir, flèches pour déplacer, Espace pour déposer, Échap pour annuler.
 */
export function useSortableList(getName: (id: UniqueIdentifier) => string) {
  const t = useTranslations("SortableList");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const screenReaderInstructions: ScreenReaderInstructions = {
    draggable: t("instructions"),
  };

  const announcements: Announcements = {
    onDragStart: ({ active }) => t("picked", { name: getName(active.id) }),
    onDragOver: ({ active, over }) =>
      over ? t("over", { name: getName(active.id), target: getName(over.id) }) : undefined,
    onDragEnd: ({ active, over }) =>
      over ? t("dropped", { name: getName(active.id), target: getName(over.id) }) : undefined,
    onDragCancel: ({ active }) => t("cancelled", { name: getName(active.id) }),
  };

  return { sensors, accessibility: { screenReaderInstructions, announcements } };
}
