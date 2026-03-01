'use client'

import { useState, useRef, useEffect } from 'react'

type FAQItem = {
  question: string
  answer: React.ReactNode
}

const faqItems: FAQItem[] = [
  {
    question: 'Хто може навчатися в Leo Code?',
    answer: (
      <p>
        Діти від 5 до 16 років можуть навчатися на наших курсах. Ми маємо
        програми для різних вікових категорій та рівнів підготовки.
      </p>
    ),
  },
  {
    question: 'Чи потрібні попередні знання?',
    answer: (
      <p>
        Ні, попередні знання з програмування не обов'язкові. Наші курси
        розроблено таким чином, щоб діти починали з основ і поступово набували
        навичок. Ми маємо програми як для абсолютних початківців, так і для тих,
        хто вже має певний досвід.
      </p>
    ),
  },
  {
    question: 'Як це вплине на шкільне навантаження?',
    answer: (
      <p>
        Ми розуміємо важливість балансу між навчанням і дозвіллям. Наші заняття
        проходять 1-2 рази на тиждень і мають гнучкий розклад. Програма Leo Code
        розроблена як доповнення до шкільної освіти, що допомагає розвивати
        логічне мислення і творчі здібності, які позитивно впливають на
        успішність з усіх предметів.
      </p>
    ),
  },
  {
    question: 'Яка окупність інвестиції в навчання?',
    answer: (
      <p>
        Інвестуючи в навчання програмування сьогодні, ви забезпечуєте дитині
        конкурентну перевагу в майбутньому. Програмування розвиває не лише
        технічні навички, але й критичне мислення, креативність та вміння
        вирішувати складні задачі. Ці навички залишаються цінними незалежно від
        того, яку професію обере дитина в майбутньому. За статистикою,
        спеціалісти з навичками програмування мають на 40% вищу зарплатню
        порівняно з іншими професіями.
      </p>
    ),
  },
  {
    question: 'Як обрати курс для дитини?',
    answer: (
      <p>
        Вибір курсу залежить від віку, інтересів та попереднього досвіду дитини.
        Ми пропонуємо безкоштовну консультацію з нашими методистами, які
        допоможуть визначити оптимальний курс саме для вашої дитини. Також
        доступне ознайомче заняття, яке допоможе зрозуміти, чи підходить
        обраний напрямок дитині.
      </p>
    ),
  },
  {
    question: 'Скільки коштує курс?',
    answer: (
      <p>
        Вартість курсів залежить від віку дитини, тривалості програми та формату
        навчання. Ціни починаються від 2400 грн на місяць. Ми пропонуємо знижки
        при оплаті за повний курс наперед та для сімей з двома і більше дітьми.
        Детальну інформацію про вартість конкретного курсу ви можете отримати у
        наших менеджерів або на сторінці курсів.
      </p>
    ),
  },
  {
    question: 'Як проходить навчальний процес?',
    answer: (
      <p>
        Заняття проходять у невеликих групах до 8 дітей або в індивідуальному
        форматі. Кожен урок включає теоретичну частину, практичні завдання та
        проєктну роботу. Ми використовуємо ігрові методики навчання та
        інтерактивні платформи, які роблять процес засвоєння матеріалу
        захоплюючим. Після кожного заняття учні отримують домашні завдання для
        закріплення вивченого матеріалу.
      </p>
    ),
  },
  {
    question: 'Що робити, якщо дитина пропустить заняття?',
    answer: (
      <p>
        Якщо дитина пропускає заняття з поважної причини, ми надаємо можливість
        відпрацювати матеріал. Це може бути індивідуальне відпрацювання з
        викладачем.
      </p>
    ),
  },
  {
    question: 'Скільки триває навчання?',
    answer: (
      <p>
        Тривалість навчання залежить від обраного курсу. Наші програми
        розраховані на 9 місяців навчання. Кожен курс складається з модулів, які
        можна проходити послідовно або вибірково, залежно від цілей та інтересів
        дитини. Заняття проводяться 1-2 рази на тиждень по 1 або 2 години по
        суботам.
      </p>
    ),
  },
  {
    question: 'Як зацікавити дитину до програмування?',
    answer: (
      <p>
        Наш підхід до навчання базується на ігровому форматі та створенні
        проєктів, які цікаві дітям: розробка власних ігор, анімацій, мобільних
        додатків або дронів. Ми показуємо практичне застосування навичок
        програмування та створюємо атмосферу, де діти можуть проявити свою
        креативність. Наші викладачі вміють знаходити підхід до кожної дитини та
        підтримувати її мотивацію протягом усього навчання.
      </p>
    ),
  },
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default
  const answerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({})
  const [heights, setHeights] = useState<{ [key: number]: number }>({})
  const splitIndex = Math.ceil(faqItems.length / 2)
  const firstColumnItems = faqItems.slice(0, splitIndex)
  const secondColumnItems = faqItems.slice(splitIndex)

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
            {firstColumnItems.map((item, index) => renderFaqItem(item, index))}
          </div>
          <div className="space-y-4">
            {secondColumnItems.map((item, index) =>
              renderFaqItem(item, splitIndex + index)
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
