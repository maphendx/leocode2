import { ReactNode } from 'react'

type PartnershipSectionProps = {
  id: string
  title: string
  theme: 'light' | 'dark'
  sectionNumber: string
  children: ReactNode
}

export default function PartnershipSection({
  id,
  title,
  theme,
  sectionNumber,
  children,
}: PartnershipSectionProps) {
  const isLight = theme === 'light'

  return (
    <section
      id={id}
      className={[
        'relative overflow-hidden scroll-mt-24 border-t',
        isLight
          ? 'bg-[#EEF0EC] border-black/8 text-[#212633]'
          : 'bg-[#262830] border-white/10 text-white',
      ].join(' ')}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={[
            'absolute inset-0',
            isLight
              ? 'bg-[radial-gradient(circle_at_top_right,rgba(125,204,114,0.16),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.08)_0%,transparent_32%)]'
              : 'bg-[radial-gradient(circle_at_top_left,rgba(125,204,114,0.14),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,transparent_34%)]',
          ].join(' ')}
        />
        <div
          className={[
            'absolute top-0 left-0 h-px w-full',
            isLight ? 'bg-black/7' : 'bg-white/7',
          ].join(' ')}
        />
        <div
          className={[
            'absolute top-0 right-[12%] h-full w-px',
            isLight ? 'bg-black/5' : 'bg-white/5',
          ].join(' ')}
        />
      </div>

      <div className="container relative z-[1] mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-[120px_minmax(0,1fr)] lg:items-end">
          <div className="flex items-center gap-3 lg:block">
            <p
              className={[
                'text-[34px] md:text-[48px] font-extrabold tracking-[-0.05em] leading-none',
                isLight ? 'text-[#223128]/70' : 'text-white/42',
              ].join(' ')}
            >
              {sectionNumber}
            </p>
            <div
              className={[
                'mt-0 lg:mt-4 h-px flex-1 lg:w-14',
                isLight ? 'bg-black/12' : 'bg-white/12',
              ].join(' ')}
            />
          </div>

          <div>
            <p
              className={[
                'text-[11px] uppercase tracking-[0.12em]',
                isLight ? 'text-[#54604F]' : 'text-white/55',
              ].join(' ')}
            >
              Партнерський формат LeoCode
            </p>
            <h2
              className={[
                'mt-2 text-[32px] md:text-[48px] font-extrabold uppercase tracking-[-0.05em] leading-[0.9]',
                isLight ? 'text-[#1F2430]' : 'text-white',
              ].join(' ')}
            >
              {title}
            </h2>
          </div>
        </div>

        <div className="mt-7 md:mt-9">{children}</div>
      </div>
    </section>
  )
}
