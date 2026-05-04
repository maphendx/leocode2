'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [offlineMode, setOfflineMode] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)
  const resolvedSrc = useMemo(() => String(src), [src])
  const isPreloaded =
    typeof src === 'string' && imagePreloader.isImagePreloaded(src)
  const [imageState, setImageState] = useState(() => ({
    src: resolvedSrc,
    error: false,
    isLoaded: isPreloaded,
  }))

  // Add missing sizes prop for fill images
  const defaultSizes = fill
    ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    : sizes

  const currentImageState =
    imageState.src === resolvedSrc
      ? imageState
      : {
          src: resolvedSrc,
          error: false,
          isLoaded: isPreloaded,
        }

  // Check for preloaded status
  useEffect(() => {
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
  }, [src, withPreload])

  useEffect(() => {
    // Check for offline status initially and on changes
    const updateOfflineStatus = () => {
      const offline = isOffline()
      setOfflineMode(offline)
    }

    updateOfflineStatus()

    window.addEventListener('online', updateOfflineStatus)
    window.addEventListener('offline', updateOfflineStatus)

    return () => {
      window.removeEventListener('online', updateOfflineStatus)
      window.removeEventListener('offline', updateOfflineStatus)
    }
  }, [])

  // Handle successful image load
  const handleLoad = () => {
    setImageState({
      src: resolvedSrc,
      error: false,
      isLoaded: true,
    })
    if (onLoad) onLoad()
  }

  // Handle image load error
  const handleError = () => {
    setImageState({
      src: resolvedSrc,
      error: true,
      isLoaded: currentImageState.isLoaded,
    })
    // Preload fallback image if needed
    if (fallbackSrc && typeof fallbackSrc === 'string') {
      imagePreloader.preloadImage(fallbackSrc).catch(() => {
        // Silently handle fallback preload errors
      })
    }
  }

  // Use fallback or generate one if image fails to load
  const imageSrc = currentImageState.error || offlineMode
    ? fallbackSrc ||
      (showPlaceholder ? getFallbackImageUrl(src as string) : src)
    : src

  // Apply fade-in effect with CSS classes
  const imageClasses = [
    className || '',
    fadeIn ? 'transition-opacity duration-300' : '',
    fadeIn && !currentImageState.isLoaded && !priority ? 'opacity-0' : 'opacity-100',
    currentImageState.error || offlineMode ? 'image-fallback' : '',
    'gpu', // Apply hardware acceleration class
  ]
    .filter(Boolean)
    .join(' ')

  // If using placeholder and not loaded yet
  if (lowQualitySrc && !currentImageState.isLoaded && !priority) {
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
