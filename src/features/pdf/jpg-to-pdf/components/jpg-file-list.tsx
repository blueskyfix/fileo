"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortableList } from "@/components/ui/use-sortable-list";
import { JpgFileItem } from "./jpg-file-item";
import type { JpgToPdfImage } from "../lib/types";

interface JpgFileListProps {
  images: JpgToPdfImage[];
  onReorder: (images: JpgToPdfImage[]) => void;
  onRemove: (id: string) => void;
}

export function JpgFileList({ images, onReorder, onRemove }: JpgFileListProps) {
  const { sensors, accessibility } = useSortableList(
    (id) => images.find((img) => img.id === id)?.name ?? "",
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);
    onReorder(arrayMove(images, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} accessibility={accessibility} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={images.map((img) => img.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {images.map((image, index) => (
            <JpgFileItem key={image.id} image={image} index={index} onRemove={onRemove} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}