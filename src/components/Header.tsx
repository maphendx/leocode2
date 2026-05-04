'use client'

import { useState, useEffect, useCallback, useEffectEvent, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Menu, PhoneCall, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

const Z_INDEX = {
  header: 100,
  dropdown: 110,
  mobileOverlay: 90,
  mobileMenu: 95,
} as const

const BREAKPOINTS = {
  lg: 1024,
} as const

const TIMING = {
  scrollThrottle: 150,
  scrollThreshold: 100,
  filterDelay: 300,
  animationDuration: 0.2,
  menuStaggerDelay: 0.07,
  menuChildrenDelay: 0.2,
} as const

const MENU_ITEMS = [
  {
    title: 'Про нас',
    href: '#about',
    hasDropdown: true,
    isScroll: false,
    isSpecial: false,
    dropdownItems: [
      { title: 'Партнерства зі школами', href: '/#partnerstvo' },
      { title: 'Контакти', href: '/#contacts' },
      { title: 'FAQ', href: '/#faq' },
    ],
  },
  {
    title: 'Навчання',
    href: '/#napryamki',
    hasDropdown: true,
    isScroll: false,
    isSpecial: false,
    dropdownItems: [
      { title: 'ІТ Напрямки', href: '/#napryamki', tag: 'IT школа' },
      { title: 'Дрон Напрямки', href: '/#napryamki', tag: 'DRONE школа' },
      { title: 'Онлайн навчання', href: '/#online-learning' },
    ],
  },
  {
    title: 'Результати',
    href: '/#rezultati',
    hasDropdown: false,
    isScroll: false,
    isSpecial: false,
  },
  {
    title: 'Локації',
    href: '/#lokacii',
    hasDropdown: false,
    isScroll: false,
    isSpecial: false,
  },
  {
    title: 'Події',
    href: '/#podii',
    hasDropdown: false,
    isScroll: false,
    isSpecial: false,
  },
] as const

const CONTACT = {
  phone: '0 (800) 300 648',
  phoneHref: 'tel:0800300648',
} as const

const LOGO = {
  src: '/new_logo_header_white.png',
  alt: 'LeoCode',
  width: 350,
  height: 51,
} as const

const PhoneAnimatedIcon = () => (
  <span
    className={cn(
      'inline-flex h-7 w-7 items-center justify-center rounded-[6px]',
      'bg-white/10 border border-white/15 shadow-[0_6px_18px_rgba(0,0,0,0.2)]',
      'shrink-0 pointer-events-none',
    )}
    aria-hidden="true"
  >
    <PhoneCall className="phone-ring-icon h-3.5 w-3.5 text-[#98CF93]" />
  </span>
)

const menuVariants: Variants = {
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
      staggerChildren: TIMING.menuStaggerDelay,
      delayChildren: TIMING.menuChildrenDelay,
    },
  },
}

const menuItemVariants: Variants = {
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

const overlayVariants: Variants = {
  closed: { opacity: 0, pointerEvents: 'none' as const },
  open: { opacity: 1, pointerEvents: 'auto' as const },
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuToggleButtonRef = useRef<HTMLButtonElement>(null)
  const lastScrollYRef = useRef(0)

  const clearBodyScrollLock = useCallback(() => {
    document.body.classList.remove('overflow-hidden')
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('height')
    document.body.style.removeProperty('max-height')
    document.body.style.removeProperty('width')
    document.documentElement.style.removeProperty('overflow')
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
    setOpenSubmenu(null)
  }, [])

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const dispatchFilterEvent = useCallback((filterName: string) => {
    const filterEvent = new CustomEvent('changeFilter', {
      detail: { filterName },
    })
    window.dispatchEvent(filterEvent)
    window.history.pushState(null, '', `#napryamki:${filterName}`)
  }, [])

  useEffect(() => {
    return () => {
      clearBodyScrollLock()
    }
  }, [clearBodyScrollLock])

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setOpenSubmenu(null)
    clearBodyScrollLock()
  }, [clearBodyScrollLock])

  const handleClickOutside = useEffectEvent((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuToggleButtonRef.current?.contains(event.target as Node) &&
      !menuRef.current.contains(event.target as Node) &&
      isMenuOpen
    ) {
      closeMenu()
    }
  })

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleScroll = useEffectEvent(() => {
    if (isMenuOpen) return

    const currentScrollY = window.scrollY

    if (window.innerWidth >= BREAKPOINTS.lg) {
      if (
        currentScrollY > lastScrollYRef.current &&
        currentScrollY > TIMING.scrollThreshold
      ) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    } else {
      setIsVisible(true)
    }

    lastScrollYRef.current = currentScrollY
  })

  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    lastScrollYRef.current = window.scrollY

    const throttledScroll = () => {
      if (scrollTimer === null) {
        scrollTimer = setTimeout(() => {
          handleScroll()
          scrollTimer = null
        }, TIMING.scrollThrottle)
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  const handleResize = useEffectEvent(() => {
    if (window.innerWidth >= BREAKPOINTS.lg && isMenuOpen) {
      closeMenu()
    }

    if (window.innerWidth < BREAKPOINTS.lg) {
      setIsVisible(true)
    } else {
      setIsVisible(window.scrollY <= TIMING.scrollThreshold)
      lastScrollYRef.current = window.scrollY
    }
  })

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      clearBodyScrollLock()
    }
  }, [isMenuOpen, clearBodyScrollLock])

  const toggleSubmenu = useCallback((index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index))
  }, [])

  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      isScroll?: boolean,
    ) => {
      if (href.includes('#napryamki:')) {
        e.preventDefault()
        const filterName = href.split(':')[1]

        if (isMenuOpen) {
          closeMenu()
        }

        scrollToElement('napryamki')
        setTimeout(() => dispatchFilterEvent(filterName), TIMING.filterDelay)
        return
      }

      if (isScroll) {
        e.preventDefault()
        const elementId = href.replace('/#', '')

        if (isMenuOpen) {
          closeMenu()
          setTimeout(() => scrollToElement(elementId), TIMING.filterDelay)
        } else {
          scrollToElement(elementId)
        }
      } else if (isMenuOpen) {
        closeMenu()
      }
    },
    [
      isMenuOpen,
      closeMenu,
      scrollToElement,
      dispatchFilterEvent,
    ],
  )

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      closeMenu()
    }
  })

  useEffect(() => {
    if (!isMenuOpen) return

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full h-20 transition-transform duration-700',
          'bg-[rgba(12,14,18,0.82)] backdrop-blur-md border-b border-white/10',
          isVisible ? 'translate-y-0' : '-translate-y-full',
        )}
        style={{ zIndex: Z_INDEX.header }}
      >
        <div className="container h-full flex items-center justify-between px-4 md:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 z-20 min-w-31.5 sm:min-w-35.5 lg:min-w-42.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]"
          >
            <div className="flex items-center">
              <Image
                src={LOGO.src}
                alt={LOGO.alt}
                width={LOGO.width}
                height={LOGO.height}
                className="block w-31.5 sm:w-35.5 lg:w-42.5 h-auto object-contain"
                priority
              />
            </div>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9 ml-10"
            aria-label="Основна навігація"
          >
            {MENU_ITEMS.filter((item) => !item.isSpecial).map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href, item.isScroll)}
                  className={cn(
                    'relative flex items-center text-white/92 font-extrabold uppercase',
                    'tracking-wide transition-colors duration-300 text-[13px] xl:text-[15px] whitespace-nowrap',
                    'hover:text-[#ECF9EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
                    item.hasDropdown && 'group-hover:text-[#ECF9EA]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] origin-left scale-x-0',
                      'bg-[linear-gradient(90deg,rgba(152,207,147,0)_0%,rgba(152,207,147,0.92)_40%,rgba(152,207,147,0.48)_100%)]',
                      'transition-transform duration-300 group-hover:scale-x-100',
                    )}
                  />
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[2px]">
                    {item.title}
                  </span>
                  {item.hasDropdown && (
                    <ChevronDown className="relative z-10 ml-1 h-3.5 w-3.5 text-white/80 transition-transform duration-300 group-hover:rotate-180 group-hover:translate-x-[2px]" />
                  )}
                </Link>
                {item.hasDropdown && (
                  <div
                    className={cn(
                      'absolute left-0 mt-3 w-62.5 opacity-0 invisible',
                      'group-hover:opacity-100 group-hover:visible transition-all duration-200',
                      'bg-[#232426] rounded-[4px] py-2.5 shadow-lg',
                    )}
                    style={{ zIndex: Z_INDEX.dropdown }}
                  >
                    {item.dropdownItems?.map((dropItem, idx) => (
                      <Link
                        key={idx}
                        href={dropItem.href}
                        className={cn(
                          'block mx-2 px-3.5 py-2.5 text-sm font-semibold text-white/85',
                          'hover:text-[#DDF7DA] hover:bg-[#98CF93]/12 rounded-[4px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#232426]',
                        )}
                      >
                        {dropItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center ml-auto">
            <a
              href={CONTACT.phoneHref}
              className={cn(
                'inline-flex items-center gap-2 text-white hover:text-white font-extrabold text-[15px] xl:text-base',
                'tracking-wide transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
              )}
              aria-label={`Зателефонувати: ${CONTACT.phone}`}
            >
              <PhoneAnimatedIcon />
              <span>{CONTACT.phone}</span>
            </a>
          </div>

          <div className="lg:hidden flex items-center ml-auto">
            <motion.button
              ref={menuToggleButtonRef}
              onClick={toggleMenu}
              className="z-20 touch-manipulation rounded-md p-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]"
              aria-label={isMenuOpen ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
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
                    transition={{ duration: TIMING.animationDuration }}
                  >
                    <X className="h-6 w-6 text-[#98CF93]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: TIMING.animationDuration }}
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 bg-[#050608]/60 backdrop-blur-[2px]"
              style={{ zIndex: Z_INDEX.mobileOverlay }}
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.div
              ref={menuRef}
              id="mobile-navigation"
              key="mobile-menu"
              className={cn(
                'fixed top-0 right-0 bottom-0 w-[85%] max-w-87.5',
                'bg-[rgba(12,14,18,0.92)] backdrop-blur-md shadow-[0_24px_60px_rgba(0,0,0,0.45)] overflow-hidden overscroll-contain border-l border-white/10',
              )}
              style={{ zIndex: Z_INDEX.mobileMenu }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-navigation-title"
            >
              <div className="sticky top-0 bg-[rgba(12,14,18,0.82)] backdrop-blur-md h-20 flex items-center justify-end px-6 z-10 border-b border-white/10">
                <h2 id="mobile-navigation-title" className="sr-only">
                  Мобільна навігація
                </h2>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation()
                    closeMenu()
                  }}
                  className="touch-manipulation p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]"
                  aria-label="Закрити меню"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: TIMING.animationDuration }}
                >
                  <X className="h-6 w-6 text-white/90" />
                </motion.button>
              </div>

              <motion.div className="h-[calc(100%-5rem)] overflow-y-auto pb-6 px-5 overscroll-contain">
                <nav className="py-5" aria-label="Мобільна навігація">
                  {MENU_ITEMS.filter((item) => !item.isSpecial).map(
                    (item, index) => (
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
                                'flex items-center justify-between w-full py-5 px-1 text-left',
                                'text-base font-extrabold uppercase tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
                                openSubmenu === index
                                  ? 'text-white'
                                  : 'text-white/90 hover:text-white',
                              )}
                              aria-expanded={openSubmenu === index}
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
                                    {item.dropdownItems?.map(
                                      (dropItem, idx) => (
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
                                            className={cn(
                                              'block py-2 px-3 rounded-lg text-[13px] font-semibold uppercase tracking-wide',
                                              'text-white/75 hover:text-white hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
                                            )}
                                          >
                                            {dropItem.title}
                                          </Link>
                                        </motion.div>
                                      ),
                                    )}
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
                                handleClick(e, item.href, item.isScroll)
                              }
                              className={cn(
                                'block py-5 px-1 text-base font-extrabold uppercase tracking-wide transition-colors duration-200',
                                'text-white/90 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
                              )}
                            >
                              {item.title}
                            </Link>
                          </motion.div>
                        )}
                      </motion.div>
                    ),
                  )}
                </nav>

                <motion.div
                  className="mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  <a
                    href={CONTACT.phoneHref}
                    className={cn(
                      'inline-flex w-full items-center justify-center gap-2 py-3.5 px-4',
                      'text-white hover:text-white font-extrabold text-[15px] tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0C0E12]',
                    )}
                    aria-label={`Зателефонувати: ${CONTACT.phone}`}
                  >
                    <PhoneAnimatedIcon />
                    <span>{CONTACT.phone}</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
