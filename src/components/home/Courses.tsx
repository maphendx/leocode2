'use client'

import { useState, useRef, useEffect, useCallback, memo, useMemo } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft, Star, Award, Trophy, X } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import FreeLesson from '../other/FreeLesson'
import { motion, AnimatePresence } from 'framer-motion'
import type { Swiper as SwiperType } from 'swiper'

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

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

const SkillsDevelopment = () => {
  const isMounted = useIsMounted()

  const courses = useMemo<CourseData[]>(
    () => [
      {
        title: 'Графічний дизайн. Сервіс Canva',
        description:
          'Курс допомагає дітям розвинути креативність та навички дизайну за допомогою зручного онлайн-сервісу Canva. Діти навчаться створювати яскраві презентації, постери та інші візуальні матеріали.',
        detailedDescription:
          'Детальний опис курсу з графічного дизайну в Canva',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '6-15 років',
        ageGroup: 'middle',
        image: '/images/canva.jpeg',
        tag: 'IT школа',
        tagColor: 'amber-500',
        colorClass: 'accent',
        bgClass: 'bg-accent',
        textClass: 'text-accent',
        hoverClass: 'hover:bg-accent-hover',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Дизайн', level: 'початковий' },
          { name: 'Креативність', level: 'середній' },
          { name: 'Композиція', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з Canva',
          'Створення перших дизайнів',
          'Розробка комплексних проектів',
          'Створення власного портфоліо',
        ],
      },
      {
        title: '3D-друк та моделювання ThinkerCad',
        description:
          'Цей курс ідеально підходить для дітей 7-9 років, які хочуть навчитись створювати власні 3D-моделі та реалізовувати свої творчі ідеї за допомогою сучасних технологій.',
        detailedDescription:
          'Під час курсу діти навчаться:\n• Створювати 3D-моделі\n• Працювати з 3D-принтером\n• Розуміти принципи 3D-моделювання\n• Реалізовувати власні проекти',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-14 років',
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
          { name: 'Просторове мислення', level: 'базовий' },
          { name: 'Технічне конструювання', level: 'базовий' },
        ],
        progressSteps: [
          'Створення першої простої моделі',
          "Розробка об'єктів з декількох елементів",
          'Створення функціональних моделей',
          'Розробка власного проєкту',
        ],
      },
      {
        title: 'Figma - курс для дизайнерів',
        description:
          'Опанування основ дизайну та роботи з макетами у Figma для дітей, які хочуть створювати візуальні проєкти.',
        detailedDescription:
          'На курсі з Figma діти вивчають основи веб-дизайну та створення інтерфейсів, розвивають креативне мислення та реалізовують власні дизайн проєкти.',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '10-16 років',
        ageGroup: 'middle',
        image: '/images/figma.jpeg',
        tag: 'IT школа',
        tagColor: 'red',
        colorClass: 'red',
        bgClass: 'bg-[#5A7F46]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-red/80',
        price: '2400 грн/місяць',
        skills: [
          { name: 'UI дизайн', level: 'середній' },
          { name: 'Розробка інтерфейсів', level: 'початковий' },
          { name: 'Візуальна комунікація', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з інтерфейсом Figma',
          'Створення перших макетів',
          'Розробка інтерактивних прототипів',
          'Дизайн власного проєкту',
        ],
      },
      {
        title: 'Python - легкий старт в програмуванні',
        description:
          'Введення у світ програмування через прості та зрозумілі завдання на мові Python.',
        detailedDescription: 'Детальний опис курсу Python',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '10-16 років',
        ageGroup: 'teen',
        image: '/images/python.jpeg',
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
        title: 'Графіка та анімація в Scratch',
        description:
          'Курс знайомить дітей з основами програмування та створення анімацій на платформі Scratch.',
        detailedDescription: 'Детальний опис курсу Scratch',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '6-10 років',
        ageGroup: 'middle',
        image: '/images/scratch.jpeg',
        tag: 'IT школа',
        tagColor: 'amber-500',
        colorClass: 'accent',
        bgClass: 'bg-[#74BE6D]',
        textClass: 'text-primary-light',
        hoverClass: 'hover:bg-accent-hover',
        price: '2400 грн/місяць',
        skills: [
          { name: 'Програмування', level: 'початковий' },
          { name: 'Анімація', level: 'середній' },
          { name: 'Креативність', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з Scratch',
          'Створення перших анімацій',
          'Розробка інтерактивних проектів',
          'Створення власного проєкту',
        ],
      },
      {
        title: 'ДРОНИ - курс для майбутніх пілотів',
        description:
          'Курс навчає дітей основам керування дронами, розвиває просторове мислення та технічні навички. Діти вивчають принципи польотів та програмування безпілотників.',
        detailedDescription:
          'Детальний опис курсу з програмування та керування дронами',
        duration: '9 місяців',
        schedule: '2 рази на тиждень або субота, 2 години',
        age: '7-16 років',
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
          { name: 'Програмування', level: 'початковий' },
          { name: 'Авіація', level: 'середній' },
          { name: 'Креативність', level: 'середній' },
        ],
        progressSteps: [
          'Знайомство з дронами',
          'Основи програмування дронів',
          'Розробка польотних завдань',
          'Створення власного проєкту',
        ],
      },
    ],
    []
  )

  const filters = useMemo<FilterOption[]>(
    () => [
      { id: 'all', label: 'Всі напрямки' },
      { id: 'IT школа', label: 'IT школа' },
      { id: 'DRONE школа', label: 'DRONE школа' },
      { id: 'clubs', label: 'Онлайн' },
    ],
    []
  )

  const [activeFilter, setActiveFilter] = useState('all')
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [showNav, setShowNav] = useState(false)

  const expandedViewRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const isHashChangeInProgress = useRef(false)

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
    [scrollToOnlineLearning]
  )

  // Show navigation when component is mounted
  useEffect(() => {
    if (isMounted) {
      setShowNav(true)
    }
  }, [isMounted])

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
            window.location.pathname + window.location.search
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
          isMobile ? 100 : 50
        )
      }
    },
    [expandedCourse, isAnimating, filteredCourses.length]
  )

  // Close handler
  const handleClose = useCallback(() => {
    if (expandedCourse !== null) {
      handleCourseClick(expandedCourse)
    }
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
            (course) => courses[courseId].title === course.title
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
      handleCourseSelection as EventListener
    )

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener(
        'changeFilter',
        handleFilterChange as EventListener
      )
      window.removeEventListener(
        'selectCourse',
        handleCourseSelection as EventListener
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
            className="rounded-[10px] overflow-hidden cursor-pointer aspect-[5/6] w-full group relative card-item bg-[#171A20]"
            initial={{ boxShadow: '0 0 0 rgba(0,0,0,0)', y: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            whileHover={
              isMobile
                ? undefined
                : {
                    y: -4,
                    boxShadow: '0 18px 28px rgba(10, 12, 16, 0.24)',
                    zIndex: 50,
                  }
            }
            style={{
              border: isExpanded
                ? '2px solid rgba(90, 162, 255, 0.95)'
                : '1px solid rgba(43, 47, 57, 0.9)',
              transformOrigin: 'center center',
              willChange: isMobile ? 'auto' : 'transform, opacity',
              transform: 'translateZ(0)',
              opacity: isMounted ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            transition={
              isMobile
                ? { duration: 0.2 }
                : {
                    type: 'spring',
                    stiffness: 150,
                    damping: 20,
                  }
            }
            onClick={() => handleCourseClick(index)}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center min-h-[62px] border-b border-white/5 bg-[#2A2D35] px-5 py-3">
              <h3 className="text-[17px] md:text-[18px] font-extrabold text-white leading-tight line-clamp-2">
                {course.title}
              </h3>
            </div>

            <div className="absolute inset-0 overflow-hidden h-full">
              <div
                className="absolute inset-0 top-[62px]"
                style={{ willChange: isMobile ? 'auto' : 'transform' }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover w-full h-full"
                  loading={isMobile ? 'eager' : 'lazy'}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
                  priority={index < 2 && isMobile}
                />
              </div>

              <div
                className="absolute inset-0 top-[62px] bg-gradient-to-b from-transparent via-black/10 to-black/18 opacity-100 transition-all duration-300 ease-in-out"
                style={{ willChange: isMobile ? 'auto' : 'opacity' }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-3 z-20">
              <div className="flex items-center justify-between rounded-[8px] border border-white/8 bg-[#171A20]/78 px-3 py-2 backdrop-blur-sm">
                <span className="text-[11px] font-bold uppercase tracking-[0.03em] text-white/85">
                  {course.tag}
                </span>
                <span className="text-[11px] text-white/60">
                  Детальніше
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }
  )

  CourseCard.displayName = 'CourseCard'

  const ProgressPath = memo(({ steps }: { steps: string[] }) => {
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
      <div className="mt-6 mb-8">
        <h4 className="font-semibold mb-3 text-white">Шлях розвитку:</h4>
        <div
          className={`flex items-center ${
            isMobile ? 'overflow-x-auto pb-2 hide-scrollbar' : ''
          }`}
        >
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#78C86F] text-[#1A2318]">
                  {idx === 0 ? (
                    <Star size={16} />
                  ) : idx === steps.length - 1 ? (
                    <Trophy size={16} />
                  ) : (
                    <Award size={16} />
                  )}
                </div>
                <p className="text-xs text-center mt-1 w-24 line-clamp-2 text-white/75">
                  {step}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className="h-0.5 w-6 bg-white/15 mx-1"></div>
              )}
            </div>
          ))}
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
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => handleFilterClick(filter)}
                disabled={filter.disabled}
                className={`px-5 md:px-6 py-3 text-[14px] md:text-[16px] rounded-[4px] transition-all duration-300 border font-semibold ${
                  filter.disabled
                    ? 'border-[#C9CBC7] bg-[#F0F1EE] text-[#A6A8A4] cursor-not-allowed'
                    : ''
                } ${
                  activeFilter === filter.id
                    ? 'bg-[#78C86F] border-[#78C86F] hover:bg-[#8BC886] text-[#1C261B] shadow-none'
                    : !filter.disabled
                    ? 'bg-transparent border-[#B9BCB6] text-[#4F574E] hover:bg-white/60 hover:text-[#2A2C31]'
                    : ''
                } ${
                  filter.id === 'clubs'
                    ? 'online-filter-chip border-[#86CC82] bg-[#EEF7E8] text-[#2D4328] hover:bg-[#E6F4DF] hover:text-[#21311D]'
                    : ''
                }`}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: activeFilter === filter.id ? 1.01 : 1,
                  opacity: isMounted ? 1 : 0,
                  transition: { duration: 0.3 },
                }}
                initial={{ opacity: 0 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>

          <div className="hidden md:flex gap-3 ml-4 z-10">
            {isMounted && showNav && (
              <>
                <motion.button
                  className="!static !w-11 !h-11 flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:bg-white/70 transition-all p-1"
                  aria-label="Previous slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault()
                    swiperRef.current?.slidePrev()
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                <motion.button
                  className="!static !w-11 !h-11 flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:bg-white/70 transition-all p-1"
                  aria-label="Next slide"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => {
                    e.preventDefault()
                    swiperRef.current?.slideNext()
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
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper
                    }}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: true,
                      pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                      640: { slidesPerView: 1, spaceBetween: 5 },
                      768: { slidesPerView: 1.45, spaceBetween: 8 },
                      1024: { slidesPerView: 2.2, spaceBetween: 8 },
                      1280: { slidesPerView: 2.9, spaceBetween: 8 },
                    }}
                    className="courses-swiper !pb-10 !overflow-visible"
                  >
                    {filteredCourses.map((course, index) => (
                      <SwiperSlide
                        key={`${course.title}-${index}`}
                        className="!h-auto !overflow-visible"
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
                        <button
                          className="swiper-button-prev-mobile !static !w-10 !h-10 flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:bg-white/70 transition-all"
                          aria-label="Previous slide"
                          onClick={(e) => {
                            e.preventDefault()
                            swiperRef.current?.slidePrev()
                          }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          className="swiper-button-next-mobile !static !w-10 !h-10 flex items-center justify-center border border-[#B9BCB6] text-[#2F3136] rounded-[4px] bg-transparent hover:bg-white/70 transition-all"
                          aria-label="Next slide"
                          onClick={(e) => {
                            e.preventDefault()
                            swiperRef.current?.slideNext()
                          }}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-5 pb-2 md:pb-6">
                  {filteredCourses.slice(0, 4).map((course, index) => (
                    <div
                      key={`skeleton-${index}`}
                      className="aspect-[5/6] w-full rounded-[25px] bg-[#EAF1E4] animate-pulse"
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
                    <div className="relative w-full md:w-[310px] lg:w-[360px] h-[300px] md:h-auto overflow-hidden">
                      <Image
                        src={
                          filteredCourses[expandedCourse]?.image ||
                          '/images/placeholder.jpg'
                        }
                        alt={filteredCourses[expandedCourse]?.title || 'Course'}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        className="object-cover w-full h-full"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/20 md:bg-gradient-to-t md:from-black/20 md:to-transparent" />
                    </div>

                    <div className="p-5 md:p-8 flex-1 bg-[#2F323A] relative z-10 text-white">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-[4px] border border-white/15 text-[11px] font-bold uppercase tracking-[0.04em] text-white/80">
                          {filteredCourses[expandedCourse]?.tag || ''}
                        </span>
                        <span className="px-2.5 py-1 rounded-[4px] border border-white/10 text-[11px] text-white/70">
                          {filteredCourses[expandedCourse]?.duration || ''}
                        </span>
                        <span className="px-2.5 py-1 rounded-[4px] border border-white/10 text-[11px] text-white/70">
                          {filteredCourses[expandedCourse]?.age || ''}
                        </span>
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
                        <h3 className="font-semibold mb-3 text-white">
                          Навички, які здобуде дитина:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {filteredCourses[expandedCourse]?.skills?.map(
                            (skill, idx) => (
                              <motion.div
                                key={`skill-${idx}`}
                                className="px-3 py-1.5 bg-white/5 rounded-[6px] text-sm flex items-center border border-white/10 text-white"
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
                                <span
                                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                                    skill.level === 'базовий'
                                      ? 'bg-[#202A1F] text-[#99D08E]'
                                      : skill.level === 'середній'
                                      ? 'bg-[#1F252E] text-[#AFC4FF]'
                                      : 'bg-[#25272D] text-[#D5D7DB]'
                                  }`}
                                >
                                  {skill.level}
                                </span>
                              </motion.div>
                            )
                          ) || <div>Інформація про навички відсутня</div>}
                        </div>
                      </motion.div>

                      {filteredCourses[expandedCourse]?.progressSteps && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 }}
                          className="overflow-x-auto pb-2"
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
                            <p className="font-bold mb-1 text-white">
                              Графік
                            </p>
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
                      </motion.div>
                      <motion.div
                        className="flex justify-end items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 }}
                      >
                        <motion.button
                          onClick={handleClose}
                          className="text-white/70 hover:text-white transition-all font-medium flex items-center gap-1"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <X size={16} /> Закрити
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        )}
        <div className="text-center pt-6 md:pt-8">
          <p className="text-base md:text-[18px] font-medium mb-4 text-[#4D4F54]">
            Хочете, щоб ваша дитина опанувала один із перелічених напрямків?
            Записуйтеся на пробне.
          </p>
          <motion.button
            onClick={() => setIsConsultationModalOpen(true)}
            className="inline-block bg-[#78C86F] text-[#1A2518] py-3.5 px-8 md:px-10 text-base md:text-lg font-extrabold rounded-[4px] hover:bg-[#8BC886] transition hover:scale-[1.02] transform duration-300"
          >
            Прийти на пробне
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
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        @media (max-width: 767px) {
          .mobile-expanded-card {
            transform: translateZ(0);
            -webkit-transform: translateZ(0);
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
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
