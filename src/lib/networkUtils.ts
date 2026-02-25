/**
 * Network utilities for offline detection, connection quality,
 * and image fallback handling
 */

// Singleton for tracking network status
class NetworkManager {
  private static instance: NetworkManager
  private _isOnline: boolean = true
  private _subscribers: Set<(online: boolean) => void> = new Set()
  private _initialized: boolean = false
  private _connectionQuality: 'slow' | 'medium' | 'fast' | 'unknown' = 'unknown'

  private constructor() {
    // Initialize with current network state if available
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      this._isOnline = navigator.onLine
      this._initializeNetworkListeners()
    }

    this._detectConnectionQuality()
  }

  public static getInstance(): NetworkManager {
    if (!NetworkManager.instance) {
      NetworkManager.instance = new NetworkManager()
    }
    return NetworkManager.instance
  }

  private _initializeNetworkListeners(): void {
    if (typeof window === 'undefined' || this._initialized) return

    window.addEventListener('online', this._handleOnline)
    window.addEventListener('offline', this._handleOffline)

    // Listen for connection changes if available
    if ('connection' in navigator) {
      const connection = (navigator as NavigatorWithConnection).connection
      if (connection && 'addEventListener' in connection) {
        connection.addEventListener('change', this._handleConnectionChange)
      }
    }

    this._initialized = true
  }

  private _handleOnline = (): void => {
    this._isOnline = true
    this._notifySubscribers()
  }

  private _handleOffline = (): void => {
    this._isOnline = false
    this._notifySubscribers()
  }

  private _handleConnectionChange = (): void => {
    this._detectConnectionQuality()
    this._notifySubscribers()
  }

  private _detectConnectionQuality(): void {
    if (typeof navigator === 'undefined') {
      this._connectionQuality = 'unknown'
      return
    }

    if (!navigator.onLine) {
      this._connectionQuality = 'slow'
      return
    }

    if ('connection' in navigator) {
      const connection = (navigator as NavigatorWithConnection).connection
      if (connection) {
        if (connection.saveData) {
          this._connectionQuality = 'slow'
          return
        }

        switch (connection.effectiveType) {
          case 'slow-2g':
          case '2g':
            this._connectionQuality = 'slow'
            break
          case '3g':
            this._connectionQuality = 'medium'
            break
          case '4g':
            this._connectionQuality = 'fast'
            break
          default:
            this._connectionQuality = 'unknown'
        }
        return
      }
    }

    this._connectionQuality = 'unknown'
  }

  private _notifySubscribers(): void {
    this._subscribers.forEach((callback) => {
      try {
        callback(this._isOnline)
      } catch (error) {
        console.error('Error in network status callback:', error)
      }
    })
  }

  public subscribe(callback: (online: boolean) => void): () => void {
    if (!this._initialized && typeof window !== 'undefined') {
      this._initializeNetworkListeners()
    }

    this._subscribers.add(callback)

    // Immediately call with current status
    callback(this._isOnline)

    // Return unsubscribe function
    return () => {
      this._subscribers.delete(callback)
    }
  }

  public getOnlineStatus(): boolean {
    // Check current status directly before returning
    if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
      this._isOnline = navigator.onLine
    }
    return this._isOnline
  }

  public getConnectionQuality(): 'slow' | 'medium' | 'fast' | 'unknown' {
    return this._connectionQuality
  }

  public cleanup(): void {
    if (typeof window === 'undefined' || !this._initialized) return

    window.removeEventListener('online', this._handleOnline)
    window.removeEventListener('offline', this._handleOffline)

    if ('connection' in navigator) {
      const connection = (navigator as NavigatorWithConnection).connection
      if (connection && 'removeEventListener' in connection) {
        connection.removeEventListener('change', this._handleConnectionChange)
      }
    }

    this._initialized = false
  }
}

// Export singleton instance
export const networkManager = NetworkManager.getInstance()

/**
 * Check if browser is currently offline
 */
export function isOffline(): boolean {
  return !networkManager.getOnlineStatus()
}

/**
 * Interface for browsers with NetworkInformation API
 */
interface NavigatorWithConnection extends Navigator {
  connection?: {
    effectiveType?: string
    saveData?: boolean
    addEventListener: (type: string, listener: EventListener) => void
    removeEventListener: (type: string, listener: EventListener) => void
  }
}

/**
 * Get current connection quality
 */
export function getConnectionQuality(): 'slow' | 'medium' | 'fast' | 'unknown' {
  return networkManager.getConnectionQuality()
}

/**
 * Formats a fallback image URL that can be used when the main image fails to load
 * @param originalUrl The original image URL
 * @param type The type of fallback to generate (placeholder, blur, etc.)
 */
export function getFallbackImageUrl(
  originalUrl: string,
  type: 'placeholder' | 'blur' = 'placeholder'
): string {
  // Check if we're using an absolute URL
  if (originalUrl.startsWith('http')) {
    return '/images/fallbacks/image-placeholder.svg'
  }

  // If we already have a fallback image, return it
  if (originalUrl.includes('fallback')) {
    return originalUrl
  }

  // Generate path to an appropriate fallback
  const basePath = '/images/fallbacks'

  // For placeholders, try to match the image type with an appropriate fallback
  if (originalUrl.includes('course')) {
    return `${basePath}/image-placeholder.svg`
  } else if (
    originalUrl.includes('profile') ||
    originalUrl.includes('avatar')
  ) {
    return `${basePath}/image-placeholder.svg`
  } else if (originalUrl.includes('logo')) {
    return `${basePath}/image-placeholder.svg`
  } else {
    // Default fallback
    return `${basePath}/image-placeholder.svg`
  }
}

/**
 * Utility to preload critical images to avoid layout shifts
 * @param urls Array of image URLs to preload
 */
export function preloadImages(urls: string[]): void {
  if (typeof window === 'undefined') return

  // Use the imagePreloader service instead of manual loading
  import('@/services/imagePreloader')
    .then((module) => {
      const imagePreloader = module.default
      imagePreloader.preloadCriticalImages(urls)
    })
    .catch((err) => {
      console.error('Failed to import imagePreloader:', err)

      // Fallback to basic preloading if module import fails
      if (isOffline()) return

      urls.forEach((url) => {
        const img = new Image()
        img.src = url
      })
    })
}
