'use client'

import { useState, useEffect, useRef } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Image from '../ui/Image'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'

interface HeroLeadFormState {
  parentName: string
  phone: string
  childAge: string
}

interface HeroLeadFormErrors {
  parentName: string
  phone: string
  childAge: string
}

type HeroLeadFieldName = keyof HeroLeadFormState

const initialHeroLeadForm: HeroLeadFormState = {
  parentName: '',
  phone: '',
  childAge: '',
}

const initialHeroLeadErrors: HeroLeadFormErrors = {
  parentName: '',
  phone: '',
  childAge: '',
}

const heroNamePattern = /^[\p{L}\p{M}\s'-]*$/u
const heroLeadFieldOrder: HeroLeadFieldName[] = [
  'parentName',
  'phone',
  'childAge',
]

const normalizeHeroPhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('380')) return `+${digits}`
  if (digits.startsWith('0')) return `+38${digits}`
  return `+${digits}`
}

const formatHeroPhoneInput = (value: string) => {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''

  let normalizedDigits = digits
  if (normalizedDigits.startsWith('380')) {
    normalizedDigits = normalizedDigits.slice(0, 12)
  } else if (normalizedDigits.startsWith('0')) {
    normalizedDigits = `380${normalizedDigits.slice(1)}`.slice(0, 12)
  } else {
    normalizedDigits = `380${normalizedDigits}`.slice(0, 12)
  }

  return `+${normalizedDigits}`
}

const normalizeChildAge = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits ? `${digits} років` : ''
}

const validateHeroLeadForm = (
  form: HeroLeadFormState
): HeroLeadFormErrors => {
  const errors = { ...initialHeroLeadErrors }

  if (!form.parentName.trim() || form.parentName.trim().length < 2) {
    errors.parentName = "Вкажіть ім'я"
  }

  if (!/^\+\d{12}$/.test(normalizeHeroPhone(form.phone))) {
    errors.phone = 'Вкажіть номер у форматі +380XXXXXXXXX'
  }

  const ageDigits = form.childAge.replace(/\D/g, '')
  if (!ageDigits) {
    errors.childAge = 'Вкажіть вік дитини'
  } else {
    const age = Number(ageDigits)
    if (Number.isNaN(age) || age < 7 || age > 15) {
      errors.childAge = 'Вкажіть вік від 7 до 15 років'
    }
  }

  return errors
}

