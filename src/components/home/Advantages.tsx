'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import FreeLesson from '../other/FreeLesson'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const Advantages = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const materialsRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const yValuesRef = useRef([-5, -10, -15, -20])
  const rotateValuesRef = useRef([0, 2, -2, 0])
  const scaleValuesRef = useRef([0.9, 1.05, 1.1, 1])

  const ySpring = useSpring(0, { damping: 15, stiffness: 60, mass: 1 }) // Reduced stiffness for smoother animation
  const rotateSpring = useSpring(0, { damping: 20, stiffness: 80 })
  const scaleSpring = useSpring(0.9, { damping: 25, stiffness: 70 })

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  // First, define the scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Define transforms at the component top level using the refs before they're used
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1.5],
    [-50, -25, 0, 55, 100]
  )

  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [-1, -0.5, 0, 0.5, 1]
  )

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.95, 0.97, 1, 1.03, 1.05]
  )

  // Simplify the calculation function
  const calculateAnimationValues = () => {
    if (!sectionRef.current) return

    // Use more pronounced values for noticeable parallax effect
    yValuesRef.current = [-15, 10, -10, 15]
    rotateValuesRef.current = [-1, 1, -1, 1]
    scaleValuesRef.current = [0.98, 1.02, 1.03, 1.01]
  }

  // Simplify the effect using the image transforms
  useEffect(() => {
    // Only apply animations on larger screens
    if (isMobile) return () => {}

    // Використовуємо пряме підключення значень без обмеження для кращої плавності
    const unsubscribeY = imageY.on('change', (v) => {
      ySpring.set(v)
    })

    const unsubscribeRotate = imageRotate.on('change', (v) => {
      rotateSpring.set(v)
    })

    const unsubscribeScale = imageScale.on('change', (v) => {
      scaleSpring.set(v)
    })

    return () => {
      unsubscribeY()
      unsubscribeRotate()
      unsubscribeScale()
    }
  }, [
    imageY,
    imageRotate,
    imageScale,
    ySpring,
    rotateSpring,
    scaleSpring,
    isMobile,
  ])

  // Handle window resize and initial setup
  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const vh = window.innerHeight
        setViewportHeight(vh)
        setIsMobile(window.innerWidth < 768)
        calculateAnimationValues()
      }

      setViewportHeight(window.innerHeight)
      setIsMobile(window.innerWidth < 768)
      window.addEventListener('resize', handleResize)

      // Initial calculation with a short delay to ensure proper mounting
      setTimeout(() => {
        calculateAnimationValues()
      }, 100)

      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Recalculate animation values when viewport height changes
  useEffect(() => {
    if (isMounted && sectionRef.current) {
      calculateAnimationValues()
    }
  }, [isMounted, viewportHeight, containerHeight])

  // Debug logging - removed console.log
  useEffect(() => {
    if (isMounted && process.env.NODE_ENV === 'development') {
      const unsubscribe = scrollYProgress.on('change', () => {
        // Console log removed
      })
      return () => unsubscribe()
    }
  }, [isMounted, scrollYProgress, imageY, imageRotate, imageScale])

  // Enhanced color mapping with more distinct color combinations
  const emojiGradientMap = {
    '🧩': {
      icon: 'from-[#D7EFCF] to-[#82CB83]',
      card: 'from-[#F6FBF2] to-[#E7F4DF]',
      border: 'group-hover:border-primary-light/40',
    },
    '👨‍👩‍👧‍👦': {
      icon: 'from-[#DCEFD7] to-[#92C89E]',
      card: 'from-[#F8FCF5] to-[#EAF4E5]',
      border: 'group-hover:border-primary-light/35',
    },
    '👩‍🏫': {
      icon: 'from-[#E4F1DA] to-[#9FC783]',
      card: 'from-[#FBFDF6] to-[#EEF5E1]',
      border: 'group-hover:border-primary-light/35',
    },
    '💻': {
      icon: 'from-[#D4ECD9] to-[#79BE8F]',
      card: 'from-[#F4FBF6] to-[#E3F2E7]',
      border: 'group-hover:border-primary-light/35',
    },
    '📚': {
      icon: 'from-[#E3EFDB] to-[#95BA78]',
      card: 'from-[#FBFCF8] to-[#EDF3E4]',
      border: 'group-hover:border-primary-light/35',
    },
    '📅': {
      icon: 'from-[#D1EEDB] to-[#62BD98]',
      card: 'from-[#F2FBF7] to-[#E1F3EA]',
      border: 'hover:border-primary-light/35',
    },
    '🧰': {
      icon: 'from-[#D8EBD4] to-[#88BD86]',
      card: 'from-[#F6FBF3] to-[#E7F2E2]',
      border: 'hover:border-primary-light/35',
    },
  }

  const EmojiContainer = ({
    emoji,
    className = '',
  }: {
    emoji: string
    className?: string
  }) => {
    const colorMap = emojiGradientMap[
      emoji as keyof typeof emojiGradientMap
    ] || {
      icon: 'from-[#E6F1E0] to-[#A5CB8A]',
      card: 'from-[#FBFDF8] to-[#EEF5E3]',
      border: 'group-hover:border-primary-light/35',
    }

    return (
      <div
        className={`flex-shrink-0 bg-gradient-to-br ${colorMap.icon} rounded-[12px] p-3 mr-4 flex items-center justify-center w-14 h-14 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-[10px] scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
        <div className="text-2xl relative z-10">{emoji}</div>
      </div>
    )
  }

  // Define the advantages data to reuse in both mobile and desktop layouts
  const advantagesData = [
    {
      id: 1,
      emoji: '🧩',
      title: 'Різноманітність напрямків',
      description:
        'Наукові, технічно-інженерні, математичні та творчі напрямки для всебічного розвитку дитини.',
      colorClasses: {
        icon: 'from-[#D7EFCF] to-[#82CB83]',
        card: 'from-[#F6FBF2] to-[#E7F4DF]',
        border: 'group-hover:border-primary-light/40',
      },
    },
    {
      id: 2,
      emoji: '👨‍👩‍👧‍👦',
      title: 'Індивідуальний підхід',
      description:
        'Лише 6-8 дітей одного віку в групі, що дозволяє врахувати особливості кожного учня.',
      colorClasses: {
        icon: 'from-[#DCEFD7] to-[#92C89E]',
        card: 'from-[#F8FCF5] to-[#EAF4E5]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 3,
      emoji: '👩‍🏫',
      title: 'Професійна команда',
      description:
        "Багаторічний досвід роботи викладачів у поєднанні з любов'ю до дітей гарантують якісне навчання.",
      colorClasses: {
        icon: 'from-[#E4F1DA] to-[#9FC783]',
        card: 'from-[#FBFDF6] to-[#EEF5E1]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 4,
      emoji: '💻',
      title: 'Сучасне обладнання',
      description:
        'Найновітніші моделі технічного обладнання для ефективних занять та постійне оновлення технічної бази.',
      colorClasses: {
        icon: 'from-[#D4ECD9] to-[#79BE8F]',
        card: 'from-[#F4FBF6] to-[#E3F2E7]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 5,
      emoji: '📚',
      title: 'Авторська програма',
      description:
        'Інноваційна програма, яка адаптується під кожну навчальну групу для максимальної ефективності.',
      colorClasses: {
        icon: 'from-[#E3EFDB] to-[#95BA78]',
        card: 'from-[#FBFCF8] to-[#EDF3E4]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 6,
      emoji: '📅',
      title: 'Працюємо без вихідних',
      description:
        'Гнучкий графік занять як у будні після обіду, так і у вихідні протягом дня.',
      colorClasses: {
        icon: 'from-[#D1EEDB] to-[#62BD98]',
        card: 'from-[#F2FBF7] to-[#E1F3EA]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 7,
      emoji: '🧰',
      title: 'Надаємо усі матеріали',
      description:
        'Забезпечуємо усім необхідним на заняттях - від інструментів до матеріалів.',
      colorClasses: {
        icon: 'from-[#D8EBD4] to-[#88BD86]',
        card: 'from-[#F6FBF3] to-[#E7F2E2]',
        border: 'group-hover:border-primary-light/35',
      },
    },
    {
      id: 8,
      emoji: '🌟',
      title: 'Розвиток творчості',
      description:
        'Заохочуємо креативне мислення та творчий підхід до вирішення задач.',
      colorClasses: {
        icon: 'from-[#E0EFD6] to-[#A3C97A]',
        card: 'from-[#FAFCF6] to-[#EDF4E2]',
        border: 'group-hover:border-primary-light/35',
      },
    },
  ]

  // Reusable advantage card component
  const AdvantageCard = ({ data }: { data: (typeof advantagesData)[0] }) => (
    <div className="flex items-start h-full">
      <div
        className={`flex-shrink-0 bg-gradient-to-br ${data.colorClasses.icon} rounded-[12px] p-3 mr-4 flex items-center justify-center w-14 h-14 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-[10px] scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
        <div className="text-2xl relative z-8">{data.emoji}</div>
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold mb-2 text-text">{data.title}</h3>
        <p className="text-primary/75">{data.description}</p>
      </div>
    </div>
  )

  // Mobile swiper slide component
  const MobileAdvantageCard = ({
    data,
  }: {
    data: (typeof advantagesData)[0]
  }) => (
    <div
      className={`h-full bg-gradient-to-br ${data.colorClasses.card} rounded-[12px] p-5 border border-primary-light/20 shadow-sm flex flex-col lc-glass-card`}
    >
      <div
        className={`bg-gradient-to-br ${data.colorClasses.icon} rounded-[12px] p-3 mb-4 w-14 h-14 mx-auto flex items-center justify-center shadow-md`}
      >
        <span className="text-2xl">{data.emoji}</span>
      </div>
      <h3 className="text-lg font-bold mb-2 text-center">{data.title}</h3>
      <p className="text-sm text-primary/75 text-center">{data.description}</p>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="lc-section py-10 md:py-16 md:pb-16"
      id="advantages"
    >
      <div className="container relative z-8">
        {/* Title outside rounded container */}
        <motion.div
          className="max-w-2xl mr-auto text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <h2 className="lc-section-title mb-4 text-left">ПЕРЕВАГИ</h2>
          <p className="lc-section-lead text-left">
            Ми створили освітній простір, який допомагає дітям розкрити свій
            потенціал і підготуватися до професій майбутнього
          </p>
        </motion.div>

        {/* Animated blobs */}
        {isMounted && (
          <>
            <motion.div
              className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
            <motion.div
              className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"
              animate={{
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1.5,
              }}
            />
          </>
        )}

        {/* MOBILE LAYOUT */}
        {isMobile && (
          <div className="container relative z-10 py-4">
            {/* Parents Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full h-[300px] rounded-[12px] overflow-hidden shadow-lg mb-5"
            >
              {isMounted && (
                <div className="w-full h-full relative">
                  <Image
                    src="/parents.jpeg"
                    alt="Батьки учня Leo Code"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                    className="brightness-95"
                    priority
                  />
                </div>
              )}
            </motion.div>

            {/* Parents Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full lc-glass-card-strong rounded-[12px] p-5 mb-8"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-accent/10 rounded-[10px] flex items-center justify-center mr-3">
                  <span className="text-xl">👨‍👩‍👦</span>
                </div>
                <h4 className="text-lg font-bold">Батьки Олега</h4>
              </div>
              <p className="text-primary/70 text-sm italic">
                "Олегу дуже подобається навчатися в Leo Code. Він завжди
                повертається додому з новими знаннями та враженнями. Ми бачимо,
                як швидко він розвивається."
              </p>
            </motion.div>

            {/* Advantages Swiper */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full mb-8"
            >
              <h3 className="text-xl text-text font-bold mb-5 text-center">
                Наші переваги
              </h3>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={15}
                slidesPerView={1.2}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="advantages-swiper"
              >
                {advantagesData.map((advantage) => (
                  <SwiperSlide key={advantage.id} className="h-auto">
                    <div className="h-[280px]">
                      <MobileAdvantageCard data={advantage} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            {/* CTA button */}
            <div className="flex justify-center mt-5">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-primary-light text-primary py-3 px-8 text-lg font-bold rounded-[6px] hover:bg-accent transition hover:scale-105 transform duration-300 hover:shadow-[0_10px_24px_rgba(120,200,111,0.35)]"
              >
                <span className="relative flex items-center justify-center">
                  <span>Отримати консультацію</span>
                </span>
              </motion.button>
            </div>
          </div>
        )}

        {/* DESKTOP LAYOUT */}
        {!isMobile && (
          <div className="container relative z-10 py-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 auto-rows-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Feature Box 1 - Span 2 columns */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-[#F6FBF2] to-[#E7F4DF] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <AdvantageCard data={advantagesData[0]} />
              </motion.div>

              {/* Photo - Taller */}
              {isMounted && (
                <motion.div
                  variants={itemVariants}
                  className="md:col-span-1 lg:col-span-1 row-span-2 p-0 overflow-hidden rounded-[12px] shadow-xl flex flex-col"
                >
                  <div className="w-full h-full relative">
                    <Image
                      src="/parents.jpeg"
                      alt="Батьки учня Leo Code"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                      className="brightness-95"
                      priority
                    />
                  </div>
                </motion.div>
              )}

              {/* Feature Box 3 */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-[#F8FCF5] to-[#EAF4E5] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <AdvantageCard data={advantagesData[1]} />
              </motion.div>

              {/* Feature Box 4 - Equipment */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-[#F4FBF6] to-[#E3F2E7] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <AdvantageCard data={advantagesData[3]} />
              </motion.div>

              {/* Feature Box 5 - Wider box with prof team */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-[#FBFDF6] to-[#EEF5E1] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <AdvantageCard data={advantagesData[2]} />
              </motion.div>

              {/* Parents testimonial box - Below photo */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-1 lg:col-span-1 row-span-1 lc-glass-card-strong rounded-[12px] p-6 hover:shadow-lg transition-all duration-300 group aspect-square md:aspect-auto"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-[10px] flex items-center justify-center mr-3">
                      <span className="text-xl">👨‍👩‍👦</span>
                    </div>
                    <h4 className="text-lg font-bold">Батьки Олега</h4>
                  </div>
                  <p className="text-primary/70 text-sm italic">
                    "Олегу дуже подобається навчатися в Leo Code. Він завжди
                    повертається додому з новими знаннями та враженнями. Ми
                    бачимо, як швидко він розвивається."
                  </p>
                </div>
              </motion.div>

              {/* Feature Box 7 - Schedule */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-[#F2FBF7] to-[#E1F3EA] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 bg-gradient-to-br from-[#D1EEDB] to-[#62BD98] rounded-[10px] p-3 mr-3 flex items-center justify-center w-12 h-12 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 rounded-[8px] scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                      <div
                        className="text-2xl relative z-10"
                        role="img"
                        aria-label="Працюємо без вихідних"
                      >
                        📅
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-text">
                      Працюємо без вихідних
                    </h3>
                  </div>
                  <p className="text-primary/75 pl-1">
                    Гнучкий графік занять як у будні після обіду, так і у
                    вихідні протягом дня.
                  </p>
                </div>
              </motion.div>

              {/* Feature Box 8 - Materials */}
              <motion.div
                variants={itemVariants}
                ref={materialsRef}
                className="md:col-span-1 lg:col-span-1 row-span-1 bg-gradient-to-br from-[#F6FBF3] to-[#E7F2E2] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <div className="flex-shrink-0 bg-gradient-to-br from-[#D8EBD4] to-[#88BD86] rounded-[10px] p-3 mr-3 flex items-center justify-center w-12 h-12 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/20 rounded-[8px] scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                      <div
                        className="text-2xl relative z-10"
                        role="img"
                        aria-label="Надаємо усі матеріали"
                      >
                        🧰
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-text">
                      Надаємо усі матеріали
                    </h3>
                  </div>
                  <p className="text-primary/75 pl-1">
                    Забезпечуємо усім необхідним на заняттях - від інструментів
                    до матеріалів.
                  </p>
                </div>
              </motion.div>

              {/* Feature Box 9 - Creativity & Авторська програма combined */}
              <motion.div
                variants={itemVariants}
                className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-br from-[#FAFCF6] to-[#EDF4E2] rounded-[12px] p-6 border border-primary-light/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary-light/45 group aspect-square md:aspect-auto lc-glass-card"
              >
                <div className="flex items-start h-full">
                  <div className="flex-shrink-0 bg-gradient-to-br from-[#E0EFD6] to-[#A3C97A] rounded-[12px] p-3 mr-4 flex items-center justify-center w-14 h-14 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 rounded-[10px] scale-0 group-hover:scale-100 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="text-2xl relative z-10">📚</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-text">
                      Авторська програма та розвиток творчості
                    </h3>
                    <p className="text-primary/75">
                      Інноваційна програма, яка адаптується під кожну навчальну
                      групу та заохочує креативне мислення. Ми розвиваємо
                      творчий підхід до вирішення задач.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA button outside of grid, centered */}
            <div className="flex justify-center mt-10">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                onClick={() => setIsModalOpen(true)}
                className="inline-block bg-primary-light text-primary py-3 px-8 text-lg font-bold rounded-[6px] hover:bg-accent transition hover:scale-105 transform duration-300 hover:shadow-[0_10px_24px_rgba(120,200,111,0.35)]"
              >
                <span className="relative flex items-center justify-center">
                  <span>Отримати консультацію</span>
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* Free Lesson Modal */}
      <FreeLesson isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes expand-underline {
          0% {
            transform: scaleX(0);
          }
          100% {
            transform: scaleX(1);
          }
        }

        .animate-expand-underline {
          animation: expand-underline 1.2s cubic-bezier(0.65, 0, 0.35, 1)
            forwards;
          animation-delay: 0.5s;
        }

        @keyframes text-shine {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }

        .animate-text-shine {
          animation: text-shine 3s linear infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        /* Debug styles to ensure transforms are visible */
        .transform-gpu {
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        /* Swiper custom styles */
        .advantages-swiper {
          padding-bottom: 10px !important;
        }

        .advantages-swiper .swiper-pagination {
          display: none;
        }

        .advantages-swiper .swiper-pagination-bullet {
          display: none;
        }

        .advantages-swiper .swiper-pagination-bullet-active {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Advantages
