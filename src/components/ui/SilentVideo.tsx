'use client'

import React, { useRef, useEffect } from 'react'

type SilentVideoProps = {
  src: string
  poster?: string
  width?: string | number
  height?: string | number
  autoPlay?: boolean
  loop?: boolean
  controls?: boolean
  className?: string
  playsInline?: boolean
}

/**
 * A component for displaying videos without sound
 * This automatically sets muted=true and manages video attributes
 */
const SilentVideo: React.FC<SilentVideoProps> = ({
  src,
  poster,
  width = '100%',
  height = 'auto',
  autoPlay = true,
  loop = true,
  controls = false,
  className = '',
  playsInline = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // This ensures the video is always muted
    if (videoRef.current) {
      videoRef.current.muted = true
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      width={width}
      height={height}
      autoPlay={autoPlay}
      loop={loop}
      muted={true} // Always muted
      controls={controls}
      playsInline={playsInline}
      className={className}
      onVolumeChange={(e) => {
        // This prevents users from unmuting the video
        const video = e.currentTarget
        if (!video.muted) {
          video.muted = true
        }
      }}
    />
  )
}

export default SilentVideo
