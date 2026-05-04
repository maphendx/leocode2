import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'
import { MapPin, Phone } from 'lucide-react'

export type PartnershipInfoItem = {
  icon: LucideIcon
  label: string
  value: string
}

type PartnershipFormatItem = {
  title: string
  description: string
}

type PartnershipShowcaseProps = {
  theme: 'light' | 'dark'
  imageSrc: string
  imageAlt: string
  imageLabel: string
  imageNote?: string
  lead: string
  featureBadges?: string[]
  formats: PartnershipFormatItem[]
  formatColumns?: 2 | 3 | 4
  highlights: string[]
  valueTitle?: string
  detailParagraphs: string[]
  detailsLabel?: string
  logisticsCards: PartnershipInfoItem[]
  supportCards: PartnershipInfoItem[]
  locations: string[]
  phoneLabel: string
  phoneDisplay: string
  phoneHref: string
}

const themeStyles = {
  light: {
    hero:
      'border-[#D7DDD3] bg-[#FBFCF9]',
    surface:
      'border-[#D7DDD3] bg-[#FBFCF9]',
    surfaceStrong:
      'border-[#CBD6C4] bg-[linear-gradient(180deg,#FBFCF9_0%,#F3F7EE_100%)]',
    text: 'text-[#1F2430]',
    body: 'text-[#4A5567]',
    muted: 'text-[#5A6474]',
    iconWrap: 'border-[#79B96F]/35 bg-[#79B96F]/10',
    icon: 'text-[#4F8E47]',
    bullet: 'bg-[#79B96F]',
    count: 'border-[#79B96F]/45 text-[#4F8E47]',
    badge:
      'border-[#DDE7D6] bg-[#F5F9F0] text-[#31452D]',
    overlay:
      'bg-[linear-gradient(180deg,rgba(15,22,16,0.02)_2%,rgba(15,22,16,0.16)_54%,rgba(15,22,16,0.76)_100%)]',
    chip: 'border-[#D7DDD3] bg-[#F7FAF3] text-[#33402E]',
    contact:
      'border-[#AFCFAA] bg-[linear-gradient(90deg,#FBFCF9_0%,#EAF5E3_100%)]',
    phone: 'text-[#3F7B39] hover:text-[#33672E]',
  },
  dark: {
    hero:
      'border-white/10 bg-[#2A2D35]',
    surface:
      'border-white/10 bg-[#2A2D35]',
    surfaceStrong:
      'border-white/10 bg-[linear-gradient(180deg,#2F343D_0%,#2A2D35_100%)]',
    text: 'text-white',
    body: 'text-white/78',
    muted: 'text-white/60',
    iconWrap: 'border-[#88C980]/35 bg-[#88C980]/8',
    icon: 'text-[#90D986]',
    bullet: 'bg-[#88C980]',
    count: 'border-[#88C980]/45 text-[#AEE7A6]',
    badge:
      'border-white/12 bg-[#24272F] text-white',
    overlay:
      'bg-[linear-gradient(180deg,rgba(10,13,16,0.02)_2%,rgba(10,13,16,0.22)_54%,rgba(10,13,16,0.86)_100%)]',
    chip: 'border-white/10 bg-[#252831] text-white/82',
    contact:
      'border-[#88C980]/45 bg-[linear-gradient(90deg,#2A2D35_0%,#26342B_100%)]',
    phone: 'text-[#A8E8A0] hover:text-[#BDF0B7]',
  },
} as const

const formatGridClasses: Record<NonNullable<PartnershipShowcaseProps['formatColumns']>, string> =
  {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 xl:grid-cols-4',
  }

