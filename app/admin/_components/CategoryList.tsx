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
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryPositionsAction,
} from "../actions";
import { defaultCategories } from "@/lib/categories-db";

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
  Calçados: "👟",
  Havaianas: "🩴",
};

function SortableRow({
  name,
  index,
  canDelete,
  onDelete,
}: {
  name: string;
  index: number;
  canDelete: boolean;
  onDelete: (name: string) => void;
}) {
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
      {canDelete ? (
        <button
          type="button"
          onClick={() => onDelete(name)}
          className="rounded-lg px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
        >
          Excluir
        </button>
      ) : null}
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
  const [newCategory, setNewCategory] = useState("");

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

  async function handleCreateCategory() {
    const name = newCategory.trim().replace(/\s+/g, " ");
    if (!name) return;

    setSaving(true);
    setSaved(false);
    setError(null);
    const formData = new FormData();
    formData.set("name", name);
    const result = await createCategoryAction(formData);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setCategories((current) => (current.includes(name) ? current : [...current, name]));
    setNewCategory("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleDeleteCategory(name: string) {
    if (!window.confirm(`Excluir a categoria "${name}"?`)) return;

    setSaving(true);
    setSaved(false);
    setError(null);
    const result = await deleteCategoryAction(name);
    setSaving(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setCategories((current) => current.filter((category) => category !== name));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-5 rounded-3xl bg-white p-4 shadow-soft">
        <label className="mb-2 block text-sm font-bold text-ink">Adicionar categoria</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCreateCategory();
              }
            }}
            placeholder="Ex: Calçados, Havaianas, Outlet"
            className="input min-w-0 flex-1"
          />
          <button
            type="button"
            onClick={handleCreateCategory}
            className="button button-primary px-4 py-3 text-sm"
          >
            Adicionar
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">
          Depois de adicionar, a categoria aparece no cadastro e edição de produtos.
        </p>
      </div>

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
              <SortableRow
                key={cat}
                name={cat}
                index={i}
                canDelete={!defaultCategories.includes(cat)}
                onDelete={handleDeleteCategory}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
