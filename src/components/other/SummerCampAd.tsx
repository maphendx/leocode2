'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  X,
  Sun,
  Calendar,
  ArrowRight,
  Sparkles,
  Tent,
  Code,
  Users,
  Cloud,
  GamepadIcon,
  CheckCircle2,
  Trophy,
  Flame,
  Star,
  LoaderCircle,
  Phone,
  User,
  Baby,
  ChevronDown,
} from 'lucide-react'
import Image from 'next/image'

// Define common country codes with emoji flags
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

type SummerCampAdProps = {
  isManuallyTriggered?: boolean
  onClose?: () => void
}

const SummerCampAd = ({
  isManuallyTriggered = false,
  onClose,
}: SummerCampAdProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    direction: '',
    phone: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const adShownRef = useRef(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Add country code and validation states
  const [countryCode, setCountryCode] = useState('+380')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [validationErrors, setValidationErrors] = useState({
    parentName: '',
    childName: '',
    phone: '',
    childAge: '',
  })
  const phoneDropdownRef = useRef<HTMLDivElement>(null)

  // Function to show the ad
  const showAd = useCallback(() => {
    if (!adShownRef.current) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      adShownRef.current = true
    }
  }, [])

  // Function to close the ad
  const closeAd = useCallback(() => {
    setIsAnimating(false)
    const timer = setTimeout(() => {
      setShouldRender(false)
      if (onClose) onClose()
    }, 400)
    return () => clearTimeout(timer)
  }, [onClose])

  // Handle manual triggering from props
  useEffect(() => {
    if (isManuallyTriggered) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      adShownRef.current = true
    }
  }, [isManuallyTriggered])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Game themes for the camp
  const campThemes = [
    {
      name: 'Minecraft',
      description: 'Будуй, досліджуй і програмуй у світі кубів',
      icon: '/game-icons/minecraft.png',
      color: 'bg-green-100',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      iconFallback: '🧱',
    },
    {
      name: 'Roblox',
      description: 'Створюй власні ігри та розважайся з друзями',
      icon: '/game-icons/roblox.png',
      color: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      iconFallback: '🎮',
    },
    {
      name: 'Among Us',
      description: 'Вчись командній роботі та логічному мисленню',
      icon: '/game-icons/as.png',
      color: 'bg-purple-100',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      iconFallback: '👾',
    },
    {
      name: 'Brawl Stars',
      description: 'Стратегії перемоги та програмування ботів',
      icon: '/game-icons/bs.png',
      color: 'bg-blue-100',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      iconFallback: '🏆',
    },
  ]

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    // For name fields, only allow letters
    if (name === 'parentName' || name === 'childName') {
      // Check if input contains only letters (supports Unicode letters including Ukrainian)
      const isValid = /^[\p{L}\p{M}\s]*$/u.test(value)

      setValidationErrors({
        ...validationErrors,
        [name]: isValid ? '' : "Ім'я повинно містити тільки літери",
      })

      if (isValid) {
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    } else if (name === 'childAge') {
      // Allow only numbers for age
      const isValid = /^\d*$/.test(value)

      setValidationErrors({
        ...validationErrors,
        childAge: isValid ? '' : 'Вік повинен бути числом',
      })

      if (isValid) {
        setFormData({
          ...formData,
          [name]: value,
        })
      }
    } else if (name !== 'phone') {
      // For other fields that are not phone (handled separately)
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle country code selection
  const handleCountrySelect = (code: string) => {
    setCountryCode(code)
    setShowCountryDropdown(false)

    // Preserve phone number digits when changing country code
    const phoneWithoutCode = formData.phone.replace(/^\+\d+\s*/, '')
    const newPhone = code + (phoneWithoutCode ? ' ' + phoneWithoutCode : '')

    setFormData({
      ...formData,
      phone: newPhone,
    })
  }

  // Handle phone input with proper formatting and validation for digits only
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // If field is empty, reset but keep country code
    if (!inputValue) {
      setFormData({
        ...formData,
        phone: countryCode,
      })
      setValidationErrors({
        ...validationErrors,
        phone: '',
      })
      return
    }

    // Find the country code part (starts with +)
    const countryCodeMatch = inputValue.match(/^\+\d+/)
    const currentCountryCode = countryCodeMatch
      ? countryCodeMatch[0]
      : countryCode

    // Get everything after the country code
    const phoneNumberPart = inputValue.replace(currentCountryCode, '').trim()

    // Check if phone number part contains only digits
    const isValid = /^\d*$/.test(phoneNumberPart)

    if (!isValid) {
      setValidationErrors({
        ...validationErrors,
        phone: 'Номер телефону повинен містити тільки цифри',
      })
      // Keep the old valid value
      return
    }

    // Update validation state
    setValidationErrors({
      ...validationErrors,
      phone: '',
    })

    // Update phone number
    const formattedPhone = phoneNumberPart
      ? `${currentCountryCode} ${phoneNumberPart}`
      : currentCountryCode

    setFormData({
      ...formData,
      phone: formattedPhone,
    })
  }

  const validateForm = () => {
    const errors = {
      parentName: '',
      childName: '',
      phone: '',
      childAge: '',
    }

    // Validate parent name
    if (formData.parentName.trim().length < 2) {
      errors.parentName = "Ім'я повинно містити не менше 2 символів"
    }

    // Validate child name
    if (formData.childName.trim().length < 2) {
      errors.childName = "Ім'я дитини повинно містити не менше 2 символів"
    }

    // Validate phone - check if it has at least some digits after country code
    if (
      !formData.phone ||
      formData.phone.replace(/\s+/g, '').length <= countryCode.length
    ) {
      errors.phone = 'Будь ласка, введіть коректний номер телефону'
    }

    // Validate age
    if (!formData.childAge) {
      errors.childAge = 'Вкажіть вік дитини'
    }

    setValidationErrors(errors)

    // Return true if no errors
    return !Object.values(errors).some((error) => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submitting
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isSummerCamp: true, // Flag to indicate this is a summer camp registration
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormData({
          parentName: '',
          childName: '',
          childAge: '',
          direction: '',
          phone: '',
        })
      } else {
        setSubmitError(data.message || 'Помилка відправки форми')
      }
    } catch (error) {
      setSubmitError('Не вдалося відправити форму')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-[var(--z-index-modal)] overflow-hidden perspective">
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-400 ease-in-out pointer-events-none ${
          isAnimating
            ? 'opacity-60 backdrop-blur-md'
            : 'opacity-0 backdrop-blur-none'
        }`}
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 flex items-center justify-center p-2 sm:p-3 z-[calc(var(--z-index-modal)+10)] perspective-1000"
        onClick={closeAd}
      >
        <div
          ref={modalRef}
          className={`bg-white rounded-2xl w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-3xl h-fit relative transition-all duration-500 ease-out overflow-hidden ${
            isAnimating
              ? 'opacity-100 transform scale-100 translate-z-0'
              : 'opacity-0 transform scale-75 translate-z-n50'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            transitionDuration: '500ms',
          }}
        >
          {/* Minecraft-style pixel decorations */}
          <div className="absolute z-50 top-0 right-0 w-14 h-14 bg-amber-400"></div>
          <div className="absolute bottom-20 right-10 w-10 h-10 bg-red-500 opacity-30"></div>

          {/* Close button */}
          <button
            className="absolute right-3 top-3 z-50 p-2 rounded-full transition-colors duration-200 hover:bg-white/20 bg-red-500/90"
            onClick={closeAd}
            aria-label="Close"
            type="button"
          >
            <X className="h-5 w-5 text-white" />
          </button>

          {showForm ? (
            <div className="relative py-6 px-5 sm:px-6 md:px-8 max-h-[85vh] overflow-y-auto bg-white rounded-xl m-3 hide-scrollbar">
              <button
                onClick={() => setShowForm(false)}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                <span>Повернутися до інформації про табір</span>
              </button>

              <h2 className="text-xl font-bold mb-6 text-center text-blue-700">
                Зареєструватися на Літній ІТ-табір
              </h2>

              {submitSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Дякуємо за реєстрацію!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Ми зв'яжемося з вами найближчим часом для уточнення деталей.
                  </p>
                  <button
                    onClick={closeAd}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Закрити
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="parentName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ім'я батька/матері *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        required
                        id="parentName"
                        name="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="Ваше повне ім'я"
                      />
                    </div>
                    {validationErrors.parentName && (
                      <p className="text-sm text-red-500 mt-1">
                        {validationErrors.parentName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="childName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ім'я дитини *
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        required
                        id="childName"
                        name="childName"
                        type="text"
                        value={formData.childName}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="Ім'я вашої дитини"
                      />
                    </div>
                    {validationErrors.childName && (
                      <p className="text-sm text-red-500 mt-1">
                        {validationErrors.childName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="childAge"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Вік дитини *
                    </label>
                    <div className="relative">
                      <Baby className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        required
                        id="childAge"
                        name="childAge"
                        type="text"
                        inputMode="numeric"
                        value={formData.childAge}
                        onChange={handleInputChange}
                        className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="Скільки років вашій дитині"
                      />
                    </div>
                    {validationErrors.childAge && (
                      <p className="text-sm text-red-500 mt-1">
                        {validationErrors.childAge}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="direction"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Напрямок табору *
                    </label>
                    <select
                      required
                      id="direction"
                      name="direction"
                      value={formData.direction}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    >
                      <option value="">Оберіть улюблену гру</option>
                      {campThemes.map((theme) => (
                        <option key={theme.name} value={theme.name}>
                          {theme.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Номер телефону *
                    </label>
                    <div className="relative" ref={phoneDropdownRef}>
                      <div className="relative flex items-center">
                        <div
                          className="absolute left-0 top-0 bottom-0 flex items-center gap-1 px-3 cursor-pointer hover:bg-gray-100 rounded-l-lg transition-colors border-r border-gray-200"
                          onClick={() =>
                            setShowCountryDropdown(!showCountryDropdown)
                          }
                          style={{
                            width: '70px',
                            justifyContent: 'center',
                          }}
                        >
                          <span className="text-lg">
                            {countryCodes.find((c) => c.code === countryCode)
                              ?.flag || '🌍'}
                          </span>
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          required
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className="w-full pl-20 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                          placeholder="50 123 4567"
                        />
                      </div>
                      {validationErrors.phone && (
                        <p className="text-sm text-red-500 mt-1">
                          {validationErrors.phone}
                        </p>
                      )}

                      {/* Country code dropdown */}
                      {showCountryDropdown && (
                        <div
                          className="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto"
                          style={{ maxHeight: '200px', width: '250px' }}
                        >
                          {countryCodes.map((country) => (
                            <div
                              key={country.code}
                              className="px-4 py-3 hover:bg-amber-50 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0"
                              onClick={() => handleCountrySelect(country.code)}
                            >
                              <span className="text-lg">{country.flag}</span>
                              <span className="font-medium">
                                {country.code}
                              </span>
                              <span className="text-gray-500 text-sm">
                                {country.country}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                        Відправляємо...
                      </>
                    ) : (
                      <>
                        Зареєструватися
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Реєструючись, ви даєте згоду на обробку персональних даних.
                  </p>
                </form>
              )}
            </div>
          ) : (
            <div className="relative py-6 px-5 sm:px-6 max-h-[85vh] overflow-y-auto hide-scrollbar">
              {/* Main content */}
              <div className="mb-6 relative z-10">
                {/* Title section with Minecraft style */}
                <div className="bg-white rounded-xl p-4 mb-5 border-2 border-white/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Tent className="h-10 w-10 text-amber-500" />
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 text-yellow-300 animate-spin-slow" />
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-blue-700">
                        Літній <span className="text-amber-500">IT-табір</span>
                      </h2>
                      <p className="text-sm text-gray-600">
                        Тижневе тематичне занурення у світ улюбленої гри
                      </p>
                    </div>
                  </div>
                </div>

                {/* Schedule section in Minecraft style */}
                <div className="bg-white rounded-xl p-4 mb-5 border-2 border-white/40 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-red-500" />
                    <h3 className="font-bold text-gray-800">Розклад дня:</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between items-center bg-amber-50 p-2 rounded-lg">
                      <span className="font-medium text-amber-800">
                        09:30-10:00
                      </span>
                      <span>Зустріч</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                      <span className="font-medium text-blue-800">
                        10:00-11:00
                      </span>
                      <span>Графічний дизайн Canva</span>
                    </div>
                    <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                      <span className="font-medium text-green-800">
                        11:00-12:00
                      </span>
                      <span>Перекус та прогулянка</span>
                    </div>
                    <div className="flex justify-between items-center bg-purple-50 p-2 rounded-lg">
                      <span className="font-medium text-purple-800">
                        12:00-13:00
                      </span>
                      <span>3D-моделювання</span>
                    </div>
                    <div className="flex justify-between items-center bg-amber-50 p-2 rounded-lg">
                      <span className="font-medium text-amber-800">
                        13:00-13:30
                      </span>
                      <span>Обід</span>
                    </div>
                    <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                      <span className="font-medium text-blue-800">
                        13:30-14:30
                      </span>
                      <span>English</span>
                    </div>
                    <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                      <span className="font-medium text-green-800">
                        14:30-15:30
                      </span>
                      <span>Симулятор</span>
                    </div>
                    <div className="flex justify-between items-center bg-purple-50 p-2 rounded-lg">
                      <span className="font-medium text-purple-800">
                        15:30-16:00
                      </span>
                      <span>Перекус</span>
                    </div>
                  </div>
                </div>

                {/* Game themes */}
                <div className="bg-white rounded-xl p-4 mb-5 border-2 border-white/40 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <GamepadIcon className="h-5 w-5 text-green-500" />
                    <h3 className="font-bold text-gray-800">
                      Тематичні тижні:
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {campThemes.map((theme, index) => (
                      <div
                        key={index}
                        className={`${theme.color} rounded-lg p-3 border border-gray-200 shadow-sm transition-transform hover:scale-105`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white">
                            {theme.icon ? (
                              <div className="relative w-7 h-7">
                                <Image
                                  src={theme.icon}
                                  alt={theme.name}
                                  width={28}
                                  height={28}
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <span className="text-lg">
                                {theme.iconFallback}
                              </span>
                            )}
                          </div>
                          <div>
                            <h4 className={`font-bold ${theme.textColor}`}>
                              {theme.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Special features and pricing */}
                <div className="bg-white rounded-xl p-4 mb-5 border-2 border-white/40 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <h3 className="font-bold text-gray-800">Особливості:</h3>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">4 навчальні години щодня</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">
                        Збалансований обід та 2 перекуси
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">Прогулянки на свіжому повітрі</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-sm">Вивчення англійської через гру</p>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Вартість:</p>
                        <div className="flex items-center gap-2">
                          <p className="text-2xl font-bold text-green-600">
                            5500 грн
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            6500 грн
                          </p>
                        </div>
                        <p className="text-xs text-gray-600">
                          до початку літа!
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Локації:</p>
                        <p className="text-sm font-medium">Мазепи 25д</p>
                        <p className="text-sm font-medium">Чорновола 69а</p>
                        <p className="text-sm font-medium">Наукова 49</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                  <div className="bg-yellow-50 rounded-full px-3 py-1.5 mb-3 border border-yellow-100 inline-block">
                    <p className="text-sm font-medium text-yellow-700 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Кількість місць обмежена!
                    </p>
                  </div>

                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
                  >
                    Зареєструватися зараз
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="mt-2 text-sm text-white">
                    Телефон для довідок:{' '}
                    <span className="font-bold">0800 300 648</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional animations - keep this minimal */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .perspective-1000 {
            perspective: 600px;
          }
        }

        /* Add extra small breakpoint for mobile optimization */
        @media (min-width: 480px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .xs\\:block {
            display: block;
          }
          .xs\\:inline-block {
            display: inline-block;
          }
        }
      `}</style>
    </div>
  )
}

export default SummerCampAd