const SectionInfoCard = ({
  item,
  theme,
}: {
  item: PartnershipInfoItem
  theme: PartnershipShowcaseProps['theme']
}) => {
  const styles = themeStyles[theme]

  return (
    <article className={`rounded-[4px] border p-3.5 md:p-4 ${styles.surface}`}>
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[4px] border ${styles.iconWrap}`}
        >
          <item.icon className={`h-4 w-4 ${styles.icon}`} />
        </span>
        <div>
          <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
            {item.label}
          </p>
          <p className={`mt-1.5 text-[14px] leading-snug ${styles.text}`}>
            {item.value}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function PartnershipShowcase({
  theme,
  imageSrc,
  imageAlt,
  imageLabel,
  imageNote,
  lead,
  featureBadges = [],
  formats,
  formatColumns = 3,
  highlights,
  valueTitle = 'Ключова цінність',
  detailParagraphs,
  detailsLabel = 'Детальніше',
  logisticsCards,
  supportCards,
  locations,
  phoneLabel,
  phoneDisplay,
  phoneHref,
}: PartnershipShowcaseProps) {
  const styles = themeStyles[theme]

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
      <div className="space-y-4 md:space-y-5">
        <article className={`group overflow-hidden rounded-[8px] border p-4 md:p-5 ${styles.hero}`}>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.95fr)]">
            <div className="relative min-h-[280px] overflow-hidden rounded-[4px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 44vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className={`absolute inset-0 ${styles.overlay}`} />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <span
                  className={`inline-flex rounded-[4px] border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${styles.badge}`}
                >
                  {imageLabel}
                </span>
                {imageNote ? (
                  <p className="mt-3 max-w-[32ch] text-white text-[15px] leading-relaxed">
                    {imageNote}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col justify-between gap-4 py-1">
              <div>
                <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
                  Опис формату
                </p>
                <p
                  className={`mt-3 text-[18px] md:text-[20px] leading-[1.42] font-semibold tracking-[-0.02em] ${styles.text}`}
                >
                  {lead}
                </p>
              </div>

              {featureBadges.length ? (
                <div className="flex flex-wrap gap-2">
                  {featureBadges.map((item) => (
                    <span
                      key={item}
                      className={`inline-flex rounded-[4px] border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.05em] ${styles.chip}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </article>

        <div className={`grid grid-cols-1 gap-3 ${formatGridClasses[formatColumns]}`}>
          {formats.map((item, index) => (
            <article
              key={item.title}
              className={`group rounded-[4px] border p-4 transition-transform duration-300 hover:-translate-y-0.5 ${styles.surface}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p
                  className={`text-[18px] font-extrabold uppercase tracking-[-0.03em] leading-[1.05] transition-transform duration-300 group-hover:translate-x-0.5 ${styles.text}`}
                >
                  {item.title}
                </p>
                <span
                  className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold ${styles.count}`}
                >
                  {index + 1}
                </span>
              </div>
              <p className={`mt-2 text-[14px] leading-relaxed ${styles.body}`}>
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)]">
          <article className={`rounded-[4px] border p-4 md:p-5 ${styles.surfaceStrong}`}>
            <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
              {valueTitle}
            </p>
            <ul className="mt-3 space-y-2.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-2.5 text-[14px] leading-relaxed ${styles.text}`}
                >
                  <span
                    className={`mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${styles.bullet}`}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={`rounded-[4px] border p-4 md:p-5 ${styles.surface}`}>
            <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
              {detailsLabel}
            </p>
            <div className={`mt-3 space-y-3 text-[14px] leading-relaxed ${styles.body}`}>
              {detailParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </div>

      <aside className="space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
          {logisticsCards.map((item) => (
            <SectionInfoCard key={item.label} item={item} theme={theme} />
          ))}
        </div>

        <article className={`rounded-[4px] border p-4 ${styles.surface}`}>
          <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
            Локації проведення
          </p>
          <ul className="mt-3 space-y-2">
            {locations.map((location) => (
              <li
                key={location}
                className={`flex items-center gap-2.5 text-[14px] ${styles.text}`}
              >
                <MapPin className={`h-4 w-4 shrink-0 ${styles.icon}`} />
                <span>{location}</span>
              </li>
            ))}
          </ul>
        </article>

        {supportCards.map((item) => (
          <SectionInfoCard key={item.label} item={item} theme={theme} />
        ))}

        <article className={`rounded-[4px] border p-4 md:p-5 ${styles.contact}`}>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex h-9 w-9 items-center justify-center rounded-[4px] border ${styles.iconWrap}`}
            >
              <Phone className={`h-4.5 w-4.5 ${styles.icon}`} />
            </span>
            <div>
              <p className={`text-[11px] uppercase tracking-[0.08em] ${styles.muted}`}>
                {phoneLabel}
              </p>
              <a
                href={phoneHref}
                className={`mt-1 inline-block text-[24px] font-extrabold tracking-[-0.03em] transition-colors ${styles.phone}`}
              >
                {phoneDisplay}
              </a>
            </div>
          </div>
        </article>
      </aside>
    </div>
  )
}
