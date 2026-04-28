"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Product } from "@/data/products";
import { DeleteButton } from "./DeleteButton";
import { updatePositionsAction } from "../actions";

function SortableCard({ produto }: { produto: Product }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: produto.slug });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 50 : "auto",
      }}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft"
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab items-center justify-center gap-1 border-b border-line py-2 text-muted/50 hover:bg-paper hover:text-muted active:cursor-grabbing"
        title="Arraste para reordenar"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/>
          <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
          <circle cx="9" cy="18" r="1.5"/><circle cx="15" cy="18" r="1.5"/>
        </svg>
        <span className="text-[10px] font-bold uppercase tracking-wider">Arrastar</span>
      </div>

      <div className="relative aspect-square w-full bg-paper">
        {produto.images[0] ? (
          <Image src={produto.images[0]} alt={produto.name} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl text-muted/30">👕</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <p className="text-xs font-medium text-muted">{produto.category}</p>
        <p className="font-bold leading-tight text-ink">{produto.name}</p>
        <p className="text-sm font-semibold text-coral">{produto.price}</p>
        <p className="text-xs text-muted">{produto.sizes.join(", ")}</p>
      </div>

      <div className="flex gap-2 border-t border-line px-4 py-3">
        <Link
          href={`/produto/${produto.slug}`}
          target="_blank"
          className="flex-1 rounded-xl bg-mint/10 px-3 py-2 text-center text-xs font-semibold text-mint hover:bg-mint/20 transition-colors"
        >
          Ver no site
        </Link>
        <Link
          href={`/admin/produtos/${produto.slug}/editar`}
          className="flex-1 rounded-xl bg-paper px-3 py-2 text-center text-xs font-semibold text-ink hover:bg-line transition-colors"
        >
          Editar
        </Link>
        <DeleteButton slug={produto.slug} name={produto.name} />
      </div>
    </div>
  );
}

export function ProductList({ produtos: initial }: { produtos: Product[] }) {
  const [produtos, setProdutos] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = produtos.findIndex((p) => p.slug === active.id);
    const newIndex = produtos.findIndex((p) => p.slug === over.id);
    const reordered = arrayMove(produtos, oldIndex, newIndex);
    setProdutos(reordered);

    setSaving(true);
    setSaved(false);
    await updatePositionsAction(reordered.map((p) => p.slug));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (produtos.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-12 text-center shadow-soft">
        <p className="text-4xl">📦</p>
        <p className="mt-3 font-bold text-ink">Nenhum produto ainda</p>
        <p className="mt-1 text-sm text-muted">Clique em "+ Novo produto" para começar.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Status de salvamento */}
      <div className="mb-4 flex items-center gap-2 text-xs font-semibold">
        {saving && <span className="text-muted">Salvando ordem...</span>}
        {saved && <span className="text-mint">Ordem salva!</span>}
        {!saving && !saved && (
          <span className="text-muted/60">Arraste os cards para reordenar os produtos no site</span>
        )}
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={produtos.map((p) => p.slug)} strategy={rectSortingStrategy}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {produtos.map((produto) => (
              <SortableCard key={produto.slug} produto={produto} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
