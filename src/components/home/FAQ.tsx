'use client'

import { useState, useRef, useEffect } from 'react'

type FAQItem = {
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    question: 'У якому віці можна навчатись у LeoCode?',
    answer: (
      <p>
        Навчання в нашому освітньому просторі можуть відвідувати діти віком від
        7 до 15 років. Ми розробили програми для різного віку та рівнів
        підготовки, щоб забезпечити комфортний темп навчання для кожної дитини.
      </p>
    ),
  },
  {
    question: 'Як проходить безкоштовне заняття в освітньому просторі?',
    answer: (
      <>
        <p>
          Безкоштовне заняття триває одну годину. Протягом цього часу діти
          проходять внутрішнє тестування для визначення рівня комп&apos;ютерної
          грамотності та схильностей дитини до творчого або технічного напрямку.
        </p>
        <p className="mt-3">
          Знайомляться з такими професіями, як дизайнер інтер&apos;єру, графічним
          дизайнером та розробником сайтів. Також передбачена екскурсія освітнім
          простором і 3D-фермою та демонстраційний політ на дроні з
          використанням VR-окулярів.
        </p>
        <p className="mt-3">
          Батьки в цей час мають можливість детально ознайомитися з форматом,
          процесом та умовами навчання під час презентації, а також відвідати
          екскурсію простором.
        </p>
      </>
    ),
  },
  {
    question: 'Яка тривалість занять та дні відвідування?',
    answer: (
      <>
        <p>
          У будні, з понеділка по п&apos;ятницю, заняття можна відвідувати 2 рази на
          тиждень по 1 годині.
        </p>
        <p className="mt-3">
          На вихідних, в суботу або неділю, є можливість відвідувати 1 раз на
          тиждень, 2 години поспіль.
        </p>
      </>
    ),
  },
  {
    question: 'Чи є відпрацювання пропущених занять дитиною?',
    answer: (
      <>
        <p>
          Так, у разі пропуску занять з поважних причин адміністрація ініціює
          відпрацювання за умови, якщо було заздалегідь (за 6 годин до
          проведення заняття) попереджено про це телефонним дзвінком або
          повідомленням у Viber/Telegram.
        </p>
        <p className="mt-3">
          Відпрацювання пропущених занять проходять у запропоновані години
          відпрацювань.
        </p>
      </>
    ),
  },
  {
    question: 'Чи передбачені домашні завдання в LeoCode?',
    answer: (
      <>
        <p>
          Наявність домашніх завдань залежить від обраного формату навчання -
          офлайн або онлайн.
        </p>
        <p className="mt-3">
          В офлайн-форматі домашні завдання не передбачені, оскільки вся теорія
          та практика опрацьовується безпосередньо під час занять під
          супроводом викладача. Такий підхід забезпечує повне засвоєння теми в
          межах уроку та надає можливість одразу отримати фідбек й підтримку.
        </p>
        <p className="mt-3">
          В онлайн-форматі домашні завдання надаються один раз на два тижні. Усі
          виконані завдання обов&apos;язково перевіряються викладачем із наданням
          зворотного зв&apos;язку, що дозволяє своєчасно скоригувати помилки та
          поглибити розуміння теми.
        </p>
      </>
    ),
  },
  {
    question:
      'Які події дитина може відвідувати, крім основного навчання в просторі?',
    answer: (
      <>
        <p>
          Щонеділі у нас проходять тематичні майстер-класи з програмування,
          дронів чи 3D-моделювання.
        </p>
        <p className="mt-3">
          Також узимку та влітку ми організовуємо тематичні IT-кемпи з
          інтенсивною програмою та проєктами.
        </p>
      </>
    ),
  },
  {
    question: 'Чи переходять діти в укриття у разі повітряної тривоги?',
    answer: (
      <p>
        Адміністрація слідкує за актуальною ситуацією та сигналами повітряної
        тривоги. У разі реальної загрози всі учні переводяться в безпечне
        укриття, розташоване поруч із навчальною локацією, щоб гарантувати
        їхню безпеку та спокій.
      </p>
    ),
  },
  {
    question: 'Скільки триває навчання в LeoCode?',
    answer: (
      <p>
        1 курс навчання триває 9 місяців (72 заняття). Після завершення дитина
        може продовжити навчання за напрямком або обрати інший курс.
      </p>
    ),
  },
  {
    question: 'Що отримує дитина після завершення навчання?',
    answer: (
      <p>
        Після завершення навчального курсу дитина отримує офіційний сертифікат
        про проходження курсу та портфоліо-сайт власних робіт.
      </p>
    ),
  },
  {
    question: 'Чи можна змінювати напрямок/курс та розклад в процесі навчання?',
    answer: (
      <p>
        Так, у нас є можливість змінювати обраний напрямок або курс, а також
        коригувати розклад занять, щоб навчання відповідало інтересам і темпу
        освоєння матеріалу дитиною.
      </p>
    ),
  },
  {
    question: 'Як обрати напрямок або курс навчання, якщо дитина не може визначитися?',
    answer: (
      <p>
        Якщо дитина ще не визначилася з напрямком/курсом, то є можливість
        відвідати безкоштовне заняття.
      </p>
    ),
  },
]

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const answerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const [heights, setHeights] = useState<{ [key: number]: number }>({})
  const midpoint = Math.ceil(faqItems.length / 2)
  const leftColumnItems = faqItems
    .slice(0, midpoint)
    .map((item, index) => ({ item, index }))
  const rightColumnItems = faqItems
    .slice(midpoint)
    .map((item, index) => ({ item, index: index + midpoint }))

  const updateHeights = () => {
    faqItems.forEach((_, index) => {
      if (answerRefs.current[index]) {
        setHeights((prev) => ({
          ...prev,
          [index]: answerRefs.current[index]?.scrollHeight || 0,
        }))
      }
    })
  }

  useEffect(() => {
    // Initialize heights for all answers
    updateHeights()

    // Add resize listener to recalculate heights when window size changes
    window.addEventListener('resize', updateHeights)

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateHeights)
    }
  }, [])

  // Re-measure heights when open state changes to ensure content is fully displayed
  useEffect(() => {
    // Small timeout to ensure DOM has updated
    const timer = setTimeout(() => {
      updateHeights()
    }, 50)

    return () => clearTimeout(timer)
  }, [openItem])

  const toggleItem = (index: number) => {
    setOpenItem((prevOpenItem) => (prevOpenItem === index ? null : index))
  }

  const renderFaqItem = (item: FAQItem, index: number) => {
    const isOpen = openItem === index

    return (
      <div
        key={index}
        className={`rounded-[4px] border border-black/[0.04] bg-white transition-all duration-300 ${
          isOpen
            ? 'shadow-[0_12px_30px_rgba(34,38,44,0.06)]'
            : 'shadow-[0_2px_10px_rgba(34,38,44,0.03)]'
        }`}
      >
        <button
          type="button"
          className="flex w-full items-start justify-between gap-3 px-[clamp(14px,1.3vw,22px)] py-[clamp(14px,1.1vw,20px)] text-left"
          onClick={() => toggleItem(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <h3 className="pr-2 text-[clamp(16px,1.05vw,20px)] font-semibold leading-[1.34] text-[#232529]">
            {item.question}
          </h3>
          <span
            className={`mt-0.5 flex h-[clamp(30px,2.2vw,38px)] w-[clamp(30px,2.2vw,38px)] shrink-0 items-center justify-center text-[#232529] transition-all duration-300 ${
              isOpen
                ? 'bg-primary/12'
                : 'bg-black/[0.03]'
            }`}
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300"
              style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>

        <div
          id={`faq-answer-${index}`}
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isOpen ? `${heights[index] || 2000}px` : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <div
            ref={(el) => {
              answerRefs.current[index] = el
            }}
            className="px-[clamp(14px,1.3vw,22px)] pb-[clamp(14px,1.2vw,22px)] pt-1 text-[clamp(15px,0.9vw,17px)] leading-[1.72] text-[#4f545a]"
          >
            <div className="mb-4 h-px w-full bg-black/6" />
            {item.answer}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section
      className="lc-section w-full py-14 sm:py-16 md:py-20"
      id="faq"
    >
      <div className="container w-full">
        <h2 className="lc-section-title mb-4 w-full text-center">
          ПОШИРЕНІ ПИТАННЯ
        </h2>
        <p className="lc-section-lead mx-auto mb-8 max-w-3xl text-center md:mb-12">
          Короткі відповіді на найчастіші запитання про навчання, формат та
          запис на заняття.
        </p>

        <div className="mx-auto flex w-full flex-col gap-3 sm:gap-4 lg:flex-row lg:items-start lg:gap-5">
          <div className="space-y-3 sm:space-y-4 lg:basis-0 lg:flex-1">
            {leftColumnItems.map(({ item, index }) => renderFaqItem(item, index))}
          </div>
          <div className="space-y-3 sm:space-y-4 lg:basis-0 lg:flex-1">
            {rightColumnItems.map(({ item, index }) => renderFaqItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  )
}
