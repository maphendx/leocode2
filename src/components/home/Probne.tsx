'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

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

const Probne = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+380')
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fillingTime, setFillingTime] = useState(0)

  const [childAge, setChildAge] = useState('')
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    phone: false,
    childAge: false,
  })
  const phoneDropdownRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef(Date.now())

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

  const validatePhone = (value: string) => {
    const digitsOnly = value.replace(/\s+/g, '')

    const hasValidCountry = countryCodes.some(
      (country) =>
        digitsOnly.startsWith(country.code.replace('+', '')) ||
        digitsOnly.startsWith(country.code)
    )

    return hasValidCountry && /^\+?\d{8,}$/.test(digitsOnly)
  }

  const validateForm = (
    currentName = name,
    currentPhone = phone,
    currentChildAge = childAge
  ) => {
    const isNameValid = currentName.trim().length >= 3
    const isPhoneValid = validatePhone(currentPhone)
    const isAgeValid =
      currentChildAge.trim() !== '' &&
      /^\d+$/.test(currentChildAge) &&
      parseInt(currentChildAge) >= 5 &&
      parseInt(currentChildAge) <= 16

    setValidationErrors({
      name: currentName.trim().length > 0 && !isNameValid,
      phone: currentPhone.trim().length > 0 && !isPhoneValid,
      childAge: currentChildAge.trim() !== '' && !isAgeValid,
    })

    setIsFormValid(isNameValid && isPhoneValid && isAgeValid)
    return isNameValid && isPhoneValid && isAgeValid
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false)
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [showCountryDropdown])

  // Handle clicking ESC key to close dropdowns
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowCountryDropdown(false)
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  // Handle modal events to adjust z-index behavior
  useEffect(() => {
    const handleConsultationModal = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail?.isOpen) {
        // Close any open dropdowns when consultation modal opens
        setShowCountryDropdown(false)
      }
    }

    const handleProjectPreviewModal = (event: Event) => {
      const customEvent = event as CustomEvent
      if (customEvent.detail?.isOpen) {
        // Close any open dropdowns when project preview modal opens
        setShowCountryDropdown(false)
      }
    }

    window.addEventListener(
      'consultationModal',
      handleConsultationModal as EventListener
    )
    window.addEventListener(
      'projectPreviewModal',
      handleProjectPreviewModal as EventListener
    )

    return () => {
      window.removeEventListener(
        'consultationModal',
        handleConsultationModal as EventListener
      )
      window.removeEventListener(
        'projectPreviewModal',
        handleProjectPreviewModal as EventListener
      )
    }
  }, [])

  useEffect(() => {
    startTimeRef.current = Date.now()

    return () => {
      const endTime = Date.now()
      const seconds = Math.floor((endTime - startTimeRef.current) / 1000)
      setFillingTime(seconds)
    }
  }, [])

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (!inputValue) {
      setPhone('')
      setCountryCode('+380')
      return
    }

    let processedInput = inputValue
    if (!processedInput.startsWith('+')) {
      processedInput = '+' + processedInput
    }

    let newCountryCode = '+380'
    let restOfNumber = ''

    const sortedCodes = [...countryCodes].sort(
      (a, b) => b.code.length - a.code.length
    )
    for (const country of sortedCodes) {
      if (processedInput.startsWith(country.code)) {
        newCountryCode = country.code
        restOfNumber = processedInput.slice(country.code.length).trim()
        break
      }
    }

    if (restOfNumber) {
      const digitsOnly = restOfNumber.replace(/\D/g, '')

      let formatted = ''
      if (newCountryCode === '+380') {
        formatted = [
          digitsOnly.slice(0, 2),
          digitsOnly.slice(2, 5),
          digitsOnly.slice(5, 7),
          digitsOnly.slice(7, 9),
        ]
          .filter(Boolean)
          .join(' ')
      } else {
        for (let i = 0; i < digitsOnly.length; i += 3) {
          formatted += digitsOnly.slice(i, i + 3) + ' '
        }
        formatted = formatted.trim()
      }

      setPhone(`${newCountryCode} ${formatted}`.trim())
    } else {
      setPhone(newCountryCode)
    }

    setCountryCode(newCountryCode)
    validateForm(name, processedInput)
  }

  const handleCountrySelect = (selectedCode: string) => {
    const currentNumberParts = phone.split(' ')
    const numberWithoutCode = currentNumberParts.slice(1).join(' ')

    const newPhoneValue = `${selectedCode} ${numberWithoutCode}`.trim()

    setPhone(newPhoneValue)
    setCountryCode(selectedCode)
    setShowCountryDropdown(false)
    validateForm(name, newPhoneValue)
  }

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only digits
    if (value === '' || /^\d+$/.test(value)) {
      // Further limit to age range 5-16
      if (value === '' || (parseInt(value) >= 0 && parseInt(value) <= 16)) {
        setChildAge(value)
        validateForm(name, phone, value)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = validateForm()

    if (!isValid) {
      // Update validation errors to show all invalid fields
      setValidationErrors({
        name: name.trim().length < 3,
        phone: !validatePhone(phone),
        childAge:
          childAge === '' ||
          !/^\d+$/.test(childAge) ||
          parseInt(childAge) < 5 ||
          parseInt(childAge) > 16,
      })
      return
    }

    setIsSubmitting(true)

    try {
      const totalSeconds = Math.floor(
        (Date.now() - startTimeRef.current) / 1000
      )
      setFillingTime(totalSeconds)

      // Send data to the API endpoint
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          parentName: name,
          childName: '',
          childAge: childAge + ' років',
          direction: '',
          phone: phone,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit form')
      }

      console.log('Form submitted', {
        name,
        phone,
        childAge,
        fillingTime: totalSeconds,
      })

      setName('')
      setPhone('')
      setChildAge('')
      setCountryCode('+380')
      startTimeRef.current = Date.now()

      // Show success message
      alert("Дякуємо за реєстрацію! Ми зв'яжемося з вами найближчим часом.")
    } catch (error) {
      console.error('Form submission failed:', error)
      alert('На жаль, сталася помилка. Будь ласка, спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fixed dropdown positioning for mobile
  const dropdownStyles: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: '0',
    width: '100%',
    maxWidth: '300px',
    maxHeight: '220px',
    overflow: 'auto',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    zIndex: 10000,
  }

  // For mobile screens, adjust the dropdown styling
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const mobileDropdownStyles: React.CSSProperties = isMobile
    ? {
        ...dropdownStyles,
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '90%',
        width: '320px',
        maxHeight: '60vh',
        zIndex: 10500,
      }
    : dropdownStyles

  const handleClickOutsideDropdown = (event: React.MouseEvent) => {
    event.stopPropagation()
    setShowCountryDropdown(false)
  }

  // Phone input container styles
  const phoneInputContainerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  }

  return (
    <section
      className="lc-section overflow-hidden mb-24 relative probne-section"
      style={{ padding: '24px 0 0' }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative w-full max-w-[100%] mx-auto lc-glass-dark rounded-[14px] md:rounded-[16px] overflow-hidden shadow-lg">
          {/* Web1 photo on the left side - positioned higher (desktop only) */}
          <div className="absolute left-0 -top-16 h-[120%] w-1/3 z-0 opacity-30 hidden lg:block">
            <Image
              src="/web1.png"
              alt="Web background"
              fill
              sizes="33vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'left top',
              }}
              priority
            />
          </div>

          {/* Web2 photo on the right side - positioned higher (desktop only) */}
          <div className="absolute right-0 top-16 h-[120%] w-1/3 z-0 opacity-30 hidden lg:block">
            <Image
              src="/web2.png"
              alt="Web background right"
              fill
              sizes="33vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'right top',
              }}
              priority
            />
          </div>

          <div className="absolute inset-0 z-0 opacity-30 block lg:hidden">
            <Image
              src="/web3_mobile.png"
              alt="Mobile web background"
              fill
              sizes="(max-width: 1024px) 100vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
              }}
              priority
            />
          </div>

          {/* Background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/30 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="lc-section-title-dark mb-4">ПРОБНИЙ УРОК</h2>
              <p className="text-sm md:text-base text-white/90 mb-10 max-w-3xl mx-auto">
                Залиште контакти і менеджер зв'яжеться з вами, щоб надати
                відповіді на всі запитання та забронювати місце для дитини.
              </p>
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-sm font-medium text-white/95 shadow-sm lc-chip">
                  <span className="h-2 w-2 rounded-full bg-primary-light" />
                  Доступне офлайн та онлайн навчання
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-w-4xl mx-auto transition-all rounded-[12px] shadow-xl p-8 transform hover:shadow-2xl hover:scale-[1.01] duration-300 lc-glass-card-strong"
                id="form_construct_main"
              >
                <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-primary/75 mb-2 text-left pl-1">
                      Ваше ім'я
                    </label>
                    <div
                      className={`bg-white rounded-[10px] transition-shadow duration-200 ${
                        validationErrors.name
                          ? 'shadow-[0_0_0_2px_rgba(239,68,68,0.5)]'
                          : 'shadow-md hover:shadow-lg'
                      } transform-gpu transition-transform duration-300 focus-within:scale-[1.02]`}
                    >
                      <input
                        type="text"
                        className="w-full px-5 py-3 border-0 focus:outline-none focus:ring-0 text-primary rounded-[10px]"
                        placeholder="ПІБ"
                        name="SiteForm[fio]"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value)
                          validateForm(e.target.value, phone, childAge)
                        }}
                        aria-invalid={validationErrors.name}
                        aria-required="true"
                      />
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-500 text-sm mt-2 text-left ml-2 transition-opacity">
                        Ім'я повинно містити щонайменше 3 символи
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-primary/75 mb-2 text-left pl-1">
                      Вік дитини
                    </label>
                    <div
                      className={`bg-white rounded-[10px] transition-shadow duration-200 ${
                        validationErrors.childAge
                          ? 'shadow-[0_0_0_2px_rgba(239,68,68,0.5)]'
                          : 'shadow-md hover:shadow-lg'
                      } transform-gpu transition-transform duration-300 focus-within:scale-[1.02]`}
                    >
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-full px-5 py-3 border-0 focus:outline-none focus:ring-0 text-primary rounded-[10px]"
                        placeholder="Вік дитини (5-16)"
                        name="SiteForm[childAge]"
                        value={childAge}
                        onChange={handleAgeChange}
                        aria-invalid={validationErrors.childAge}
                        aria-required="true"
                      />
                    </div>
                    {validationErrors.childAge && (
                      <p className="text-red-500 text-sm mt-2 text-left ml-2 transition-opacity">
                        Будь ласка, введіть коректний вік дитини (5-16 років)
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-primary/75 mb-2 text-left pl-1">
                      Номер телефону
                    </label>
                    <div
                      className={`bg-white rounded-[10px] transition-shadow duration-200 ${
                        validationErrors.phone
                          ? 'shadow-[0_0_0_2px_rgba(239,68,68,0.5)]'
                          : 'shadow-md hover:shadow-lg'
                      } transform-gpu transition-transform duration-300 focus-within:scale-[1.02]`}
                    >
                      <div
                        className="relative"
                        ref={phoneDropdownRef}
                        style={phoneInputContainerStyles}
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 flex items-center px-3 cursor-pointer hover:bg-primary/5 border-r border-primary-light/20 rounded-l-[20px] transition-colors duration-200 z-10"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowCountryDropdown(!showCountryDropdown)
                          }}
                          style={{ width: '70px', justifyContent: 'center' }}
                        >
                          <span className="text-lg">
                            {countryCodes.find((c) => c.code === countryCode)
                              ?.flag || '🌍'}
                          </span>
                          <svg
                            className={`w-4 h-4 ml-1 text-primary/55 transition-transform duration-200 ${
                              showCountryDropdown ? 'transform rotate-180' : ''
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="tel"
                          className="w-full pl-20 pr-5 py-3 border-0 focus:outline-none focus:ring-0 text-primary rounded-[10px]"
                          placeholder="Номер телефону"
                          name="SiteForm[phone]"
                          value={phone}
                          onChange={handlePhoneChange}
                          aria-invalid={validationErrors.phone}
                          aria-required="true"
                        />

                        {/* Fixed dropdown for country code selection */}
                        {showCountryDropdown && (
                          <>
                            <div
                              className="fixed inset-0 bg-black/25 backdrop-blur-[1px]"
                              style={{ zIndex: 10000 }}
                              onClick={handleClickOutsideDropdown}
                            />
                            <div
                              style={mobileDropdownStyles}
                              className="animate-dropdown rounded-[8px] border border-primary-light/20 bg-[#FCFEFA] shadow-xl"
                            >
                              {countryCodes.map((country) => (
                                <div
                                  key={country.code}
                                  className={`px-4 py-3 hover:bg-primary/5 cursor-pointer flex items-center border-b border-primary-light/10 last:border-0 transition-colors duration-150 ${
                                    countryCode === country.code
                                      ? 'bg-primary-light/15'
                                      : ''
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCountrySelect(country.code)
                                  }}
                                >
                                  <span className="text-xl mr-3">
                                    {country.flag}
                                  </span>
                                  <div>
                                    <span className="font-medium text-primary">
                                      {country.code}
                                    </span>
                                    <span className="ml-2 text-primary/55 text-sm">
                                      {country.country}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    {validationErrors.phone && (
                      <p className="text-red-500 text-sm mt-2 text-left ml-2 transition-opacity">
                        Будь ласка, введіть коректний номер телефону
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="w-full bg-primary-light text-primary font-semibold rounded-[6px] focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 hover:bg-accent transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed py-3 flex items-center justify-center px-4"
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        Обробка...
                      </span>
                    ) : (
                      <span className="text-sm md:text-base whitespace-nowrap font-medium leading-none">
                        Зареєструватися
                      </span>
                    )}
                  </button>
                </div>

                {/* Hidden fields */}
                <input
                  className="hidden"
                  type="text"
                  name="filled_hidden_field"
                />
                <input
                  type="hidden"
                  name="SiteForm[filling_time]"
                  value={fillingTime.toString()}
                />
                <input type="hidden" value="lv" name="SiteForm[branch]" />
                <input
                  type="hidden"
                  name="SiteForm[type]"
                  value="school-consult"
                />
                <input type="hidden" name="SiteForm[name_course]" value="" />
                <input
                  type="hidden"
                  name="SiteForm[siteSection]"
                  value="home"
                />
                <input
                  type="hidden"
                  name="xfSd67rtJ"
                  value="sjeU0NtECtgA2KURWqNPbhFwBcZDKwSdE61lSwLaJijLA_mhtAUyrmmH9Hdo2gUodTU2tTJ4NcVV-igTM7FtSw=="
                />
                <input
                  type="hidden"
                  name="SiteForm[childAge]"
                  value={childAge}
                />
              </form>
              <div className="mt-8 text-center">
                <p className="text-sm text-white/80">
                  Натискаючи кнопку "Зареєструватися", надаю свою згоду на
                  обробку персональних даних. Ми зобов'язуємося використовувати
                  отриману інформацію тільки всередині нашої компанії, і не
                  передавати третім особам.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-dropdown {
          animation: dropdown 0.2s ease-out forwards;
        }

        @media (max-width: 768px) {
          .animate-dropdown > div {
            padding: 12px;
          }

          .animate-dropdown {
            animation: none;
            opacity: 1;
          }
        }

        /* Fix z-index for modal overlaps */
        .project-preview-open .header {
          z-index: 1 !important;
        }

        .project-preview-open form,
        .project-preview-open section {
          z-index: auto !important;
        }

        .project-preview-open {
          position: relative;
        }

        /* Proper z-index hierarchy */
        #form_construct_main {
          z-index: 10;
          position: relative;
        }

        /* Fix for country code dropdown appearing behind modal */
        body.project-preview-open .fixed.inset-0.bg-black\/20 {
          z-index: 10000 !important;
        }

        /* Consultation modal has higher priority than Probne */
        body.consultation-modal-open .probne-section {
          z-index: auto !important;
        }

        body.consultation-modal-open .probne-section .fixed {
          z-index: 14000 !important;
        }

        body.consultation-modal-open #form_construct_main {
          z-index: auto !important;
        }

        /* Project preview modal should be highest */
        body.project-preview-modal-open .probne-section {
          z-index: auto !important;
        }

        body.project-preview-modal-open .probne-section .fixed {
          z-index: 19000 !important;
        }
      `}</style>
    </section>
  )
}

export default Probne
