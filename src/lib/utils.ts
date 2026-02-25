/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { useEffect, useLayoutEffect } from 'react'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Optimizes loading by preventing layout shifts and improving perceived performance
 */
export const performanceOptimizer = {
  // Prevent Cumulative Layout Shift by pre-calculating dimensions
  calculateAspectRatio: (width: number, height: number) => {
    return { paddingBottom: `${(height / width) * 100}%` }
  },

  // Debounce function to limit expensive operations
  debounce: <F extends (...args: any[]) => any>(
    func: F,
    wait: number
  ): ((...args: Parameters<F>) => void) => {
    let timeout: ReturnType<typeof setTimeout> | null = null

    return function (...args: Parameters<F>) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  // Check if we can use modern image formats
  canUseWebP: () => {
    if (typeof document === 'undefined') return false

    const elem = document.createElement('canvas')
    if (elem.getContext && elem.getContext('2d')) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0
    }
    return false
  },

  // Simple network condition detector
  detectNetworkCondition: (): 'slow' | 'medium' | 'fast' => {
    if (typeof navigator === 'undefined') return 'medium'

    const connection = (navigator as any).connection

    if (!connection) return 'medium'

    const { effectiveType, downlink, rtt, saveData } = connection

    if (
      saveData ||
      effectiveType === 'slow-2g' ||
      effectiveType === '2g' ||
      downlink < 0.5
    ) {
      return 'slow'
    }

    if (effectiveType === '3g' || downlink < 2 || rtt > 500) {
      return 'medium'
    }

    return 'fast'
  },

  // Generate lower quality placeholder for lazy loading images
  generatePlaceholder: (width = 10, height = 10, color = '#f0f0f0'): string => {
    if (typeof document === 'undefined') return ''

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) return ''

    ctx.fillStyle = color
    ctx.fillRect(0, 0, width, height)

    return canvas.toDataURL('image/png')
  },
}
