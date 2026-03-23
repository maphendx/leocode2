'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Partnership = () => {
  return (
    <section
      id="partnerstvo"
      className="relative overflow-hidden bg-[#262830] py-11 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_35%,transparent_100%)]" />
        <div className="absolute top-0 left-0 h-px w-full bg-white/5" />
      </div>

      <div className="container relative z-[1]">
        <div className="mx-auto w-full">
          <motion.div
            className="mb-6 md:mb-8 rounded-[8px] border border-white/10 bg-[#2A2D35]/70 p-4 sm:p-5 md:p-6"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-3 md:gap-4 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
              <h2 className="text-white text-[28px] md:text-[42px] font-extrabold uppercase tracking-[-0.04em] leading-none">
                ПАРТНЕРСТВО
              </h2>
              <div className="max-w-[64ch] space-y-3 md:space-y-3.5 lg:border-l lg:border-white/10 lg:pl-6">
                <p className="text-white/88 text-[16px] md:text-[18px] leading-[1.55]">
                  <strong className="font-extrabold text-white">LeoCode</strong>{' '}
                  активно співпрацює з{' '}
                  <strong className="font-semibold text-white">
                    державними навчальними закладами
                  </strong>
                  , щоб зробити{' '}
                  <strong className="font-semibold text-white">
                    технологічну освіту доступною для дітей
                  </strong>
                  .
                </p>
                <p className="text-white/80 text-[16px] md:text-[18px] leading-[1.55]">
                  Наша мета —{' '}
                  <strong className="font-semibold text-white">
                    доповнити шкільну програму практичними навичками
                  </strong>{' '}
                  з <strong className="font-semibold text-white">програмування</strong>,{' '}
                  <strong className="font-semibold text-white">3D-моделювання</strong> та{' '}
                  <strong className="font-semibold text-white">дронів</strong>, надихаючи учнів на
                  вибір <strong className="font-semibold text-white">технологічних професій</strong>.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
            <motion.div
              className="group relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[155px] lg:order-1">
                  <Image
                    src="/mk/mk2.JPG"
                    alt="Майстер класи для шкіл"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-2">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[14ch] md:max-w-[10ch] transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="relative inline-block pb-1">
                      Майстер класи для шкіл
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.92)_40%,rgba(152,207,147,0.48)_100%)] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </span>
                  </h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[1.06fr_0.94fr]">
                <div className="relative min-h-[155px] lg:order-1">
                  <Image
                    src="/images/quest/quest1.jpeg"
                    alt="Науковий Квест"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <div className="relative flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-2">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[14ch] md:max-w-[10ch] transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="relative inline-block pb-1">
                      Науковий Квест
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.92)_40%,rgba(152,207,147,0.48)_100%)] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </span>
                  </h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative order-2 flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-1">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[14ch] md:max-w-[10ch] transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="relative inline-block pb-1">
                      Наукові ярмарки
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.92)_40%,rgba(152,207,147,0.48)_100%)] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </span>
                  </h3>
                </div>
                <div className="relative order-1 min-h-[155px] lg:order-2">
                  <Image
                    src="/images/yarmarka/yar_1.jpg"
                    alt="Наукові ярмарки"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="group relative overflow-hidden border border-white/8 bg-[#2a2c35] rounded-[4px] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative grid min-h-[200px] grid-cols-1 md:min-h-[245px] lg:min-h-[285px] lg:grid-cols-[0.94fr_1.06fr]">
                <div className="relative order-2 flex items-start p-4 sm:p-4 md:p-5 lg:p-5 lg:order-1">
                  <h3 className="text-white text-[23px] sm:text-[25px] md:text-[28px] lg:text-[32px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95] max-w-[14ch] md:max-w-[10ch] transition-transform duration-300 group-hover:translate-x-0.5">
                    <span className="relative inline-block pb-1">
                      Воркшопи
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.92)_40%,rgba(152,207,147,0.48)_100%)] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </span>
                  </h3>
                </div>
                <div className="relative order-1 min-h-[155px] lg:order-2">
                  <Image
                    src="/images/course.jpeg"
                    alt="Воркшопи"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-5 md:mt-6 flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/partnerstva-shkil"
              className="inline-flex items-center justify-center min-w-[220px] h-12 px-6 bg-[#7DCC72] text-[#1B1F16] font-extrabold uppercase tracking-[-0.02em] rounded-[4px] hover:bg-[#8BC886] transition hover:scale-[1.02] transform duration-300"
            >
              Детальніше
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Partnership
