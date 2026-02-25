import React, { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SchoolComparison = () => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [slidesCount, setSlidesCount] = useState(3)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      setSlidesCount(scrollRef.current.children.length)
    }

    // Intersection Observer to only animate when in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '100px', // Start loading a bit before it comes into view
      }
    )

    // Store current ref value to solve the cleanup warning
    const currentSectionRef = sectionRef.current

    if (currentSectionRef) {
      observer.observe(currentSectionRef)
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef)
      }
    }
  }, [])

  const handleNextSlide = () => {
    if (activeSlide < slidesCount - 1) {
      setActiveSlide((prev) => prev + 1)
    } else {
      setActiveSlide(0) // Cycle back to the first slide
    }
  }

  const handlePrevSlide = () => {
    if (activeSlide > 0) {
      setActiveSlide((prev) => prev - 1)
    } else {
      setActiveSlide(slidesCount - 1) // Cycle to the last slide
    }
  }

  // Update scroll position when activeSlide changes
  useEffect(() => {
    if (scrollRef.current && isVisible) {
      const slideWidth = scrollRef.current.clientWidth
      scrollRef.current.scrollTo({
        left: activeSlide * slideWidth,
        behavior: 'smooth',
      })
    }
  }, [activeSlide, isVisible])

  // Memoize the comparison data to prevent unnecessary re-renders
  const comparisonData = useMemo(
    () => [
      {
        title: 'Профі-викладачі',
        percent: '100%',
        description: 'З практичним IT-досвідом',
        color: 'green',
      },
      {
        title: 'Сучасне обладнання',
        percent: '100%',
        description: 'Найновіші технології та софт',
        color: 'blue',
      },
      {
        title: 'Індивідуальний підхід',
        percent: '100%',
        description: 'Малі групи до 8 дітей',
        color: 'orange',
      },
    ],
    []
  )

  return (
    <section className="py-16 bg-[#ffffff]" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-text">
          Чому обирають <span className="text-accent-hover">LEO CODE</span>
        </h2>

        {/* Only render complex content when visible */}
        {isVisible && (
          <div className="relative overflow-hidden rounded-[30px]">
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
              <button
                onClick={handlePrevSlide}
                className="bg-white/80 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-all"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
              <button
                onClick={handleNextSlide}
                className="bg-white/80 hover:bg-white backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-all"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>

            {/* Slides container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-hidden snap-x snap-mandatory will-change-transform"
              style={{
                scrollbarWidth: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {comparisonData.map((item, index) => (
                <div
                  key={index}
                  className="w-full shrink-0 snap-center will-change-transform"
                >
                  <div className="bg-white p-6 md:p-8 rounded-[30px] shadow-sm flex flex-col md:flex-row items-center w-full">
                    <div className="md:w-1/3 p-4 md:p-6 flex flex-col items-center justify-center w-full">
                      <div
                        className={`text-5xl font-bold text-${item.color}-600 mb-2`}
                      >
                        {item.percent}
                      </div>
                      <h4 className="text-xl font-semibold text-center">
                        {item.title}
                      </h4>
                      <div
                        className={`h-1 w-16 bg-${item.color}-600 rounded-full my-4`}
                      ></div>
                      <p className="text-gray-600 text-center text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="md:w-2/3 p-4 md:p-6 relative w-full">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center w-full">
                        <div className="bg-white rounded-[25px] shadow-sm p-6 text-center flex-1 w-full border border-gray-50">
                          <div className="relative h-20 w-20 mx-auto mb-4">
                            <Image
                              src="/images/course.jpeg"
                              alt="Our School"
                              fill
                              sizes="80px"
                              style={{ objectFit: 'cover' }}
                              className="rounded-full"
                              loading="lazy"
                            />
                          </div>
                          <h5 className="font-bold mb-1">LEO CODE</h5>
                          <p className="text-sm text-gray-600">
                            Сучасний підхід до навчання
                          </p>
                        </div>

                        <div className="bg-gray-50 rounded-[25px] shadow-sm p-6 text-center flex-1 w-full border border-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: slidesCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeSlide === index
                      ? 'bg-accent w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default React.memo(SchoolComparison)
