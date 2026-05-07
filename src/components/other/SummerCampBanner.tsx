'use client'

import { Sun, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSekSZf_CwZ9fpybQ-Z6Nj7aCmtRbCuAfNV0B8UVP6JuylxXJg/viewform?usp=publish-editor'

const MARQUEE_ITEM = (
  <span className="inline-flex items-center gap-3 pr-10 align-middle">
    <span className="text-white text-[13px] md:text-sm font-extrabold tracking-tight whitespace-nowrap">
      Літній{' '}
      <span className="rounded bg-[#98CF93] px-1.5 py-0.5 text-[#0E1A14] font-black">
        ІТ-CAMP
      </span>{' '}
      уже відкрив реєстрацію — тиждень коду, ігор і друзів. Місць обмаль
    </span>
    <Sparkles
      className="h-3.5 w-3.5 text-[#F5BE3B] shrink-0"
      aria-hidden="true"
    />
  </span>
)

const SummerCampBanner = () => {
  const openForm = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      openForm()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openForm}
      onKeyDown={handleKeyDown}
      aria-label="Реєстрація на Літній ІТ-CAMP — відкрити форму"
      className={cn(
        'group fixed top-0 left-0 right-0 h-10 w-full',
        'flex items-center cursor-pointer select-none',
        'bg-[linear-gradient(90deg,#0C0E12_0%,#171A21_50%,#0C0E12_100%)]',
        'border-b border-[#98CF93]/25',
        'shadow-[0_2px_14px_rgba(0,0,0,0.35)]',
        'transition-[filter] duration-200 hover:brightness-110',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-inset',
      )}
      style={{ zIndex: 105 }}
    >
      {/* Left sun icon — fixed, doesn't scroll */}
      <div className="relative z-10 flex h-full items-center pl-3 sm:pl-4 pr-2 bg-[linear-gradient(90deg,#0C0E12_0%,#0C0E12_75%,rgba(12,14,18,0)_100%)]">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#98CF93]/40 bg-[#171A21]">
          <Sun
            className="h-3.5 w-3.5 text-[#F5BE3B] camp-sun-spin"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Marquee track */}
      <div className="relative flex-1 overflow-hidden h-full">
        <div className="camp-marquee absolute inset-y-0 flex items-center whitespace-nowrap will-change-transform">
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
          {/* duplicate set for seamless loop */}
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
          {MARQUEE_ITEM}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-[linear-gradient(90deg,#0C0E12_0%,rgba(12,14,18,0)_100%)]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-[linear-gradient(270deg,#0C0E12_0%,rgba(12,14,18,0)_100%)]" />
      </div>

      {/* Right CTA — fixed, doesn't scroll */}
      <div className="relative z-10 flex h-full items-center pl-2 pr-3 sm:pr-4 bg-[linear-gradient(90deg,rgba(12,14,18,0)_0%,#0C0E12_25%,#0C0E12_100%)]">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 shrink-0',
            'px-2.5 sm:px-3.5 py-1 rounded-full',
            'bg-[#98CF93] text-[#0E1A14] text-[12px] sm:text-[13px] font-extrabold uppercase tracking-tight',
            'shadow-[0_4px_14px_rgba(152,207,147,0.25)]',
            'transition-colors duration-200 group-hover:bg-[#ACDCA7]',
          )}
          aria-hidden="true"
        >
          <span className="hidden sm:inline">Зареєструватися</span>
          <span className="inline sm:hidden">Реєстрація</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <style jsx>{`
        @keyframes camp-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes camp-sun-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .camp-marquee {
          animation: camp-marquee-scroll 40s linear infinite;
        }
        .camp-sun-spin {
          animation: camp-sun-spin 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .camp-marquee,
          .camp-sun-spin {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default SummerCampBanner
