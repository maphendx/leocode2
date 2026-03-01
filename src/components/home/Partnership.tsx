'use client'

import Link from 'next/link'
import Image from 'next/image'

const Partnership = () => {
  return (
    <section
      id="partnerstvo"
      className="relative overflow-hidden bg-[#262830] py-11 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_35%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-white/5" />
        <div className="absolute top-0 left-0 h-px w-full bg-white/5" />
      </div>

      <div className="container relative z-[1]">
        <div className="mx-auto w-full">
          <div className="mb-6 md:mb-8 rounded-[8px] border border-white/10 bg-[#2A2D35]/70 p-4 sm:p-5 md:p-6">
            <div className="grid gap-3 md:gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <h2 className="text-white text-[28px] md:text-[42px] font-extrabold uppercase tracking-[-0.04em] leading-none">
                ПАРТНЕРСТВО
              </h2>
              <div className="space-y-2.5 md:space-y-3 lg:border-l lg:border-white/10 lg:pl-6">
                <p className="text-white/88 text-[16px] md:text-[19px] leading-relaxed">
                  LeoCode активно співпрацює з державними навчальними
                  закладами, щоб зробити технологічну освіту доступною для
                  дітей.
                </p>
                <p className="text-white/82 text-[15px] md:text-[17px] leading-relaxed">
                  Наша мета — доповнити шкільну програму практичними навичками з
                  програмування, 3D-моделювання та дронів, надихаючи учнів на
                  вибір технологічних професій.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[155px] lg:order-1">
                  <Image
                    src="/images/course.jpeg"
                    alt="Майстер класи для шкіл"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-2">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Майстер класи для шкіл
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[155px] lg:order-1">
                  <Image
                    src="/images/course.jpeg"
                    alt="Науковий Квест"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-2">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Науковий Квест
                  </h3>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px]">
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-1">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Наукові ярмарки
                  </h3>
                </div>
                <div className="relative min-h-[155px] lg:order-2">
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
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-1">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[10ch]">
                    Воркшопи
                  </h3>
                </div>
                <div className="relative min-h-[155px] lg:order-2">
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
              href="/partnerstva-shkil"
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
