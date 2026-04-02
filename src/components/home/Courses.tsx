'use client'

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, Star, Award, Trophy, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import FreeLesson from '../other/FreeLesson'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'
import { useHydrated } from '@/hooks/useHydrated'

interface CourseSkill {
  name: string
  level: string
}

interface CourseData {
  title: string
  description: string
  detailedDescription: string
  duration: string
  schedule: string
  age: string
  ageGroup: string
  image: string
  tag: string
  tagColor: string
  colorClass: string
  bgClass: string
  textClass: string
  hoverClass: string
  price: string
  skills: CourseSkill[]
  progressSteps: string[]
}

interface FilterOption {
  id: string
  label: string
  disabled?: boolean
}

const COURSE_GROUP_SIZE_TEXT = 'Кількість дітей в навчальній групі 6-8'

const ProgressPathIcon = ({
  index,
  lastIndex,
}: {
  index: number
  lastIndex: number
}) => {
  if (index === 0) {
    return <Star size={16} />
  }

  if (index === lastIndex) {
    return <Trophy size={16} />
  }

  return <Award size={16} />
}

const buildProgressThreadPath = (count: number) => {
  if (count < 2) {
    return ''
  }

  const step = 1000 / count
  const centers = Array.from({ length: count }, (_, idx) => step * (idx + 0.5))

  if (count === 2) {
    const [x1, x2] = centers
    return `M ${x1} 26 C ${x1 + 55} 38, ${x2 - 55} 38, ${x2} 26`
  }

  if (count === 3) {
    const [x1, x2, x3] = centers
    return [
      `M ${x1} 26`,
      `C ${x1 + 55} 38, ${x2 - 65} 38, ${x2} 26`,
      `C ${x2 + 32} 8, ${x2 + 92} 6, ${x2 + 78} 34`,
      `C ${x2 + 62} 58, ${x2 + 8} 56, ${x2 + 14} 24`,
      `C ${x2 + 24} 6, ${x3 - 52} 14, ${x3} 26`,
    ].join(' ')
  }

  if (count === 4) {
    const [x1, x2, x3, x4] = centers
    const loopAnchor = (x2 + x3) / 2

    return [
      `M ${x1} 26`,
      `C ${x1 + 58} 40, ${x2 - 72} 42, ${x2} 26`,
      `C ${x2 + 28} 10, ${loopAnchor - 8} -2, ${loopAnchor + 10} 18`,
      `C ${loopAnchor + 34} 42, ${loopAnchor + 20} 60, ${loopAnchor - 18} 58`,
      `C ${loopAnchor - 64} 54, ${loopAnchor - 76} 10, ${loopAnchor - 18} 18`,
      `C ${loopAnchor + 40} 28, ${x3 - 42} 12, ${x3} 26`,
      `C ${x3 + 54} 8, ${x4 - 64} 10, ${x4} 26`,
    ].join(' ')
  }

  return centers.slice(1).reduce((path, center, idx) => {
    const previous = centers[idx]
    const segment = center - previous
    const lift = idx % 2 === 0 ? -12 : 12

    return `${path} C ${previous + segment * 0.24} ${26 + lift}, ${center - segment * 0.24} ${26 - lift}, ${center} 26`
  }, `M ${centers[0]} 26`)
}

