'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { performanceOptimizer } from '../../lib/utils'

type MediaFallbackProps = {
  src: string
  fallbackSrc: string
  alt: string
  type: 'image' | 'video'
  quality?: number
  priority?: boolean
  className?: string
  imageProps?: Partial<ImageProps>
  videoProps?: Partial<React.VideoHTMLAttributes<HTMLVideoElement>>
  lazyLoadVideo?: boolean
}

/**
 * A component that attempts to load media (image or video) with a fallback
 * Optimized for performance and reduced data usage
 */
const MediaFallback: React.FC<MediaFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  type,
  quality = 75,
  priority = false,
  className = '',
  imageProps = {},
  videoProps = {},
  lazyLoadVideo = true,
}) => {
  const [error, setError] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [isInViewport, setIsInViewport] = useState(false)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(!lazyLoadVideo)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Detect when element enters viewport using intersection observer
  useIntersectionObserver(
    containerRef,
    ([entry]) => {
      setIsInViewport(entry.isIntersecting)
    },
    {
      threshold: 0.1,
      rootMargin: '100px 0px', // Start loading a bit before it comes into view
    }
  )

  useEffect(() => {
    // Check if we're offline
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine)
    }

    // Check network conditions for video playback
    const checkNetworkForVideo = () => {
      if (type !== 'video') return

      // For video, check for data saver and connection quality
      const networkCondition = performanceOptimizer.detectNetworkCondition()
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      // Only load video on medium or fast connections with no reduced motion preference
      const shouldLoad = !prefersReducedMotion && networkCondition !== 'slow'

      setShouldLoadVideo(shouldLoad)
      if (!shouldLoad) {
        setError(true) // Use the fallback image
      }
    }

    updateOnlineStatus()
    checkNetworkForVideo()

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // If we're offline, immediately show the fallback
    if (!navigator.onLine) {
      setError(true)
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [type])

  // When video enters viewport, load it if we haven't yet
  useEffect(() => {
    if (
      type === 'video' &&
      isInViewport &&
      !videoLoaded &&
      shouldLoadVideo &&
      !error
    ) {
      if (videoRef.current) {
        // Reset the video source to force loading
        videoRef.current.load()

        // Try to play - this may fail on mobile without user interaction
        const playPromise = videoRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Playback failed, but that's okay - we'll try again on user interaction
            // Don't set error, as this is an expected case on mobile
          })
        }
      }
    }
  }, [isInViewport, videoLoaded, shouldLoadVideo, error, type])

  // When online status changes and we come back online, try the original media again
  useEffect(() => {
    if (!isOffline && error) {
      setError(false)
    }
  }, [isOffline, error])

  // Video component with fallback to image
  if (type === 'video') {
    // Always render the container for the intersection observer
    return (
      <div ref={containerRef} className={`relative w-full h-full ${className}`}>
        {/* Always show fallback image first for perceived performance */}
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          quality={quality}
          priority={priority}
          className={`object-cover transition-opacity duration-500 ${
            !error && videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          {...imageProps}
        />

        {/* Only load video if conditions are met */}
        {shouldLoadVideo && isInViewport && !error && (
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            controls={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setError(true)}
            preload="metadata"
            {...videoProps}
          >
            {/* Try WebM format first (better compression, smaller file) */}
            <source src={src.replace(/\.mp4$/, '.webm')} type="video/webm" />
            {/* Fallback to MP4 if WebM not supported */}
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    )
  }

  // Image component with fallback
  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        quality={quality}
        priority={priority}
        onError={() => setError(true)}
        {...imageProps}
      />
    </div>
  )
}

export default MediaFallback
