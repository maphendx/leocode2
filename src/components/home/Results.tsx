'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  type Variants,
} from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  Lightbulb,
  CodeSquare,
  Zap,
  FlaskConical,
  Trophy,
  BarChart3,
  Users,
  ThumbsUp,
  Split,
} 
from 'lucide-react'

type ProjectSlide = {
  id: string
  title: string
  description: string
  image: string
  student: string
  result: string
}

type ProjectDirection = {
  id: string
  label: string
  lead: string
  slides: ProjectSlide[]
}

const threeDSlides: ProjectSlide[] = [
  {
    id: '3d-room',
    title: '3D-макет інтерʼєру',
    description:
      'Учні збирають простір кімнати з меблями й деталями, відпрацьовуючи композицію, масштаб та обʼєм.',
    image: '/images/works/3d/3d_1.jpeg',
    student: 'Група 3D, 10-13 років',
    result: 'Tinkercad',
  },
  {
    id: '3d-printer-line',
    title: 'Модель 3D-принтера',
    description:
      'Практичний проєкт на базі простих форм, де дитина конструює техніку та вчиться мислити як інженер.',
    image: '/images/works/3d/3d_2.jpeg',
    student: 'Учнівський проєкт',
    result: '3D-конструювання',
  },
  {
    id: '3d-printer-detail',
    title: 'Деталізація механізму',
    description:
      'Кадр з іншим ракурсом, де добре видно роботу з обʼємом, деталями та конструкцією обʼєкта.',
    image: '/images/works/3d/3d_3.jpeg',
    student: 'Навчальна група',
    result: 'Обʼєм + форма',
  },
  {
    id: '3d-character',
    title: 'Персонаж у 3D',
    description:
      'Навчальна робота, де дитина збирає власного персонажа зі складених форм і простих кольорових блоків.',
    image: '/images/works/3d/3d_4.jpeg',
    student: 'Учнівський проєкт',
    result: '3D character',
  },
  {
    id: '3d-race-car',
    title: '3D-модель гоночного авто',
    description:
      'Складніші форми, персонажний стиль і робота з кольором у власній моделі транспорту.',
    image: '/images/works/3d/3d_5.png',
    student: 'Група 3D-моделювання',
    result: 'Tinkercad + дизайн',
  },
  {
    id: '3d-space-base',
    title: 'Космічна 3D-сцена',
    description:
      'Велика композиція з кількома обʼєктами, де учні вчаться мислити сценою, а не лише однією моделлю.',
    image: '/images/works/3d/3d_6.png',
    student: 'Проєктна група',
    result: 'Scene building',
  },
  {
    id: '3d-solar-system',
    title: 'Інсталяція з планетами',
    description:
      'Приклад просторового мислення, коли дитина вибудовує композицію з багатьох елементів у спільній сцені.',
    image: '/images/works/3d/3d_7.png',
    student: 'Учнівський макет',
    result: '3D composition',
  },
  {
    id: '3d-engineering-stand',
    title: 'Інженерний стенд',
    description:
      'Проєкт з механічними деталями та написами, де тренується логіка побудови й точність розміщення елементів.',
    image: '/images/works/3d/3d_8.png',
    student: 'Навчальна група',
    result: '3D prototype',
  },
  {
    id: '3d-blockbench-cake',
    title: 'Low-poly композиція',
    description:
      'Робота зі стилізацією, простими формами й яскравим кольором у середовищі Blockbench.',
    image: '/images/works/3d/blockbench_1.jpeg',
    student: 'Blockbench група',
    result: 'Blockbench',
  },
  {
    id: '3d-blockbench-redstone',
    title: 'Minecraft-механізм',
    description:
      'Учні моделюють знайомі цифрові обʼєкти та переносять ігрову логіку у власні 3D-сцени.',
    image: '/images/works/3d/blockbench_2.jpeg',
    student: 'Учнівський 3D-проєкт',
    result: 'Blockbench + logic',
  },
]

