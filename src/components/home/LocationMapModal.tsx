'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, MapPin, Phone, X } from 'lucide-react'

type LocationMapData = {
  name: string
  address: string
  phone: string
  coordinates: {
    lat: number
    lng: number
  }
}

type LocationMapModalProps = {
  location: LocationMapData | null
  onClose: () => void
}

const LocationMapModal = ({ location, onClose }: LocationMapModalProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!location) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEsc)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEsc)
    }
  }, [location, onClose])

  const embedUrl = useMemo(() => {
    if (!location) return ''
    const query = encodeURIComponent(`${location.address}, Львів`)
    return `https://maps.google.com/maps?hl=uk&q=${query}&t=m&z=16&output=embed`
  }, [location])

  if (!mounted) {
    return null
  }

  return createPortal(
    <AnimatePresence>
      {location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[4000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative w-full max-w-5xl overflow-hidden rounded-[12px] border border-white/10 bg-[#2A2D35] shadow-[0_28px_70px_-26px_rgba(4,6,8,0.8)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#2F333D] px-4 py-3 md:px-5 md:py-4">
              <h3 className="flex items-center text-[20px] md:text-[24px] font-extrabold tracking-[-0.02em] text-white">
                <MapPin className="mr-2 h-5 w-5 text-[#76C36D]" />
                {location.name}
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="rounded-[6px] border border-white/15 bg-[#272B33] p-2 text-white/75 transition-colors hover:bg-[#313642] hover:text-white"
                aria-label="Закрити карту"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-[58vh] min-h-[340px] max-h-[560px] w-full border-b border-white/10 bg-[#21252D]">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-col gap-3 bg-[#2F333D] px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5 md:py-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-white/55">
                  Адреса
                </p>
                <p className="text-[15px] md:text-[16px] font-semibold text-white/92">
                  {location.address}
                </p>
                <a
                  href={`tel:${location.phone.replace(/\s+/g, '')}`}
                  className="mt-1 inline-flex items-center text-[14px] font-semibold text-[#9CDD90] hover:text-[#B4EAA9]"
                >
                  <Phone className="mr-1.5 h-4 w-4" />
                  {location.phone}
                </a>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${location.coordinates.lat},${location.coordinates.lng}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-[6px] border border-[#82CC78] bg-[#7DCC72] px-4 text-[12px] md:text-[13px] font-extrabold uppercase tracking-[0.04em] text-[#1A2618] transition-colors hover:bg-[#8DD882]"
              >
                Відкрити у Google Maps
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    ,
    document.body,
  )
}

export default LocationMapModal
