'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  PlayCircle,
  Video,
  X,
} from 'lucide-react'

type MediaItem =
  | {
      type: 'image'
      title: string
      src: string
    }
  | {
      type: 'video'
      title: string
      poster?: string
    }

const mediaItems: MediaItem[] = [
  {
    type: 'image',
    title: 'Фото воркшопу 1',
    src: '/workshop/worksh1.jpeg',
  },
  {
    type: 'image',
    title: 'Фото воркшопу 2',
    src: '/workshop/worksh2.JPG',
  },
  {
    type: 'image',
    title: 'Фото воркшопу 3',
    src: '/workshop/worksh3.JPG',
  },
  {
    type: 'video',
    title: 'Відео воркшопу',
    poster: '/main-poster.jpg',
  },
]

export default function WorkshopMediaSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const activeItem = mediaItems[activeIndex]

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1))
  }

  const goNext = () => {
    setActiveIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1))
  }

  const renderMedia = (isLarge = false) => (
    <>
      {activeItem.type === 'image' ? (
        <>
          <Image
            src={activeItem.src}
            alt={activeItem.title}
            fill
            sizes={isLarge ? '100vw' : '(max-width: 1280px) 100vw, 1200px'}
            className="object-cover scale-105 blur-md opacity-35"
          />
          <Image
            src={activeItem.src}
            alt={activeItem.title}
            fill
            sizes={isLarge ? '100vw' : '(max-width: 1280px) 100vw, 1200px'}
            className="object-contain"
          />
        </>
      ) : (
        <>
          {activeItem.poster ? (
            <Image
              src={activeItem.poster}
              alt={activeItem.title}
              fill
              sizes={isLarge ? '100vw' : '(max-width: 1280px) 100vw, 1200px'}
              className="object-cover opacity-45"
            />
          ) : null}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(144,217,134,0.24),transparent_46%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <PlayCircle className="h-12 w-12 text-[#A8E8A0]" />
            <p className="mt-3 text-white text-[22px] font-extrabold uppercase tracking-[-0.03em]">
              Місце для відео
            </p>
            <p className="mt-1 text-white/65 text-[14px] leading-relaxed">
              Додайте відео воркшопу пізніше
            </p>
          </div>
        </>
      )}
    </>
  )

  return (
    <>
      <div className="relative overflow-hidden rounded-[10px] border border-white/10 bg-[#2A2D35] p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="inline-flex rounded-[4px] border border-[#88C980]/45 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.06em] text-[#BCE8B2]">
            Фото / відео презентація
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[12px] uppercase tracking-[0.08em] text-white/62">
              {activeIndex + 1} / {mediaItems.length}
            </p>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="rounded-[6px] border border-white/20 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white/90 transition-colors hover:border-[#8ED28A] hover:text-[#BCE8B2]"
            >
              Детальніше
            </button>
          </div>
        </div>

        <div className="relative h-[250px] md:h-[360px] lg:h-[430px] overflow-hidden rounded-[8px] border border-white/12 bg-[#242831]">
          {renderMedia()}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3.5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-white text-[15px] md:text-[16px] font-semibold">
                {activeItem.title}
              </p>
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-white/20 px-2 py-1 text-[11px] uppercase tracking-[0.06em] text-white/88">
                {activeItem.type === 'image' ? (
                  <>
                    <ImageIcon className="h-3.5 w-3.5" />
                    Фото
                  </>
                ) : (
                  <>
                    <Video className="h-3.5 w-3.5" />
                    Відео
                  </>
                )}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Попередній слайд"
            className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Наступний слайд"
            className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {mediaItems.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-[52px] overflow-hidden rounded-[6px] border transition-all ${
                activeIndex === index
                  ? 'border-[#8ED28A] ring-1 ring-[#8ED28A]/50'
                  : 'border-white/12 hover:border-white/30'
              }`}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#242831]">
                  <PlayCircle className="h-5 w-5 text-[#A8E8A0]" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[140] bg-black/80 backdrop-blur-sm p-4 md:p-6">
          <div className="mx-auto h-full max-w-6xl">
            <div className="relative h-full rounded-[10px] border border-white/15 bg-[#1F232C] p-4 md:p-5">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                aria-label="Закрити"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-white/20 bg-black/35 text-white transition-colors hover:bg-black/55"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="h-full flex flex-col">
                <div className="mb-3 pr-12">
                  <p className="text-white text-[18px] md:text-[20px] font-extrabold tracking-[-0.03em]">
                    {activeItem.title}
                  </p>
                </div>

                <div className="relative flex-1 min-h-0 overflow-hidden rounded-[8px] border border-white/10 bg-[#242831]">
                  {renderMedia(true)}

                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Попередній слайд"
                    className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Наступний слайд"
                    className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-white/20 bg-black/40 text-white transition-colors hover:bg-black/60"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
