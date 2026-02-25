'use client'

import Link from 'next/link'
import Image from 'next/image'

const Partnership = () => {
  return (
    <section
      id="partnerstvo"
      className="relative overflow-hidden bg-[#262830] py-14 md:py-20 min-h-[100svh] flex items-center"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_35%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-white/5" />
        <div className="absolute top-0 left-0 h-px w-full bg-white/5" />
      </div>

      <div className="container relative z-[1]">
        <div className="mx-auto w-full">
          <h2 className="mb-6 md:mb-8 text-white text-[28px] md:text-[44px] font-extrabold uppercase tracking-[-0.04em] leading-none">
            ПАРТНЕРСТВО
          </h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-5">
            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[220px] grid-cols-1 md:min-h-[280px] lg:min-h-[340px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[190px] lg:order-1">
                  <Image
                    src="/images/course.jpeg"
                    alt="Майстер класи для шкіл"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-5 md:p-6 lg:p-7 lg:order-2">
                  <h3 className="text-white text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Майстер класи для шкіл
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[220px] grid-cols-1 md:min-h-[280px] lg:min-h-[340px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[190px] lg:order-1">
                  <Image
                    src="/images/course.jpeg"
                    alt="Науковий Квест"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-5 md:p-6 lg:p-7 lg:order-2">
                  <h3 className="text-white text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Науковий Квест
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[220px] grid-cols-1 md:min-h-[280px] lg:min-h-[340px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative flex items-start p-4 sm:p-5 md:p-6 lg:p-7 lg:order-1">
                  <h3 className="text-white text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Наукові ярмарки
                  </h3>
                </div>
                <div className="relative min-h-[190px] lg:order-2">
                  <Image
                    src="/images/course.jpeg"
                    alt="Наукові ярмарки"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[220px] grid-cols-1 md:min-h-[280px] lg:min-h-[340px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative flex items-start p-4 sm:p-5 md:p-6 lg:p-7 lg:order-1">
                  <h3 className="text-white text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Воркшопи
                  </h3>
                </div>
                <div className="relative min-h-[190px] lg:order-2">
                  <Image
                    src="/images/course.jpeg"
                    alt="Воркшопи"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-6 flex justify-center">
            <Link
              href="/maister-klasy"
              className="inline-flex items-center justify-center min-w-[220px] h-12 px-6 bg-[#7DCC72] text-[#1B1F16] font-extrabold uppercase tracking-[-0.02em] rounded-[4px] hover:bg-[#8dd882] transition-colors duration-200"
            >
              Детальніше
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership
