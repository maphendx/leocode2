'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, Tent, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import FreeLesson from './other/FreeLesson'
import SummerCampAd from './other/SummerCampAd'
import { motion, AnimatePresence } from 'framer-motion'

const zIndexValues = {
  header: 100,
  dropdown: 110,
  mobileOverlay: 90,
  mobileMenu: 95,
}

const menuItems = [
  {
    title: 'Про нас',
    href: '#about',

    hasDropdown: true,
    dropdownItems: [
      { title: 'Про нас', href: '/#about' },
      { title: 'Наукові ярмарки', href: '/naukovi-yarmarky' },
      { title: 'Табори', href: '/tabory' },
      { title: 'Наукові квести', href: '/naukovi-kvesty' },
      { title: 'Воркшопи', href: '/workshopy' },
      { title: 'Майстер-класи', href: '/maister-klasy' },
      { title: 'Контакти', href: '/#contacts' },
      { title: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Навчання',
    href: '/#napryamki',
    hasDropdown: true,
    dropdownItems: [
      { title: 'ІТ Напрямки', href: '/#napryamki', tag: 'IT школа' },
      {
        title: 'Дрон Напрямки',
        href: '/#napryamki',
        tag: 'DRONE школа',
      },
      { title: 'Онлайн навчання', href: '/#probne' },
    ],
  },
  {
    title: 'Переваги',
    href: '/#advantages',
    hasDropdown: false,
    isScroll: true,
  },
  {
    title: 'Результати',
    href: '/#rezultati',
    hasDropdown: false,
  },
  {
    title: 'Локації',
    href: '/#lokacii',
    hasDropdown: false,
  },
  {
    title: 'ІТ-табір',
    href: '/#it-camp',
    hasDropdown: false,
    isSpecial: true,
  },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCampAdOpen, setIsCampAdOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuToggleButtonRef = useRef<HTMLButtonElement>(null)
  const clearBodyScrollLock = useCallback(() => {
    document.body.classList.remove('overflow-hidden')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('height')
    document.body.style.removeProperty('max-height')
    document.body.style.removeProperty('width')
    document.documentElement.style.removeProperty('overflow')
  }, [])

  // Optimized toggle menu function
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
    setOpenSubmenu(null)
  }, [])

  // Cleanup body classes when component unmounts
  useEffect(() => {
    return () => {
      clearBodyScrollLock()
    }
  }, [clearBodyScrollLock])

  // Handle mobile menu closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuToggleButtonRef.current?.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false)
        clearBodyScrollLock()
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, clearBodyScrollLock])

  // Optimized scroll handling with throttling
  const handleScroll = useCallback(() => {
    // Don't process scroll events when menu is open
    if (isMenuOpen) return

    // Only hide header on desktop devices
    if (window.innerWidth >= 1024) {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    } else {
      // Always keep header visible on mobile
      setIsVisible(true)
    }
    setLastScrollY(window.scrollY)
  }, [lastScrollY, isMenuOpen])

  // Add throttling to scroll event
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null

    const throttledScroll = () => {
      if (scrollTimer === null) {
        scrollTimer = setTimeout(() => {
          handleScroll()
          scrollTimer = null
        }, 150)
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [handleScroll])

  // Optimize resize handler
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false)
        clearBodyScrollLock()
      }

      // Update header visibility based on screen size
      if (window.innerWidth < 1024) {
        // Always keep header visible on mobile
        setIsVisible(true)
      } else {
        // On desktop, set visibility based on scroll position
        if (window.scrollY > 100) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMenuOpen, clearBodyScrollLock])

  // Modal control
  useEffect(() => {
    const shouldLockBody = isMenuOpen || isModalOpen || isCampAdOpen

    if (shouldLockBody) {
      document.body.classList.add('overflow-hidden')
    } else {
      clearBodyScrollLock()
    }
  }, [isModalOpen, isMenuOpen, isCampAdOpen, clearBodyScrollLock])

  // Listen for project preview modal status to hide/show the header
  useEffect(() => {
    const handleProjectPreviewModal = (e: CustomEvent) => {
      if (e.detail?.isOpen) {
        // When the project preview modal is open, only hide header on desktop
        if (window.innerWidth >= 1024) {
          setIsVisible(false)
          // Add a class to the document body to ensure the header stays hidden on desktop
          document.body.classList.add('project-preview-open')
        } else {
          // Keep the header visible on mobile
          setIsVisible(true)
        }
      } else {
        // When the project preview modal is closed, restore header visibility based on scroll position
        setIsVisible(true)
        document.body.classList.remove('project-preview-open')
      }
    }

    // Add event listener with type assertion for CustomEvent
    window.addEventListener(
      'projectPreviewModal',
      handleProjectPreviewModal as EventListener,
    )

    return () => {
      // Cleanup event listener
      window.removeEventListener(
        'projectPreviewModal',
        handleProjectPreviewModal as EventListener,
      )
      document.body.classList.remove('project-preview-open')
    }
  }, [])

  // Optimized submenu toggle
  const toggleSubmenu = useCallback((index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index))
  }, [])

  // Handle Summer Camp button click
  const handleCampButtonClick = useCallback(() => {
    setIsCampAdOpen(true)

    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false)
      clearBodyScrollLock()
    }
  }, [isMenuOpen, clearBodyScrollLock])

  // Optimized link click handler
  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      isScroll?: boolean,
      isSpecial?: boolean,
    ) => {
      // If this is the special Summer Camp button
      if (isSpecial) {
        handleCampButtonClick()
        return
      }

      // Handle URL hash with filter parameters
      if (href.includes('#napryamki:')) {
        e.preventDefault()
        // Extract the filter name from href
        const filterName = href.split(':')[1]

        if (isMenuOpen) {
          setIsMenuOpen(false)
          clearBodyScrollLock()
        }

        // First navigate to the section
        const element = document.getElementById('napryamki')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })

          // Then update the hash with a small delay to ensure the section is visible first
          setTimeout(() => {
            // Use custom event to communicate directly with Courses component
            const filterEvent = new CustomEvent('changeFilter', {
              detail: { filterName },
            })
            window.dispatchEvent(filterEvent)

            // Update URL hash for bookmarking purposes
            window.history.pushState(null, '', `#napryamki:${filterName}`)
          }, 300)
        }

        return
      }

      if (isScroll) {
        e.preventDefault()
        // Close menu first for better performance
        if (isMenuOpen) {
          setIsMenuOpen(false)
          clearBodyScrollLock()

          // Scroll after a small delay to ensure smooth transition
          setTimeout(() => {
            const element = document.getElementById(href.replace('/#', ''))
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 300)
        } else {
          const element = document.getElementById(href.replace('/#', ''))
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      } else if (isMenuOpen) {
        setIsMenuOpen(false)
        clearBodyScrollLock()
      }
    },
    [isMenuOpen, handleCampButtonClick, clearBodyScrollLock],
  )

  // Animation variants for the menu
  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  }

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  }

  const overlayVariants = {
    closed: { opacity: 0, pointerEvents: 'none' as const },
    open: { opacity: 1, pointerEvents: 'auto' as const },
  }

  // Icon animation for IT Camp button
  const campIconAnimation = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3, yoyo: Infinity },
    },
  }

  const sparkleAnimation = {
    animate: {
      rotate: [0, 15, -15, 0],
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity },
    },
  }

  return (
    <>
      <header
        className={`main-header bg-[rgba(12,14,18,0.82)] backdrop-blur-md border-b border-white/10 fixed top-0 w-full h-[80px] z-[${
          zIndexValues.header
        }] transition-transform duration-700 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-6 lg:px-8">
          <Link
            href="/"
            className="flex-shrink-0 logo-container z-20 min-w-[126px] sm:min-w-[142px] lg:min-w-[170px]"
          >
            <div className="flex items-center">
              <img
                src="/new_logo_header_white.png?v=1"
                alt="LeoCode"
                width={170}
                height={24}
                className="block w-[126px] sm:w-[142px] lg:w-[170px] h-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 ml-10">
            {menuItems.filter((item) => !item.isSpecial).map((item, index) => (
              <div key={index} className="relative group nav-group">
                <Link
                  href={item.href}
                  onClick={(e) =>
                    handleClick(e, item.href, item.isScroll, item.isSpecial)
                  }
                  className={cn(
                    'flex items-center text-white hover:text-white font-extrabold uppercase tracking-[0.03em] transition-colors duration-200 text-[13px] xl:text-[15px] whitespace-nowrap',
                    item.hasDropdown && 'group-hover:text-white',
                  )}
                >
                  {item.title}
                  {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-[13px] w-[13px] text-white/80 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.hasDropdown && (
                  <div className="dropdown-menu absolute left-0 mt-[12px] w-[250px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#232426] rounded-xl py-[10px] shadow-[0_16px_34px_-18px_rgba(0,0,0,0.4)] border border-[#98CF93]/20 z-[110]">
                    {item.dropdownItems?.map((dropItem, idx) => (
                      <Link
                        key={idx}
                        href={dropItem.href}
                        className="block mx-2 px-[14px] py-[10px] text-[14px] text-white/85 hover:text-[#DDF7DA] hover:bg-[#98CF93]/12 rounded-lg transition-colors duration-200"
                      >
                        {dropItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Phone number - desktop */}
          <div className="hidden lg:flex items-center ml-auto">
            <a
              href="tel:0800300648"
              className="text-white hover:text-white font-extrabold text-[15px] xl:text-[16px] tracking-[0.02em] transition-colors duration-200 whitespace-nowrap"
            >
              0 (800) 300 648
            </a>
          </div>

          {/* Mobile buttons container - reordered for right alignment of IT Camp button */}
          <div className="lg:hidden flex items-center ml-auto">
            {/* Mobile menu button with Framer Motion animations */}
            <motion.button
              ref={menuToggleButtonRef}
              onClick={toggleMenu}
              className="z-20 p-2 rounded-md focus:outline-none transition-colors duration-200"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              initial={false}
              animate={{
                backgroundColor: isMenuOpen
                  ? 'rgba(152, 207, 147, 0.14)'
                  : 'transparent',
              }}
            >
              <AnimatePresence initial={false} mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-[#98CF93]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Improved mobile menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Mobile menu overlay with Framer Motion */}
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-[#050608]/60 backdrop-blur-[2px] z-[90]"
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={toggleMenu}
              style={{ backfaceVisibility: 'hidden' }}
              aria-hidden="true"
            />

            {/* Mobile menu with improved animations */}
            <motion.div
              ref={menuRef}
              key="mobile-menu"
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[350px] bg-[rgba(16,18,23,0.94)] backdrop-blur-xl z-[95] shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden border-l border-white/10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              style={{ backfaceVisibility: 'hidden' }}
              aria-hidden={!isMenuOpen}
            >
              <div className="sticky top-0 bg-[rgba(17,19,24,0.88)] backdrop-blur-md h-[80px] flex items-center justify-end px-6 z-10 border-b border-white/10">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMenu()
                  }}
                  className="p-2 text-white focus:outline-none"
                  aria-label="Close menu"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white/90" />
                </motion.button>
              </div>

              <motion.div className="overflow-y-auto h-[calc(100%-80px)] pb-6 px-5">
                <nav className="py-5">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={menuItemVariants}
                      custom={index}
                      className="overflow-hidden border-b border-white/5 last:border-b-0"
                    >
                      {item.hasDropdown ? (
                        <>
                          <motion.button
                            onClick={() => toggleSubmenu(index)}
                            className={cn(
                              'flex items-center justify-between w-full py-5 px-1 text-left text-[16px] font-extrabold uppercase tracking-[0.03em] transition-colors duration-200',
                              openSubmenu === index
                                ? 'text-white'
                                : 'text-white/90 hover:text-white',
                            )}
                            whileTap={{ scale: 0.97 }}
                          >
                            <span>{item.title}</span>
                            <motion.div
                              animate={{
                                rotate: openSubmenu === index ? 180 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-5 w-5 text-white/65" />
                            </motion.div>
                          </motion.button>

                          {/* Animated dropdown with Framer Motion */}
                          <AnimatePresence>
                            {openSubmenu === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.04, 0.62, 0.23, 0.98],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pb-3 pl-3 space-y-1.5">
                                  {item.dropdownItems?.map((dropItem, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: idx * 0.05 }}
                                    >
                                      <Link
                                        href={dropItem.href}
                                        onClick={(e) =>
                                          handleClick(e, dropItem.href)
                                        }
                                        className="block py-2 px-3 rounded-lg text-[13px] uppercase tracking-[0.02em] text-white/75 hover:text-white hover:bg-white/5 transition-colors duration-200"
                                      >
                                        {dropItem.title}
                                      </Link>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <motion.div whileTap={{ scale: 0.97 }}>
                          <Link
                            href={item.href}
                            onClick={(e) =>
                              handleClick(
                                e,
                                item.href,
                                item.isScroll,
                                item.isSpecial,
                              )
                            }
                            className={cn(
                              'block py-5 px-1 text-[16px] font-extrabold uppercase tracking-[0.03em] transition-colors duration-200',
                              item.isSpecial
                                ? 'flex items-center gap-2 text-white/90 hover:text-white'
                                : 'text-white/90 hover:text-white',
                            )}
                          >
                            {item.isSpecial && (
                              <Tent className="h-5 w-5 text-[#98CF93] animate-bounce" />
                            )}
                            {item.title}
                            {item.isSpecial && (
                              <Sparkles className="h-4 w-4 text-[#F5BE3B] animate-pulse" />
                            )}
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Button with animation */}
                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <motion.button
                    onClick={() => {
                      setIsModalOpen(true)
                      setIsMenuOpen(false)
                      clearBodyScrollLock()
                    }}
                    className="w-full bg-[#78C86F] text-[#1B2619] font-extrabold text-[15px] uppercase tracking-[0.02em] py-3.5 px-4 rounded-xl text-center transition-colors duration-200 hover:bg-[#8BC886]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Безкоштовний урок
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Високопріоритетні стилі для хедера */
        .main-header {
          z-index: var(--z-index-header);
          will-change: transform !important;
          transition-timing-function: cubic-bezier(0.22, 1, 0.55, 1) !important;
          left: 0;
          right: 0;
          width: 100%;
          position: fixed;
          box-shadow: none !important;
        }

        /* Гарантуємо, що випадаючі меню завжди поверх */
        .dropdown-menu {
          z-index: var(--z-index-dropdown) !important;
          position: absolute !important;
        }

        /* Покращуємо взаємодію з групою для випадаючих меню */
        .nav-group:hover .dropdown-menu {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: all !important;
          display: block !important;
        }

        /* Prevent scroll on body when menu is open */
        body.overflow-hidden {
          overflow: hidden !important;
          overscroll-behavior: none !important;
        }

        /* Ensure header stays hidden when project preview is open, but only on desktop */
        body.project-preview-open .main-header {
          transform: translateY(-100%) !important;
        }

        /* Keep header visible on mobile even when project preview is open */
        @media (max-width: 1023px) {
          body.project-preview-open .main-header {
            transform: translateY(0) !important;
          }
        }

        /* Mobile menu improvements */
        @media (max-width: 1023px) {
          * {
            -webkit-tap-highlight-color: transparent;
          }

          .container {
            width: 100% !important;
            max-width: 100% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }

          /* Ensure logo is visible and doesn't overflow */
          .logo-container img {
            max-width: 100%;
            height: auto;
            display: block;
          }
        }
      `}</style>

      {/* Free Lesson Modal Component */}
      <FreeLesson isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Summer Camp Ad Component */}
      <SummerCampAd
        isManuallyTriggered={isCampAdOpen}
        onClose={() => setIsCampAdOpen(false)}
      />
    </>
  )
}

export default Header
