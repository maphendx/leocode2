'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectPreviewProps {
  projects: {
    id: number
    title: string
    description: string
    image: string
    student: string
  }[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const ProjectPreview = ({
  projects,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: ProjectPreviewProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)

      // Set proper z-index that won't conflict with other components
      document.body.classList.add('project-preview-open')

      // Dispatch event to hide navbar when project preview is opened
      const event = new CustomEvent('projectPreviewModal', {
        detail: { isOpen: true },
      })
      window.dispatchEvent(event)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 300) // Reduced from 400ms for faster closing

      // Remove the overlay class
      document.body.classList.remove('project-preview-open')

      // Dispatch event to show navbar when project preview is closed
      const event = new CustomEvent('projectPreviewModal', {
        detail: { isOpen: false },
      })
      window.dispatchEvent(event)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Ensure we clean up properly if component unmounts while modal is open
      document.body.classList.remove('project-preview-open')
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onNext()
      else if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNext, onPrev])

  if (!shouldRender) return null

  const currentProject = projects[currentIndex]

  return (
    <div className="fixed inset-0 z-[9999] overflow-auto">
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
          isAnimating
            ? 'opacity-70 backdrop-blur-md'
            : 'opacity-0 backdrop-blur-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[10000] overflow-auto"
        onClick={onClose}
      >
        <div
          className={`relative w-full max-w-5xl transition-all duration-300 ease-out mb-10 mt-10 ${
            isAnimating
              ? 'opacity-100 transform scale-100'
              : 'opacity-0 transform scale-90'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: isAnimating ? 'scale(1)' : 'scale(0.9)',
            willChange: 'transform, opacity',
          }}
        >
          {/* Navigation controls - Desktop version */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 z-20 hidden md:block">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrev()
              }}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Попередній проект"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-6 z-20 hidden md:block">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Наступний проект"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Close button */}
          <button
            className="absolute right-4 top-4 text-white bg-black/50 hover:bg-black/70 z-50 p-2 rounded-full transition-colors duration-200 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Image */}
            <div className="relative h-[60vh] max-h-[700px] w-full">
              <Image
                src={currentProject?.image || ''}
                alt={currentProject?.title || 'Проект учня'}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority={true}
              />
            </div>

            {/* Project info */}
            <div className="bg-white p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {currentProject?.title || ''}
              </h3>
              <p className="text-accent font-medium mb-3">
                {currentProject?.student || ''}
              </p>
              <p className="text-gray-700">
                {currentProject?.description || ''}
              </p>
            </div>

            {/* Mobile navigation buttons at the bottom - styled consistently with other components */}
            <div className="flex md:hidden justify-center items-center gap-4 pb-6 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onPrev()
                }}
                className="!w-9 !h-9 flex items-center justify-center border border-gray-300 text-gray-600 rounded-full bg-white hover:bg-gray-100 hover:border-gray-400 transition-all"
                aria-label="Попередній проект"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onNext()
                }}
                className="!w-9 !h-9 flex items-center justify-center border border-gray-300 text-gray-600 rounded-full bg-white hover:bg-gray-100 hover:border-gray-400 transition-all"
                aria-label="Наступний проект"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add necessary CSS for modal without breaking page scroll */}
      <style jsx global>{`
        /* Improved backdrop blur effect */
        .backdrop-blur-md {
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @media (max-width: 768px) {
          /* Better mobile experience */
          .project-preview-open {
            overflow-y: hidden !important;
          }
        }

        /* Ensure backdrop stays fixed while scrolling */
        .fixed.inset-0 {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        /* Fix z-index issues */
        .project-preview-open .header {
          z-index: 1 !important;
        }

        .project-preview-open #form_construct_main {
          z-index: 1 !important;
        }

        /* Ensure modals get top priority */
        body.project-preview-open {
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default ProjectPreview
