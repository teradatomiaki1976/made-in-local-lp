// src/components/ui/ArticleYouTubeEmbed.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface ArticleYouTubeEmbedProps {
  youtubeId: string;
  title: string;
  thumbnail: string;
}

export default function ArticleYouTubeEmbed({
  youtubeId,
  title,
  thumbnail,
}: ArticleYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    // transform-gpu isolate指定、Chromeでの角丸はみ出しバグを防止
    <div className="relative bg-black rounded-xl overflow-hidden shadow-xl aspect-video w-full mb-8 md:mb-10 border-4 border-white isolate transform-gpu">
      {!isPlaying ? (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="group relative w-full h-full block cursor-pointer text-left focus:outline-none"
          aria-label={`${title}の動画を再生する`}
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors duration-300 group-hover:bg-black/10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/95 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
              <div className="w-0 h-0 border-y-[10px] md:border-y-[12px] border-y-transparent border-l-[18px] md:border-l-[22px] border-l-[#003064] ml-1.5" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-full border-0"
        />
      )}
    </div>
  );
}
