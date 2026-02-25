'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content:
      'Завдяки курсу Python мій син став більш зосередженим та логічно мислить. Він покращив оцінки з математики та інформатики, а тепер навіть допомагає однокласникам з програмуванням.',
    author: 'Ольга Петренко',
    role: 'мама Андрія, 14 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'покращив оцінки з математики та інформатики',
    course: 'Python - легкий старт в програмуванні',
  },
  {
    id: 2,
    content:
      'Figma відкрила для нашої доньки світ дизайну. Вона стала більш самостійною, цілеспрямованою. LeoCode навчив її не боятися складних завдань і знаходити креативні рішення в дизайні.',
    author: 'Віктор Мельник',
    role: 'тато Софії, 12 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'стала більш самостійною, цілеспрямованою',
    course: 'Figma - курс для дизайнерів',
  },
  {
    id: 3,
    content:
      'Як мати, я щаслива, що син знайшов справу, яка його захоплює. На курсі з 3D-друку він навчився створювати власні моделі та друкувати їх на принтері. Тепер він мріє стати інженером!',
    author: 'Марина Коваль',
    role: 'мама Дениса, 15 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'створювати власні моделі',
    course: '3D-друк та моделювання ThinkerCad',
  },
  {
    id: 4,
    content:
      'За 3 місяці навчання дочка створила власну гру в Scratch, яку показала в школі. Після цього кілька її однокласників теж записалися на курси! Методика LeoCode дійсно працює.',
    author: 'Наталія Шевченко',
    role: 'мама Олександри, 13 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'створила власну гру в Scratch',
    course: 'Графіка та анімація в Scratch',
  },
  {
    id: 5,
    content:
      'Спочатку сумнівався, чи зможе син у 10 років освоїти програмування, але педагоги LeoCode знайшли підхід. Тепер на курсі Scratch він з нетерпінням чекає занять і вже говорить, що хоче стати розробником ігор.',
    author: 'Олександр Дмитренко',
    role: 'тато Михайла, 10 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'хоче стати розробником ігор',
    course: 'Графіка та анімація в Scratch',
  },
  {
    id: 6,
    content:
      'Курс із пілотування дронів — це щось неймовірне! Мій син у захваті. Тепер він використовує компютер для програмування польотів, а не просто для розваг. Це величезне досягнення!',
    author: 'Ірина Ковальчук',
    role: 'мама Артема, 14 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'програмування польотів',
    course: 'ДРОНИ - курс для майбутніх пілотів',
  },
  {
    id: 7,
    content:
      'Дочка відвідала безкоштовний урок Python, і я одразу помітила її зацікавленість. Після 6 місяців навчання вона виграла шкільну олімпіаду з інформатики! Вкладення в її навчання в LeoCode — найкраща інвестиція у майбутнє.',
    author: 'Тетяна Лисенко',
    role: 'мама Катерини, 15 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'виграла шкільну олімпіаду з інформатики',
    course: 'Python - легкий старт в програмуванні',
  },
]

// Enhanced SVG avatar placeholder component
const UserAvatar = () => (
  <div className=" w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EEF7E8] via-[#DFF0D8] to-[#CDE8C3]">
    <svg
      viewBox="0 0 24 24"
      className="w-3/5 h-3/5"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className="text-accent/70"
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      />
      <circle className="text-accent/80" cx="12" cy="7" r="4" />
    </svg>
  </div>
)