const uiUxSlides: ProjectSlide[] = [
  {
    id: 'ux-product-card',
    title: 'UI-концепт товарної сторінки',
    description:
      'Учні працюють з композицією екрана, карткою продукту та сильним CTA-блоком у Figma.',
    image: '/images/works/ux/ux_ui_1.png',
    student: 'Група UI/UX',
    result: 'Figma',
  },
  {
    id: 'ux-mobile-fashion',
    title: 'Мобільний екран fashion-продукту',
    description:
      'Практика зі шрифтами, адаптивним ритмом і візуальною ієрархією мобільного інтерфейсу.',
    image: '/images/works/ux/ux_ui_3.jpg',
    student: 'Навчальна група',
    result: 'UI/UX prototype',
  },
]

const pythonSlides: ProjectSlide[] = [
  {
    id: 'python-calculator',
    title: 'Калькулятор з базовою логікою',
    description:
      'Один з перших робочих застосунків, де дитина поєднує інтерфейс, кнопки та обчислення.',
    image: '/images/works/python/python_1.jpeg',
    student: 'Група Python',
    result: 'Python app',
  },
  {
    id: 'python-alarm',
    title: 'Будильник з вибором часу',
    description:
      'Невеликий застосунок, де учні працюють з інпутами, станами і прикладною логікою.',
    image: '/images/works/python/python_2.jpeg',
    student: 'Група Python',
    result: 'Tkinter + Python',
  },
  {
    id: 'python-task-manager',
    title: 'Планувальник завдань',
    description:
      'Практика зі списками, темами оформлення та кнопками взаємодії у власному застосунку.',
    image: '/images/works/python/python_3.jpeg',
    student: 'Навчальний проєкт',
    result: 'Desktop UI',
  },
  {
    id: 'python-translator',
    title: 'Мініперекладач',
    description:
      'Робота з текстовими полями, мовними перемикачами і простою взаємодією у власній програмі.',
    image: '/images/works/python/python_4.jpeg',
    student: 'Навчальна група',
    result: 'Python interface',
  },
  {
    id: 'python-egg-game',
    title: 'Гра "Полювання на писанки"',
    description:
      'Інтерактивна гра з очками, таймером і керуванням, зібрана учнем власноруч.',
    image: '/images/works/python/python_5.png',
    student: 'Учнівський проєкт',
    result: 'Python + Pygame',
  },
]

const canvaSlides: ProjectSlide[] = [
  {
    id: 'canva-stus-poster',
    title: 'Типографічний постер про Василя Стуса',
    description:
      'Навчальна робота з фото, ритмом тексту та акцентною композицією.',
    image: '/images/works/ux/ux_ui_2.jpg',
    student: 'Група Canva',
    result: 'Canva',
  },
  {
    id: 'canva-music-poster',
    title: 'Афіша музичної події',
    description:
      'Контрастний рекламний постер із чіткою ієрархією тексту, фото та атмосфери.',
    image: '/images/works/ux/ux_ui_4.jpg',
    student: 'Креативна група',
    result: 'Canva poster',
  },
  {
    id: 'canva-flower-board',
    title: 'Колаж для flower-бренду',
    description:
      'Проєкт із moodboard-подачею, добором референсів і мʼякою візуальною атмосферою.',
    image: '/images/works/ux/ux_ui_5.jpg',
    student: 'Учнівський дизайн',
    result: 'Canva layout',
  },
  {
    id: 'canva-tour-poster',
    title: 'Турова афіша для артиста',
    description:
      'Приклад промодизайну з фото, великим заголовком і чистою рекламною подачею.',
    image: '/images/works/ux/ux_ui_6.jpg',
    student: 'Навчальна група',
    result: 'Canva poster',
  },
]

