import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative min-h-screen overflow-hidden bg-[#1E222B] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
      >
        <div className="absolute -left-24 top-[-120px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(125,204,114,0.24)_0%,rgba(125,204,114,0)_70%)]" />
        <div className="absolute right-[-120px] bottom-[-140px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(120,200,111,0.18)_0%,rgba(120,200,111,0)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0)_34%,rgba(255,255,255,0.03)_100%)]" />
      </div>

      <div className="container relative z-10 flex min-h-screen items-center justify-center px-4 py-10 md:py-14">
        <section className="w-full max-w-[920px] rounded-[10px] border border-white/10 bg-[#262A33]/90 p-5 shadow-[0_30px_90px_-38px_rgba(10,12,18,0.78)] backdrop-blur-[2px] sm:p-7 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5 md:pb-6">
            <div className="relative h-10 w-[150px] sm:h-11 sm:w-[170px]">
              <Image
                src="/new_logo.svg"
                alt="LEOCODE"
                fill
                priority
                sizes="170px"
                className="object-contain object-left"
              />
            </div>
            <span className="inline-flex rounded-[4px] border border-[#7DCC72]/45 bg-[#7DCC72]/16 px-3 py-1 text-[12px] font-extrabold uppercase tracking-[0.06em] text-[#B6EDAF]">
              Error 404
            </span>
          </div>

          <div className="mt-6 md:mt-8">
            <p className="text-[clamp(42px,9vw,110px)] font-black uppercase leading-[0.86] tracking-[-0.04em] text-[#89DA80]">
              404
            </p>
            <h1 className="mt-2 text-[clamp(28px,4vw,52px)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-white">
              Сторінку Не Знайдено
            </h1>
            <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.65] text-white/72 sm:text-[16px]">
              Посилання може бути застарілим або сторінку було переміщено. Поверніться
              на головну і оберіть потрібний розділ.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-[4px] bg-[#7DCC72] px-6 text-[14px] font-extrabold uppercase tracking-[-0.01em] text-[#1B2218] transition-colors duration-200 hover:bg-[#8BD481]"
              >
                На Головну
              </Link>
              <Link
                href="/#napryamki"
                className="inline-flex h-11 items-center justify-center rounded-[4px] border border-white/18 bg-white/[0.03] px-6 text-[14px] font-bold uppercase tracking-[-0.01em] text-white/92 transition-colors duration-200 hover:bg-white/[0.07]"
              >
                Перейти До Курсів
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
