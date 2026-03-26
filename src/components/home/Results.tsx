'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
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

const Results = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
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
    ['-5%', '5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`),
  )
  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '10%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`),
  )
  const cardsY = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['5%', '-5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`),
  )
  const statsY = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ['10%', '-10%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`),
  )
  const projectsY = useTransform(
    scrollYProgress,
    [0.4, 1],
    ['15%', '-5%'].map((val) => `${parseFloat(val) * mobileReduceFactor}%`),
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
      direction: 'IT школа',
      tool: 'Python + Pygame',
    },
    {
      id: 2,
      title: '3D-модель "Дракон"',
      description:
        'Модель, створена за допомогою ThinkerCad та надрукована на 3D-принтері',
      image: '/work/3d_1.png',
      student: 'Олександр К., 13 років',
      direction: 'IT школа',
      tool: 'Tinkercad + 3D-друк',
    },
    {
      id: 3,
      title: 'Дизайн рекламного креативу',
      description: 'Реклама танцювального майстер класу, розроблена у Canva',
      image: '/work/ПР №15.png',
      student: 'Марія Т., 12 років',
      direction: 'IT школа',
      tool: 'Canva',
    },
    {
      id: 4,
      title: '3D-модель "Ялинки"',
      description:
        'Модель, створена у середовищі ThinkerCad та надрукована за допомогою 3D-принтера',
      image: '/work/3d_2.png',
      student: 'Ярослав М., 12 років',
      direction: 'IT школа',
      tool: 'Tinkercad + 3D-друк',
    },
    {
      id: 5,
      title: 'Автомобільний постер',
      description:
        'Постер присвячений автомобілю Porsche GT3 RS, створений у середовищі Canva',
      image: '/work/кіщак Маряна пр14.png',
      student: 'Марʼяна К., 13 років',
      direction: 'IT школа',
      tool: 'Canva',
    },
    {
      id: 6,
      title: 'Дрон "Бікоптер"',
      description: 'Дрон, створений нашим студентом, на курсі з напрямку ДРОНИ',
      image: '/work/drone.jpeg',
      student: 'Максим Р., 12 років',
      direction: 'DRONE школа',
      tool: 'Drone engineering',
    },
  ]

  const activeProject = studentProjects[activeIndex] ?? studentProjects[0]

  const moveProject = (direction: 'prev' | 'next') => {
    setActiveIndex((prev) =>
      direction === 'next'
        ? (prev + 1) % studentProjects.length
        : (prev - 1 + studentProjects.length) % studentProjects.length,
    )
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
                (val) => `${parseFloat(val) * mobileReduceFactor}px`,
              ),
            ),
            x: useTransform(
              scrollYProgress,
              [0, 1],
              ['-20px', '20px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`,
              ),
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
                (val) => `${parseFloat(val) * mobileReduceFactor}px`,
              ),
            ),
            x: useTransform(
              scrollYProgress,
              [0, 1],
              ['30px', '-30px'].map(
                (val) => `${parseFloat(val) * mobileReduceFactor}px`,
              ),
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
        <motion.div className="hidden" style={{ y: statsY }}>
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
          className="relative overflow-hidden mb-0 rounded-[10px] border border-[#D8DED2] bg-[#ECEEEA] p-4 md:p-6 lg:p-7"
          style={{ y: projectsY }}
        >
          <div className="relative">
            <div className="mb-5 md:mb-6">
              <div>
                <h2 className="mb-2 text-[#292A2C] text-[30px] md:text-[42px] font-extrabold uppercase tracking-[-0.04em] leading-[0.9]">
                  РОБОТИ НАШИХ УЧНІВ
                </h2>
                <p className="max-w-2xl text-[#4E5750] text-[15px] md:text-[18px] leading-relaxed">
                  Не шаблони, а живі проєкти дітей: від першої ідеї до
                  фінального результату.
                </p>
              </div>
            </div>

            <div className="grid gap-4 lg:gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
              <article
                className="group relative overflow-hidden rounded-[8px] border border-[#D3DACD] bg-[#F1F4EC]"
              >
                <div className="relative h-[280px] md:h-[360px] lg:h-[410px] border-b border-[#D3DACD]">
                  <Image
                    src={activeProject.image}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover group-hover:scale-[1.025] transition-transform duration-500"
                    priority
                    fetchPriority="high"
                    quality={68}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/8 to-transparent" />

                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span
                      className={`inline-flex rounded-[4px] border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.04em] ${
                        activeProject.direction === 'DRONE школа'
                          ? 'bg-[#DDEBFF]/95 text-[#264E88] border-[#A6C2EC]'
                          : 'bg-[#E7F5DF]/95 text-[#2B6A27] border-[#A7D19D]'
                      }`}
                    >
                      {activeProject.direction}
                    </span>
                    <span className="inline-flex rounded-[4px] border border-[#CFD6C9] bg-[#EEF3E7] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#455247]">
                      {activeProject.tool}
                    </span>
                  </div>

                  <div className="absolute right-4 top-4 rounded-[4px] border border-[#CFD6C9] bg-[#EEF3E7] px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.04em] text-[#5A665A]">
                    #{String(activeIndex + 1).padStart(2, '0')}
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 p-4 md:p-5">
                    <p className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.38)] text-[21px] md:text-[30px] font-extrabold uppercase tracking-[-0.03em] leading-[0.94] max-w-[22ch]">
                      {activeProject.title}
                    </p>
                  </div>
                </div>

                <div className="p-4 md:p-5 lg:p-6 bg-[#F1F4EC]">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex rounded-[4px] border border-[#CDD5C7] bg-[#ECEFE7] px-2.5 py-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.06em] text-[#526050]">
                      {activeProject.student}
                    </span>
                    <span className="inline-flex rounded-[4px] border border-[#BFD8B8] bg-[#EAF4E2] px-2.5 py-1 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.06em] text-[#3D6B39]">
                      Учнівський проєкт
                    </span>
                  </div>

                  <p className="text-[15px] md:text-[17px] leading-[1.3] text-[#434E45] max-w-3xl">
                    {activeProject.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        moveProject('prev')
                      }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#CDD5C7] bg-[#ECEFE7] text-[#3F4A41] transition-colors hover:bg-[#E4E9DF]"
                      aria-label="Попередня робота"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        moveProject('next')
                      }}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[4px] border border-[#CDD5C7] bg-[#ECEFE7] text-[#3F4A41] transition-colors hover:bg-[#E4E9DF]"
                      aria-label="Наступна робота"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>

              <aside className="rounded-[8px] border border-[#D3DACD] bg-[#F1F4EC] p-2 md:p-3 lg:p-4">
                <div className="mb-3 px-1 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#667265]">
                  Оберіть роботу
                </div>

                <div className="project-rail-scroll grid gap-2 max-h-[560px] overflow-auto pr-1">
                  {studentProjects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`w-full text-left overflow-hidden rounded-[6px] border transition-colors ${
                        index === activeIndex
                          ? 'border-[#B9DDB5] bg-[#E8F3DF]'
                          : 'border-[#D3DACD] bg-[#EEF2E8] hover:bg-[#E6ECDE]'
                      }`}
                    >
                      <div className="grid grid-cols-[96px_minmax(0,1fr)] items-stretch">
                        <div className="relative h-[84px]">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/25" />
                        </div>
                        <div className="p-3">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#667265]">
                              #{String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#6E7A6D]">
                              {project.student}
                            </span>
                          </div>
                          <p className="text-[15px] leading-tight font-bold text-[#2E342F] line-clamp-2">
                            {project.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </aside>
            </div>

          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .project-rail-scroll::-webkit-scrollbar {
          width: 7px;
        }
        .project-rail-scroll::-webkit-scrollbar-track {
          background: #e2e7da;
          border-radius: 999px;
        }
        .project-rail-scroll::-webkit-scrollbar-thumb {
          background: #bdd8b3;
          border-radius: 999px;
        }
      `}</style>
    </section>
  )
}

export default Results
