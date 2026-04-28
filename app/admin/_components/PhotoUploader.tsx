"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { uploadImageAction } from "../actions";

type Photo = { url: string; uploading?: boolean; error?: string };

export function PhotoUploader({ defaultPhotos = [] }: { defaultPhotos?: string[] }) {
  const [photos, setPhotos] = useState<Photo[]>(
    defaultPhotos.map((url) => ({ url }))
  );
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    const slots = 6 - photos.filter((p) => !p.error && !p.uploading).length;
    const toProcess = Array.from(files).slice(0, slots);
    if (!toProcess.length) return;

    setPhotos((prev) => [
      ...prev.filter((p) => !p.error),
      ...toProcess.map(() => ({ url: "", uploading: true as const })),
    ]);

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
              ? { url: result.url }
              : { url: "", error: result.error ?? "Erro ao enviar" };
          }
          return next;
        });
      } catch {
        setPhotos((prev) => {
          const next = [...prev];
          const idx = next.findIndex((p) => p.uploading);
          if (idx !== -1) next[idx] = { url: "", error: "Erro ao enviar" };
          return next;
        });
      }
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  const validUrls = photos.filter((p) => p.url && !p.uploading).map((p) => p.url);
  const count = photos.filter((p) => !p.error).length;

  return (
    <div>
      <input type="hidden" name="images" value={JSON.stringify(validUrls)} />

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
        {photos.map((photo, i) => (
          <div
            key={i}
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
                  onClick={() => removePhoto(i)}
                  className="text-xs text-muted underline"
                >
                  Remover
                </button>
              </div>
            ) : (
              <>
                <Image
                  src={photo.url}
                  alt={`Foto ${i + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black transition-colors"
                  aria-label="Remover foto"
                >
                  ✕
                </button>
              </>
            )}
          </div>
        ))}

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
        Até 6 fotos · Comprimidas automaticamente · Celular ou computador
      </p>
    </div>
  );
}
