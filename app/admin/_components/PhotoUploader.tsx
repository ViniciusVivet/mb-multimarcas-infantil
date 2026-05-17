"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { uploadImageAction } from "../actions";

type Photo = { id: string; url: string; uploading?: boolean; error?: string };

function SortablePhoto({
  photo,
  index,
  onRemove,
}: {
  photo: Photo;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: photo.id, disabled: photo.uploading || !!photo.error });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.55 : 1,
        zIndex: isDragging ? 50 : "auto",
      }}
      className="relative aspect-square overflow-hidden rounded-xl border-2 border-line bg-paper"
    >
      {photo.uploading ? (
        <div className="flex h-full items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-coral border-t-transparent" />
        </div>
      ) : photo.error ? (
        <div className="flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
          <span className="text-xs text-red-500">Erro</span>
          <button
            type="button"
            onClick={() => onRemove(photo.id)}
            className="text-xs text-muted underline"
          >
            Remover
          </button>
        </div>
      ) : (
        <>
          <Image
            src={photo.url}
            alt={`Foto ${index + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="absolute inset-x-1 bottom-1 flex h-7 cursor-grab items-center justify-center rounded-full bg-black/65 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:bg-black/80 active:cursor-grabbing"
            style={{ touchAction: "none" }}
            aria-label={`Arrastar foto ${index + 1} para ordenar`}
            title="Arraste para mudar a ordem"
          >
            Arrastar
          </button>
          <button
            type="button"
            onClick={() => onRemove(photo.id)}
            className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm font-bold text-white transition-colors hover:bg-red-500 active:scale-95"
            aria-label="Remover foto"
          >
            x
          </button>
        </>
      )}
    </div>
  );
}

export function PhotoUploader({
  defaultPhotos = [],
  onFirstPhotoChange,
  onUploadingChange,
}: {
  defaultPhotos?: string[];
  onFirstPhotoChange?: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
}) {
  const [photos, setPhotos] = useState<Photo[]>(
    defaultPhotos.map((url, index) => ({ id: `default-${index}-${url}`, url }))
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const nextIdRef = useRef(0);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  function createPhotoId() {
    nextIdRef.current += 1;
    return `photo-${Date.now()}-${nextIdRef.current}`;
  }

  function notifyFirstPhoto(next: Photo[]) {
    const firstUrl = next.find((p) => p.url && !p.uploading)?.url ?? "";
    onFirstPhotoChange?.(firstUrl);
  }

  async function handleFiles(files: FileList) {
    const slots = 6 - photos.filter((p) => !p.error && !p.uploading).length;
    const toProcess = Array.from(files).slice(0, slots);
    if (!toProcess.length) return;

    setPhotos((prev) => {
      const next = [
        ...prev.filter((p) => !p.error),
        ...toProcess.map(() => ({ id: createPhotoId(), url: "", uploading: true as const })),
      ];
      onUploadingChange?.(true);
      return next;
    });

    for (const file of toProcess) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });

        const fd = new FormData();
        fd.append("file", compressed, file.name);
        const result = await uploadImageAction(fd);

        setPhotos((prev) => {
          const next = [...prev];
          const idx = next.findIndex((p) => p.uploading);
          if (idx !== -1) {
            next[idx] = result.url
              ? { id: next[idx].id, url: result.url }
              : { id: next[idx].id, url: "", error: result.error ?? "Erro ao enviar" };
          }
          const stillUploading = next.some((p) => p.uploading);
          onUploadingChange?.(stillUploading);
          notifyFirstPhoto(next);
          return next;
        });
      } catch {
        setPhotos((prev) => {
          const next = [...prev];
          const idx = next.findIndex((p) => p.uploading);
          if (idx !== -1) next[idx] = { id: next[idx].id, url: "", error: "Erro ao enviar" };
          const stillUploading = next.some((p) => p.uploading);
          onUploadingChange?.(stillUploading);
          return next;
        });
      }
    }
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const next = prev.filter((photo) => photo.id !== id);
      notifyFirstPhoto(next);
      onUploadingChange?.(next.some((p) => p.uploading));
      return next;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setPhotos((prev) => {
      const oldIndex = prev.findIndex((photo) => photo.id === active.id);
      const newIndex = prev.findIndex((photo) => photo.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const next = arrayMove(prev, oldIndex, newIndex);
      notifyFirstPhoto(next);
      return next;
    });
  }

  const validUrls = photos.filter((p) => p.url && !p.uploading).map((p) => p.url);
  const count = photos.filter((p) => !p.error).length;

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(validUrls)} />

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={photos.map((photo) => photo.id)} strategy={rectSortingStrategy}>
            {photos.map((photo, i) => (
              <SortablePhoto key={photo.id} photo={photo} index={i} onRemove={removePhoto} />
            ))}
          </SortableContext>
        </DndContext>

        {count < 6 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-line bg-paper text-muted transition-colors hover:border-coral hover:bg-coral/5"
          >
            <span className="text-xl font-light">+</span>
            <span className="text-[10px] font-bold">Foto</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
      />

      <p className="mt-1.5 text-xs text-muted">
        Ate 6 fotos. Arraste as fotos para ordenar o carrossel.
      </p>
    </div>
  );
}
