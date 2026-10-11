"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortableList } from "@/components/ui/use-sortable-list";
import { MergeFileItem } from "@/features/pdf/merge/components/merge-file-item";
import type { PdfFileItem } from "@/features/pdf/shared/types/pdf-file-item";

interface MergeFileListProps {
  files: PdfFileItem[];
  onReorder: (fromIndex: number, toIndex: number) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}

export function MergeFileList({
  files,
  onReorder,
  onRemove,
  disabled,
}: MergeFileListProps) {
  const { sensors, accessibility } = useSortableList(
    (id) => files.find((f) => f.id === id)?.name ?? "",
  );

  // Pas de cadre « aucun fichier » : la zone de dépôt suffit, et le bouton
  // d'action reste ainsi visible sans défiler sur mobile.
  if (files.length === 0) return null;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromIndex = files.findIndex((f) => f.id === active.id);
    const toIndex = files.findIndex((f) => f.id === over.id);
    if (fromIndex === -1 || toIndex === -1) return;

    onReorder(fromIndex, toIndex);
  }

  return (
    <DndContext
      sensors={sensors}
      accessibility={accessibility}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={files.map((f) => f.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {files.map((item) => (
            <MergeFileItem
              key={item.id}
              item={item}
              onRemove={onRemove}
              disabled={disabled}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}