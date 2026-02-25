'use client'

import { useState, useEffect, useRef } from 'react'
import {
  X,
  CheckCircle2,
  BookOpen,
  Calendar,
  User,
  Award,
  ArrowRight,
  ChevronDown,
  Baby,
  Phone,
} from 'lucide-react'

// Define common country codes with emoji flags (same as Probne)
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

interface FreeLessonProps {
  isOpen: boolean
  onClose: () => void
}

const FreeLesson = ({ isOpen, onClose }: FreeLessonProps) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formProgress, setFormProgress] = useState(0)
  const [showAgeDropdown, setShowAgeDropdown] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showDirectionDropdown, setShowDirectionDropdown] = useState(false)
  const [countryCode, setCountryCode] = useState('+380')
  const [validationErrors, setValidationErrors] = useState({
    parentName: '',
    childName: '',
    phone: '',
  })

  const ageDropdownRef = useRef<HTMLDivElement>(null)
  const phoneDropdownRef = useRef<HTMLDivElement>(null)
  const directionDropdownRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    direction: '',
    phone: '',
  })

  // Available age options as individual ages rather than ranges
  const ageOptions = [
    '6 років',
    '7 років',
    '8 років',
    '9 років',
    '10 років',
    '11 років',
    '12 років',
    '13 років',
    '14 років',
    '15 років',
    '16 років',
    '17 років',
    '18 років',
  ]

  // Direction options
  const directionOptions = ['IT Напрямок', 'ДРОН Напрямок']

  // Update form progress based on filled fields
  useEffect(() => {
    let progress = 0
    if (formData.parentName) progress += 20
    if (formData.childName) progress += 20
    if (formData.childAge) progress += 20
    if (formData.direction) progress += 20
    if (formData.phone) progress += 20
    setFormProgress(progress)
  }, [formData])

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setIsAnimating(true), 10)
      setSubmitted(false)
    } else {
      setIsAnimating(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
        setSubmitted(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close dropdown when clicking outside
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
        directionDropdownRef.current &&
        !directionDropdownRef.current.contains(event.target as Node)
      ) {
        setShowDirectionDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target

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
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      })
    }
  }

  const handleAgeSelect = (age: string) => {
    setFormData({
      ...formData,
      childAge: age,
    })
    setShowAgeDropdown(false)
  }

  const handleDirectionSelect = (direction: string) => {
    setFormData({
      ...formData,
      direction: direction,
    })
    setShowDirectionDropdown(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation before submitting
    if (
      validationErrors.parentName ||
      validationErrors.childName ||
      validationErrors.phone
    ) {
      return
    }

    setIsSubmitting(true)

    try {
      // Send data to our API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)

        // Close after showing success message
        setTimeout(() => {
          onClose()
          setFormData({
            parentName: '',
            childName: '',
            childAge: '',
            direction: '',
            phone: '',
          })
          setCurrentStep(1)
          setCountryCode('+380')
          setValidationErrors({
            parentName: '',
            childName: '',
            phone: '',
          })
        }, 3000)
      } else {
        // Show error notification
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

  // Check if we can proceed to next step
  const canProceed = () => {
    if (currentStep === 1) {
      return (
        formData.parentName.length > 2 &&
        formData.childName.length > 2 &&
        !validationErrors.parentName &&
        !validationErrors.childName
      )
    }
    return true
  }

  // Go to next step
  const nextStep = () => {
    if (canProceed()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
    }
  }

  // Go to previous step
  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  if (!shouldRender) return null

  return (
    <div className="fixed inset-0 z-[15000] overflow-hidden perspective consultation-modal-open">
      {/* Backdrop with blur effect */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-400 ease-in-out pointer-events-none modal-backdrop z-[14999] ${
          isAnimating
            ? 'opacity-50 backdrop-blur-md'
            : 'opacity-0 backdrop-blur-none'
        }`}
        aria-hidden="true"
      ></div>

      <div
        className="fixed inset-0 flex items-center justify-center p-4 md:p-6 z-[15001] perspective-1000 modal-content"
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-[30px] w-full max-w-md relative transition-all duration-500 ease-out overflow-hidden ${
            isAnimating
              ? 'opacity-100 transform scale-100 translate-z-0'
              : 'opacity-0 transform scale-75 translate-z-n50'
          }`}
          onClick={(e) => e.stopPropagation()}
          style={{
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            transitionDuration: '500ms',
          }}
        >
          <div className="relative">
            <button
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-50 p-2 rounded-full transition-colors duration-200 hover:bg-gray-100 bg-white bg-opacity-80 backdrop-blur-sm"
              onClick={handleClose}
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Main title of the form with accent color matching site theme */}
            <div className="pt-8 pb-4 text-center">
              <h2 className="text-xl md:text-2xl font-bold text-text">
                Запис на <span className="text-accent-hover">пробне</span>
              </h2>
              <h2 className="text-xl md:text-2xl font-bold text-text mb-2">
                безкоштовне заняття
              </h2>
              <p className="text-sm text-gray-500">
                Заповніть форму для запису вашої дитини
              </p>
            </div>

            {/* Progress indicator */}
            {!submitted && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-gray-100 z-20">
                <div
                  className="h-full bg-accent transition-all duration-300 ease-in-out rounded-r-full"
                  style={{ width: `${formProgress}%` }}
                />
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 pt-4">
            {submitted ? (
              <div className="text-center py-8 px-4">
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-accent bg-opacity-10 animate-ping" />
                  </div>
                  <div className="relative flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-accent bg-opacity-20 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-accent" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-accent mb-4">
                  Дякуємо за заявку!
                </h2>
                <p className="text-gray-600 mb-4">
                  Ми зв'яжемося з вами найближчим часом для уточнення деталей та
                  запису на заняття.
                </p>
                <div className="flex justify-center">
                  <div className="bg-amber-50 rounded-[20px] px-5 py-3 inline-flex items-center gap-2 border border-amber-100">
                    <Calendar className="h-5 w-5 text-accent-hover" />
                    <span className="text-sm font-medium text-gray-700">
                      Очікуйте на дзвінок від нашого менеджера
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Step indicator - Intuitive navigation */}
                <div className="flex justify-between items-center mb-8">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex flex-col items-center ${
                        step < currentStep ? 'cursor-pointer' : ''
                      }`}
                      onClick={() => step < currentStep && setCurrentStep(step)}
                    >
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all ${
                          step === currentStep
                            ? 'bg-accent text-white'
                            : step < currentStep
                            ? 'bg-accent text-white shadow-sm'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {step < currentStep ? (
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        ) : (
                          step
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 ${
                          step === currentStep
                            ? 'text-accent font-medium'
                            : step < currentStep
                            ? 'text-green'
                            : 'text-gray-400'
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
                  {/* Step 1: Personal info */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center mb-4 text-text">
                        Персональні дані
                      </h2>
                      <p className="text-gray-600 text-center text-sm mb-6">
                        Заповніть інформацію для запису на безкоштовне пробне
                        заняття
                      </p>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Ваше ім'я (Батько/мама)
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-gray-50"
                            placeholder="Ім'я одного з батьків"
                            required
                          />
                          {validationErrors.parentName && (
                            <p className="text-sm text-red-500 mt-1">
                              {validationErrors.parentName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Ім'я дитини
                        </label>
                        <div className="relative">
                          <Baby className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="childName"
                            value={formData.childName}
                            onChange={handleInputChange}
                            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-gray-50"
                            placeholder="Ім'я дитини"
                            required
                          />
                          {validationErrors.childName && (
                            <p className="text-sm text-red-500 mt-1">
                              {validationErrors.childName}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          type="button"
                          disabled={!canProceed()}
                          onClick={nextStep}
                          className={`w-full bg-accent text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex justify-center items-center gap-2 ${
                            !canProceed()
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-accent-hover'
                          }`}
                        >
                          Далі
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Contact info with age selector and country code */}
                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center mb-4 text-text">
                        Дані для запису
                      </h2>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Вік дитини
                        </label>
                        <div className="relative" ref={ageDropdownRef}>
                          <Baby className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setShowAgeDropdown(!showAgeDropdown)
                              }
                              className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-left bg-gray-50 flex items-center justify-between"
                            >
                              <span
                                className={
                                  formData.childAge
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                                }
                              >
                                {formData.childAge || 'Оберіть вік дитини'}
                              </span>
                              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            </button>

                            {showAgeDropdown && (
                              <div
                                className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto"
                                style={{ maxHeight: '200px' }}
                              >
                                {ageOptions.map((age) => (
                                  <div
                                    key={age}
                                    className="px-4 py-3 hover:bg-amber-50 cursor-pointer text-gray-700 hover:text-accent-hover transition-colors"
                                    onClick={() => handleAgeSelect(age)}
                                  >
                                    {age}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Напрямок навчання
                        </label>
                        <div className="relative" ref={directionDropdownRef}>
                          <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setShowDirectionDropdown(!showDirectionDropdown)
                              }
                              className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent text-left bg-gray-50 flex items-center justify-between"
                            >
                              <span
                                className={
                                  formData.direction
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                                }
                              >
                                {formData.direction ||
                                  'Оберіть напрямок навчання'}
                              </span>
                              <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                            </button>

                            {showDirectionDropdown && (
                              <div
                                className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto"
                                style={{ maxHeight: '200px' }}
                              >
                                {directionOptions.map((direction) => (
                                  <div
                                    key={direction}
                                    className="px-4 py-3 hover:bg-amber-50 cursor-pointer text-gray-700 hover:text-accent-hover transition-colors"
                                    onClick={() =>
                                      handleDirectionSelect(direction)
                                    }
                                  >
                                    {direction}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Номер телефону
                        </label>
                        <div className="relative" ref={phoneDropdownRef}>
                          <div className="relative flex items-center">
                            <div
                              className="absolute left-0 top-0 bottom-0 flex items-center gap-1 px-3 cursor-pointer hover:bg-gray-100 rounded-l-xl transition-colors border-r border-gray-200"
                              onClick={() =>
                                setShowCountryDropdown(!showCountryDropdown)
                              }
                              style={{
                                width: '70px',
                                justifyContent: 'center',
                              }}
                            >
                              <span className="text-lg">
                                {countryCodes.find(
                                  (c) => c.code === countryCode
                                )?.flag || '🌍'}
                              </span>
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              placeholder="50 123 4567"
                              className="w-full pl-20 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-gray-50"
                              required
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
                              className="absolute z-50 mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto"
                              style={{ maxHeight: '200px', width: '250px' }}
                            >
                              {countryCodes.map((country) => (
                                <div
                                  key={country.code}
                                  className="px-4 py-3 hover:bg-amber-50 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0"
                                  onClick={() =>
                                    handleCountrySelect(country.code)
                                  }
                                >
                                  <span className="text-lg">
                                    {country.flag}
                                  </span>
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

                      <div className="flex gap-4 pt-6">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 rounded-xl transition-all duration-200"
                        >
                          Назад
                        </button>
                        <button
                          type="button"
                          onClick={nextStep}
                          disabled={
                            !formData.childAge ||
                            !formData.phone ||
                            !formData.direction
                          }
                          className={`w-2/3 bg-accent text-white font-medium py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2 ${
                            !formData.childAge ||
                            !formData.phone ||
                            !formData.direction
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-accent-hover'
                          }`}
                        >
                          Далі
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirmation */}
                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <h2 className="text-xl font-bold text-center mb-4 text-text">
                        Підтвердження запису
                      </h2>

                      <div className="bg-amber-50 rounded-xl p-5 mb-4 border border-amber-100">
                        <h3 className="font-medium text-gray-800 mb-3">
                          Інформація про запис:
                        </h3>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <User className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">
                                Ім'я батька/мами:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formData.parentName}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Baby className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">
                                Ім'я дитини:
                              </p>
                              <p className="text-sm text-gray-600">
                                {formData.childName}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <Baby className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Вік дитини:</p>
                              <p className="text-sm text-gray-600">
                                {formData.childAge}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <BookOpen className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium">Напрямок:</p>
                              <p className="text-sm text-gray-600">
                                {formData.direction}
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            <div>
                              <p className="text-sm font-medium">Телефон:</p>
                              <p className="text-sm text-gray-600">
                                {formData.phone}
                              </p>
                            </div>
                          </li>
                        </ul>

                        <div className="mt-4 pt-4 border-t border-amber-200">
                          <h4 className="text-sm font-medium text-gray-800 mb-2">
                            Що вас очікує:
                          </h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 h-4 w-4 rounded-full bg-accent flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-sm">
                                60 хвилин індивідуального заняття
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 h-4 w-4 rounded-full bg-accent flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-sm">
                                Персональний підхід до навчання
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 h-4 w-4 rounded-full bg-accent flex items-center justify-center">
                                <CheckCircle2 className="h-3 w-3 text-white" />
                              </div>
                              <span className="text-sm">
                                Знайомство з напрямками LEO CODE
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="flex gap-4 pt-6">
                        <button
                          type="button"
                          onClick={prevStep}
                          className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium py-3 rounded-xl transition-all duration-200"
                        >
                          Назад
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-2/3 bg-accent font-medium py-3 rounded-xl transition-all duration-200 flex justify-center items-center gap-2 ${
                            isSubmitting
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-accent-hover text-white'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin h-5 w-5 text-white"
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

      {/* Add dropdown animation styles */}
      <style jsx global>{`
        @keyframes dropdown {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default FreeLesson
