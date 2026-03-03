'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type OnlineCard = {
  label: string
  title: string
  age: string
  image: string
  skills: string[]
}

const onlineCards: OnlineCard[] = [
  {
    label: 'для дітей',
    title: 'Онлайн програма для дітей',
    age: '7-15 років',
    image: '/images/scratch.jpeg',
    skills: [
      "Комп'ютерна грамотність",
      'Дизайн у Canva (комікс)',
      '3D-моделювання у Tinkercad',
      'Програмування та створення ігор у Scratch',
    ],
  },
  {
    label: 'для підлітків',
    title: 'Онлайн програма для підлітків',
    age: '7-15 років',
    image: '/images/figma.jpeg',
    skills: [
      'Дизайн у Canva (брендбук)',
      'Прототипування у Figma',
      '3D-моделювання у Tinkercad',
      'Створення сайту HTML/CSS',
    ],
  },
]

const OnlineLearning = () => {
  return (
    <section
      id="online-learning"
      className="relative overflow-hidden bg-[#ECEEEA] py-10 md:py-12"
    >
      <div className="container relative z-10 px-4 mx-auto">
        <motion.div
          className="mb-6 md:mb-7"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="lc-section-title mb-3">МОЖЛИВІСТЬ НАВЧАТИСЯ ОНЛАЙН</h2>
          <motion.div
            className="inline-flex items-center gap-2 border border-[#79BE76] bg-[#8ED28A] px-4 md:px-5 py-2 rounded-[4px] text-[#1F2A1D] font-extrabold text-[13px] md:text-[14px] uppercase tracking-[0.04em]"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.42,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Комплексне онлайн-навчання
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {onlineCards.map((card, index) => (
            <motion.article
              key={card.title}
              className="group h-full overflow-hidden rounded-[10px] border border-[#2B2F39] bg-[#171A20] flex flex-col"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{
                duration: 0.48,
                delay: index * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="border-b border-white/10 bg-[#2A2D35] px-4 md:px-5 py-2.5 md:py-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-flex px-3 py-1 border border-white/20 rounded-[4px] text-[12px] md:text-[13px] uppercase font-semibold text-white/85">
                      {card.label}
                    </span>
                    <p className="mt-1.5 text-[14px] md:text-[15px] font-bold leading-tight text-white/92 tracking-[-0.01em]">
                      {card.title}
                    </p>
                  </div>
                  <h3 className="shrink-0 text-[22px] md:text-[30px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    {card.age}
                  </h3>
                </div>
              </div>

              <div className="relative h-[190px] md:h-[220px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/8 to-black/24" />
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <div className="flex items-center justify-between rounded-[8px] border border-white/8 bg-[#171A20]/78 px-3 py-2 backdrop-blur-sm">
                    <span className="text-[11px] font-bold uppercase tracking-[0.03em] text-white/85">
                      Онлайн
                    </span>
                    <span className="text-[11px] text-white/70">
                      24 заняття / 3 місяці
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 border-t border-white/10 bg-[#232730] p-4 md:p-5 lg:p-5">
                <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/65 mb-3">
                  Що входить у програму
                </p>
                <ul className="space-y-2 md:space-y-2.5 md:grid md:grid-cols-2 md:gap-x-4">
                  {card.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2.5 text-white/88 text-[14px] md:text-[15px] leading-snug"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-4 md:mt-5"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <article className="overflow-hidden rounded-[10px] border border-[#2B2F39] bg-[#171A20]">
            <div className="flex min-h-[56px] items-center border-b border-white/10 bg-[#2A2D35] px-4 md:px-5 py-2.5">
              <div className="flex items-center justify-between w-full">
                <span className="inline-flex px-3 py-1 border border-white/20 rounded-[4px] text-[12px] uppercase font-semibold text-white/85">
                  формат, графік та вартість
                </span>
                <span className="text-[20px] md:text-[24px] font-extrabold tracking-[-0.03em] text-white">
                  ОНЛАЙН
                </span>
              </div>
            </div>

            <div className="bg-[#232730]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-4 md:p-5 lg:pr-6">
                  <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/65 mb-3">
                    Формат
                  </p>
                  <ul className="space-y-2 text-white/88 text-[14px] md:text-[15px]">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>24 заняття по 1 годині</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>Тривалість курсу — 3 місяці</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>До 12 дітей у групі</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 md:p-5 lg:pl-6 border-t border-white/10 lg:border-t-0 lg:border-l lg:border-white/10">
                  <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/65 mb-3">
                    Графік
                  </p>
                  <ul className="space-y-2 text-white/88 text-[14px] md:text-[15px]">
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>У будні: 2 рази на тиждень по 1 годині</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>1 раз на тиждень у вихідні — 2 години поспіль</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-white/10 p-4 md:p-5">
                <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/65 mb-3">
                  Ціни
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div
                    className="rounded-[8px] border border-white/10 bg-[#171A20] p-4"
                    whileHover={{ y: -2, scale: 1.01 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="inline-flex px-3 py-1 rounded-[4px] border border-white/20 text-white/85 text-[12px] font-semibold uppercase">
                      8 занять
                    </div>
                    <div className="mt-3 text-[#8ED28A] text-[30px] md:text-[34px] font-extrabold leading-none tracking-[-0.03em]">
                      2800 грн
                    </div>
                  </motion.div>

                  <motion.div
                    className="rounded-[8px] border border-[#86CC82] bg-[#1A2220] p-4"
                    whileHover={{ y: -2, scale: 1.01 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="inline-flex px-3 py-1 rounded-[4px] border border-white/25 text-white/90 text-[12px] font-semibold uppercase">
                        24 заняття
                      </div>
                      <div className="inline-flex px-2 py-1 rounded-[4px] bg-[#8ED28A] text-[#1A2518] text-[11px] font-extrabold uppercase">
                        Вигідно
                      </div>
                    </div>
                    <div className="mt-3 text-[#8ED28A] text-[30px] md:text-[34px] font-extrabold leading-none tracking-[-0.03em]">
                      7140 грн
                    </div>
                    <div className="mt-2 inline-flex px-2.5 py-1 rounded-[4px] border border-[#8ED28A]/55 text-[#C2F0BF] text-[16px] font-extrabold leading-none">
                      -20%
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  )
}

export default OnlineLearning
