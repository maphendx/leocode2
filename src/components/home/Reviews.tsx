'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Sparkles, Award } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    content:
      "Після першого місяця син став спокійніше ставитися до складних задач і почав сам просити дати йому додаткові вправи. У школі з інформатики впевненіше відповідає на уроках, а вдома менше часу витрачає \"впусту\" за комп'ютером.",
    author: 'Ольга П.',
    role: 'мама Андрія, 14 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'впевненіше відповідає на уроках',
    course: 'Python',
  },
  {
    id: 2,
    content:
      'Донька записалась на Figma, бо любить малювати. Сподобалось, що на заняттях є чітка структура і домашні завдання з перевіркою. За два місяці зробила перший макет сайту для шкільного проєкту.',
    author: 'Віктор М.',
    role: 'тато Софії, 12 років',
    avatar: 'user-avatar',
    rating: 4,
    highlight: 'перший макет сайту',
    course: 'Figma',
  },
  {
    id: 3,
    content:
      "На 3D-моделюванні сину зайшло, що все практично: придумав модель, підготував і одразу побачив результат на друці. Раніше швидко втрачав інтерес, а тут тримається в процесі до кінця заняття.",
    author: 'Марина К.',
    role: 'мама Дениса, 15 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'бачив результат на друці',
    course: '3D-моделювання',
  },
  {
    id: 4,
    content:
      'Спочатку доньці було складно з логікою в Scratch, але викладач нормально пояснив по кроках. Зараз вже робить свої невеликі ігри і просить додаткові матеріали для практики.',
    author: 'Наталія Ш.',
    role: 'мама Олександри, 13 років',
    avatar: 'user-avatar',
    rating: 4,
    highlight: 'робить свої невеликі ігри',
    course: 'Scratch',
  },
  {
    id: 5,
    content:
      'Для нас важливо було, щоб група була невелика і дитині приділяли увагу. У цьому плані все ок: син не губиться, ставить питання і реально чекає наступного заняття.',
    author: 'Олександр Д.',
    role: 'тато Михайла, 10 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'дитині приділяли увагу',
    course: 'Scratch',
  },
  {
    id: 6,
    content:
      'Курс дронів вибрали через інтерес до техніки. Син почав більше цікавитись безпекою польотів і налаштуванням обладнання. Є хороший баланс теорії і практики.',
    author: 'Ірина К.',
    role: 'мама Артема, 14 років',
    avatar: 'user-avatar',
    rating: 4,
    highlight: 'баланс теорії і практики',
    course: 'Дрони',
  },
  {
    id: 7,
    content:
      "Ходимо третій місяць. Після занять дитина показує, що зробила, і може пояснити логіку своїх рішень простими словами. Для мене це головний показник, що навчання йде не \"для галочки\".",
    author: 'Тетяна Л.',
    role: 'мама Катерини, 15 років',
    avatar: 'user-avatar',
    rating: 5,
    highlight: 'може пояснити логіку своїх рішень',
    course: 'Python',
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

  const featuredTestimonial = testimonials[0]
  const gridTestimonials = testimonials.filter(
    (item) => item.id !== featuredTestimonial.id
  )

  const showMore = () => {
    setVisibleCount(gridTestimonials.length)
  }

  const visibleTestimonials = gridTestimonials.slice(0, visibleCount)
  const highlightText = (content: string, highlight: string) => {
    if (!highlight || !content.includes(highlight)) return content
    const [before, after] = content.split(highlight)
    return (
      <>
        {before}
        <span className="font-semibold text-[#4E8F47]">{highlight}</span>
        {after}
      </>
    )
  }

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
            Коротко і по суті: що реально помітили батьки після кількох тижнів
            навчання.
          </p>
          <div className="inline-flex items-center gap-2 border border-[#D3DACD] bg-[#EFF3EA] px-3 py-2 text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.06em] text-[#3D473F] rounded-[4px]">
            <Award className="h-4 w-4 text-[#75BF6C]" />
            За анкетами батьків за останній семестр
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="border border-[#D6DDCF] bg-[#ECEEEA] rounded-[8px] p-5 md:p-6 lg:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5 md:gap-6">
              <div className="border border-[#D6DDCF] bg-[#F3F6EE] rounded-[8px] p-4 md:p-5">
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
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < featuredTestimonial.rating ? 'text-[#D5B25B] fill-[#D5B25B]' : 'text-[#D4D9CF]'}`}
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

              <div className="border border-[#D6DDCF] bg-[#F6F8F2] rounded-[8px] p-5 md:p-6 lg:p-7 flex flex-col">
                <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#6A7669] mb-3">
                  Що каже родина
                </p>
                <p className="text-[#2B312D]/90 text-[17px] md:text-[19px] lg:text-[20px] leading-[1.28] tracking-[-0.01em]">
                  {highlightText(
                    featuredTestimonial.content,
                    featuredTestimonial.highlight,
                  )}
                </p>

                <div className="mt-auto pt-5 md:pt-6 border-t border-[#D7DDD3] flex items-center justify-between gap-4">
                  <span className="text-[12px] md:text-[13px] uppercase tracking-[0.08em] font-semibold text-[#424A42]">
                    Реальний відгук батьків
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] md:text-[13px] uppercase tracking-[0.08em] font-semibold text-[#5A6957]">
                    <Sparkles className="h-3.5 w-3.5 text-[#78C86F]" />
                    Особистий досвід
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
              <div className="h-full border border-[#D6DDCF] bg-[#F4F7F0] rounded-[8px] p-4 md:p-5 lg:p-6 transition-all duration-250 hover:border-[#C4D4BB] hover:shadow-[0_10px_20px_-16px_rgba(30,34,30,0.35)]">
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
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < item.rating ? 'text-[#D5B25B] fill-[#D5B25B]' : 'text-[#D4D9CF]'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-[#2C312D]/85 text-[14px] md:text-[15px] leading-[1.35] mb-4 md:mb-5">
                  {highlightText(item.content, item.highlight)}
                </p>

                <div className="mt-auto pt-3 md:pt-4 border-t border-[#D7DDD3] flex items-center justify-between gap-3">
                  <span className="text-[11px] md:text-[12px] uppercase tracking-[0.08em] font-semibold text-[#566255]">
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
