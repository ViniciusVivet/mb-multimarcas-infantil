"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/data/products";

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^&\s/?#]+)/
  );
  return match?.[1] ?? null;
}

type MediaItem =
  | { type: "image"; url: string }
  | { type: "video"; youtubeId: string };

function buildItems(product: Product): MediaItem[] {
  const items: MediaItem[] = product.images.map((url) => ({ type: "image", url }));
  for (const url of product.videos ?? []) {
    const youtubeId = getYouTubeId(url);
    if (youtubeId) items.push({ type: "video", youtubeId });
  }
  return items;
}

function ArrowButton({
  dir,
  onClick,
  disabled,
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Anterior" : "Próximo"}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-md backdrop-blur-sm transition-all hover:bg-white active:scale-95 disabled:pointer-events-none disabled:opacity-0"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

function Carousel({
  items,
  current,
  goTo,
  onImageClick,
  inModal,
}: {
  items: MediaItem[];
  current: number;
  goTo: (i: number) => void;
  onImageClick?: () => void;
  inModal?: boolean;
}) {
  const touchStart = useRef<number | null>(null);

  return (
    <div className="flex h-full flex-col">
      {/* Slides */}
      <div
        className="relative flex-1 select-none overflow-hidden"
        onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStart.current === null) return;
          const diff = touchStart.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        {/* Slide strip */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {items.map((item, i) => (
            <div key={i} className="h-full w-full flex-shrink-0">
              {item.type === "video" ? (
                <div className="flex h-full w-full items-center justify-center bg-black">
                  {Math.abs(i - current) <= 1 && (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Vídeo do produto"
                    />
                  )}
                </div>
              ) : (
                <div
                  className={`relative h-full w-full ${onImageClick ? "cursor-zoom-in" : "cursor-default"}`}
                  onClick={i === current ? onImageClick : undefined}
                >
                  <Image
                    src={item.url}
                    alt={`Foto ${i + 1}`}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className={inModal ? "object-contain" : "object-cover"}
                    unoptimized
                    draggable={false}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ArrowButton dir="left" onClick={() => goTo(current - 1)} disabled={current === 0} />
            </div>
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <ArrowButton dir="right" onClick={() => goTo(current + 1)} disabled={current === items.length - 1} />
            </div>
          </>
        )}

        {/* Counter badge */}
        {items.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            {current + 1} / {items.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-t border-line bg-white px-3 py-3 scrollbar-hide">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver mídia ${i + 1}`}
              className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 active:scale-95 ${
                i === current
                  ? "border-coral shadow-md scale-105"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              {item.type === "image" ? (
                <Image src={item.url} alt="" fill sizes="56px" className="object-cover" unoptimized />
              ) : (
                <div className="flex h-full items-center justify-center bg-black text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductGallery({ product }: { product: Product }) {
  const items = buildItems(product);
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const goTo = useCallback(
    (i: number) => setCurrent(Math.max(0, Math.min(i, items.length - 1))),
    [items.length]
  );

  // Keyboard (modal only)
  useEffect(() => {
    if (!modalOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "Escape") setModalOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen, current, goTo]);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  if (items.length === 0) {
    return (
      <div className="flex min-h-[360px] w-full items-center justify-center bg-paper text-6xl text-muted/30 lg:min-h-[calc(100svh-76px-80px)]">
        👕
      </div>
    );
  }

  return (
    <>
      {/* Galeria inline */}
      <div className="min-h-[360px] overflow-hidden bg-paper lg:min-h-[calc(100svh-76px-80px)]">
        <Carousel
          items={items}
          current={current}
          goTo={goTo}
          onImageClick={() => setModalOpen(true)}
        />
      </div>

      {/* Lightbox / Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/95 p-4 md:p-8"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          {/* Header do modal */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-white/60">
              {current + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Fechar"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              ✕
            </button>
          </div>

          {/* Carrossel no modal */}
          <div className="flex-1 overflow-hidden rounded-2xl">
            <Carousel items={items} current={current} goTo={goTo} inModal />
          </div>

          {/* Dica de teclado (desktop) */}
          <p className="mt-3 hidden text-center text-xs text-white/30 md:block">
            Use ← → para navegar · Esc para fechar
          </p>
        </div>
      )}
    </>
  );
}
