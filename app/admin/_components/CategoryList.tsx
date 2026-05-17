"use client";

import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updateCategoryPositionsAction } from "../actions";

const categoryEmojis: Record<string, string> = {
  Vestidos: "👗",
  Conjuntos: "👚",
  "Bebê": "🍼",
  Meninas: "🎀",
  Meninos: "⚽",
  Camisetas: "👕",
  "Calças": "👖",
  "Macacões": "🐣",
  Casacos: "🧥",
  Shorts: "🩳",
  "Acessórios": "✨",
};

function SortableRow({ name, index }: { name: string; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: name });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : "auto",
      }}
      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft"
    >
      <span className="w-6 text-center text-sm font-black text-muted/50">{index + 1}</span>
      <span className="text-xl">{categoryEmojis[name] ?? "🏷️"}</span>
      <span className="flex-1 font-bold text-ink">{name}</span>
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab rounded-lg p-2 text-muted/40 hover:bg-paper hover:text-muted active:cursor-grabbing"
        title="Arrastar para reordenar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
          <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
          <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
        </svg>
      </div>
    </div>
  );
}

export function CategoryList({ categories: initial }: { categories: string[] }) {
  const [categories, setCategories] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories.indexOf(active.id as string);
    const newIndex = categories.indexOf(over.id as string);
    const reordered = arrayMove(categories, oldIndex, newIndex);
    setCategories(reordered);

    setSaving(true);
    setSaved(false);
    setError(null);
    const result = await updateCategoryPositionsAction(reordered);
    setSaving(false);
    if (result.error) {
      setError(result.error);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold">
        {saving && <span className="text-muted">Salvando ordem...</span>}
        {saved && <span className="text-mint">Ordem salva!</span>}
        {error && <span className="text-red-500">{error}</span>}
        {!saving && !saved && !error && (
          <span className="text-muted/60">Arraste as categorias para definir a ordem no catálogo</span>
        )}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={categories} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {categories.map((cat, i) => (
              <SortableRow key={cat} name={cat} index={i} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