const projectDirections: ProjectDirection[] = [
  {
    id: '3d-modeling',
    label: '3D-моделювання',
    lead: 'Обʼємні моделі, друк і проєкти, які можна взяти в руки.',
    slides: threeDSlides,
  },
  {
    id: 'ux-ui-figma',
    label: 'UI/UX Figma',
    lead: 'Інтерфейси, прототипи та візуальна логіка цифрових продуктів.',
    slides: uiUxSlides,
  },
  {
    id: 'python',
    label: 'Python',
    lead: 'Ігри, логіка та перші робочі програми власними руками.',
    slides: pythonSlides,
  },
  {
    id: 'canva',
    label: 'Canva',
    lead: 'Постери, креативи та візуальні роботи з сильним стилем.',
    slides: canvaSlides,
  },
  {
    id: 'complex-program',
    label: 'Комплексна програма',
    lead: 'Один напрямок, який поєднує дизайн, 3D, прототипування та веб.',
    slides: [
      {
        ...threeDSlides[5],
        id: 'complex-space-scene',
        title: 'Велика 3D-сцена для портфоліо',
        description:
          'У комплексній програмі діти переходять від маленьких вправ до складної сцени з багатьма елементами.',
        student: 'Комплексна група',
        result: '3D + креатив',
      },
      {
        ...uiUxSlides[0],
        id: 'complex-ui-concept',
        title: 'Інтерфейс як частина великого проєкту',
        description:
          'Після візуальної частини учні збирають цифровий інтерфейс і вчаться мислити продуктом цілісно.',
        student: 'Комплексна програма',
        result: 'UI/UX + Figma',
      },
      {
        ...pythonSlides[0],
        id: 'complex-code-screen',
        title: 'Робочий екран із кодом і логікою',
        description:
          'Напрямок поєднує не лише дизайн, а й функціональність: діти створюють робочі застосунки власноруч.',
        student: 'Комплексна програма',
        result: 'Код + інтерфейс',
      },
      {
        ...canvaSlides[2],
        id: 'complex-brand-board',
        title: 'Візуальний стиль для проєкту',
        description:
          'У фінальному портфоліо зʼявляються і moodboard, і постери, і промоматеріали для презентації роботи.',
        student: 'Проєктна група',
        result: 'Айдентика + креатив',
      },
    ],
  },
  {
    id: 'web-programming',
    label: 'Веб програмування',
    lead: 'Верстка, структура сторінок і перші вебпроєкти, які можна показати онлайн.',
    slides: [
      {
        ...uiUxSlides[0],
        id: 'web-landing-screen',
        title: 'Екран майбутнього лендингу',
        description:
          'Учні вчаться переходити від макета до живої сторінки, продумуючи hero-блоки, CTA та структуру екрана.',
        student: 'Група вебпрограмування',
        result: 'HTML/CSS + UI',
      },
      {
        ...pythonSlides[2],
        id: 'web-dashboard-logic',
        title: 'Логіка веб-інтерфейсу',
        description:
          'Практика зі структурою сервісу, списками, формами й сценаріями взаємодії, які потім переносяться у веб.',
        student: 'Навчальна група',
        result: 'Веб-логіка',
      },
      {
        ...pythonSlides[3],
        id: 'web-form-screen',
        title: 'Форма з результатом',
        description:
          'Робота з полями, кнопками і сценарієм взаємодії, який легко адаптувати під реальний вебпроєкт.',
        student: 'Учнівський проєкт',
        result: 'Форми + верстка',
      },
    ],
  },
]