const ProgressRowThread = ({ count }: { count: number }) => {
  const path = buildProgressThreadPath(count)

  if (!path) {
    return null
  }

  return (
    <svg
      viewBox="0 0 1000 64"
      className="pointer-events-none absolute inset-x-0 top-0 h-14 w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const ProgressTurnThread = ({
  side,
}: {
  side: 'left' | 'right'
}) => {
  const path =
    side === 'right'
      ? 'M20 0 C 36 2, 41 14, 30 18 C 18 22, 15 30, 20 38'
      : 'M20 0 C 4 2, -1 14, 10 18 C 22 22, 25 30, 20 38'

  return (
    <svg viewBox="0 0 40 38" className="h-full w-full" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const SkillsDevelopment = () => {
  const isMounted = useHydrated()

  const courses = useMemo<CourseData[]>(
    () => [
      {
        title: 'Графічний дизайн. Сервіс Canva',
        description:
          'Курс знайомить дітей з основами графічного дизайну та навчає працювати в сучасному онлайн-сервісі Canva. Учні опановують композицію, колір, типографію та візуальну комунікацію через створення власних дизайнерських проєктів.',
        detailedDescription:
          'Курс знайомить дітей з основами графічного дизайну та навчає працювати в сучасному онлайн-сервісі Canva. Учні опановують основи композиції, кольору, типографії та візуальної комунікації через створення власних дизайнерських проєктів: постерів, презентацій, контенту для соцмереж, коміксу, журналу, концепції власної події та брендбуку.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/canva-course.jpeg',
        tag: 'IT школа',
        tagColor: 'amber-500',
        colorClass: 'accent',
        bgClass: 'bg-accent',
        textClass: 'text-accent',
        hoverClass: 'hover:bg-accent-hover',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Дизайн', level: 'базовий' },
          { name: 'Креативність', level: 'середній' },
          { name: 'Композиція', level: 'середній' },
          { name: 'Колористика', level: 'середній' },
          { name: 'Типографія', level: 'середній' },
          { name: 'Брендинг', level: 'базовий' },
          { name: 'Візуальна комунікація', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з Canva та основами дизайну',
          'Вивчення композиції, кольору та типографії',
          'Створення комплексних дизайнерських проєктів',
          'Знайомство з основами вебдизайну та створення сайту',
          'Робота з різними стилями графічного дизайну',
          'Розробка концепції для власної події',
          'Створення брендбуку',
          'Формування дизайнерського портфоліо',
        ],
      },
      {
        title: '3D-моделювання та друк. TinkerCad',
        description:
          'Курс знайомить дітей із основами 3D-моделювання у сервісі Tinkercad. Навчання побудоване за принципом «теорія + багато практики», де кожен проєкт розвиває логіку, просторову уяву та творчі здібності.',
        detailedDescription:
          'Курс знайомить дітей із основами 3D-моделювання у сервісі Tinkercad. Навчання побудоване за принципом «теорія + багато практики», де кожен проєкт розвиває логіку, просторову уяву та творчі здібності. Учні створюють обширні тематичні проєкти: персонажі з мультфільмів, космічні станції, котеджі, кафе, гірськолижний курорт, парк атракціонів та інші масштабні локації. Особливість курсу: кожного місяця учні отримують власну розроблену фігурку, яка друкується на 3D-принтері.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'young',
        image: '/images/course.jpeg',
        tag: 'IT школа',
        tagColor: 'blue',
        colorClass: 'blue',
        bgClass: 'bg-[#69B765]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-blue/80',
        price: '2800 грн/місяць',
        skills: [
          { name: '3D-моделювання', level: 'середній' },
          { name: 'Просторове та інженерне мислення', level: 'середній' },
          { name: 'Розуміння принципу роботи 3D-принтерів', level: 'середній' },
          { name: 'Підготовка до 3D-друку', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з Tinkercad та основами 3D-моделювання',
          'Робота з базовими формами та булевими операціями',
          "Створення рухомих об'єктів та механізмів",
          "Проєктування масштабних локацій та архітектурних об'єктів",
          'Підготовка моделей до 3D-друку',
          "Створення власних фінальних проєктів",
          'Формування портфоліо 3D-моделей',
        ],
      },
      {
        title: '3D-моделювання. Blockbench',
        description:
          "Курс розвиває навички 3D-моделювання, занурюючи дітей у світ полігональних моделей, анімації та створення 3D-об'єктів. Учні навчаються працювати з текстурами, рухомими об'єктами та складними сценами.",
        detailedDescription:
          "Курс розвиває навички 3D-моделювання, занурюючи дітей у світ полігональних моделей, анімації та створення 3D-об'єктів. Учні навчаються працювати з текстурами, рухомими об'єктами та складними сценами. Протягом курсу розробляють обширні тематичні проєкти: екстер'єр та інтер'єр фантастичного будинку, НЛО та прибульці, гелікоптер, острів зі скарбами, ігровий світ, анімацію персонажів та домашніх улюбленців з Minecraft, станцію метро, космічну станцію, архітектурні пам'ятки. Особливість курсу: кожних три місяці учні моделюють свій проєкт на друк, що друкується на 3D-принтері.",
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/blockbench-course.jpeg',
        tag: 'IT школа',
        tagColor: 'blue',
        colorClass: 'blue',
        bgClass: 'bg-[#6FAE64]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-blue/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Полігональне 3D-моделювання', level: 'середній' },
          { name: "Анімація персонажів та об'єктів", level: 'середній' },
          { name: 'Робота з текстурами та деталізацією моделей', level: 'середній' },
          { name: "Створення рухомих механізмів та інтерактивних елементів", level: 'середній' },
          { name: 'Просторове мислення та інженерний підхід', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з інтерфейсом Blockbench і основами полігональної моделі',
          'Створення анімацій (рух, обертання, відкриття/закриття)',
          'Робота з текстурами та деталями моделей',
          'Проєктування обширних проєктів',
          'Підготовка моделей до 3D-друку',
          'Формування портфоліо',
        ],
      },
      {
        title: 'Комплексна програма',
        description:
          'Курс знайомить підлітків із сучасними цифровими професіями та навчає створювати власні проєкти — від ідеї до готового продукту. Протягом навчання діти опановують 3D-моделювання, графічний дизайн у Canva, UI/UX у Figma та веброзробку за допомогою HTML і CSS.',
        detailedDescription:
          'Курс знайомить підлітків із сучасними цифровими професіями та навчає створювати власні проєкти — від ідеї до готового продукту. Протягом навчання діти опанують основи 3D-моделювання у Tinkercad, графічного дизайну у Canva, UI/UX у Figma та веброзробки за допомогою HTML і CSS. Додатково познайомляться з Drone-напрямком та навчаться презентувати власні проєкти. У результаті курсу кожен учень отримає: 3D-модель котеджу, брендбук для власного бренду, вебсайт-портфоліо, яке буде опубліковане на GitHub-хостингу.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/canva.jpeg',
        tag: 'IT школа',
        tagColor: 'green-500',
        colorClass: 'primary-light',
        bgClass: 'bg-[#7BBE72]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-primary-light/80',
        price: '2800 грн/місяць',
        skills: [
          { name: 'Проєктне мислення та креативність', level: 'середній' },
          { name: 'Просторове мислення', level: 'середній' },
          { name: '3D-моделювання', level: 'середній' },
          { name: 'Графічний дизайн та брендинг у Canva', level: 'середній' },
          { name: 'UI/UX та прототипування у Figma', level: 'середній' },
          { name: 'Верстка HTML/CSS', level: 'середній' },
          { name: 'Адаптивний дизайн для різних пристроїв', level: 'середній' },
          { name: 'Публікація та хостинг сайту на GitHub', level: 'середній' },
          { name: 'Формування власного сайт-портфоліо', level: 'середній' },
          { name: 'Презентація власних проєктів', level: 'середній' },
        ],
        progressSteps: [
          "Створення 3D-моделі котеджу (інтер'єр та екстер'єр) у Tinkercad",
          'Підготовка власної моделі для 3D-друку',
          'Розробка фірмового стилю компанії та брендбуку у Canva',
          'Створення прототипу сайту-портфоліо у Figma',
          'Верстка власного сайту-портфоліо за допомогою HTML/CSS',
          'Публікація сайту онлайн через GitHub',
          'Презентація та захист власного проєкту',
        ],
      },
      {
        title: 'UI/UX-дизайн. Figma',
        description:
          'Курс знайомить дітей з основами UI/UX дизайну та навчає працювати в сучасному інструменті Figma. Учні вчаться проєктувати інтерфейси сайтів і мобільних додатків, працювати з елементами інтерфейсу, прототипами та адаптивним дизайном.',
        detailedDescription:
          'Курс знайомить дітей з основами UI/UX дизайну та навчає працювати в сучасному інструменті Figma. Учні навчаються проєктувати інтерфейси сайтів і мобільних додатків, працювати з елементами інтерфейсу, прототипами та адаптивним дизайном. Під час навчання діти створюють власні дизайнерські проєкти: рекламні креативи, презентації, лендинги та багатосторінкові сайти, мобільні додатки, UI kit та оформлюють свої проєкти на Behance, формуючи професійне дизайнерське портфоліо.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/ux-ui-figma-course.jpeg',
        tag: 'IT школа',
        tagColor: 'red',
        colorClass: 'red',
        bgClass: 'bg-[#5A7F46]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-red/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'UI/UX дизайн', level: 'середній' },
          { name: 'Прототипування', level: 'середній' },
          { name: 'Адаптивний дизайн', level: 'середній' },
          { name: 'UI-kit', level: 'середній' },
          { name: 'Креативні цифрові проєкти', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з Figma та основами UI/UX',
          'Робота з кольором, шрифтами та композицією',
          'Створення професійних презентацій та рекламних креативів',
          'Проєктування прототипів сайтів і мобільних додатків',
          'Створення UI-kit та адаптивних інтерфейсів',
          'Презентація та демонстрація власних робіт на Behance',
        ],
      },
      {
        title: 'Веб дизайн',
        description:
          'Курс знайомить дітей з основами створення сучасних вебсайтів та навчає працювати з професійними інструментами для дизайну та верстки. Учні опановують принципи графічного та UI/UX дизайну, вебпрототипування та верстки за допомогою HTML/CSS.',
        detailedDescription:
          'Курс знайомить дітей з основами створення сучасних вебсайтів та навчає працювати з професійними інструментами для дизайну та верстки. Учні опанують принципи графічного та UI/UX дизайну, вебпрототипування та верстки за допомогою HTML/CSS. Протягом курсу діти створять три практичні проєкти: сайт для Yoga Studio, Food-блог та Travel-портал, а потім інтегрують їх в особистий сайт-портфоліо. Усі сайти будуть адаптивними, з SEO-оптимізацією та розміщені онлайн через хостинг на GitHub.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/figma.jpeg',
        tag: 'IT школа',
        tagColor: 'blue',
        colorClass: 'blue',
        bgClass: 'bg-[#6FAE64]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-blue/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Створення графічних елементів у Canva', level: 'середній' },
          { name: 'UI/UX та прототипування у Figma', level: 'середній' },
          { name: 'Верстка HTML/CSS', level: 'середній' },
          { name: 'Адаптивний дизайн для різних пристроїв', level: 'середній' },
          { name: 'SEO-оптимізація вебсайтів', level: 'середній' },
          { name: 'Публікація та хостинг сайту на GitHub', level: 'середній' },
          { name: 'Формування власного сайт-портфоліо', level: 'середній' },
        ],
        progressSteps: [
          'Розробка графічних елементів для сайту в Canva',
          'Створення прототипу вебсайту у Figma',
          'Основи верстки HTML та стилізація сторінок CSS',
          'Розробка трьох практичних проєктів: Yoga Studio, Food, Travel',
          "Створення особистого сайту-портфоліо з усіма проєктами",
          'Освоєння адаптивного дизайну',
          'SEO-оптимізація та публікація сайтів через GitHub',
        ],
      },
      {
        title: 'Python - легкий старт в програмуванні',
        description:
          'Введення у світ програмування через прості та зрозумілі завдання на мові Python.',
        detailedDescription: 'Детальний опис курсу Python',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'teen',
        image: '/images/python-course.jpeg',
        tag: 'IT школа',
        tagColor: 'green-500',
        colorClass: 'primary-light',
        bgClass: 'bg-[#88C885]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-primary-light/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Програмування', level: 'початковий' },
          { name: 'Алгоритмічне мислення', level: 'середній' },
          { name: "Розв'язання задач", level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з основами Python',
          'Написання перших програм',
          'Розробка алгоритмів',
          'Створення власного проєкту',
        ],
      },
      {
        title: 'Scratch',
        description:
          'Курс знайомить дітей з основами програмування у візуальному середовищі Scratch. Учні навчаються створювати власні ігри, анімації, мультфільми та інтерактивні проєкти.',
        detailedDescription:
          'Курс знайомить дітей з основами програмування у візуальному середовищі Scratch. Учні навчаються створювати власні ігри, анімації, мультфільми та інтерактивні проєкти. Курс побудований від простих алгоритмів до складних ігрових механік, що дозволяє поступово розвивати логічне мислення, креативність і навички проєктної роботи. Особливу увагу приділено практиці: кожна тема закріплюється створенням реального проєкту. Протягом курсу діти розробляють ігри різних жанрів, працюють зі змінними, циклами, розгалуженнями, клонами, списками, подіями та функціями.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/scratch-course.jpeg',
        tag: 'IT школа',
        tagColor: 'amber-500',
        colorClass: 'accent',
        bgClass: 'bg-[#74BE6D]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-accent-hover',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Програмування у Scratch', level: 'середній' },
          { name: 'Логічне та алгоритмічне мислення', level: 'середній' },
          { name: 'Розвиток креативності та уяви', level: 'середній' },
          { name: 'Розробка ігор та інтерактивних проєктів', level: 'середній' },
          { name: 'Робота зі змінними, циклами, подіями та клонуванням', level: 'середній' },
          { name: 'Створення власного портфоліо проєктів', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство зі Scratch та основами блокового програмування',
          'Вивчення циклів, змінних, подій та клонування',
          'Основи теорії ігор та розробка правил, рівнів та механік',
          'Практичне створення власних ігор та їх тестування',
          'Формування портфоліо',
        ],
      },
      {
        title: 'Drone-напрямок',
        description:
          'Drone-напрямок — авторська програма, що поєднує комплексне вивчення дронів через інженерію, електроніку, 3D-моделювання та основи програмування. Навчання включає конструювання, паяння, програмування та керування дронами.',
        detailedDescription:
          'Drone-напрямок — авторська програма, що поєднує комплексне вивчення дронів через інженерію, електроніку, 3D-моделювання та основи програмування. Навчання включає конструювання, паяння, програмування та керування дронами. За перший рік навчання кожен учень створить до 4 власних моделей дронів, а також літатиме унікальними картами та проходитиме дрон-перегони. Програма триває 3 роки та побудована за модульною системою: від базового вивчення аеродинаміки, будови дронів і пілотування до алгоритмізації, програмування та інженерного проєктування власних моделей з друком деталей на 3D-принтерах.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-15 років',
        ageGroup: 'middle',
        image: '/images/drone.jpeg',
        tag: 'DRONE школа',
        tagColor: 'blue',
        colorClass: 'blue',
        bgClass: 'bg-[#4E9D4A]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-blue/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Розуміння принципів роботи дронів', level: 'середній' },
          { name: 'Впевнене керування дроном і орієнтація в просторі', level: 'середній' },
          { name: 'Інженерне мислення та вирішення технічних задач', level: 'середній' },
          { name: 'Збирання, налаштування та обслуговування дронів', level: 'середній' },
          { name: 'Паяння та складання електронних компонентів', level: 'середній' },
          { name: 'Основи 3D-моделювання та створення власних деталей', level: 'середній' },
          { name: 'Базові знання програмування та логіки керування пристроями', level: 'середній' },
        ],
        progressSteps: [
          'Ознайомлення з будовою дронів та збірка до 4 власних моделей',
          'Паяння та налаштування електричних схем',
          'Керування дронами, польоти за маршрутами та дрон-перегони',
          'Освоєння програмування, алгоритмізації та логіки роботи дронів',
          'Розробка 3D-моделей дронів та друк деталей на 3D-принтері',
        ],
      },
    ],
    [],
  )

  const filters = useMemo<FilterOption[]>(
    () => [
      { id: 'all', label: 'Всі напрямки' },
      { id: 'IT школа', label: 'IT школа' },
      { id: 'DRONE школа', label: 'DRONE школа' },
      { id: 'clubs', label: 'Онлайн' },
    ],
    [],
  )

  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const expandedViewRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const isHashChangeInProgress = useRef(false)
  const shouldScrollToCoursesAfterClose = useRef(false)

  const filteredCourses = useMemo(() => {
    return activeFilter === 'all'
      ? courses
      : courses.filter((course) => course.tag === activeFilter)
  }, [activeFilter, courses])

  const scrollToOnlineLearning = useCallback(() => {
    if (typeof window === 'undefined') return

    const onlineSection = document.getElementById('online-learning')
    if (!onlineSection) return

    const headerOffset = 88
    const targetPosition =
      onlineSection.getBoundingClientRect().top + window.scrollY - headerOffset

    window.scrollTo({
      top: Math.max(targetPosition, 0),
      behavior: 'smooth',
    })
  }, [])

  const scrollToCoursesSection = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      if (typeof window === 'undefined') return

      const coursesSection = document.getElementById('napryamki')
      if (!coursesSection) return

      const headerOffset = window.innerWidth < 768 ? 76 : 88
      const targetTop = Math.max(
        coursesSection.getBoundingClientRect().top + window.scrollY - headerOffset,
        0,
      )

      window.scrollTo({
        top: targetTop,
        behavior,
      })
    },
    [],
  )

  const handleFilterClick = useCallback(
    (filter: FilterOption) => {
      if (filter.id === 'clubs') {
        scrollToOnlineLearning()
        return
      }

      if (!filter.disabled) {
        setActiveFilter(filter.id)
      }
    },
    [scrollToOnlineLearning],
  )
  // Simplified course click handler
  const handleCourseClick = useCallback(
    (index: number, fromHashChange = false) => {
      if (isAnimating || index < 0 || index >= filteredCourses.length) return

      setIsAnimating(true)

      const isClosing = expandedCourse === index
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

      if (isClosing) {
        // Close expanded course
        setExpandedCourse(null)

        // Update URL if not from hash change
        if (
          !fromHashChange &&
          typeof window !== 'undefined' &&
          window.location.hash.includes('course-')
        ) {
          isHashChangeInProgress.current = true
          window.history.pushState(
            null,
            '',
            window.location.pathname + window.location.search,
          )
          setTimeout(() => {
            isHashChangeInProgress.current = false
          }, 100)
        }

        // Remove mobile class
        if (isMobile && typeof window !== 'undefined') {
          document.body.classList.remove('has-expanded-course')
        }

        setTimeout(() => setIsAnimating(false), 300)
      } else {
        // Open course
        setExpandedCourse(index)

        // Update URL if not from hash change
        if (!fromHashChange && typeof window !== 'undefined') {
          isHashChangeInProgress.current = true
          window.history.pushState(null, '', `#course-${index}`)
          setTimeout(() => {
            isHashChangeInProgress.current = false
          }, 100)
        }

        // Add mobile class and scroll to element
        setTimeout(
          () => {
            if (isMobile && typeof window !== 'undefined') {
              document.body.classList.add('has-expanded-course')
            }

            const element = document.getElementById(`course-detail-${index}`)
            if (element && typeof window !== 'undefined') {
              const yOffset = isMobile ? -50 : -80
              const y =
                element.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset
              window.scrollTo({ top: y, behavior: 'smooth' })
            }

            setIsAnimating(false)
          },
          isMobile ? 100 : 50,
        )
      }
    },
    [expandedCourse, isAnimating, filteredCourses.length],
  )

  // Close handler
  const handleClose = useCallback(() => {
    if (expandedCourse !== null) {
      handleCourseClick(expandedCourse)
    }
  }, [expandedCourse, handleCourseClick])

  const handleCloseAndScrollToCourses = useCallback(() => {
    if (typeof window === 'undefined' || expandedCourse === null) return

    shouldScrollToCoursesAfterClose.current = true
    handleCourseClick(expandedCourse)
  }, [expandedCourse, handleCourseClick])

  // Hash change detection
  const checkHashForCourse = useCallback(() => {
    if (typeof window === 'undefined' || isHashChangeInProgress.current) return

    const hash = window.location.hash
    if (hash && hash.startsWith('#course-')) {
      const courseIndex = parseInt(hash.replace('#course-', ''))
      if (
        !isNaN(courseIndex) &&
        courseIndex >= 0 &&
        courseIndex < filteredCourses.length
      ) {
        if (expandedCourse !== courseIndex) {
          handleCourseClick(courseIndex, true)
        }
      }
    } else if (expandedCourse !== null) {
      setExpandedCourse(null)
      if (typeof window !== 'undefined') {
        document.body.classList.remove('has-expanded-course')
      }
    }
  }, [filteredCourses.length, expandedCourse, handleCourseClick])

  // Combined effect for event listeners
  useEffect(() => {
    if (!isMounted) return

    const handleHashChange = () => {
      if (!isHashChangeInProgress.current) {
        checkHashForCourse()
      }
    }

    const handleFilterChange = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail?.filterName) {
        if (customEvent.detail.filterName === 'clubs') {
          scrollToOnlineLearning()
          return
        }
        setActiveFilter(customEvent.detail.filterName)
      }
    }

    const handleCourseSelection = (event: Event) => {
      const customEvent = event as CustomEvent
      const courseId = customEvent.detail?.courseId

      if (
        typeof courseId === 'number' &&
        courseId >= 0 &&
        courseId < courses.length
      ) {
        let actualIndex = -1
        if (activeFilter === 'all') {
          actualIndex = courseId
        } else {
          actualIndex = filteredCourses.findIndex(
            (course) => courses[courseId].title === course.title,
          )
        }

        if (actualIndex !== -1) {
          handleCourseClick(actualIndex, false)
        }
      }
    }

    // Initialize hash check
    if (!isHashChangeInProgress.current) {
      requestAnimationFrame(checkHashForCourse)
    }

    window.addEventListener('hashchange', handleHashChange)
    window.addEventListener('changeFilter', handleFilterChange as EventListener)
    window.addEventListener(
      'selectCourse',
      handleCourseSelection as EventListener,
    )

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener(
        'changeFilter',
        handleFilterChange as EventListener,
      )
      window.removeEventListener(
        'selectCourse',
        handleCourseSelection as EventListener,
      )
    }
  }, [
    isMounted,
    checkHashForCourse,
    handleCourseClick,
    scrollToOnlineLearning,
    activeFilter,
    filteredCourses,
    courses,
  ])

  // Handle expanded course validity when filter changes
  useEffect(() => {
    if (expandedCourse !== null && expandedCourse >= filteredCourses.length) {
      handleClose()
    }
  }, [expandedCourse, filteredCourses.length, handleClose])

  useEffect(() => {
    if (typeof window === 'undefined' || expandedCourse !== null) return
    if (!shouldScrollToCoursesAfterClose.current) return

    shouldScrollToCoursesAfterClose.current = false

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timeoutId = window.setTimeout(() => {
      scrollToCoursesSection(reduceMotion ? 'auto' : 'smooth')
    }, 40)

    return () => window.clearTimeout(timeoutId)
  }, [expandedCourse, scrollToCoursesSection])

  useEffect(() => {
    const swiper = swiperRef.current
    if (!swiper) return

    swiper.allowTouchMove = expandedCourse === null

    if (!swiper.autoplay) return

    if (expandedCourse === null) {
      swiper.autoplay.start()
      return
    }

    swiper.autoplay.stop()
  }, [expandedCourse])

  const CourseCard = memo(
    ({
      course,
      index,
      handleCourseClick,
      isMounted,
      isExpanded,
    }: {
      course: CourseData
      index: number
      handleCourseClick: (index: number) => void
      isMounted: boolean
      isExpanded: boolean
    }) => {
      const [isMobile, setIsMobile] = useState(false)

      useEffect(() => {
        if (typeof window !== 'undefined') {
          const checkMobile = () => setIsMobile(window.innerWidth < 768)
          checkMobile()
          window.addEventListener('resize', checkMobile)
          return () => window.removeEventListener('resize', checkMobile)
        }
      }, [])

      return (
        <div className="card-wrapper h-full py-0 md:py-1 px-0 md:px-1">
          <motion.div
            className="rounded-[10px] overflow-hidden cursor-pointer aspect-5/6 w-full group relative card-item action-card bg-[#171A20]"
            initial={{ boxShadow: '0 0 0 rgba(0,0,0,0)', y: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            style={{
              border: isExpanded
                ? '2px solid rgba(90, 162, 255, 0.95)'
                : '1px solid rgba(43, 47, 57, 0.9)',
              transformOrigin: 'center center',
              willChange: isMobile ? 'auto' : 'transform, opacity',
              transform: isMobile ? 'none' : 'translateZ(0)',
              backfaceVisibility: isMobile ? 'visible' : 'hidden',
              WebkitBackfaceVisibility: isMobile ? 'visible' : 'hidden',
              opacity: isMounted ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            transition={
              isMobile
                ? { duration: 0.2 }
                : {
                    duration: 0.3,
                  }
            }
            onClick={() => handleCourseClick(index)}
          >
            <div
              className={`absolute inset-x-0 top-0 z-10 flex items-start border-b border-white/5 bg-[#2A2D35] px-5 pt-3 pb-2 h-16 ${
                isMobile ? '' : 'group-hover:h-24'
              } transition-all duration-300 ease-in-out`}
              style={{ willChange: isMobile ? 'auto' : 'height' }}
            >
              <p className="relative z-10 text-[17px] md:text-[18px] font-extrabold text-white leading-tight line-clamp-2 transform-[translateZ(0)]">
                {course.title}
              </p>
              <div className="pointer-events-none absolute left-5 right-5 top-14 hidden md:flex flex-wrap gap-2 opacity-0 translate-y-1 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
                <span className="rounded-[6px] border border-white/20 bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white/95">
                  {course.duration}
                </span>
                <span className="rounded-[6px] border border-white/20 bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white/95">
                  {course.age}
                </span>
                <span className="rounded-[6px] border border-white/20 bg-white/12 px-2.5 py-1 text-[11px] font-semibold text-white/95">
                  6-8 в групі
                </span>
              </div>
            </div>

            <div className="absolute inset-0 overflow-hidden h-full">
              <div
                className={`absolute inset-0 top-16 ${
                  isMobile ? '' : 'group-hover:top-24'
                } transition-all duration-300 ease-in-out`}
                style={{ willChange: isMobile ? 'auto' : 'top' }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                  style={{
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible',
                  }}
                  loading={isMobile ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                  priority={index < 2 && isMobile}
                />
              </div>

              <div
                className={`absolute inset-0 top-16 ${
                  isMobile ? '' : 'group-hover:top-24'
                } bg-linear-to-b from-transparent via-black/10 to-black/18 opacity-100 transition-all duration-300 ease-out group-hover:via-black/30 group-hover:to-black/70`}
                style={{ willChange: isMobile ? 'auto' : 'opacity, top' }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 z-20 pointer-events-none">
              <div className="hidden md:block mb-3 translate-y-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[14px] leading-snug text-white/93 line-clamp-3 mb-3">
                  {course.description}
                </p>
                <div className="inline-flex items-center gap-1.5 text-accent text-[16px] font-semibold">
                  <span>Дізнатись більше</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[8px] border border-white/8 bg-[#171A20]/78 px-3 py-2 backdrop-blur-sm transition-all duration-300 ease-out md:group-hover:translate-y-2 md:group-hover:opacity-0">
                <span className="text-[11px] font-bold uppercase tracking-[0.03em] text-white/85">
                  {course.tag}
                </span>
                <span className="text-[11px] text-white/60">Детальніше</span>
              </div>
            </div>
          </motion.div>
        </div>
      )
    },
  )

  CourseCard.displayName = 'CourseCard'

  const ProgressPath = memo(({ steps }: { steps: string[] }) => {
    const items = steps.map((step, idx) => ({ step, idx }))
    const rows: Array<typeof items> = []
    const rowSize = steps.length <= 6 ? Math.ceil(steps.length / 2) : 4

    for (let i = 0; i < items.length; i += rowSize) {
      rows.push(items.slice(i, i + rowSize))
    }

    return (
      <div className="mt-6 mb-8">
        <h4 className="font-semibold mb-3 text-white">Шлях розвитку:</h4>
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:hidden">
          {items.map((item) => (
            <div
              key={item.idx}
              className="flex items-start gap-2.5 rounded-[10px] border border-white/6 bg-white/[0.02] px-2.5 py-2"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[#1A2318]">
                <ProgressPathIcon
                  index={item.idx}
                  lastIndex={steps.length - 1}
                />
              </div>
              <p className="text-left text-[12px] leading-[1.3] text-white/78">
                {item.step}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden md:flex md:flex-col gap-2">
          {rows.map((row, rowIndex) => {
            const visualRow = rowIndex % 2 === 0 ? row : [...row].reverse()
            const gridTemplateColumns = `repeat(${visualRow.length}, minmax(0, 1fr))`
            const labelMaxWidthClass =
              visualRow.length <= 3 ? 'max-w-[190px]' : 'max-w-[150px]'

            return (
              <div key={`row-${rowIndex}`} className={rowIndex > 0 ? '-mt-1' : ''}>
                <div className="relative">
                  <ProgressRowThread count={visualRow.length} />
                  <div
                    className="relative z-10 grid items-start gap-x-4"
                    style={{ gridTemplateColumns }}
                  >
                    {visualRow.map((item) => (
                      <div
                        key={`step-${item.idx}`}
                        className="flex min-w-0 flex-col items-center gap-2 px-2 text-center"
                      >
                        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[#1A2318] shadow-[0_0_0_6px_#2F323A]">
                          <ProgressPathIcon
                            index={item.idx}
                            lastIndex={steps.length - 1}
                          />
                        </div>
                        <p
                          className={`${labelMaxWidthClass} text-[12px] leading-[1.28] text-white/78`}
                        >
                          {item.step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {rowIndex < rows.length - 1 && (
                  <div className="-mt-1 grid" style={{ gridTemplateColumns }}>
                    {rowIndex % 2 === 0 ? (
                      <>
                        {Array.from(
                          { length: visualRow.length - 1 },
                          (_, emptyIdx) => (
                          <div key={`empty-right-${rowIndex}-${emptyIdx}`} />
                          ),
                        )}
                        <div className="justify-self-center h-10 w-10">
                          <ProgressTurnThread side="right" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="justify-self-center h-10 w-10">
                          <ProgressTurnThread side="left" />
                        </div>
                        {Array.from(
                          { length: visualRow.length - 1 },
                          (_, emptyIdx) => (
                          <div key={`empty-left-${rowIndex}-${emptyIdx}`} />
                          ),
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  ProgressPath.displayName = 'ProgressPath'

  return (
    <section
      id="napryamki"
      className="courses-section overflow-hidden bg-[#ECEEEA] py-14 md:py-20"
    >
      <div className="container relative">
        <h2 className="text-[34px] md:text-[46px] font-extrabold mb-8 md:mb-10 text-[#2A2C31] uppercase tracking-[-0.02em] text-center md:text-left">
          Напрямки навчання
        </h2>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:items-center mb-4 md:mb-6">
          <div className="flex flex-wrap gap-2.5 md:gap-3.5 text-sm">
            <LayoutGroup id="courses-filters">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => handleFilterClick(filter)}
                  disabled={filter.disabled}
                  className={`group relative overflow-hidden px-5 md:px-6 py-3 text-[14px] md:text-[16px] rounded-[4px] transition-colors duration-250 border font-semibold ${
                    filter.disabled
                      ? 'border-[#C9CBC7] bg-[#F0F1EE] text-[#A6A8A4] cursor-not-allowed'
                      : ''
                  } ${
                    activeFilter === filter.id
                      ? 'border-transparent text-[#1C261B]'
                      : !filter.disabled
                        ? 'bg-transparent border-[#B9BCB6] text-[#4F574E] hover:border-[#98CF93] hover:bg-[#F6F9F3] hover:text-[#3F4B3D]'
                        : ''
                  } ${
                    filter.id === 'clubs' && activeFilter !== filter.id
                      ? 'online-filter-chip border-[#86CC82] bg-[#EEF7E8] text-[#2D4328]'
                      : ''
                  }`}
                  whileTap={{ scale: 0.97 }}
                  animate={{
                    opacity: isMounted ? 1 : 0,
                    transition: { duration: 0.25 },
                  }}
                  initial={{ opacity: 0 }}
                >
                  {!filter.disabled && activeFilter !== filter.id && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(100deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.14)_48%,rgba(152,207,147,0)_100%)] opacity-0 -translate-x-1 transition-[opacity,transform] duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  )}
                  {activeFilter === filter.id && !filter.disabled && (
                    <motion.span
                      layoutId="courses-filter-active-pill"
                      className="pointer-events-none absolute inset-0 rounded-[4px] border border-[#78C86F] bg-accent shadow-[0_8px_18px_-12px_rgba(73,128,66,0.5)]"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 36,
                        mass: 0.7,
                      }}
                    />
                  )}
                  <span className="relative z-10 inline-flex">{filter.label}</span>
                </motion.button>
              ))}
            </LayoutGroup>
          </div>

          <div className="hidden md:flex gap-3 ml-4 z-10">
            {isMounted && (
              <>
                <motion.button
                  className="static! w-11! h-11! flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:border-[#98CF93] hover:bg-[#F3F8EF] active:bg-[#EAF5E3] transition-colors duration-300 p-1"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  onClick={(e) => {
                    e.preventDefault()
                    swiperRef.current?.slidePrev(560)
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="static! w-11! h-11! flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:border-[#98CF93] hover:bg-[#F3F8EF] active:bg-[#EAF5E3] transition-colors duration-300 p-1"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.95, y: 0 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                  onClick={(e) => {
                    e.preventDefault()
                    swiperRef.current?.slideNext(560)
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </>
            )}
          </div>
        </div>

        <div className="relative overflow-hidden">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 border border-[#C9CBC7] rounded-[10px] bg-white/70">
              <p className="text-[#5E605C]">
                Програми для обраних фільтрів не знайдено
              </p>
            </div>
          ) : (
            <div
              className={`transition-opacity duration-500 ${
                isMounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {isMounted ? (
                <>
                  <Swiper
                    modules={[Navigation, A11y, Autoplay]}
                    spaceBetween={8}
                    slidesPerView="auto"
                    navigation={false}
                    speed={560}
                    allowTouchMove={expandedCourse === null}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper
                      swiper.allowTouchMove = expandedCourse === null

                      if (swiper.autoplay) {
                        if (expandedCourse === null) {
                          swiper.autoplay.start()
                        } else {
                          swiper.autoplay.stop()
                        }
                      }
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: true,
                      pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1, spaceBetween: 5 },
                      768: { slidesPerView: 1.75, spaceBetween: 8 },
                      1024: { slidesPerView: 2.6, spaceBetween: 8 },
                      1280: { slidesPerView: 3.4, spaceBetween: 8 },
                    }}
                    className="courses-swiper pb-10! overflow-visible!"
                  >
                    {filteredCourses.map((course, index) => (
                      <SwiperSlide
                        key={`${course.title}-${index}`}
                        className="h-auto! overflow-visible!"
                      >
                        <CourseCard
                          course={course}
                          index={index}
                          handleCourseClick={handleCourseClick}
                          isMounted={isMounted}
                          isExpanded={expandedCourse === index}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="flex md:hidden justify-center items-center gap-3 mt-0 mb-3">
                    {isMounted && (
                      <>
                        <motion.button
                          className="swiper-button-prev-mobile static! w-10! h-10! flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:border-[#98CF93] hover:bg-[#F3F8EF] active:bg-[#EAF5E3] transition-colors duration-300"
                          aria-label="Previous slide"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: 'spring',
                            stiffness: 360,
                            damping: 24,
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            swiperRef.current?.slidePrev(560)
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="swiper-button-next-mobile static! w-10! h-10! flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:border-[#98CF93] hover:bg-[#F3F8EF] active:bg-[#EAF5E3] transition-colors duration-300"
                          aria-label="Next slide"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: 'spring',
                            stiffness: 360,
                            damping: 24,
                          }}
                          onClick={(e) => {
                            e.preventDefault()
                            swiperRef.current?.slideNext(560)
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-5 pb-2 md:pb-6">
                  {filteredCourses.slice(0, 4).map((course, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="aspect-5/6 w-full rounded-[25px] bg-[#EAF1E4] animate-pulse"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {isMounted && (
          <AnimatePresence>
            {expandedCourse !== null &&
              expandedCourse < filteredCourses.length && (
                <motion.div
                  id={`course-detail-${expandedCourse}`}
                  ref={expandedViewRef}
                  className="w-full mt-6 md:mt-8 rounded-[10px] overflow-hidden card-expanded mobile-expanded-card border border-[#31343D]"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.3 },
                    height: { duration: 0.3 },
                  }}
                >
                  <div className="flex flex-col md:flex-row bg-[#2A2D35]">
                    <div className="relative w-full md:w-77.5 lg:w-90 h-75 md:h-auto overflow-hidden">
                      <Image
                        src={
                          filteredCourses[expandedCourse]?.image ||
                          '/images/placeholder.jpg'
                        }
                        alt={filteredCourses[expandedCourse]?.title || 'Course'}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover w-full h-full"
                        style={{
                          backfaceVisibility: 'visible',
                          WebkitBackfaceVisibility: 'visible',
                        }}
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-r from-black/5 via-transparent to-black/20 md:bg-linear-to-t md:from-black/20 md:to-transparent" />
                    </div>

                    <div className="p-5 md:p-8 flex-1 bg-[#2F323A] relative z-10 text-white">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-1 rounded-[4px] border border-white/15 text-[11px] font-bold uppercase tracking-[0.04em] text-white/80">
                            {filteredCourses[expandedCourse]?.tag || ''}
                          </span>
                          <span className="px-2.5 py-1 rounded-[4px] border border-white/10 text-[11px] text-white/70">
                            {filteredCourses[expandedCourse]?.duration || ''}
                          </span>
                          <span className="px-2.5 py-1 rounded-[4px] border border-white/10 text-[11px] text-white/70">
                            {filteredCourses[expandedCourse]?.age || ''}
                          </span>
                          <span className="px-2.5 py-1 rounded-[4px] border border-white/10 text-[11px] text-white/70">
                            {COURSE_GROUP_SIZE_TEXT}
                          </span>
                        </div>
                        <motion.button
                          onClick={handleCloseAndScrollToCourses}
                          className="shrink-0 inline-flex items-center gap-1 rounded-[6px] border border-white/15 px-3 py-1.5 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <X size={15} /> Закрити
                        </motion.button>
                      </div>
                      <motion.h2
                        className="text-[28px] md:text-[40px] font-extrabold mb-4 tracking-[-0.02em] text-white leading-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {filteredCourses[expandedCourse]?.title || ''}
                      </motion.h2>

                      <motion.p
                        className="mb-6 text-white/82 text-base leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {filteredCourses[expandedCourse]?.description || ''}
                      </motion.p>

                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        <p className="font-semibold mb-3 text-white">
                          Навички, які здобуде дитина:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {filteredCourses[expandedCourse]?.skills?.map(
                            (skill, idx) => (
                              <motion.div
                                key={`skill-${idx}`}
                                className="px-3 py-2 bg-white/5 rounded-[6px] text-sm flex items-center border border-white/10 text-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: 0.3 + idx * 0.1,
                                }}
                              >
                                <span className="font-medium">
                                  {skill.name}
                                </span>
                              </motion.div>
                            ),
                          ) || <div>Інформація про навички відсутня</div>}
                        </div>
                      </motion.div>

                      {filteredCourses[expandedCourse]?.progressSteps && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="pb-2"
                        >
                          <ProgressPath
                            steps={
                              filteredCourses[expandedCourse].progressSteps
                            }
                          />
                        </motion.div>
                      )}

                      <motion.div
                        className="mb-8"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="border border-white/10 p-4 rounded-[8px] bg-[#262931] transition-colors duration-300">
                            <p className="font-bold mb-1 text-white">
                              Тривалість
                            </p>
                            <p className="text-white/75">
                              {filteredCourses[expandedCourse]?.duration || ''}
                            </p>
                          </div>
                          <div className="border border-white/10 p-4 rounded-[8px] bg-[#262931] transition-colors duration-300">
                            <p className="font-bold mb-1 text-white">Графік</p>
                            <p className="text-white/75">
                              {filteredCourses[expandedCourse]?.schedule || ''}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="border border-white/10 p-4 rounded-[8px] bg-[#262931] transition-colors duration-300">
                            <p className="font-bold mb-1 text-white">Вік</p>
                            <p className="text-white/75">
                              {filteredCourses[expandedCourse]?.age || ''}
                            </p>
                          </div>
                          <div className="border border-white/10 p-4 rounded-[8px] bg-[#262931] transition-colors duration-300">
                            <p className="font-bold mb-1 text-white">
                              Вартість
                            </p>
                            <p className="text-white/75">
                              {filteredCourses[expandedCourse]?.price || ''}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 border border-white/10 p-4 rounded-[8px] bg-[#262931] transition-colors duration-300">
                          <p className="font-bold mb-1 text-white">
                            Кількість дітей в навчальній групі
                          </p>
                          <p className="text-white/75">6-8</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        )}
        <div className="text-center pt-6 md:pt-8">
          <motion.button
            onClick={() => setIsConsultationModalOpen(true)}
            className="inline-block bg-accent text-[#1A2518] py-3.5 px-8 md:px-10 text-base md:text-lg font-extrabold rounded-[4px] hover:bg-[#8BC886] transition hover:scale-[1.02] transform duration-300"
          >
            Записатися на безкоштовне заняття
          </motion.button>
        </div>
      </div>

      <FreeLesson
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
      />

      <style jsx global>{`
        .courses-section .swiper-button-next:after,
        .courses-section .swiper-button-prev:after {
          display: none;
        }

        .courses-section .swiper-slide {
          padding: 6px 4px !important;
          overflow: visible !important;
        }

        @media (min-width: 768px) {
          .courses-section .swiper-slide {
            padding: 8px 6px !important;
          }
        }

        .courses-section .swiper,
        .courses-section .swiper-wrapper {
          overflow: visible !important;
          padding: 10px 0;
        }

        @media (min-width: 768px) {
          .courses-section .swiper,
          .courses-section .swiper-wrapper {
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            perspective: 1000px;
          }
        }

        .courses-section .action-card {
          transition:
            transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
            box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
        }

        @media (hover: hover) and (pointer: fine) {
          .courses-section .action-card {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            perspective: 1000px;
            transform: translate3d(0, 0, 0);
            will-change: transform, box-shadow;
          }

          .courses-section .action-card * {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          .courses-section .action-card:hover {
            z-index: 20 !important;
            position: relative;
            transform: translateY(-3px) translateZ(0) !important;
            box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.15) !important;
          }
        }

        @media (max-width: 767px) {
          .courses-section .action-card,
          .courses-section .action-card * {
            backface-visibility: visible;
            -webkit-backface-visibility: visible;
          }

          .mobile-expanded-card {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: visible;
            -webkit-backface-visibility: visible;
            will-change: opacity, height;
          }

          .card-expanded {
            overflow-x: hidden;
          }
        }

        .card-expanded {
          border-radius: 10px;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .courses-section .online-filter-chip {
          animation: onlineChipGlow 3.2s ease-in-out infinite;
          box-shadow: 0 0 0 rgba(134, 204, 130, 0);
        }

        @keyframes onlineChipGlow {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(134, 204, 130, 0);
            background-color: #eef7e8;
          }
          50% {
            box-shadow:
              0 0 0 2px rgba(134, 204, 130, 0.16),
              0 0 10px rgba(134, 204, 130, 0.18);
            background-color: #f2faed;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .courses-section .online-filter-chip {
            animation: none !important;
          }
        }

        body.has-expanded-course {
          position: relative !important;
          overflow-y: auto !important;
          height: auto !important;
          overscroll-behavior: auto !important;
        }

        .card-expanded .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .card-expanded button {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.5rem;
        }
      `}</style>
    </section>
  )
}

export default SkillsDevelopment
