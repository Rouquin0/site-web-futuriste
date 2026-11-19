"use client";

/**
 * CrossfadeImage.tsx — Image avec fondu enchaîné entre deux sources (changement de coloris)
 *
 * - Le nouveau coloris apparaît par-dessus l'ancien (fondu de ~300 ms, opacité uniquement)
 * - Le cadrage est identique : aucun saut de mise en page
 * - Repli sûr : si l'image est absente ou invalide, onFail est appelé (le dessin SVG prend le relais)
 */

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface CrossfadeImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
  onFail?: () => void;
}

export default function CrossfadeImage({ src, alt, sizes, priority = false, quality = 75, onFail }: CrossfadeImageProps) {
  const [layers, setLayers] = useState<{ cur: string; prev: string | null }>({ cur: src, prev: null });
  const [curReady, setCurReady] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (src === layers.cur) return;
    setLayers((l) => ({ cur: src, prev: l.cur }));
    setCurReady(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const handleLoaded = () => {
    setCurReady(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLayers((l) => ({ ...l, prev: null })), 340);
  };

  const fill = { objectFit: "cover" as const, objectPosition: "center top" };

  return (
    <>
      {layers.prev && (
        <Image src={layers.prev} alt="" aria-hidden="true" fill sizes={sizes} quality={quality} style={fill} draggable={false} />
      )}
      <Image
        key={layers.cur}
        src={layers.cur}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        draggable={false}
        style={{ ...fill, opacity: curReady ? 1 : 0, transition: "opacity 300ms ease-out" }}
        onLoad={handleLoaded}
        onError={() => {
          setCurReady(true);
          onFail?.();
        }}
      />
    </>
  );
}
