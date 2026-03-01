'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FreeLesson from '../other/FreeLesson'
import { ArrowRight, Star } from 'lucide-react'
import React from 'react'

const CallToAction = () => {
  // Add modal state
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Updated courses data
  const courses = [
    {
      id: 0, // Changed from 1 to 0 to match zero-based indexing in Courses
      title: 'Графічний дизайн. Сервіс Canva',
      description:
        'Курс допомагає дітям розвинути креативність та навички дизайну за допомогою зручного онлайн-сервісу Canva.',
      age: '8-12 років',
      duration: '9 місяців',
      color: '#78C86F',
      colorClass: 'accent',
      bgClass: 'bg-accent',
      textClass: 'text-accent',
      hoverClass: 'hover:bg-accent-hover',
      image: '/images/canva.jpeg',
      tag: 'IT школа',
    },
    {
      id: 1, // Changed from 2 to 1
      title: '3D-друк та моделювання ThinkerCad',
      description:
        'Цей курс ідеально підходить для дітей 7-9 років, які хочуть навчитись створювати власні 3D-моделі.',
      age: '7-9 років',
      duration: '9 місяців',
      color: '#6FB86A',
      colorClass: 'blue',
      bgClass: 'bg-blue',
      textClass: 'text-primary-light',
      hoverClass: 'hover:bg-blue/80',
      image: '/images/course.jpeg',
      tag: 'IT школа',
    },
    {
      id: 2, // Changed from 3 to 2
      title: 'Figma - курс для дизайнерів',
      description:
        'Опанування основ дизайну та роботи з макетами у Figma для дітей, які хочуть створювати візуальні проєкти.',
      age: '10-15 років',
      duration: '9 місяців',
      color: '#5A7F46',
      colorClass: 'red',
      bgClass: 'bg-red',
      textClass: 'text-primary-light',
      hoverClass: 'hover:bg-red/80',
      image: '/images/figma.jpeg',
      tag: 'IT школа',
    },
    {
      id: 3, // Changed from 4 to 3
      title: 'Python - легкий старт в програмуванні',
      description:
        'Введення у світ програмування через прості та зрозумілі завдання на мові Python.',
      age: '12-15 років',
      duration: '9 місяців',
      color: '#7BCF94',
      colorClass: 'primary-light',
      bgClass: 'bg-primary-light',
      textClass: 'text-primary-light',
      hoverClass: 'hover:bg-primary-light/80',
      image: '/images/python.jpeg',
      tag: 'IT школа',
    },
    {
      id: 4, // Changed from 5 to 4
      title: 'Графіка та анімація в Scratch',
      description:
        'Курс знайомить дітей з основами програмування та створення анімацій на платформі Scratch.',
      age: '8-12 років',
      duration: '9 місяців',
      color: '#78C86F',
      colorClass: 'accent',
      bgClass: 'bg-accent',
      textClass: 'text-accent',
      hoverClass: 'hover:bg-accent-hover',
      image: '/images/scratch.jpeg',
      tag: 'IT школа',
    },
    {
      id: 5, // Changed index to match position in Courses
      title: 'ДРОНИ - курс для майбутніх пілотів',
      description:
        'Освоєння навичок управління дронами та основ аерофотозйомки для дітей та підлітків.',
      age: '8-12 років',
      duration: '9 місяців',
      color: '#4E9D4A',
      colorClass: 'blue',
      bgClass: 'bg-blue',
      textClass: 'text-primary-light',
      hoverClass: 'hover:bg-blue/80',
      image: '/images/drone.jpeg',
      tag: 'DRONE школа',
    },
  ]

  // Auto-scrolling state for the courses
  const [isScrolling, setIsScrolling] = useState(true)
  const coursesRef = useRef<HTMLDivElement>(null)
  const scrollIntervalRef = useRef<number | null>(null)
  const lastTimestampRef = useRef<number>(0)

  // Responsive scroll behavior - horizontal for mobile, vertical for desktop
  const isMobileDevice = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 // md breakpoint
    }
    return false
  }

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkMobile = () => {
      setIsMobile(isMobileDevice())
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Improved smooth scroll using requestAnimationFrame instead of setInterval
  useEffect(() => {
    const scroller = coursesRef.current
    if (!scroller || !isScrolling) {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current)
        scrollIntervalRef.current = null
      }
      return
    }

    // Reduce animation speed on mobile for better performance
    const pixelsPerSecond = isMobile ? 25 : 35

    // Use a more efficient animation frame handler
    const animate = (timestamp: number) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp
      }

      // Bail early if element is no longer available
      if (!scroller) {
        cancelAnimationFrame(scrollIntervalRef.current!)
        return
      }

      const elapsed = timestamp - lastTimestampRef.current

      // Throttle updates for better performance on mobile
      if (elapsed < (isMobile ? 32 : 16)) {
        // Cap at ~30fps on mobile, ~60fps on desktop
        scrollIntervalRef.current = requestAnimationFrame(animate)
        return
      }

      const scrollAmount = (pixelsPerSecond * elapsed) / 1000 // Calculate fraction of movement based on elapsed time

      if (scroller) {
        if (isMobile) {
          // Horizontal scroll for mobile with proper physics
          scroller.scrollLeft += scrollAmount

          // Smoother reset when reaching end
          if (
            scroller.scrollLeft + scroller.clientWidth >=
            scroller.scrollWidth - 200
          ) {
            // Use a smoother reset approach - gradually scroll back
            if (scrollAmount > 0) {
              scroller.scrollLeft = 10
            }
          }
        } else {
          scroller.scrollTop += scrollAmount

          if (
            scroller.scrollTop + scroller.clientHeight >=
            scroller.scrollHeight - 200
          ) {
            scroller.scrollTop = 10
          }
        }
      }

      lastTimestampRef.current = timestamp
      scrollIntervalRef.current = requestAnimationFrame(animate)
    }

    scrollIntervalRef.current = requestAnimationFrame(animate)

    return () => {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current)
        scrollIntervalRef.current = null
      }
    }
  }, [isScrolling, isMobile])

  const handleCourseClick = (e: React.MouseEvent, courseId: number) => {
    e.preventDefault()

    // Stop auto-scrolling immediately to improve responsiveness
    setIsScrolling(false)

    const coursesSection = document.getElementById('napryamki')
    if (coursesSection) {
      // Create and dispatch a custom event instead of using hash navigation
      const courseSelectEvent = new CustomEvent('selectCourse', {
        detail: { courseId },
      })

      // First scroll to the section with smooth behavior
      coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' })

      // Dispatch the event after scrolling completes
      setTimeout(() => {
        window.dispatchEvent(courseSelectEvent)
        // Resume scrolling after navigation is complete
        setTimeout(() => setIsScrolling(true), 1000)
      }, 800)
    }
  }

  useEffect(() => {
    const hash = window.location.hash
    if (hash && hash.startsWith('#course-')) {
      history.replaceState(null, document.title, window.location.pathname)
    }
  }, [])

  // Optimized course card render with memoization to prevent re-renders
  interface CourseCardProps {
    course: (typeof courses)[0]
    isMobile: boolean
    handleClick: (e: React.MouseEvent, courseId: number) => void
  }

  const CourseCard = React.memo(function CourseCard({
    course,
    isMobile,
    handleClick,
  }: CourseCardProps) {
    return (
      <div
        className={
          isMobile
            ? 'flex-shrink-0 w-[300px] overflow-visible py-2 px-1'
            : 'block mb-3 overflow-visible py-1'
        }
        onClick={(e) => handleClick(e, course.id)}
      >
        <div
          className="overflow-hidden cursor-pointer group relative bg-[#FBFCF9] border border-[#D7DDD3] action-card"
          style={{
            willChange: isMobile ? 'auto' : 'transform',
            transform: 'translateZ(0)',
            transition: 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)',
            zIndex: 1,
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ backgroundColor: course.color }}
          ></div>

          <div className="p-4 md:p-4 pl-5">
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-[11px] md:text-xs font-semibold px-2 py-0.5 uppercase tracking-[0.06em] rounded-[2px]"
                style={{
                  backgroundColor: `${course.color}10`,
                  color: course.color,
                }}
              >
                {course.tag}
              </span>

              <span className="text-[11px] md:text-xs text-[#6B7469] font-medium">
                {course.age}
              </span>
            </div>

            <h3 className="font-bold text-[18px] md:text-[20px] tracking-[-0.03em] mb-1.5 line-clamp-2 leading-[1.02] text-[#262C28]">
              {course.title}
            </h3>

            <p className="text-[12px] md:text-[13px] text-[#5E685D] mb-3 line-clamp-2 leading-[1.2]">
              {course.description}
            </p>

            <div
              className={`flex items-center text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.04em] mt-auto ${
                isMobile ? '' : 'group-hover:translate-x-1'
              } transition-transform`}
              style={{ color: course.color }}
            >
              Переглянути курс
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="lc-section py-12 md:py-16"
      style={{
        height: 'auto',
        minHeight: isMobile ? 'unset' : '620px',
      }}
    >
      <div className="container relative z-10">
        <div className="relative w-full mx-auto overflow-hidden border border-[#D7DDD3] bg-[#FBFCF9]">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(243,246,238,0.8)_100%)]" />
            <div className="absolute left-0 top-0 h-full w-px bg-[#DDE4DA]" />
            <div className="absolute right-0 top-0 h-full w-px bg-[#DDE4DA]" />
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-[1.05fr_0.95fr] relative z-10">
            <div className="w-full border-b lg:border-b-0 lg:border-r border-[#D7DDD3] p-6 md:p-8 lg:p-10 xl:p-12 flex items-center">
              <div className="w-full max-w-[640px]">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="inline-flex items-center gap-2 bg-[#262A31] text-white font-semibold uppercase tracking-[0.03em] px-3 py-2 rounded-[4px] mb-5 border border-white/5"
                  >
                    <Star className="h-4 w-4" fill="currentColor" />
                    <span>Безкоштовне заняття</span>
                  </motion.div>

                  <motion.h2
                    className="lc-section-title mb-4 leading-tight text-left"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    КОНСУЛЬТАЦІЯ
                  </motion.h2>

                  <p className="lc-section-lead mb-6 max-w-[52ch] text-left">
                    Залиште заявку, щоб отримати консультацію та оцінити якість
                    навчання перед стартом.
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="mb-7 inline-flex items-center gap-2 border border-[#D7DDD3] bg-[#F7FAF4] px-3 py-2 text-[13px] md:text-[14px] font-semibold text-[#303630] rounded-[4px]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[#78C86F]" />
                    Можна навчатися офлайн у локації або онлайн
                  </motion.div>

                  <button
                    className="inline-flex items-center justify-center bg-[#78C86F] text-[#1C241A] py-3.5 px-8 text-base md:text-lg font-extrabold uppercase tracking-[-0.02em] rounded-[4px] hover:bg-[#86D17C] transition-colors duration-200"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Отримати консультацію
                  </button>
              </div>
            </div>

            <div
              className="w-full flex-shrink-0 relative"
              style={{
                height: isMobile ? 'auto' : '620px',
                maxHeight: isMobile ? '460px' : '620px',
              }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-[#D7DDD3] lg:hidden" />
              <div className="h-full p-4 md:p-5 lg:p-6">
                <div
                  className={`${isMobile ? '' : 'h-full'} relative bg-[#F6F9F3] border border-[#D7DDD3] p-2 md:p-3`}
                  onMouseEnter={() => setIsScrolling(false)}
                  onMouseLeave={() => setIsScrolling(true)}
                  onTouchStart={() => setIsScrolling(false)}
                  onTouchEnd={() =>
                    setTimeout(() => setIsScrolling(true), 5000)
                  }
                >
                  <div
                    className={`absolute ${
                      isMobile
                        ? 'left-0 right-0 top-0 h-8'
                        : 'top-0 left-0 right-0 h-14'
                    } bg-gradient-to-b from-[#F6F9F3] to-transparent z-10 pointer-events-none`}
                  ></div>
                  <div
                    className={`absolute ${
                      isMobile
                        ? 'left-0 right-0 bottom-0 h-8'
                        : 'bottom-0 left-0 right-0 h-14'
                    } bg-gradient-to-t from-[#F6F9F3] to-transparent z-10 pointer-events-none`}
                  ></div>

                  <div
                    ref={coursesRef}
                    className={`${
                      isMobile
                        ? 'flex overflow-x-auto py-4 gap-4'
                        : 'h-full overflow-y-auto py-3 space-y-0 pr-2'
                    } hide-scrollbar will-change-scroll`}
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch',
                      isolation: 'isolate',
                    }}
                  >
                    {(isMobile
                      ? [...courses, ...courses]
                      : [...courses, ...courses]
                    ).map((course, index) => (
                      <CourseCard
                        key={`${course.id}-${index}`}
                        course={course}
                        isMobile={isMobile}
                        handleClick={handleCourseClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal component */}
      <AnimatePresence>
        {isModalOpen && (
          <FreeLesson
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Enhanced styles */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Improve performance for scrolling elements */
        .will-change-scroll {
          will-change: scroll-position;
          -webkit-overflow-scrolling: touch;
          transform: translateZ(0);
        }

        /* Optimize course card hover */
        .action-card {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0, 0, 0);
          position: relative;
          opacity: 1 !important;
          animation: none !important;
          transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1),
            box-shadow 0.3s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
        }

        /* Change hover behavior to prevent disappearing content */
        .action-card.group:hover {
          z-index: 20 !important;
          position: relative;
          transform: translateY(-3px) scale(1.02) !important;
          box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.15) !important;
        }

        /* Prevent any animations from causing flicker */
        .action-card * {
          backface-visibility: hidden;
        }

        /* Fix potential stacking issues */
        .card-wrapper {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        /* Prevent scrolling issues */
        .will-change-scroll {
          contain: content;
          isolation: isolate;
        }

        /* Override any Framer Motion hover animations */
        .action-card,
        .action-card.group {
          will-change: transform, box-shadow;
        }

      `}</style>
    </motion.section>
  )
}

export default CallToAction
