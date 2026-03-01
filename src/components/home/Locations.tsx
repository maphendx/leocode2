'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import {
  MapPin,
  Clock,
  Phone,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Calendar,
  Map,
} from 'lucide-react'
import { useModal } from '@/contexts/ModalContext'
import LocationMapModal from './LocationMapModal'

const locations = [
  {
    id: 'mazepa',
    name: 'вул. Мазепи, 25Д',
    address: 'вул. Мазепи, 25Д',
    phone: '+380 68 738 8608',
    hours: '10:00 - 20:00, Пн-Сб',
    images: [
      '/location/maz_1.jpeg',
      '/location/maz_2.jpeg',
      '/location/maz_3.jpeg',
    ],
    textColor: 'text-[#5FAE5A]',
    coordinates: { lat: 49.872579, lng: 24.04069 },
  },
  {
    id: 'naukova',
    name: 'вул. Наукова, 49',
    address: 'вул. Наукова, 49',
    phone: '+380 68 738 8656',
    hours: '10:00 - 20:00, Пн-Сб',
    images: [
      '/location/nauk_1.jpeg',
      '/location/nauk_2.jpeg',
      '/location/nauk_3.jpeg',
    ],
    textColor: 'text-[#5FAE5A]',
    coordinates: { lat: 49.803995, lng: 23.990293 },
  },
]