export default function Reviews() {
  const [visibleCount, setVisibleCount] = useState(4)

  const featuredTestimonial = testimonials[6]
  const gridTestimonials = testimonials.filter(
    (item) => item.id !== featuredTestimonial.id
  )

  const showMore = () => {
    setVisibleCount(gridTestimonials.length)
  }

  const visibleTestimonials = gridTestimonials.slice(0, visibleCount)

  return (
    <section className="lc-section-soft py-12 md:py-16" id="vidguki">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10"
        >
          <h2 className="lc-section-title mb-3 text-left">ВІДГУКИ БАТЬКІВ</h2>
          <p className="lc-section-lead text-left max-w-3xl mb-5">
            Реальні враження батьків про навчання, прогрес дітей та результати
            після занять у LEO CODE.
          </p>
          <div className="inline-flex items-center gap-2 border border-[#CFD6CC] bg-[#F7FAF4] px-3 py-2 text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.06em] text-[#2D332D] rounded-[4px]">
            <Award className="h-4 w-4 text-[#75BF6C]" />
            92% рекомендують друзям
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="border border-[#D7DDD3] bg-[linear-gradient(180deg,#F8FAF5_0%,#F2F5EE_100%)] p-5 md:p-7 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-8">
              <div className="border border-[#D7DDD3] bg-[#FBFCF9] p-4 md:p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-14 h-14 overflow-hidden rounded-full border border-[#D8E1D2]">
                    <UserAvatar />
                  </div>
                  <div>
                    <h3 className="text-[#242926] text-[18px] md:text-[20px] font-bold tracking-[-0.03em]">
                      {featuredTestimonial.author}
                    </h3>
                    <p className="text-[#5A6458] text-[13px] md:text-[14px] leading-tight">
                      {featuredTestimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(featuredTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#D5B25B] fill-[#D5B25B]"
                    />
                  ))}
                </div>

                <div className="border-t border-[#D7DDD3] pt-4">
                  <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#647064] mb-1">
                    Курс
                  </p>
                  <p className="text-[#2E342F] text-[14px] md:text-[15px] leading-tight">
                    {featuredTestimonial.course}
                  </p>
                </div>
              </div>

              <div className="border border-[#D7DDD3] bg-[#FBFCF9] p-5 md:p-6 lg:p-7 flex flex-col">
                <p className="text-[#2B312D]/90 text-[17px] md:text-[20px] lg:text-[22px] leading-[1.18] tracking-[-0.02em]">
                  {featuredTestimonial.content.split(featuredTestimonial.highlight)[0]}
                  <span className="font-semibold text-[#6BBF63]">
                    {featuredTestimonial.highlight}
                  </span>
                  {featuredTestimonial.content.split(featuredTestimonial.highlight)[1]}
                </p>

                <div className="mt-auto pt-5 md:pt-6 border-t border-[#D7DDD3] flex items-center justify-between gap-4">
                  <span className="text-[12px] md:text-[13px] uppercase tracking-[0.08em] font-semibold text-[#424A42]">
                    Реальний відгук батьків
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] md:text-[13px] uppercase tracking-[0.08em] font-semibold text-[#5A6957]">
                    <Sparkles className="h-3.5 w-3.5 text-[#78C86F]" />
                    Результат
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-8">
          {visibleTestimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="h-full"
            >
              <div className="h-full border border-[#D7DDD3] bg-[#FBFCF9] p-4 md:p-5 lg:p-6 transition-colors duration-300 hover:border-[#B8CDB0]">
                <div className="flex items-start gap-3 md:gap-4 mb-4">
                  <div className="relative w-12 h-12 overflow-hidden rounded-full border border-[#D8E1D2] shrink-0">
                    <UserAvatar />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[#262C28] font-bold text-[16px] md:text-[17px] tracking-[-0.02em]">
                      {item.author}
                    </h4>
                    <p className="text-[#5B655A] text-[12px] md:text-[13px] leading-tight">
                      {item.role}
                    </p>
                    <div className="flex gap-1 mt-1.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 text-[#D5B25B] fill-[#D5B25B]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[#2C312D]/85 text-[14px] md:text-[15px] leading-[1.2] mb-4 md:mb-5">
                  {item.content.split(item.highlight)[0]}
                  <span className="font-semibold text-[#69BB62]">
                    {item.highlight}
                  </span>
                  {item.content.split(item.highlight)[1]}
                </p>

                <div className="mt-auto pt-3 md:pt-4 border-t border-[#D7DDD3] flex items-center justify-between gap-3">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#627062]">
                    {item.course}
                  </span>
                  <Sparkles className="h-3.5 w-3.5 text-[#78C86F] shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {visibleCount < gridTestimonials.length && (
          <div className="text-center mt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={showMore}
              className="mx-auto inline-flex items-center justify-center h-12 px-6 bg-[#78C86F] text-[#1C241A] font-extrabold uppercase tracking-[-0.02em] rounded-[4px] border border-[#72BA69] hover:bg-[#86D17C] transition-colors duration-200"
            >
              Показати більше
            </motion.button>
          </div>
        )}
      </div>
    </section>
  )
}
