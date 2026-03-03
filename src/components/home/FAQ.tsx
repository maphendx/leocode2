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
        Навчання в нашому освітньому просторі доступне для дітей віком від 7 до
        15 років. Ми розробили програми для різних вікових категорій та рівнів
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
          грамотності та схильностей до творчого або технічного напряму.
        </p>
        <p className="mt-3">
          Діти знайомляться з такими професіями, як дизайнер інтер&apos;єру,
          графічний дизайнер та розробник сайтів. Також передбачена екскурсія
          освітнім простором і 3D-фермою та демонстраційний політ на дроні з
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
          У будні (з понеділка по п&apos;ятницю) заняття можна відвідувати 2 рази
          на тиждень по 1 годині.
        </p>
        <p className="mt-3">
          У суботу та неділю є можливість відвідувати 1 раз на тиждень, 2
          години поспіль.
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
          Наявність домашніх завдань залежить від обраного формату навчання:
          офлайн або онлайн.
        </p>
        <p className="mt-3">
          В офлайн-форматі домашні завдання не передбачені, оскільки весь
          практичний матеріал опрацьовується безпосередньо під час занять під
          супроводом викладача.
        </p>
        <p className="mt-3">
          В онлайн-форматі домашні завдання надаються один раз на два тижні та
          мають системний характер. Усі виконані завдання перевіряються
          викладачем із наданням зворотного зв&apos;язку.
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
        Адміністрація LeoCode слідкує за актуальною ситуацією та сигналами
        повітряної тривоги. У разі реальної загрози всі учні переводяться в
        безпечне укриття, розташоване поруч із навчальною локацією, щоб
        гарантувати їхню безпеку та спокій.
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
    question: 'Як обрати напрямок або курс навчання, якщо дитина не визначилась?',
    answer: (
      <p>
        Якщо дитина ще не визначилася з напрямком або курсом, є можливість
        відвідати безкоштовне заняття, щоб визначити її інтереси та підібрати
        оптимальний формат навчання.
      </p>
    ),
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default
  const answerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const [heights, setHeights] = useState<{ [key: number]: number }>({})
  const leftColumnItems = faqItems
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 === 0)
  const rightColumnItems = faqItems
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index % 2 !== 0)

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
  }, [openItems])

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((i) => i !== index)
        : [...prevOpenItems, index]
    )
  }

  const renderFaqItem = (item: FAQItem, index: number) => {
    const isOpen = openItems.includes(index)

    return (
      <div
        key={index}
        className={`bg-white transition-all duration-300 ${
          isOpen
            ? 'shadow-[0_12px_30px_rgba(34,38,44,0.06)]'
            : 'shadow-[0_2px_10px_rgba(34,38,44,0.03)]'
        }`}
      >
        <button
          type="button"
          className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:px-5 md:py-5"
          onClick={() => toggleItem(index)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          <h3 className="pr-2 text-[17px] font-semibold leading-snug text-[#232529] md:text-[18px]">
            {item.question}
          </h3>
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center text-[#232529] transition-all duration-300 ${
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
            className="px-4 pb-4 pt-1 text-[15px] leading-relaxed text-[#4f545a] md:px-5 md:pb-5"
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
      className="lc-section py-16 w-full md:py-20"
      id="faq"
    >
      <div className="container w-full">
        <h2 className="lc-section-title text-center mb-4 w-full">
          ПОШИРЕНІ ПИТАННЯ
        </h2>
        <p className="lc-section-lead text-center max-w-3xl mx-auto mb-10 md:mb-12">
          Короткі відповіді на найчастіші запитання про навчання, формат та
          запис на заняття.
        </p>

        <div className="mx-auto grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="space-y-4">
            {leftColumnItems.map(({ item, index }) => renderFaqItem(item, index))}
          </div>
          <div className="space-y-4">
            {rightColumnItems.map(({ item, index }) => renderFaqItem(item, index))}
          </div>
        </div>
      </div>
    </section>
  )
}