export default function Locations() {
  const [activeTab, setActiveTab] = React.useState(locations[0]?.id ?? '')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { openFreeLesson } = useModal()
  const [mapLocation, setMapLocation] = useState<
    (typeof locations)[number] | null
  >(null)
  const detailsRef = React.useRef<HTMLDivElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const activeLocation = locations.find((loc) => loc.id === activeTab)

  // Open map modal
  const handleShowMap = () => {
    if (!activeLocation) return
    setMapLocation(activeLocation)
  }

  // Close map modal
  const handleCloseMap = () => {
    setMapLocation(null)
  }

  const handleNextImage = () => {
    if (!activeLocation) return
    setActiveImageIndex((prev) =>
      prev === activeLocation.images.length - 1 ? 0 : prev + 1
    )
  }

  const handlePrevImage = () => {
    if (!activeLocation) return
    setActiveImageIndex((prev) =>
      prev === 0 ? activeLocation.images.length - 1 : prev - 1
    )
  }

  const handleImageSelect = (index: number) => {
    setActiveImageIndex(index)
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

  const handleLocationClick = (locationId: string) => {
    const isNewLocation = activeTab !== locationId
    setActiveTab(locationId)
    if (isNewLocation) {
      setActiveImageIndex(0)
    }

    // If we're on mobile, provide visual feedback and scroll to details
    if (isMobile && detailsRef.current && isNewLocation) {
      // Show scroll indicator
      setShowScrollIndicator(true)

      // Hide it after animation completes
      setTimeout(() => {
        setShowScrollIndicator(false)
      }, 2000)

      // Scroll with a slight delay to allow the content to update
      const yOffset = isMobile ? -80 : -20 // More offset on mobile

      // Calculate scroll position
      setTimeout(() => {
        if (detailsRef.current) {
          const y =
            detailsRef.current.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset

          window.scrollTo({
            top: y,
            behavior: 'smooth',
          })
        }
      }, 300) // Longer delay for content to update fully
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-[#262830] py-10 md:py-12"
      id="lokacii"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,transparent_38%,transparent_100%)]" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-white/5" />
        <div className="absolute top-0 left-0 h-px w-full bg-white/5" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mr-auto mb-6 md:mb-8"
        >
          <h2 className="text-white text-[30px] md:text-[40px] font-extrabold uppercase tracking-[-0.04em] leading-[0.92] mb-2.5">
            ЛОКАЦІЇ
          </h2>
          <p className="text-white/84 text-[15px] md:text-[17px] leading-relaxed">
            Зручні та безпечні школи розташовані у різних районах Львова,
            обладнані за останніми технологічними стандартами для комфортного
            навчання
          </p>
        </motion.div>

        {/* Location Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 md:mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                variants={itemVariants}
                className="group"
                onClick={() => handleLocationClick(location.id)}
              >
                <div
                  className={`h-full overflow-hidden rounded-[8px] transition-all duration-300 border cursor-pointer relative bg-[#2A2D35] p-3.5 md:p-4 ${
                    activeTab === location.id
                      ? 'border-[#88C980]/80 bg-[linear-gradient(180deg,#2F343D_0%,#2A2D35_100%)]'
                      : 'border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="relative h-44 md:h-48 overflow-hidden border border-white/10 rounded-[6px]">
                    <Image
                      src={location.images[0]}
                      alt={location.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
                  </div>

                  <div className="pt-4 bg-transparent">
                    <h3 className="font-bold text-[19px] md:text-[21px] mb-2 flex items-start leading-tight text-white tracking-[-0.03em]">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 text-[#76C36D] shrink-0" />
                      <span>{location.name}</span>
                    </h3>

                    <div className="mt-2 space-y-2 text-sm md:text-[14px] text-white/78">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-white/55 shrink-0" />
                        <span>{location.hours}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-white/55 shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                      <span className="text-xs md:text-[13px] font-semibold uppercase tracking-[0.08em] text-white/70">
                        Львів
                      </span>
                      <button className="text-[#9CDD90] hover:text-[#B4EAA9] flex items-center text-sm font-semibold uppercase tracking-[0.04em] transition-colors">
                        Деталі
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Location Section */}
        {activeLocation && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[10px] border border-white/10 bg-[#2A2D35] mb-10 p-3.5 md:p-4 lg:p-5 scroll-mt-24"
          >
            {/* Scroll Indicator - only shown on mobile when a location is selected */}
            {showScrollIndicator && isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
              >
                  <span className="text-sm text-white/75 font-medium mb-2">
                    Деталі нижче
                  </span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: 2, duration: 1 }}
                    className="w-6 h-6 flex justify-center items-center bg-[#78C86F] rounded-[4px]"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeLocation.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
              >
              {/* Image gallery */}
              <div className="relative h-64 md:h-[360px] overflow-hidden border border-white/10 bg-[#23262E] rounded-[8px]">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, position: 'absolute' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute inset-0"
                    style={{ zIndex: 1 }}
                  >
                    <Image
                      src={activeLocation.images[activeImageIndex]}
                      alt={activeLocation.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading={activeImageIndex === 0 ? 'eager' : 'lazy'}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/25 hover:bg-black/40 p-2 rounded-[4px] transition-all duration-300 border border-white/25"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/25 hover:bg-black/40 p-2 rounded-[4px] transition-all duration-300 border border-white/25"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>

                {/* Image thumbnails */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
                  {activeLocation.images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleImageSelect(idx)}
                      className={`w-12 h-2 rounded-[2px] transition-all duration-300 ${
                        idx === activeImageIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                      aria-label={`View image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Location details */}
              <div className="p-1 md:p-1.5 lg:p-2">
                <h3 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.03em] mb-4 flex items-center text-white">
                  <MapPin className="h-6 w-6 mr-2 text-[#76C36D]" />
                  {activeLocation.name}
                </h3>

                <div className="space-y-3 mb-5">
                  <div className="flex border border-white/10 bg-[#2F333C] rounded-[6px] p-2.5 md:p-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[4px] border border-white/10 bg-[#272B33] flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/55 mb-1">
                        Телефон
                      </p>
                      <p className="text-white/92 font-semibold">
                        {activeLocation.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex border border-white/10 bg-[#2F333C] rounded-[6px] p-2.5 md:p-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[4px] border border-white/10 bg-[#272B33] flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/55 mb-1">
                        Години роботи
                      </p>
                      <p className="text-white/92 font-semibold">
                        {activeLocation.hours.split(',')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex border border-white/10 bg-[#2F333C] rounded-[6px] p-2.5 md:p-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[4px] border border-white/10 bg-[#272B33] flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-white/55 mb-1">
                        Дні роботи
                      </p>
                      <p className="text-white/92 font-semibold">
                        {activeLocation.hours.includes(',')
                          ? activeLocation.hours.split(',')[1].trim()
                          : 'Пн-Сб'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    onClick={openFreeLesson}
                    className="inline-flex items-center justify-center bg-[#7DCC72] text-[#1C241A] py-2.5 px-5 text-[15px] font-extrabold uppercase tracking-[-0.02em] rounded-[4px] hover:bg-[#8DD882] transition-colors duration-200"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Записатись на екскурсію</span>
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleShowMap}
                    className="bg-[#2F333C] border border-white/15 hover:border-[#9DDD93]/65 text-white/90 font-semibold py-2.5 px-5 text-[15px] rounded-[4px] transition-colors duration-200 flex items-center justify-center uppercase tracking-[0.02em]"
                  >
                    <Map className="mr-2 h-5 w-5 text-[#76C36D]" />
                    <span>Показати на карті</span>
                  </button>
                </div>
              </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        <LocationMapModal location={mapLocation} onClose={handleCloseMap} />
      </div>
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          position: relative;
          overflow: hidden;
        }

        .animate-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shimmer 2.5s infinite;
        }

        /* Smooth scrolling behavior for the entire page */
        html {
          scroll-behavior: smooth;
        }

        /* Better scroll target positioning - ensures element doesn't get hidden by fixed headers */
        .scroll-mt-24 {
          scroll-margin-top: 6rem;
        }
      `}</style>
    </section>
  )
}
