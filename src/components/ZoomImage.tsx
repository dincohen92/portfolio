"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll while lightbox is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Thumbnail — subtle hover scale as click hint */}
      <div
        className="flex-1 w-full overflow-hidden cursor-zoom-in"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-auto transition-transform duration-500 ease-out hover:scale-105"
        />
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          <Image
            src={src}
            alt={alt}
            width={0}
            height={0}
            sizes="90vw"
            className="w-[90vw] max-h-[90vh] h-auto object-contain"
          />
        </div>
      )}
    </>
  );
}
