'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Brain,
  Lightbulb,
  CodeSquare,
  Zap,
  FlaskConical,
  Maximize2,
  Trophy,
  BarChart3,
  Users,
  ThumbsUp,
  Split,
} from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import ProjectPreview from '../other/ProjectPreview'
import type { Swiper as SwiperType } from 'swiper'

const Results = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<
    (typeof studentProjects)[0] | null
  >(null)
  const [counters, setCounters] = useState({
    parentSatisfaction: 0,
    mathImprovement: 0,
    itContinuation: 0,
    referrals: 0,
  })

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Transform values for parallax animations with reduced effect on mobile
  const mobileReduceFactor = isMobile ? 0.5 : 1
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-5%', '5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`)
  )
  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '10%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`)
  )
  const cardsY = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['5%', '-5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`)
  )
  const statsY = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ['10%', '-10%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`)
  )
  const projectsY = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['15%', '-5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`)
  )

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

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.classList.add('project-preview-modal-open')
      const event = new CustomEvent('projectPreviewModal', {
        detail: { isOpen: true },
      })
      window.dispatchEvent(event)
    } else {
      document.body.classList.remove('project-preview-modal-open')

      const previewEvent = new CustomEvent('projectPreviewModal', {
        detail: { isOpen: false },
      })
      window.dispatchEvent(previewEvent)
    }

    return () => {
      document.body.classList.remove('project-preview-modal-open')

      const previewEvent = new CustomEvent('projectPreviewModal', {
        detail: { isOpen: false },
      })
      window.dispatchEvent(previewEvent)
    }
  }, [isPreviewOpen])

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

  const studentProjects = [
    {
      id: 1,
      title: 'Гра "Полювання на писанки"',
      description:
        'Інтерактивна гра, створена в середовищі Pygame,за допомогою Python',
      image: '/work/game.png',
      student: 'Марʼян Г., 12 років',
    },
    {
      id: 2,
      title: '3D-модель "Дракон"',
      description:
        'Модель, створена за допомогою ThinkerCad та надрукована на 3D-принтері',
      image: '/work/3d_1.png',
      student: 'Олександр К., 13 років',
    },
    {
      id: 3,
      title: 'Дизайн рекламного креативу',
      description: 'Реклама танцювального майстер класу, розроблена у Canva',
      image: '/work/ПР №15.png',
      student: 'Марія Т., 12 років',
    },
    {
      id: 4,
      title: '3D-модель "Ялинки"',
      description:
        'Модель, створена у середовищі ThinkerCad та надрукована за допомогою 3D-принтера',
      image: '/work/3d_2.png',
      student: 'Ярослав М., 12 років',
    },
    {
      id: 5,
      title: 'Автомобільний постер',
      description:
        'Постер присвячений автомобілю Porsche GT3 RS, створений у середовищі Canva',
      image: '/work/кіщак Маряна пр14.png',
      student: 'Марʼяна К., 13 років',
    },
    {
      id: 6,
      title: 'Дрон "Бікоптер"',
      description: 'Дрон, створений нашим студентом, на курсі з напрямку ДРОНИ',
      image: '/work/drone.jpeg',
      student: 'Максим Р., 12 років',
    },
  ]

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
      ref={sectionRef}
      className="lc-section-soft pb-10 lg:pb-14 courses-section"
    >
      {/* Parallax background decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="absolute h-full w-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* Reduce motion intensity on mobile */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          style={{
            transform: 'translate(10px, -10px)',
            y: useTransform(
              scrollYProgress,
              [0, 1],
              ['-30px', '30px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`
              )
            ),
            x: useTransform(
              scrollYProgress,
              [0, 1],
              ['-20px', '20px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`
              )
            ),
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
          style={{
            transform: 'translate(-10px, 10px)',
            y: useTransform(
              scrollYProgress,
              [0, 1],
              ['50px', '-50px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`
              )
            ),
            x: useTransform(
              scrollYProgress,
              [0, 1],
              ['30px', '-30px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`
              )
            ),
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="hidden"
          style={{ y: headerY }}
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
          style={{ y: cardsY }}
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
                  <h3 className="text-xl font-bold mb-2 text-text">
                    {outcome.title}
                  </h3>
                  <p className="text-primary/75 flex-grow text-sm">
                    {outcome.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievement Statistics - Horizontal Cards with Parallax */}
        <motion.div
          className="hidden"
          style={{ y: statsY }}
        >
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
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-text">
              Наші досягнення у цифрах
            </h3>

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
                    <h4 className="text-3xl md:text-4xl font-bold mb-2 text-text tracking-tight">
                      {stat.title}
                    </h4>
                    <p className="text-primary/70 text-sm">{stat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Student Projects Section with Parallax */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden mb-0 bg-transparent p-4 md:p-6 lg:p-8 min-h-[72svh]"
          style={{ y: projectsY }}
        >
          <div className="relative">
            <div className="mb-4 md:mb-6 lg:mb-8 flex items-end justify-between gap-4">
              <h2 className="lc-section-title mb-0">РОБОТИ НАШИХ УЧНІВ</h2>

              {/* Desktop navigation buttons */}
              <div className="hidden md:flex justify-end gap-2 z-10 relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (swiperRef.current) {
                      swiperRef.current.slidePrev()
                    }
                  }}
                  className="!static !w-10 !h-10 flex items-center justify-center border border-[#C8D0C5] text-[#2D332D] rounded-[4px] bg-[#F7FAF4] hover:bg-[#EAF2E4] hover:border-[#AFC4A6] transition-all p-1 z-20"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (swiperRef.current) {
                      swiperRef.current.slideNext()
                    }
                  }}
                  className="!static !w-10 !h-10 flex items-center justify-center border border-[#C8D0C5] text-[#2D332D] rounded-[4px] bg-[#F7FAF4] hover:bg-[#EAF2E4] hover:border-[#AFC4A6] transition-all p-1 z-20"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Desktop navigation buttons - top right (legacy hidden) */}
            <div className="hidden">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (swiperRef.current) {
                    swiperRef.current.slidePrev()
                  }
                }}
                className="!static !w-8 !h-8 flex items-center justify-center border border-primary/15 text-primary/70 rounded-[8px] bg-white hover:bg-primary hover:border-primary hover:text-white transition-all p-1 z-20 lc-icon-btn"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (swiperRef.current) {
                    swiperRef.current.slideNext()
                  }
                }}
                className="!static !w-8 !h-8 flex items-center justify-center border border-primary/15 text-primary/70 rounded-[8px] bg-white hover:bg-primary hover:border-primary hover:text-white transition-all p-1 z-20 lc-icon-btn"
                aria-label="Next project"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div
              className="relative"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
                maskImage:
                  'linear-gradient(to right, transparent 0px, black 12px, black calc(100% - 12px), transparent 100%)',
              }}
            >
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={18}
                slidesPerView="auto"
                onSwiper={(swiper) => {
                  swiperRef.current = swiper
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                breakpoints={{
                  640: { slidesPerView: 1.08 },
                  768: { slidesPerView: 1.35 },
                  1024: { slidesPerView: 1.85 },
                  1440: { slidesPerView: 2.15 },
                }}
                className="project-swiper !overflow-visible"
                watchSlidesProgress={true}
              >
                {studentProjects.map((project, index) => (
                  <SwiperSlide key={project.id} className="!h-auto max-w-[92vw] md:max-w-none">
                    <div
                      className="overflow-hidden transition-all duration-500 border border-[#CDD4CA] cursor-pointer relative bg-[#FBFCF9] h-full flex flex-col group hover:border-[#AFC8A9] min-h-[520px] md:min-h-[590px] lg:min-h-[640px]"
                      onClick={() => {
                        setCurrentProjectIndex(index)
                        setIsPreviewOpen(true)
                      }}
                    >
                      <div className="relative h-[320px] md:h-[390px] lg:h-[470px] overflow-hidden border-b border-[#D7DDD3]">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/5" />
                        <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5">
                          <h3 className="font-extrabold text-white text-[18px] md:text-[22px] leading-[0.98] tracking-[-0.03em] uppercase max-w-[22ch] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 md:p-5 lg:p-6 flex-grow flex flex-col bg-[linear-gradient(180deg,#FBFCF9_0%,#F4F7F1_100%)]">
                        <p className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#566055] mb-2">
                          {project.student}
                        </p>
                        <p className="text-[15px] md:text-[17px] text-[#2C312D]/85 leading-[1.15] line-clamp-4 md:line-clamp-5">
                          {project.description}
                        </p>

                        <div className="mt-auto pt-4 border-t border-[#D7DDD3] flex justify-between items-center">
                          <span className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3D463C]">
                            Учнівська робота
                          </span>
                          <div className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5E685D] flex items-center">
                            <span className="mr-1">Деталі</span>
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Improved mobile navigation buttons with consistent styling */}
            <div className="flex md:hidden justify-center items-center gap-3 mt-6 mb-4 z-10 relative">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (swiperRef.current) {
                    swiperRef.current.slidePrev()
                  }
                }}
                className="!w-10 !h-10 flex items-center justify-center border border-[#C8D0C5] text-[#2D332D] rounded-[4px] bg-[#F7FAF4] hover:bg-[#EAF2E4] hover:border-[#AFC4A6] transition-all z-20"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (swiperRef.current) {
                    swiperRef.current.slideNext()
                  }
                }}
                className="!w-10 !h-10 flex items-center justify-center border border-[#C8D0C5] text-[#2D332D] rounded-[4px] bg-[#F7FAF4] hover:bg-[#EAF2E4] hover:border-[#AFC4A6] transition-all z-20"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <ProjectPreview
        projects={studentProjects}
        isOpen={isPreviewOpen}
        currentIndex={currentProjectIndex}
        onClose={() => setIsPreviewOpen(false)}
        onNext={() =>
          setCurrentProjectIndex((prev) => (prev + 1) % studentProjects.length)
        }
        onPrev={() =>
          setCurrentProjectIndex(
            (prev) =>
              (prev - 1 + studentProjects.length) % studentProjects.length
          )
        }
      />

      <style jsx global>{`
        .courses-section .swiper-button-next:after,
        .courses-section .swiper-button-prev:after {
          display: none;
        }

        .courses-section .swiper-button-next,
        .courses-section .swiper-button-prev {
          background-color: white;
          border: 1px solid #d1d5db;
          color: #4b5563;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .courses-section .swiper-button-next:hover,
        .courses-section .swiper-button-prev:hover {
          background-color: #f3f4f6;
          border-color: #9ca3af;
          transform: scale(1.1);
        }

        .courses-section .swiper-button-disabled {
          opacity: 0.5;
          pointer-events: none;
        }

        .project-swiper .swiper-slide {
          height: auto;
          transition: transform 0.3s ease;
        }

        .project-swiper.swiper {
          padding-bottom: 20px;
        }

        /* Make all project cards clickable with visual feedback */
        .project-swiper .swiper-slide > div {
          cursor: pointer;
        }

        /* Optimize performance */
        .project-swiper .swiper-wrapper {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Project preview modal should be highest */
        .project-preview-modal-open {
          z-index: 20000 !important;
        }
      `}</style>
    </section>
  )
}

export default Results