const HeroLeadForm = ({
  formData,
  errors,
  submitted,
  isSubmitting,
  onChange,
  onPhoneFocus,
  onSubmit,
  submitError,
  formIdPrefix,
  compact = false,
}: {
  formData: HeroLeadFormState
  errors: HeroLeadFormErrors
  submitted: boolean
  isSubmitting: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPhoneFocus: () => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  submitError: string
  formIdPrefix: string
  compact?: boolean
}) => {
  const inputSize = compact ? 'text-[16px] sm:text-[18px]' : 'text-[20px] xl:text-[22px]'
  const inputSpacingClass = compact ? 'pt-5 pb-1.5' : 'pt-7 pb-2'
  const floatingLabelClass = compact
    ? 'top-0 translate-y-0 text-[11px] text-[#98CF93] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[16px] peer-placeholder-shown:sm:text-[18px] peer-placeholder-shown:text-white/62 peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-[#98CF93]'
    : 'top-0 translate-y-0 text-[13px] xl:text-[14px] text-[#98CF93] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-[20px] peer-placeholder-shown:xl:text-[22px] peer-placeholder-shown:text-white/62 peer-focus:top-0 peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:xl:text-[14px] peer-focus:text-[#98CF93]'
  const parentNameId = `${formIdPrefix}-parent-name`
  const parentNameErrorId = `${parentNameId}-error`
  const phoneId = `${formIdPrefix}-phone`
  const phoneErrorId = `${phoneId}-error`
  const childAgeId = `${formIdPrefix}-child-age`
  const childAgeErrorId = `${childAgeId}-error`

  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center text-center px-3"
        role="status"
        aria-live="polite"
      >
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#98CF93]/30 bg-[#78C86F]/15">
          <CheckCircle2 className="h-8 w-8 text-[#98CF93]" />
        </div>
        <p className="text-white text-lg font-extrabold">Заявку надіслано</p>
        <p className="mt-2 text-sm text-white/70">
          Менеджер зв&apos;яжеться з вами найближчим часом
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="h-full flex flex-col">
      <div className={compact ? 'mb-3.5' : 'mb-6'}>
        <p
          className={`text-white font-semibold tracking-[-0.02em] ${
            compact
              ? 'text-[17px] leading-tight sm:text-lg'
              : 'text-[24px] xl:text-[28px] leading-[1.08]'
          }`}
        >
          Залиште заявку
        </p>
        <p
          className={`mt-1 text-white ${
            compact ? 'text-[11px] leading-[1.4] sm:text-xs' : 'text-sm xl:text-[15px]'
          }`}
        >
          і наш адміністратор зателефонує вам
        </p>
      </div>

      <div className={`grid ${compact ? 'grid-cols-1 gap-3.5' : 'grid-cols-1 gap-6'}`}>
        <div>
          <div className="relative">
            <input
              id={parentNameId}
              type="text"
              name="parentName"
              value={formData.parentName}
              onChange={onChange}
              placeholder=" "
              autoComplete="name"
              spellCheck={false}
              aria-invalid={Boolean(errors.parentName)}
              aria-describedby={errors.parentName ? parentNameErrorId : undefined}
              className={`hero-underline-input peer w-full bg-transparent border-0 border-b-2 border-white/70 px-0 ${inputSpacingClass} text-white tracking-[-0.01em] ${inputSize} placeholder:text-transparent transition-colors duration-200 rounded-none appearance-none shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none focus:border-[#98CF93]`}
              required
            />
            <label
              htmlFor={parentNameId}
              className={`pointer-events-none absolute left-0 transition-all duration-200 ease-out ${floatingLabelClass}`}
            >
              Ім&apos;я
            </label>
          </div>
          {errors.parentName && (
            <p id={parentNameErrorId} className="mt-1 text-xs text-[#FFAFB7]">
              {errors.parentName}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              id={phoneId}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              onFocus={onPhoneFocus}
              placeholder=" "
              autoComplete="tel"
              inputMode="tel"
              spellCheck={false}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? phoneErrorId : undefined}
              className={`hero-underline-input peer w-full bg-transparent border-0 border-b-2 border-white/70 px-0 ${inputSpacingClass} text-white tracking-[-0.01em] ${inputSize} placeholder:text-transparent transition-colors duration-200 rounded-none appearance-none shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none focus:border-[#98CF93]`}
              required
            />
            <label
              htmlFor={phoneId}
              className={`pointer-events-none absolute left-0 transition-all duration-200 ease-out ${floatingLabelClass}`}
            >
              Номер телефону
            </label>
          </div>
          {errors.phone && (
            <p id={phoneErrorId} className="mt-1 text-xs text-[#FFAFB7]">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              id={childAgeId}
              type="text"
              inputMode="numeric"
              name="childAge"
              value={formData.childAge}
              onChange={onChange}
              placeholder=" "
              autoComplete="off"
              aria-invalid={Boolean(errors.childAge)}
              aria-describedby={errors.childAge ? childAgeErrorId : undefined}
              className={`hero-underline-input peer w-full bg-transparent border-0 border-b-2 border-white/70 px-0 ${inputSpacingClass} text-white tracking-[-0.01em] ${inputSize} placeholder:text-transparent transition-colors duration-200 rounded-none appearance-none shadow-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 focus:shadow-none focus-visible:shadow-none focus:border-[#98CF93]`}
              required
            />
            <label
              htmlFor={childAgeId}
              className={`pointer-events-none absolute left-0 transition-all duration-200 ease-out ${floatingLabelClass}`}
            >
              Вік дитини
            </label>
          </div>
          {errors.childAge && (
            <p id={childAgeErrorId} className="mt-1 text-xs text-[#FFAFB7]">
              {errors.childAge}
            </p>
          )}
        </div>
      </div>

      <div className={`${compact ? 'mt-4' : 'mt-auto pt-6'}`}>
        {submitError && (
          <p
            className="mb-3 text-sm text-[#FFAFB7]"
            role="status"
            aria-live="polite"
          >
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`touch-manipulation w-full rounded-[4px] bg-accent px-6 text-center font-extrabold uppercase tracking-[0.02em] text-[#192518] transition-colors duration-200 hover:bg-[#8BC886] disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171A21] ${
            compact ? 'py-3 text-[13px] sm:py-3.5 sm:text-sm' : 'py-5 text-[15px] xl:text-[16px]'
          }`}
        >
          {isSubmitting ? 'Відправляємо…' : 'Надіслати заявку'}
        </button>
      </div>
    </form>
  )
}

const Hero = () => {
  const [videoError, setVideoError] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [isShortDesktopViewport, setIsShortDesktopViewport] = useState(false)
  const [leadForm, setLeadForm] = useState<HeroLeadFormState>(initialHeroLeadForm)
  const [leadErrors, setLeadErrors] = useState<HeroLeadFormErrors>(initialHeroLeadErrors)
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false)
  const [leadSubmitted, setLeadSubmitted] = useState(false)
  const [leadSubmitError, setLeadSubmitError] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const isPlayingRef = useRef(false)

  const videoSource = '/video.mp4'
  const heroPosterSrc = '/main-poster.jpg'
  const heroPosterFallbackSrc = '/main.png'

  useIntersectionObserver(
    videoContainerRef,
    ([entry]) => {
      setIsInViewport(entry.isIntersecting)
    },
    {
      threshold: 0.1,
      rootMargin: '200px',
    }
  )

  useEffect(() => {
    if (videoRef.current && !isPlayingRef.current && isInViewport) {
      try {
        videoRef.current.load()
      } catch (e) {
        console.warn('Error loading video:', e)
      }
    }

    const playVideo = async () => {
      if (!isInViewport || isPlayingRef.current) return

      try {
        if (videoRef.current) {
          isPlayingRef.current = true
          const playPromise = videoRef.current.play()

          if (playPromise !== undefined) {
            await playPromise.catch((err) => {
              console.error('Video playback failed:', err)
              isPlayingRef.current = false

              if (err.name === 'NotAllowedError' && videoRef.current) {
                videoRef.current.muted = true
                videoRef.current.play().catch(() => {
                  setVideoError(true)
                })
                return
              }

              setVideoError(true)
            })
          }
        }
      } catch (error) {
        console.error('Video playback failed:', error)
        isPlayingRef.current = false
        setVideoError(true)
      }
    }

    if (!videoLoaded && isInViewport && !isPlayingRef.current) {
      playVideo()
    }

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause()
        isPlayingRef.current = false
      } else if (
        !document.hidden &&
        videoRef.current &&
        videoRef.current.paused &&
        isInViewport
      ) {
        videoRef.current
          .play()
          .then(() => {
            isPlayingRef.current = true
          })
          .catch(() => {
            isPlayingRef.current = false
          })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [videoLoaded, videoError, isInViewport])

  useEffect(() => {
    const updateViewportFlags = () => {
      const isDesktop = window.innerWidth >= 1024
      const isShortHeight = window.innerHeight <= 760
      setIsShortDesktopViewport(isDesktop && isShortHeight)
    }

    updateViewportFlags()
    window.addEventListener('resize', updateViewportFlags)
    return () => window.removeEventListener('resize', updateViewportFlags)
  }, [])

  const handleVideoCanPlay = () => {
    setVideoLoaded(true)
  }

  const handleLeadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'parentName' && !heroNamePattern.test(value)) {
      setLeadErrors((prev) => ({
        ...prev,
        [name]: "Поле повинно містити тільки літери",
      }))
      setLeadSubmitError('')
      return
    }

    if (name === 'phone') {
      const formattedPhone = formatHeroPhoneInput(value)
      setLeadForm((prev) => ({
        ...prev,
        phone: formattedPhone,
      }))
      setLeadErrors((prev) => ({
        ...prev,
        phone: '',
      }))
      setLeadSubmitError('')
      return
    }

    if (name === 'childAge' && value && !/^\d{0,2}$/.test(value)) {
      setLeadErrors((prev) => ({
        ...prev,
        childAge: 'Вкажіть вік цифрами',
      }))
      setLeadSubmitError('')
      return
    }

    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    setLeadErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
    setLeadSubmitError('')
  }

  const handlePhoneFocus = () => {
    setLeadForm((prev) => {
      if (prev.phone.trim().length > 0) {
        return {
          ...prev,
          phone: formatHeroPhoneInput(prev.phone),
        }
      }

      return {
        ...prev,
        phone: '+380',
      }
    })

    setLeadErrors((prev) => ({
      ...prev,
      phone: '',
    }))
    setLeadSubmitError('')
  }

  const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validation = validateHeroLeadForm(leadForm)
    setLeadErrors(validation)

    const firstInvalidField = heroLeadFieldOrder.find((field) => validation[field])
    if (firstInvalidField) {
      const invalidInput = e.currentTarget.elements.namedItem(firstInvalidField)
      if (invalidInput instanceof HTMLElement) {
        invalidInput.focus()
      }
      setLeadSubmitError('Перевірте форму та заповніть обов’язкові поля.')
      return
    }

    setIsLeadSubmitting(true)
    setLeadSubmitError('')

    try {
      const normalizedPhone = normalizeHeroPhone(leadForm.phone)
      const normalizedChildAge = normalizeChildAge(leadForm.childAge)

      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: leadForm.parentName.trim(),
          parentName: leadForm.parentName.trim(),
          childName: 'Hero lead',
          childAge: normalizedChildAge,
          direction: 'Hero форма',
          phone: normalizedPhone,
          source: 'hero-inline-form',
        }),
      })

      const result = await response.json().catch(() => ({
        success: false,
        message: 'Некоректна відповідь сервера',
      }))

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Не вдалося відправити форму')
      }

      setLeadSubmitted(true)
      setIsLeadSubmitting(false)
      setLeadSubmitError('')

      setTimeout(() => {
        setLeadForm(initialHeroLeadForm)
        setLeadErrors(initialHeroLeadErrors)
        setLeadSubmitted(false)
        setLeadSubmitError('')
      }, 2500)
    } catch (error) {
      console.error('Hero form submit error:', error)
      setIsLeadSubmitting(false)
      setLeadSubmitError('Не вдалося надіслати форму. Спробуйте ще раз трохи пізніше.')
    }
  }

  return (
    <section className="relative overflow-hidden">
      <div
        ref={videoContainerRef}
        className="relative home-banner__video-wrap min-h-svh bg-[#1A1C21] lg:h-svh lg:min-h-140"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={heroPosterSrc}
            fallbackSrc={heroPosterFallbackSrc}
            alt="Leo Code"
            fill
            priority={true}
            fetchPriority="high"
            withPreload
            className="object-cover"
            sizes="100vw"
            quality={70}
          />
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          controls={false}
          poster={heroPosterSrc}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !videoError ? 'opacity-100' : 'opacity-0'
          }`}
          onCanPlay={handleVideoCanPlay}
          onError={() => setVideoError(true)}
          preload="none"
        >
          <source
            src={videoSource}
            type="video/mp4"
            onError={() => {
              console.error('MP4 format not supported')
              console.warn('MP4 format not supported, trying fallback')
            }}
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,13,17,0.72)_0%,rgba(17,18,23,0.56)_42%,rgba(17,18,23,0.70)_100%)]" />
        <div className="absolute inset-y-0 right-0 hidden lg:block w-[42%] bg-[linear-gradient(90deg,rgba(17,19,24,0)_0%,rgba(17,19,24,0.24)_36%,rgba(17,19,24,0.42)_100%)]" />

        <div
          className={`relative z-1 container h-full pt-33 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:pt-35 sm:pb-8 ${
            isShortDesktopViewport ? 'lg:pt-40 lg:pb-8' : 'lg:pt-43 lg:pb-10'
          }`}
        >
          <div
            className={`grid gap-5 sm:gap-6 lg:h-full lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:gap-10 ${
              isShortDesktopViewport ? 'lg:items-start' : 'lg:items-center'
            }`}
          >
            <div className="flex flex-col justify-start lg:justify-center lg:pr-6 text-white">
              <h1 className="m-0 max-w-[22rem] text-pretty text-[clamp(1.95rem,8.4vw,4.5rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white sm:max-w-195 sm:text-[clamp(2.05rem,5vw,4.5rem)]">
                <span className="block whitespace-nowrap text-[clamp(1.28rem,5.7vw,4.5rem)] sm:text-[clamp(1.35rem,4.6vw,4.5rem)]">
                  ОСВІТНІЙ&nbsp;ПРОСТІР
                </span>
                <span className="block mt-1 sm:mt-2">ДЛЯ ДІТЕЙ</span>
                <span className="block mt-3 sm:mt-4 ml-1 text-[clamp(1.35rem,2.9vw,2.2rem)] font-bold leading-[1.15] normal-case">
                  7-15 років
                </span>
              </h1>

              <p
                suppressHydrationWarning
                className="mt-4 max-w-[22rem] text-[14px] leading-[1.55] text-white/84 sm:mt-5 sm:max-w-[42rem] sm:text-[17px] sm:leading-[1.6]"
              >
                <strong className="font-extrabold text-white">LEOCODE</strong>{' '}
                - освітній простір для дітей 7-15 років у Львові, де навчаємо
                програмуванню, дронам та цифровим навичкам онлайн й офлайн.
              </p>

              <div className="mt-4 sm:mt-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#23262D]/80 px-3.5 py-2 text-[11px] font-semibold text-white shadow-[0_10px_22px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-4 sm:text-sm">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#98CF93]" />
                  Доступне онлайн та офлайн навчання
                </span>
              </div>

              <div className="mt-4 sm:mt-6 lg:hidden">
                <div className="mx-auto w-full max-w-[22rem] rounded-[20px] border border-white/10 bg-[#171A21]/70 p-3.5 shadow-[0_24px_40px_rgba(8,10,14,0.28)] backdrop-blur-md sm:max-w-125 sm:rounded-2xl sm:p-4">
                  <HeroLeadForm
                    formData={leadForm}
                    errors={leadErrors}
                    submitted={leadSubmitted}
                    isSubmitting={isLeadSubmitting}
                    onChange={handleLeadInputChange}
                    onPhoneFocus={handlePhoneFocus}
                    onSubmit={handleLeadSubmit}
                    submitError={leadSubmitError}
                    formIdPrefix="hero-mobile"
                    compact
                  />
                </div>
              </div>
            </div>

            <div
              className={`hidden lg:flex justify-end ${
                isShortDesktopViewport ? 'items-start' : 'items-center'
              }`}
            >
              <div
                className={`relative w-full max-w-135 rounded-[8px] border border-white/10 bg-[#171A21]/58 shadow-[0_30px_70px_rgba(5,8,12,0.35)] backdrop-blur-[2px] ${
                  isShortDesktopViewport
                    ? 'min-h-[31rem] xl:min-h-[34rem]'
                    : 'h-135 xl:h-160'
                }`}
              >
                <div className="absolute inset-0 rounded-[8px] bg-linear-to-b from-white/4 via-transparent to-black/15" />
                <div className="absolute inset-0 rounded-[8px] bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.06),transparent_35%),radial-gradient(circle_at_86%_80%,rgba(255,255,255,0.04),transparent_40%)]" />
                <div className="relative h-full p-5 xl:p-6">
                  <HeroLeadForm
                    formData={leadForm}
                    errors={leadErrors}
                    submitted={leadSubmitted}
                    isSubmitting={isLeadSubmitting}
                    onChange={handleLeadInputChange}
                    onPhoneFocus={handlePhoneFocus}
                    onSubmit={handleLeadSubmit}
                    submitError={leadSubmitError}
                    formIdPrefix="hero-desktop"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Hero
