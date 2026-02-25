'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [showMap, setShowMap] = useState(false)
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
    setShowMap(true)
  }

  // Close map modal
  const handleCloseMap = () => {
    setShowMap(false)
  }

  // Generate Google Maps embed URL for the active location
  const getMapEmbedUrl = () => {
    if (!activeLocation || !activeLocation.coordinates) return ''
    const { lat, lng } = activeLocation.coordinates
    // Формування адреси для вбудовування через iframe без API ключа
    return `https://maps.google.com/maps?q=${lat},${lng}&t=m&z=16&output=embed&iwloc=near`
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
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
    <section className="lc-section-soft py-12 md:py-16" id="lokacii">

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-3xl mr-auto mb-8 md:mb-10"
        >
          <h2 className="lc-section-title mb-3">ЛОКАЦІЇ</h2>
          <p className="lc-section-lead">
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
          className="mb-8 md:mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                variants={itemVariants}
                className="group"
                onClick={() => handleLocationClick(location.id)}
              >
                <div
                  className={`h-full overflow-hidden transition-all duration-300 border cursor-pointer relative bg-[#FBFCF9] p-4 md:p-5 ${
                    activeTab === location.id
                      ? 'border-[#88C980] bg-[linear-gradient(180deg,#F8FBF5_0%,#F2F6EE_100%)]'
                      : 'border-[#D7DDD3] hover:border-[#BDD2B5]'
                  }`}
                >
                  <div className="relative h-52 md:h-56 overflow-hidden border border-[#D7DDD3]">
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
                    <h3 className="font-bold text-[20px] md:text-[22px] mb-2.5 flex items-start leading-tight text-[#262C28] tracking-[-0.03em]">
                      <MapPin className="h-5 w-5 mr-2 mt-0.5 text-[#76C36D] shrink-0" />
                      <span>{location.name}</span>
                    </h3>

                    <div className="mt-2 space-y-2.5 text-sm md:text-[15px] text-[#556056]">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-[#8F998E] shrink-0" />
                        <span>{location.hours}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-[#8F998E] shrink-0" />
                        <span>{location.phone}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#D7DDD3] flex justify-between items-center">
                      <span className="text-xs md:text-[13px] font-semibold uppercase tracking-[0.08em] text-[#4B564A]">
                        Львів
                      </span>
                      <button className="text-[#3E7F3C] hover:text-[#336A31] flex items-center text-sm font-semibold uppercase tracking-[0.04em] transition-colors">
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
            className="relative overflow-hidden border border-[#D7DDD3] bg-[#FBFCF9] mb-16 p-4 md:p-5 lg:p-6 scroll-mt-24"
          >
            {/* Scroll Indicator - only shown on mobile when a location is selected */}
            {showScrollIndicator && isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2, times: [0, 0.2, 0.8, 1] }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
              >
                  <span className="text-sm text-[#556056] font-medium mb-2">
                    Деталі нижче
                  </span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: 2, duration: 1 }}
                    className="w-6 h-6 flex justify-center items-center bg-[#78C86F] rounded-[3px]"
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Image gallery */}
              <div className="relative h-72 md:h-[420px] overflow-hidden border border-[#D7DDD3] bg-[#EEF5E9]">
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
              <div className="p-1 md:p-2 lg:p-3">
                <h3 className="text-[24px] md:text-[28px] font-extrabold tracking-[-0.03em] mb-5 flex items-center text-[#242926]">
                  <MapPin className="h-6 w-6 mr-2 text-[#76C36D]" />
                  {activeLocation.name}
                </h3>

                <div className="space-y-4 mb-7">
                  <div className="flex border border-[#D7DDD3] bg-[#F7FAF4] p-3 md:p-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[3px] border border-[#D0D8CD] bg-white flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#647064] mb-1">
                        Телефон
                      </p>
                      <p className="text-[#283028] font-semibold">
                        {activeLocation.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex border border-[#D7DDD3] bg-[#F7FAF4] p-3 md:p-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[3px] border border-[#D0D8CD] bg-white flex items-center justify-center mr-4">
                      <Clock className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#647064] mb-1">
                        Години роботи
                      </p>
                      <p className="text-[#283028] font-semibold">
                        {activeLocation.hours.split(',')[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex border border-[#D7DDD3] bg-[#F7FAF4] p-3 md:p-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-[3px] border border-[#D0D8CD] bg-white flex items-center justify-center mr-4">
                      <Calendar className="h-5 w-5 text-[#76C36D]" />
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-[0.08em] font-semibold text-[#647064] mb-1">
                        Дні роботи
                      </p>
                      <p className="text-[#283028] font-semibold">
                        {activeLocation.hours.includes(',')
                          ? activeLocation.hours.split(',')[1].trim()
                          : 'Пн-Сб'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <button
                    onClick={openFreeLesson}
                    className="inline-flex items-center justify-center bg-[#78C86F] text-[#1C241A] py-3 px-6 text-base font-extrabold uppercase tracking-[-0.02em] rounded-[4px] hover:bg-[#86D17C] transition-colors duration-200"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Записатись на екскурсію</span>
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={handleShowMap}
                    className="bg-[#FBFCF9] border border-[#D7DDD3] hover:border-[#B8CDB0] text-[#2F362F] font-semibold py-3 px-6 text-base rounded-[4px] transition-colors duration-200 flex items-center justify-center uppercase tracking-[0.02em]"
                  >
                    <Map className="mr-2 h-5 w-5 text-[#76C36D]" />
                    <span>Показати на карті</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative bg-[#FBFCF9] shadow-2xl w-full max-w-4xl animate-in fade-in zoom-in-95 duration-300 border border-[#D7DDD3]">
              <div className="p-5 border-b border-[#D7DDD3] flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center text-[#262C28]">
                  <MapPin className="h-5 w-5 mr-2 text-[#76C36D]" />
                  {activeLocation?.name}
                </h3>
                <button
                  onClick={handleCloseMap}
                  className="text-[#6A7469] hover:text-[#2A312A] p-2 rounded-[4px] hover:bg-[#F1F5EE] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="h-[500px] w-full">
                <iframe
                  src={getMapEmbedUrl()}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="absolute bottom-4 left-4 bg-[#FBFCF9] px-4 py-3 shadow-lg z-10 max-w-xs border border-[#D7DDD3]">
                <h4 className="font-bold text-sm text-[#262C28]">{activeLocation?.name}</h4>
                <p className="text-xs text-[#556056] mt-1">
                  {activeLocation?.address}
                </p>
                <p className="text-xs text-[#76C36D] font-semibold mt-2">
                  {activeLocation?.phone}
                </p>
              </div>
            </div>
          </div>
        )}
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
