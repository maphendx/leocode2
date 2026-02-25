'use client'

import { useState, useEffect, useRef } from 'react'
import NextImage, { ImageProps as NextImageProps } from 'next/image'
import { isOffline, getFallbackImageUrl } from '@/lib/networkUtils'
import imagePreloader from '@/services/imagePreloader'

export interface ImageProps extends Omit<NextImageProps, 'onError'> {
  fallbackSrc?: string
  showPlaceholder?: boolean
  lowQualitySrc?: string
  fadeIn?: boolean
  withPreload?: boolean
  onLoad?: () => void
}

export default function Image({
  src,
  alt,
  fallbackSrc,
  lowQualitySrc,
  showPlaceholder = true,
  className = '',
  fill,
  sizes,
  priority = false,
  fadeIn = true,
  withPreload = false,
  onLoad,
  ...rest
}: ImageProps) {
  const [error, setError] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const hasRendered = useRef(false)

  // Add missing sizes prop for fill images
  const defaultSizes = fill
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    : sizes

  // Check for preloaded status
  useEffect(() => {
    if (typeof src === 'string' && imagePreloader.isImagePreloaded(src)) {
      setIsLoaded(true)
    }

    // Preload image if requested and not already loaded
    if (
      withPreload &&
      typeof src === 'string' &&
      !imagePreloader.isImagePreloaded(src)
    ) {
      imagePreloader.preloadImage(src).catch(() => {
        // Silently handle preload errors - will fallback to normal loading
      })
    }

    // Reset states when src changes
    if (!hasRendered.current) {
      hasRendered.current = true
    } else {
      setError(false)
      setIsLoaded(false)
    }
  }, [src, withPreload])

  useEffect(() => {
    // Check for offline status initially and on changes
    const updateOfflineStatus = () => {
      const offline = isOffline()
      setOfflineMode(offline)
      if (offline && !error) {
        setError(true)
      }
    }

    updateOfflineStatus()

    window.addEventListener('online', updateOfflineStatus)
    window.addEventListener('offline', updateOfflineStatus)

    return () => {
      window.removeEventListener('online', updateOfflineStatus)
      window.removeEventListener('offline', updateOfflineStatus)
    }
  }, [error])

  // Handle successful image load
  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }

  // Handle image load error
  const handleError = () => {
    setError(true)
    // Preload fallback image if needed
    if (fallbackSrc && typeof fallbackSrc === 'string') {
      imagePreloader.preloadImage(fallbackSrc).catch(() => {
        // Silently handle fallback preload errors
      })
    }
  }

  // Use fallback or generate one if image fails to load
  const imageSrc = error
    ? fallbackSrc ||
      (showPlaceholder ? getFallbackImageUrl(src as string) : src)
    : src

  // Apply fade-in effect with CSS classes
  const imageClasses = [
    className || '',
    fadeIn ? 'transition-opacity duration-300' : '',
    fadeIn && !isLoaded && !priority ? 'opacity-0' : 'opacity-100',
    error ? 'image-fallback' : '',
    'gpu', // Apply hardware acceleration class
  ]
    .filter(Boolean)
    .join(' ')

  // If using placeholder and not loaded yet
  if (lowQualitySrc && !isLoaded && !priority) {
    return (
      <div className="relative">
        {/* Low quality placeholder */}
        <NextImage
          {...rest}
          src={lowQualitySrc}
          alt={alt}
          className={`${imageClasses} blur-sm`}
          fill={fill}
          sizes={defaultSizes}
          priority={false}
          loading="eager"
        />

        {/* Actual image loading in background */}
        <NextImage
          ref={imageRef}
          {...rest}
          src={imageSrc}
          alt={alt}
          className={`${imageClasses} absolute inset-0`}
          onLoad={handleLoad}
          onError={handleError}
          fill={fill}
          sizes={defaultSizes}
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
          style={{ opacity: 0 }} // Hide until loaded
        />
      </div>
    )
  }

  // Default rendering without placeholder
  return (
    <NextImage
      ref={imageRef}
      {...rest}
      src={imageSrc}
      alt={alt}
      className={imageClasses}
      onLoad={handleLoad}
      onError={handleError}
      fill={fill}
      sizes={defaultSizes}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
    />
  )
}
