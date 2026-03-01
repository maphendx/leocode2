'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  CheckCircle2,
  User,
  Award,
  ArrowRight,
  ChevronDown,
  Baby,
  Phone,
  MapPin,
} from 'lucide-react'

const countryCodes = [
  { code: '+380', flag: '🇺🇦', country: 'Ukraine' },
  { code: '+48', flag: '🇵🇱', country: 'Poland' },
  { code: '+40', flag: '🇷🇴', country: 'Romania' },
  { code: '+421', flag: '🇸🇰', country: 'Slovakia' },
  { code: '+359', flag: '🇧🇬', country: 'Bulgaria' },
  { code: '+34', flag: '🇪🇸', country: 'Spain' },
  { code: '+420', flag: '🇨🇿', country: 'Czech Republic' },
  { code: '+370', flag: '🇱🇹', country: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', country: 'Latvia' },
  { code: '+372', flag: '🇪🇪', country: 'Estonia' },
  { code: '+36', flag: '🇭🇺', country: 'Hungary' },
  { code: '+373', flag: '🇲🇩', country: 'Moldova' },
  { code: '+49', flag: '🇩🇪', country: 'Germany' },
  { code: '+44', flag: '🇬🇧', country: 'UK' },
  { code: '+1', flag: '🇺🇸', country: 'USA' },
  { code: '+90', flag: '🇹🇷', country: 'Turkey' },
]

const ageOptions = Array.from({ length: 9 }, (_, i) => `${i + 7} років`)

const locationOptions = ['вул. Мазепи, 25Д', 'вул. Наукова, 49', 'Онлайн']

const DEFAULT_COUNTRY_CODE = '+380'

interface FreeLessonProps {
  isOpen: boolean
  onClose: () => void
}

type FormState = {
  parentName: string
  childName: string
  childAge: string
  location: string
  phone: string
}

type ValidationErrors = {
  parentName: string
  childName: string
  phone: string
}

const initialFormData: FormState = {
  parentName: '',
  childName: '',
  childAge: '',
  location: '',
  phone: DEFAULT_COUNTRY_CODE,
}

const initialErrors: ValidationErrors = {
  parentName: '',
  childName: '',
  phone: '',
}

const normalizePhone = (value: string) => {
  const digits = value.replace(/\D/g, '')
  return digits ? `+${digits}` : ''
}

const hasValidPhoneDigits = (value: string) => {
  const normalized = normalizePhone(value)
  return /^\+\d{8,15}$/.test(normalized)
}

const FreeLesson = ({ isOpen, onClose }: FreeLessonProps) => {
  const [isClientMounted, setIsClientMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(0)
  const [showAgeDropdown, setShowAgeDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE)
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors>(initialErrors)
  const [formData, setFormData] = useState<FormState>(initialFormData)

  const ageDropdownRef = useRef<HTMLDivElement>(null)
  const phoneDropdownRef = useRef<HTMLDivElement>(null)
  const locationDropdownRef = useRef<HTMLDivElement>(null)

  const resetForm = () => {
    setFormData(initialFormData)
    setValidationErrors(initialErrors)
    setCurrentStep(1)
    setCountryCode(DEFAULT_COUNTRY_CODE)
    setShowAgeDropdown(false)
    setShowCountryDropdown(false)
    setShowLocationDropdown(false)
    setIsSubmitting(false)
    setSubmitted(false)
    setFormProgress(0)
  }

  useEffect(() => {
    setIsClientMounted(true)
  }, [])

  useEffect(() => {
    const filled = [
      Boolean(formData.parentName.trim()),
      Boolean(formData.childName.trim()),
      Boolean(formData.childAge),
      Boolean(formData.location),
      hasValidPhoneDigits(formData.phone),
    ].filter(Boolean).length

    setFormProgress(filled * 20)
  }, [formData])

  useEffect(() => {
    if (isOpen) {
      resetForm()
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ageDropdownRef.current &&
        !ageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAgeDropdown(false)
      }

      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
      }

      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLocationDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === 'parentName' || name === 'childName') {
      const isValid = /^[\p{L}\p{M}\s'-]*$/u.test(value)

      setValidationErrors((prev) => ({
        ...prev,
        [name]: isValid ? '' : "Ім'я повинно містити тільки літери",
      }))

      if (!isValid) return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAgeSelect = (age: string) => {
    setFormData((prev) => ({
      ...prev,
      childAge: age,
    }))
    setShowAgeDropdown(false)
  }

  const handleLocationSelect = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      location,
    }))
    setShowLocationDropdown(false)
  }

  const handleCountrySelect = (code: string) => {
    const previousCodeDigits = countryCode.replace('+', '')
    const currentDigits = formData.phone.replace(/\D/g, '')
    const phoneDigits = currentDigits.startsWith(previousCodeDigits)
      ? currentDigits.slice(previousCodeDigits.length)
      : currentDigits

    setCountryCode(code)
    setShowCountryDropdown(false)

    const updatedPhone = `${code}${phoneDigits}`
    setFormData((prev) => ({
      ...prev,
      phone: updatedPhone,
    }))

    setValidationErrors((prev) => ({
      ...prev,
      phone: phoneDigits.length === 0 || hasValidPhoneDigits(updatedPhone)
        ? ''
        : 'Введіть коректний номер телефону',
    }))
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value

    if (!rawValue.trim()) {
      setFormData((prev) => ({ ...prev, phone: countryCode }))
      setValidationErrors((prev) => ({ ...prev, phone: '' }))
      return
    }

    const codeDigits = countryCode.replace('+', '')
    const onlyDigits = rawValue.replace(/\D/g, '')
    const numberDigits = onlyDigits.startsWith(codeDigits)
      ? onlyDigits.slice(codeDigits.length)
      : onlyDigits

    const updatedPhone = `${countryCode}${numberDigits}`

    setFormData((prev) => ({
      ...prev,
      phone: updatedPhone,
    }))

    setValidationErrors((prev) => ({
      ...prev,
      phone:
        numberDigits.length === 0 || hasValidPhoneDigits(updatedPhone)
          ? ''
          : 'Введіть коректний номер телефону',
    }))
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return (
        formData.parentName.trim().length > 2 &&
        formData.childName.trim().length > 2 &&
        !validationErrors.parentName &&
        !validationErrors.childName
      )
    }

    if (currentStep === 2) {
      return (
        Boolean(formData.childAge) &&
        Boolean(formData.location) &&
        hasValidPhoneDigits(formData.phone) &&
        !validationErrors.phone
      )
    }

    return true
  }

  const nextStep = () => {
    if (canProceed()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canProceed()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          direction: '',
          phone: normalizePhone(formData.phone),
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)

        setTimeout(() => {
          onClose()
          resetForm()
        }, 2500)
      } else {
        alert(`Помилка: ${result.message || 'Не вдалося відправити форму'}`)
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Помилка підключення. Спробуйте ще раз пізніше.')
      setIsSubmitting(false)
    }
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  if (!shouldRender || !isClientMounted) return null

  const modal = (
    <div className="fixed inset-0 z-[15000] overflow-hidden consultation-modal-open">
      <div
        className={`fixed inset-0 bg-[#0B0E14] transition-all duration-300 ease-in-out z-[14999] ${
          isAnimating ? 'opacity-70 backdrop-blur-sm' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 flex items-center justify-center p-3 md:p-6 z-[15001]"
        onClick={onClose}
      >
        <div
          className={`relative w-full max-w-[680px] max-h-[95vh] overflow-hidden overflow-y-auto rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,#2A2F38_0%,#232831_100%)] shadow-[0_30px_70px_rgba(0,0,0,0.55)] transition-all duration-400 ease-out ${
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative border-b border-white/10 px-5 md:px-8 pt-7 pb-5">
            <button
              className="absolute right-4 top-4 z-50 p-2 rounded-full border border-white/12 text-white/65 hover:text-white hover:bg-white/8 transition-colors duration-200"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center pr-10 pl-2">
              <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.03em] text-white leading-tight">
                Запис на <span className="text-[#8ED28A]">безкоштовне</span>{' '}
                заняття
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/70">
                Заповніть форму для запису вашої дитини
              </p>
            </div>

            {!submitted && (
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/7">
                <div
                  className="h-full bg-[#78C86F] transition-all duration-300 ease-in-out"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
            )}
          </div>

          <div className="p-5 md:p-8">
            {submitted ? (
              <div className="text-center py-8 px-2">
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-[#78C86F]/15 animate-ping" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="h-20 w-20 rounded-full bg-[#78C86F]/20 flex items-center justify-center border border-[#78C86F]/35">
                      <CheckCircle2 className="h-10 w-10 text-[#8ED28A]" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-white mb-3">Дякуємо за заявку!</h2>
                <p className="text-white/75 mb-4 max-w-[46ch] mx-auto">
                  Наш менеджер Вам зателефонує для уточнення деталей запису.
                </p>
                <div className="mx-auto max-w-[440px] rounded-[10px] border border-[#86CC82]/35 bg-[#1C2A20] px-4 py-3 text-sm text-[#D5F2D3]">
                  Очікуйте на дзвінок найближчим часом.
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8 gap-3">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex flex-col items-center text-center ${
                        step < currentStep ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => step < currentStep && setCurrentStep(step)}
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center border transition-all ${
                          step === currentStep
                            ? 'bg-[#78C86F] text-[#1B2718] border-[#78C86F]'
                            : step < currentStep
                              ? 'bg-[#6CBF63] text-[#1B2718] border-[#6CBF63]'
                              : 'bg-white/5 text-white/55 border-white/15'
                        }`}
                      >
                        {step < currentStep ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          step
                        )}
                      </div>
                      <span
                        className={`text-[11px] md:text-xs mt-2 ${
                          step === currentStep
                            ? 'text-[#9BE296] font-semibold'
                            : step < currentStep
                              ? 'text-[#8ED28A]'
                              : 'text-white/50'
                        }`}
                      >
                        {step === 1
                          ? 'Персональні дані'
                          : step === 2
                            ? 'Контакти'
                            : 'Підтвердження'}
                      </span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center text-white">
                        Персональні дані
                      </h2>
                      <p className="text-white/65 text-center text-sm">
                        Заповніть основну інформацію для запису
                      </p>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Ваше ім'я (батько/мама)
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 h-5 w-5 text-white/45" />
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3.5 border border-white/12 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#78C86F]/70 bg-[#2C313A] text-white placeholder:text-white/45"
                            placeholder="Ім'я одного з батьків"
                            required
                          />
                        </div>
                        {validationErrors.parentName && (
                          <p className="text-sm text-red-400 mt-1">
                            {validationErrors.parentName}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Ім'я дитини
                        </label>
                        <div className="relative">
                          <Baby className="absolute left-3 top-3.5 h-5 w-5 text-white/45" />
                          <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3.5 border border-white/12 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#78C86F]/70 bg-[#2C313A] text-white placeholder:text-white/45"
                            placeholder="Ім'я дитини"
                            required
                          />
                        </div>
                        {validationErrors.childName && (
                          <p className="text-sm text-red-400 mt-1">
                            {validationErrors.childName}
                          </p>
                        )}
                      </div>

                      <div className="pt-4">
                        <button
                          type="button"
                          disabled={!canProceed()}
                          onClick={nextStep}
                          className={`w-full bg-[#78C86F] text-[#192518] font-bold py-3.5 px-4 rounded-[10px] transition-all duration-200 flex justify-center items-center gap-2 ${
                            !canProceed()
                              ? 'opacity-45 cursor-not-allowed'
                              : 'hover:bg-[#8BD582]'
                          }`}
                        >
                          Далі
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center text-white">
                        Дані для запису
                      </h2>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Вік дитини (від 7 до 15)
                        </label>
                        <div className="relative" ref={ageDropdownRef}>
                          <Baby className="absolute left-3 top-3.5 h-5 w-5 text-white/45" />
                          <button
                            type="button"
                            onClick={() => setShowAgeDropdown((prev) => !prev)}
                            className="w-full pl-11 pr-10 py-3.5 border border-white/12 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#78C86F]/70 text-left bg-[#2C313A] flex items-center justify-between"
                          >
                            <span
                              className={
                                formData.childAge ? 'text-white' : 'text-white/45'
                              }
                            >
                              {formData.childAge || 'Оберіть вік дитини'}
                            </span>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-white/45" />
                          </button>

                          {showAgeDropdown && (
                            <div
                              className="absolute z-50 mt-1 w-full bg-[#2C313A] border border-white/12 rounded-[10px] shadow-lg overflow-y-auto animate-dropdown"
                              style={{ maxHeight: '220px' }}
                            >
                              {ageOptions.map((age) => (
                                <div
                                  key={age}
                                  className="px-4 py-3 hover:bg-white/8 cursor-pointer text-white/85 hover:text-white transition-colors"
                                  onClick={() => handleAgeSelect(age)}
                                >
                                  {age}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Локація
                        </label>
                        <div className="relative" ref={locationDropdownRef}>
                          <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-white/45" />
                          <button
                            type="button"
                            onClick={() =>
                              setShowLocationDropdown((prev) => !prev)
                            }
                            className="w-full pl-11 pr-10 py-3.5 border border-white/12 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#78C86F]/70 text-left bg-[#2C313A] flex items-center justify-between"
                          >
                            <span
                              className={
                                formData.location
                                  ? 'text-white'
                                  : 'text-white/45'
                              }
                            >
                              {formData.location || 'Оберіть локацію'}
                            </span>
                            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-white/45" />
                          </button>

                          {showLocationDropdown && (
                            <div
                              className="absolute z-50 mt-1 w-full bg-[#2C313A] border border-white/12 rounded-[10px] shadow-lg overflow-y-auto animate-dropdown"
                              style={{ maxHeight: '260px' }}
                            >
                              {locationOptions.map((location) => (
                                <button
                                  type="button"
                                  key={location}
                                  className="w-full text-left px-4 py-3 hover:bg-white/8 cursor-pointer text-white/85 hover:text-white transition-colors border-b border-white/6 last:border-b-0"
                                  onClick={() => handleLocationSelect(location)}
                                >
                                  {location}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-white/80">
                          Номер телефону
                        </label>
                        <div className="relative" ref={phoneDropdownRef}>
                          <div className="relative flex items-center">
                            <button
                              type="button"
                              className="absolute left-0 top-0 bottom-0 flex items-center gap-1 px-3 cursor-pointer hover:bg-white/7 rounded-l-[10px] transition-colors border-r border-white/12"
                              onClick={() =>
                                setShowCountryDropdown((prev) => !prev)
                              }
                              style={{ width: '74px', justifyContent: 'center' }}
                            >
                              <span className="text-lg">
                                {countryCodes.find((c) => c.code === countryCode)
                                  ?.flag || '🌍'}
                              </span>
                              <ChevronDown className="h-4 w-4 text-white/45" />
                            </button>
                            <Phone className="absolute left-[84px] top-3.5 h-5 w-5 text-white/45" />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              placeholder="501234567"
                              className="w-full pl-[112px] pr-4 py-3.5 border border-white/12 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#78C86F]/70 bg-[#2C313A] text-white placeholder:text-white/40"
                              required
                            />
                          </div>

                          {validationErrors.phone && (
                            <p className="text-sm text-red-400 mt-1">
                              {validationErrors.phone}
                            </p>
                          )}

                          {showCountryDropdown && (
                            <div
                              className="absolute z-50 mt-1 left-0 bg-[#2C313A] border border-white/12 rounded-[10px] shadow-lg overflow-y-auto animate-dropdown"
                              style={{ maxHeight: '240px', width: '280px' }}
                            >
                              {countryCodes.map((country) => (
                                <div
                                  key={country.code}
                                  className="px-4 py-3 hover:bg-white/8 cursor-pointer flex items-center gap-2 border-b border-white/8 last:border-0"
                                  onClick={() =>
                                    handleCountrySelect(country.code)
                                  }
                                >
                                  <span className="text-lg">{country.flag}</span>
                                  <span className="font-medium text-white">
                                    {country.code}
                                  </span>
                                  <span className="text-white/55 text-sm">
                                    {country.country}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-3 pt-5">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 bg-white/8 border border-white/12 hover:bg-white/12 text-white/80 font-medium py-3 rounded-[10px] transition-all duration-200"
                        >
                          Назад
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className={`w-2/3 bg-[#78C86F] text-[#192518] font-bold py-3 rounded-[10px] transition-all duration-200 flex justify-center items-center gap-2 ${
                            !canProceed()
                              ? 'opacity-45 cursor-not-allowed'
                              : 'hover:bg-[#8BD582]'
                          }`}
                        >
                          Далі
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center text-white">
                        Підтвердження запису
                      </h2>

                      <div className="rounded-[12px] p-5 border border-white/12 bg-[#252B34]">
                        <h3 className="font-semibold text-white mb-3">
                          Інформація про запис:
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <User className="h-5 w-5 text-[#8ED28A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white/85">
                                Ім'я батька/мами:
                              </p>
                              <p className="text-sm text-white/70">
                                {formData.parentName}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Baby className="h-5 w-5 text-[#8ED28A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white/85">
                                Ім'я дитини:
                              </p>
                              <p className="text-sm text-white/70">
                                {formData.childName}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Baby className="h-5 w-5 text-[#8ED28A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white/85">
                                Вік дитини:
                              </p>
                              <p className="text-sm text-white/70">
                                {formData.childAge}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-[#8ED28A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white/85">
                                Локація:
                              </p>
                              <p className="text-sm text-white/70">
                                {formData.location}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Phone className="h-5 w-5 text-[#8ED28A] mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-white/85">
                                Телефон:
                              </p>
                              <p className="text-sm text-white/70">
                                {normalizePhone(formData.phone)}
                              </p>
                            </div>
                          </li>
                        </ul>

                        <div className="mt-4 rounded-[10px] border border-[#86CC82]/35 bg-[#1C2A20] px-4 py-3 text-[#D5F2D3] text-sm">
                          Наш менеджер Вам зателефонує для уточнення деталей
                          запису.
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 bg-white/8 border border-white/12 hover:bg-white/12 text-white/80 font-medium py-3 rounded-[10px] transition-all duration-200"
                        >
                          Назад
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-2/3 bg-[#78C86F] text-[#192518] font-bold py-3 rounded-[10px] transition-all duration-200 flex justify-center items-center gap-2 ${
                            isSubmitting
                              ? 'opacity-45 cursor-not-allowed'
                              : 'hover:bg-[#8BD582]'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                              <span>Відправляємо...</span>
                            </>
                          ) : (
                            <>
                              <span>Записатися</span>
                              <Award className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.18s ease-out forwards;
        }
      `}</style>
    </div>
  )

  return createPortal(modal, document.body)
}

export default FreeLesson
