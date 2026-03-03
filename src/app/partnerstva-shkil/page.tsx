import Header from '@/components/Header'
import Footer from '@/components/Footer'
import NaukoviYarmarkySection from '@/components/partnerstva/NaukoviYarmarkySection'
import VorkshopySection from '@/components/partnerstva/VorkshopySection'
import NaukovyiKvestSection from '@/components/partnerstva/NaukovyiKvestSection'
import MaisterKlasySection from '@/components/partnerstva/MaisterKlasySection'

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

        <NaukoviYarmarkySection />
        <VorkshopySection />
        <NaukovyiKvestSection />
        <MaisterKlasySection />
      </main>
      <Footer />
    </>
  )
}