const Results = () => {
  const [activeDirectionIndex, setActiveDirectionIndex] = useState(0)
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [counters, setCounters] = useState({
    parentSatisfaction: 0,
    mathImprovement: 0,
    itContinuation: 0,
    referrals: 0,
  })

  // Stats animation
  useEffect(() => {
    let animationTriggered = false

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationTriggered) {
          // Set flag to prevent re-triggering
          animationTriggered = true

          // Reset counters
          setCounters({
            parentSatisfaction: 0,
            mathImprovement: 0,
            itContinuation: 0,
            referrals: 0,
          })

          // Start counter animation
          const duration = 2000 // Animation duration in ms
          const steps = 60 // Animation frames
          const interval = duration / steps

          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps

            // Easing function to make animation more natural
            const easeOutQuart = (x: number): number => {
              return 1 - Math.pow(1 - x, 4)
            }

            const easedProgress = easeOutQuart(progress)

            setCounters({
              parentSatisfaction: Math.min(Math.round(95 * easedProgress), 95),
              mathImprovement: Math.min(Math.round(70 * easedProgress), 70),
              itContinuation: Math.min(Math.round(87 * easedProgress), 87),
              referrals: Math.min(Math.round(500 * easedProgress), 500),
            })

            if (step >= steps) {
              clearInterval(timer)
            }
          }, interval)
        }
      })
    }

    // Create intersection observer with more sensitive threshold
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1, // Trigger when at least 10% of the element is visible
      rootMargin: '0px',
    })

    // Get the stats section and observe it
    const statsSection = document.querySelector('.stats-section')
    if (statsSection) {
      observer.observe(statsSection)
    }

    return () => {
      if (statsSection) {
        observer.unobserve(statsSection)
      }
      observer.disconnect()
    }
  }, []) // Empty dependency array to ensure it only runs once

  const learningOutcomes = [
    {
      id: 1,
      title: 'Технічний та творчий розвиток',
      description: 'Розвиток технічних та творчих навичок в різних напрямах',
      icon: <CodeSquare className="h-12 w-12 p-2.5" />,
      color: 'from-accent to-accent-hover',
    },
    {
      id: 2,
      title: 'Логічне мислення',
      description: 'Навчиться логічно мислити, розвивати креативність',
      icon: <Lightbulb className="h-12 w-12 p-2.5" />,
      color: 'from-[#79C8AA] to-[#2EB39D]',
    },
    {
      id: 3,
      title: "Розв'язання складних задач",
      description:
        "Отримає навичку розв'язувати складні завдання, розбиваючи їх на простіші",
      icon: <Split className="h-12 w-12 p-2.5" />,
      color: 'from-primary-light to-accent',
    },
    {
      id: 4,
      title: 'Власні проєкти',
      description: 'Створення та робота над власними проєктами',
      icon: <Zap className="h-12 w-12 p-2.5" />,
      color: 'from-[#7BCF94] to-[#4FAE73]',
    },
    {
      id: 5,
      title: 'Інженерні основи',
      description: 'Отримає знання, що є базою у вивченні інженерних основ',
      icon: <FlaskConical className="h-12 w-12 p-2.5" />,
      color: 'from-[#B8D47A] to-[#7FB25A]',
    },
    {
      id: 6,
      title: "Концентрація та пам'ять",
      description:
        "Розвиток концентрації та пам'яті, що допоможе успішно справлятися із задачами різної складності",
      icon: <Brain className="h-12 w-12 p-2.5" />,
      color: 'from-[#88CBB4] to-[#5AAE8F]',
    },
  ]

  const activeDirection =
    projectDirections[activeDirectionIndex] ?? projectDirections[0]
  const activeSlides = activeDirection.slides
  const activeSlide = activeSlides[activeSlideIndex] ?? activeSlides[0]

  const moveSlide = (direction: 'prev' | 'next') => {
    setActiveSlideIndex((prev) =>
      direction === 'next'
        ? (prev + 1) % activeSlides.length
        : (prev - 1 + activeSlides.length) % activeSlides.length,
    )
  }

  const handleDirectionSelect = (index: number) => {
    setActiveDirectionIndex(index)
    setActiveSlideIndex(0)
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section
      id="rezultati"
      className="lc-section-soft pt-10 md:pt-12 lg:pt-16 pb-10 lg:pb-14 courses-section"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute h-full w-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-1/5 bottom-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden"
        >
          <h2 className="lc-section-title mb-4">РЕЗУЛЬТАТИ НАВЧАННЯ</h2>
          <p className="lc-section-lead">
            Наша освітня методика розроблена таким чином, щоб розвивати комплекс
            ключових навичок, які будуть корисними у будь-якій професії
            майбутнього
          </p>
        </motion.div>

        {/* Learning Outcomes - Hexagon Grid with Parallax */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
            {learningOutcomes.map((outcome) => (
              <motion.div
                key={outcome.id}
                variants={itemVariants}
                className="group"
              >
                <div className="lc-glass-card rounded-[12px] p-6 hover:shadow-md transition-all duration-500 hover:border-primary-light/50 group-hover:translate-y-[-5px] h-full flex flex-col">
                  <div
                    className={`w-14 h-14 rounded-[12px] bg-gradient-to-br ${outcome.color} flex items-center justify-center text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {outcome.icon}
                  </div>
                  <p className="text-xl font-bold mb-2 text-text">
                    {outcome.title}
                  </p>
                  <p className="text-primary/75 flex-grow text-sm">
                    {outcome.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Statistics - Horizontal Cards with Parallax */}
        <motion.div className="hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-light/25 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <p className="text-2xl md:text-3xl font-bold text-center mb-10 text-text">
              Наші досягнення у цифрах
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 stats-section">
              {[
                {
                  title: counters.parentSatisfaction + '%',
                  finalValue: '95%',
                  description:
                    'батьків відзначають позитивні зміни в розвитку дитини',
                  icon: <ThumbsUp className="h-6 w-6 text-white" />,
                  color: 'from-primary-light to-accent',
                  bgLight: 'bg-[#FCFEFA]',
                  border: 'border-primary-light/15',
                },
                {
                  title: '+' + counters.mathImprovement + '%',
                  finalValue: '+70%',
                  description: 'покращення успішності з математики та логіки',
                  icon: <BarChart3 className="h-6 w-6 text-white" />,
                  color: 'from-[#8FD58A] to-[#4E9D4A]',
                  bgLight: 'bg-[#FCFEFA]',
                  border: 'border-primary-light/15',
                },
                {
                  title: counters.itContinuation + '%',
                  finalValue: '87%',
                  description: 'випускників продовжують навчання в IT-напрямку',
                  icon: <Trophy className="h-6 w-6 text-white" />,
                  color: 'from-[#6FCF93] to-[#2F7A46]',
                  bgLight: 'bg-[#FCFEFA]',
                  border: 'border-primary-light/15',
                },
                {
                  title: counters.referrals + '+',
                  finalValue: '500+',
                  description: 'задоволених батьків рекомендують нас друзям',
                  icon: <Users className="h-6 w-6 text-white" />,
                  color: 'from-[#6FB86A] to-primary',
                  bgLight: 'bg-[#FCFEFA]',
                  border: 'border-primary-light/15',
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${stat.bgLight} rounded-[10px] p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px] border ${stat.border} lc-glass-card`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${stat.color} rounded-[12px] flex items-center justify-center mb-3 shadow-sm transform transition-transform duration-300 hover:scale-105`}
                    >
                      {stat.icon}
                    </div>
                    <p className="text-3xl md:text-4xl font-bold mb-2 text-text tracking-tight">
                      {stat.title}
                    </p>
                    <p className="text-primary/70 text-sm">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Student Projects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-0"
        >
          <div className="relative">
            <div className="mb-5 max-w-2xl md:mb-6 lg:mb-8">
              <div>
                <h2 className="mb-2 text-[#292A2C] text-[30px] md:text-[42px] font-extrabold uppercase tracking-[-0.04em] leading-[0.9]">
                  РОБОТИ НАШИХ УЧНІВ
                </h2>
                <p className="max-w-2xl text-[#4E5750] text-[15px] md:text-[18px] leading-relaxed">
                  Оберіть напрямок і перегляньте приклади робіт та кадри з
                  навчального процесу у форматі слайдера.
                </p>
              </div>
            </div>

            <div className="grid items-start gap-5 lg:gap-8 lg:grid-cols-[minmax(0,1.28fr)_minmax(250px,0.72fr)]">
              <article className="min-w-0">
                <div className="relative overflow-hidden rounded-[14px] border border-[#D3DACD] bg-[#E4EADF]">
                  <div className="relative h-[320px] md:h-[400px] lg:h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0"
                    >
                      <div className="absolute inset-0 overflow-hidden bg-[#DCE4D4]">
                        <Image
                          src={activeSlide.image}
                          alt=""
                          fill
                          aria-hidden="true"
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover scale-105 blur-2xl opacity-25"
                          quality={40}
                        />
                      </div>
                      <Image
                        src={activeSlide.image}
                        alt={activeSlide.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-contain p-3 md:p-4"
                        priority
                        fetchPriority="high"
                        quality={82}
                      />
                    </motion.div>
                  </AnimatePresence>

                    <div className="absolute right-4 top-4 rounded-full border border-white/65 bg-[#F3F6EF]/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4E5C4E] backdrop-blur-sm">
                      {String(activeSlideIndex + 1).padStart(2, '0')} /{' '}
                      {String(activeSlides.length).padStart(2, '0')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-[#D3DACD] pt-4 md:pt-5">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-full border border-[#BFD8B8] bg-[#EAF4E2] px-3 py-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-[#3D6B39]">
                      {activeDirection.label}
                    </span>
                    <span className="inline-flex rounded-full border border-[#CDD5C7] bg-[#ECEFE7] px-3 py-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-[#526050]">
                      {activeSlide.result}
                    </span>
                    <span className="inline-flex rounded-full border border-[#D5DBCF] bg-white/70 px-3 py-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.08em] text-[#5B665C]">
                      {activeSlide.student}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="text-[#292A2C] text-[25px] md:text-[34px] font-extrabold uppercase tracking-[-0.04em] leading-[0.95]">
                        {activeSlide.title}
                      </h3>
                      <p className="mt-2 text-[15px] md:text-[17px] leading-[1.35] text-[#434E45]">
                        {activeSlide.description}
                      </p>
                      <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-[#617063]">
                        {activeDirection.lead}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 lg:max-w-[320px] lg:justify-end">
                      <div className="inline-flex items-center rounded-full border border-[#D3DACD] bg-[#EEF2E8] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            moveSlide('prev')
                          }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#495448] transition-all hover:bg-white/75 hover:text-[#2F382F]"
                          aria-label="Попередній слайд"
                        >
                          <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2.2} />
                        </button>

                        <div className="h-5 w-px bg-[#D3DACD]" />

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            moveSlide('next')
                          }}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#495448] transition-all hover:bg-white/75 hover:text-[#2F382F]"
                          aria-label="Наступний слайд"
                        >
                          <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
                        </button>
                      </div>

                      <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-[#D3DACD] bg-[#EEF2E8] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                        {activeSlides.map((slide, index) => (
                          <button
                            key={slide.id}
                            type="button"
                            onClick={() => setActiveSlideIndex(index)}
                            aria-label={`Перейти до слайду ${index + 1}`}
                            className={`rounded-full transition-all ${
                              index === activeSlideIndex
                                ? 'h-2.5 w-8 bg-[#78C86F]'
                                : 'h-2.5 w-2.5 bg-[#C7D0C0] hover:bg-[#B4C0AB]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              <aside className="lg:border-l lg:border-[#D3DACD] lg:pl-6">
                <div className="mb-3 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#667265]">
                  Оберіть напрямок
                </div>

                <div className="grid gap-1.5">
                  {projectDirections.map((direction, index) => (
                    <motion.button
                      key={direction.id}
                      type="button"
                      onClick={() => handleDirectionSelect(index)}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className={`w-full text-left overflow-hidden rounded-[10px] border transition-colors ${
                        index === activeDirectionIndex
                          ? 'border-[#B9DDB5] bg-[#E8F3DF]'
                          : 'border-transparent bg-transparent hover:border-[#D3DACD] hover:bg-[#EEF2E8]'
                      }`}
                    >
                      <div className="p-3 md:p-3.5">
                        <div className="mb-1.5 flex items-center gap-3">
                          <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#667265]">
                            #{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-[16px] leading-tight font-bold text-[#2E342F]">
                          {direction.label}
                        </p>
                        {index === activeDirectionIndex ? (
                          <p className="mt-2 max-w-[26ch] text-[12px] leading-relaxed text-[#617063]">
                            {direction.lead}
                          </p>
                        ) : null}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </aside>
            </div>

          </div>
        </motion.div>
      </div>

    </section>
  )
}

export default Results
