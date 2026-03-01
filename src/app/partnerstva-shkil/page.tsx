import Header from '@/components/Header'
import Footer from '@/components/Footer'

const schoolPartnershipSections = [
  {
    id: 'naukovi-yarmarky',
    label: 'НАУКОВІ ЯРМАРКИ',
  },
  {
    id: 'vorkshopy',
    label: 'ВОРКШОПИ',
  },
  {
    id: 'naukovyi-kvest',
    label: 'НАУКОВИЙ КВЕСТ',
  },
  {
    id: 'maister-klasy',
    label: 'МАЙСТЕР КЛАСИ',
  },
]

const sectionContent: Record<
  string,
  {
    lead?: string
    orderedList?: string[]
    bulletList?: string[]
  }
> = {
  'naukovi-yarmarky': {
    lead: 'Партнерство з LeoCode — додаткова цінність для школи',
    orderedList: [
      'Підсилення іміджу школи як сучасного освітнього простору, що інтегрує інновації.',
      'Розширення STEM-напрямку через практичний досвід у сфері дронів та 3D-технологій.',
      'Підвищення залученості учнів завдяки інтерактивному формату заходу.',
      'Формування профорієнтаційного інтересу до IT та інженерних професій.',
      'Додатковий інформаційний привід для комунікації з батьками та посилення довіри до школи.',
    ],
  },
  'naukovyi-kvest': {
    lead: 'Науково квест від LeoCode',
    bulletList: [
      'Інтерактивна STEM-екскурсія, що поєднує 3D-друк, дизайн у Canva та дрон-технології в одному форматі.',
      'Практичний досвід для кожного учня: створення постера, складання дрона, керування у симуляторі та реальний політ.',
      'Розвиток цифрових, інженерних і креативних навичок через навчання у форматі гри.',
      'Готовий організований формат для класу (20-30 учнів, 1,5-2 години).',
      'Сертифікати учасників та 3D-подарунок кожній дитині.',
    ],
  },
}

export default function SchoolPartnershipPage() {
  return (
    <>
      <Header />
      <main className="bg-[#262830]">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/main-poster.jpg"
              alt="Leo Code"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>

          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/main-poster.jpg"
          >
            <source src="/video.mp4" type="video/mp4" />
            <source src="/video.webm" type="video/webm" />
          </video>

          <div className="absolute inset-0 bg-[#15181F]/58" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.2)_45%,rgba(0,0,0,0.6)_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-65">
            <div className="absolute top-0 left-1/2 h-full w-px bg-white/8" />
            <div className="absolute top-0 left-0 h-px w-full bg-white/8" />
          </div>

          <div className="relative z-10 flex min-h-[100svh] flex-col">
            <div className="flex flex-1 items-center justify-center px-4">
              <h1 className="max-w-5xl text-center text-white text-[42px] sm:text-[54px] md:text-[72px] font-extrabold uppercase tracking-[-0.05em] leading-[0.92]">
                НАШІ ПАРТНЕРСТВА
                <br />
                ЗІ ШКОЛАМИ
              </h1>
            </div>

            <div className="mt-auto border-t border-white/10 bg-[#23262E]/92">
              <div className="grid w-full grid-cols-4">
                {schoolPartnershipSections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group relative flex min-h-[84px] md:min-h-[98px] items-center justify-center border-r border-white/10 px-2 text-center last:border-r-0 transition-colors hover:bg-white/5"
                  >
                    <span className="text-white/92 text-[14px] sm:text-[17px] md:text-[27px] font-extrabold uppercase tracking-[-0.03em] leading-[0.92]">
                      {item.label}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-[#7DCC72] transition-transform duration-300 group-hover:scale-x-100" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="container mx-auto space-y-5 md:space-y-6 px-4">
            {schoolPartnershipSections.map((item) => (
              <section
                key={item.id}
                id={item.id}
                className="rounded-[8px] border border-white/10 bg-[#2A2D35] p-5 md:p-7 scroll-mt-24"
              >
                <h2 className="mb-3 text-white text-[30px] md:text-[44px] font-extrabold uppercase tracking-[-0.04em] leading-[0.9]">
                  {item.label}
                </h2>
                {sectionContent[item.id]?.lead ? (
                  <p className="text-white/90 text-[17px] md:text-[21px] leading-relaxed font-semibold">
                    {sectionContent[item.id].lead}
                  </p>
                ) : (
                  <>
                    <p className="text-white/80 text-[16px] md:text-[19px] leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <p className="mt-3 text-white/72 text-[15px] md:text-[17px] leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </p>
                  </>
                )}

                {sectionContent[item.id]?.orderedList && (
                  <ol className="mt-4 space-y-2.5 list-decimal pl-5 text-white/82 text-[15px] md:text-[17px] leading-relaxed">
                    {sectionContent[item.id].orderedList!.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ol>
                )}

                {sectionContent[item.id]?.bulletList && (
                  <ul className="mt-4 space-y-2.5 list-disc pl-5 text-white/82 text-[15px] md:text-[17px] leading-relaxed">
                    {sectionContent[item.id].bulletList!.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
