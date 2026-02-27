'use client'

import React from 'react'
import Image from 'next/image'

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
    age: '7-10 років',
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
    age: '11-14 років',
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
      className="relative overflow-hidden bg-[#ECEEEA] py-14 md:py-20"
    >
      <div className="container relative">
        <h2 className="text-[34px] md:text-[46px] font-extrabold mb-3 md:mb-4 text-[#2A2C31] uppercase tracking-[-0.02em] text-center md:text-left">
          Можливість навчатися онлайн
        </h2>
        <div className="inline-flex mb-7 md:mb-9 border border-[#79BE76] bg-[#8ED28A] px-4 md:px-5 py-2 rounded-[4px] text-[#1F2A1D] font-extrabold text-[16px] md:text-[22px] uppercase tracking-[-0.02em]">
          Комплексне онлайн-навчання для дітей
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          {onlineCards.map((card) => (
            <article
              key={card.age}
              className="overflow-hidden rounded-[10px] border border-[#2B2F39] bg-[#171A20]"
            >
              <div className="flex min-h-[74px] items-center border-b border-white/10 bg-[#2A2D35] px-5 py-3">
                <div className="flex items-center justify-between w-full gap-3">
                  <span className="inline-flex px-3 py-1 border border-white/20 rounded-[4px] text-[12px] md:text-[13px] uppercase font-semibold text-white/85">
                    {card.label}
                  </span>
                  <h3 className="text-[24px] md:text-[34px] font-extrabold leading-none tracking-[-0.03em] text-white">
                    {card.age}
                  </h3>
                </div>
              </div>

              <div className="relative h-[270px] md:h-[330px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
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

              <div className="border-t border-white/10 bg-[#232730] p-5 md:p-6">
                <ul className="space-y-2.5">
                  {card.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-start gap-2.5 text-white/88 text-[15px] md:text-[17px] leading-snug"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-7">
          <article className="overflow-hidden rounded-[10px] border border-[#2B2F39] bg-[#171A20]">
            <div className="flex min-h-[62px] items-center border-b border-white/10 bg-[#2A2D35] px-5 py-3">
              <div className="flex items-center justify-between w-full">
                <span className="inline-flex px-3 py-1 border border-white/20 rounded-[4px] text-[12px] uppercase font-semibold text-white/85">
                  формат
                </span>
                <span className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.03em] text-white">
                  ОНЛАЙН
                </span>
              </div>
            </div>
            <div className="p-5 md:p-6 bg-[#232730]">
              <ul className="space-y-2.5 text-white/88 text-[15px] md:text-[17px]">
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
          </article>

          <article className="overflow-hidden rounded-[10px] border border-[#2B2F39] bg-[#171A20]">
            <div className="flex min-h-[62px] items-center border-b border-white/10 bg-[#2A2D35] px-5 py-3">
              <div className="flex items-center justify-between w-full">
                <span className="inline-flex px-3 py-1 border border-white/20 rounded-[4px] text-[12px] uppercase font-semibold text-white/85">
                  відвідування
                </span>
                <span className="text-[22px] md:text-[28px] font-extrabold tracking-[-0.03em] text-white">
                  ГРАФІК
                </span>
              </div>
            </div>
            <div className="p-5 md:p-6 bg-[#232730]">
              <ul className="space-y-2.5 text-white/88 text-[15px] md:text-[17px]">
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                  <span>У будні: 2 рази на тиждень по 1 годині</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#78C86F]" />
                  <span>
                    1 раз на тиждень у вихідні — 2 години поспіль
                  </span>
                </li>
              </ul>
            </div>
          </article>
        </div>

        <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <article className="rounded-[10px] border border-[#2B2F39] bg-[#171A20] p-5 md:p-6">
            <div className="inline-flex px-3 py-1 rounded-[4px] border border-white/20 text-white/85 text-[12px] font-semibold uppercase">
              8 занять
            </div>
            <div className="mt-3 text-[#8ED28A] text-[34px] md:text-[44px] font-extrabold leading-none tracking-[-0.03em]">
              2800 грн
            </div>
          </article>

          <article className="relative rounded-[10px] border border-[#86CC82] bg-[#1A2220] p-5 md:p-6 shadow-[0_14px_24px_-18px_rgba(120,200,111,0.45)]">
            <div className="absolute top-3 right-3 inline-flex px-2 py-1 rounded-[4px] bg-[#8ED28A] text-[#1A2518] text-[11px] font-extrabold uppercase">
              Вигідно
            </div>
            <div className="inline-flex px-3 py-1 rounded-[4px] border border-white/25 text-white/90 text-[12px] font-semibold uppercase">
              24 заняття
            </div>
            <div className="mt-3 text-[#8ED28A] text-[34px] md:text-[44px] font-extrabold leading-none tracking-[-0.03em]">
              7140 грн
            </div>
            <div className="mt-2 inline-flex px-2.5 py-1 rounded-[4px] border border-[#8ED28A]/55 text-[#C2F0BF] text-[18px] md:text-[22px] font-extrabold leading-none">
              -20%
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default OnlineLearning
