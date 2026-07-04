"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
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
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
  );

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-elevated px-6 py-10 text-center text-sm text-foreground-muted">
        Aucun fichier ajouté pour le moment
      </div>
    );
  }

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