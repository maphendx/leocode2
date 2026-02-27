'use client'

import React from 'react'

type InfoCardProps = {
  label?: string
  title: string
  items: string[]
  className?: string
}

const InfoCard = ({ label, title, items, className = '' }: InfoCardProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <div className="mb-2 inline-flex items-center border border-[#86CC82] bg-[#F7FBF5] px-3 py-1 text-[14px] md:text-[15px] font-medium leading-none text-[#303430] rounded-[3px] shadow-[0_2px_0_rgba(134,204,130,0.18)]">
        {label}
      </div>
    )}
    <div className="border border-[#86CC82] bg-[#F4F5F1]/97 rounded-[4px] px-5 py-4 shadow-[0_10px_24px_-22px_rgba(41,42,44,0.28)]">
      <div className="mb-3 inline-flex bg-[#8ED28A] text-[#121612] font-extrabold uppercase tracking-[-0.04em] px-4 py-1 rounded-[3px] text-[18px] md:text-[20px]">
        {title}
      </div>
      <div className="divide-y divide-[#D0D4CB]">
        {items.map((item) => (
          <p
            key={item}
            className="py-2 text-[#262A27] text-[17px] md:text-[20px] leading-[1.12] tracking-[-0.025em]"
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  </div>
)

const PriceCard = ({
  lessons,
  price,
  discount,
  featured = false,
}: {
  lessons: string
  price: string
  discount?: string
  featured?: boolean
}) => (
  <div
    className={`text-center relative ${
      featured
        ? 'border border-[#86CC82] bg-[#F5F8F2] rounded-[6px] px-4 py-4 shadow-[0_18px_36px_-28px_rgba(41,42,44,0.45)]'
        : ''
    }`}
  >
    {featured && (
      <div className="absolute -top-3 right-3 inline-flex items-center bg-[#22262B] text-white text-[11px] md:text-xs font-bold uppercase tracking-[0.08em] px-2 py-1 rounded-[2px]">
        Вигідно
      </div>
    )}
    <div
      className={`inline-flex items-center border border-[#86CC82] bg-[#F7FBF5] px-3 py-1 leading-none text-[#2F342F] rounded-[3px] ${
        featured
          ? 'text-[15px] md:text-[18px] font-semibold'
          : 'text-[14px] md:text-[16px]'
      }`}
    >
      {lessons}
    </div>
    <div className="mt-2 inline-flex flex-col items-center">
      <div
        className={`inline-flex bg-[#8ED28A] text-black font-extrabold tracking-[-0.05em] leading-none rounded-[4px] shadow-[0_5px_0_rgba(90,151,86,0.2)] ${
          featured
            ? 'text-[34px] md:text-[52px] px-5 py-2.5 border border-[#79BE76]'
            : 'text-[28px] md:text-[38px] px-4 py-2'
        }`}
      >
        {price}
      </div>
      {discount && (
        <div
          className={`mt-1 inline-flex border border-[#86CC82] bg-[#F7FBF5] text-black font-extrabold leading-none rounded-[3px] ${
            featured
              ? 'tracking-[-0.05em] text-[30px] md:text-[40px] px-4 py-1.5 shadow-[0_4px_0_rgba(134,204,130,0.18)]'
              : 'tracking-[-0.035em] text-[22px] md:text-[28px] px-3 py-1'
          }`}
        >
          {discount}
        </div>
      )}
    </div>
  </div>
)

const OnlineLearning = () => {
  return (
    <section
      id="online-learning"
      className="relative overflow-hidden py-14 md:py-20"
    >
      <div className="container relative">
        <div className="mx-auto w-full">
          <h2 className="mb-8 md:mb-10 text-left text-[30px] md:text-[42px] font-extrabold uppercase tracking-[-0.04em] leading-[0.98] text-[#2A2C31]">
            МОЖЛИВІСТЬ НАВЧАТИСЯ ОНЛАЙН
          </h2>

          <div className="mb-6 md:mb-8 bg-[#8ED28A] px-5 py-4 md:py-5 text-center rounded-[2px] border border-[#79BE76] shadow-[0_8px_20px_-18px_rgba(41,42,44,0.45)]">
            <h3 className="text-[#22262B] text-[24px] md:text-[34px] font-extrabold uppercase tracking-[-0.03em] leading-[0.95]">
              Комплексне онлайн - навчання для дітей
            </h3>
          </div>

          <div className="relative rounded-[4px] border border-[#D4D9D1] bg-[linear-gradient(180deg,#EDF2EA_0%,#F4F6F1_40%,#EEF4EA_100%)] px-4 py-5 md:px-8 md:py-8 shadow-[0_18px_34px_-28px_rgba(41,42,44,0.35)]">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute left-[-24px] top-[40px] h-[160px] w-[120px] rounded-[60px] border-2 border-black/55 border-r-0 border-b-0" />
              <div className="absolute right-[-24px] top-[22px] h-[90px] w-[90px] rounded-full border-2 border-black/60 border-l-0 border-b-0" />
              <div className="absolute left-[-36px] bottom-[36px] h-[180px] w-[110px] rounded-[80px] border-2 border-black/70 border-r-0" />
              <div className="absolute right-[-10px] bottom-[86px] h-[120px] w-[120px] rounded-full border-2 border-black/60" />
              <div className="absolute right-[30px] bottom-[-20px] h-[120px] w-[180px] rounded-[48px] border-2 border-[#8ED28A] border-t-0" />
              <div className="absolute left-[24%] top-[20%] h-[220px] w-[220px] rounded-full bg-[#DFF0D8]/55 blur-3xl" />
              <div className="absolute right-[18%] bottom-[12%] h-[220px] w-[220px] rounded-full bg-[#DDEDD6]/65 blur-3xl" />
            </div>

            <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <InfoCard
                label="для дітей"
                title="7-10 років"
                items={[
                  "Комп'ютерна грамотність",
                  'Дизайн у Canva (комікс)',
                  '3D-моделювання у Tinkercad',
                  'Програмування та створення ігор у Scratch',
                ]}
              />

              <InfoCard
                label="для підлітків"
                title="11-14 років"
                items={[
                  'Дизайн у Canva (брендбук)',
                  'Прототипування у Figma',
                  '3D-моделювання у Tinkercad',
                  'Програмування та створення сайту HTML/CSS',
                ]}
              />

              <InfoCard
                label="формат"
                title="ОНЛАЙН"
                items={[
                  '24 заняття по 1 годині',
                  'Тривалість курсу - 3 місяці',
                  'До 12 дітей у групі',
                ]}
              />

              <InfoCard
                label="відвідування"
                title="ГРАФІК"
                items={[
                  'У будні: 2 рази на тиждень по 1 годині',
                  '1 раз на тиждень у вихідні — 2 години поспіль',
                ]}
              />
            </div>

            <div className="relative z-[1] mt-7 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
              <PriceCard lessons="8 занять" price="2800 грн" />
              <PriceCard
                lessons="24 заняття"
                price="7140 грн"
                discount="-20%"
                featured
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OnlineLearning
