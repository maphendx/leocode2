import { ReactNode } from 'react'

type PartnershipSectionProps = {
  id: string
  title: string
  theme: 'light' | 'dark'
  children: ReactNode
}

export default function PartnershipSection({
  id,
  title,
  theme,
  children,
}: PartnershipSectionProps) {
  const isLight = theme === 'light'

  return (
    <section
      id={id}
      className={[
        'scroll-mt-24 border-t',
        isLight
          ? 'bg-[#EEF0EC] border-black/8 text-[#212633]'
          : 'bg-[#262830] border-white/10 text-white',
      ].join(' ')}
    >
      <div className="container mx-auto px-4 py-10 md:py-14">
        <h2
          className={[
            'text-[30px] md:text-[44px] font-extrabold uppercase tracking-[-0.04em] leading-[0.9]',
            isLight ? 'text-[#1F2430]' : 'text-white',
          ].join(' ')}
        >
          {title}
        </h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  )
}

