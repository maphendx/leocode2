/**
 * Service to preload important images in the background
 */
export class ImagePreloader {
  private static _instance: ImagePreloader | null = null
  private _preloadedImages: Set<string> = new Set()
  private _lowPriorityQueue: string[] = []
  private _isProcessingQueue: boolean = false
  private _loadingPromises: Map<string, Promise<void>> = new Map()
  private _maxConcurrentLoads: number = 2

  private constructor() {
    // Initialize observer if available
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      this._initializeIntersectionObserver()
    }
  }

  static getInstance(): ImagePreloader {
    if (!this._instance) {
      this._instance = new ImagePreloader()
    }
    return this._instance
  }

  /**
   * Preload a high-priority image immediately
   */
  preloadImage(src: string): Promise<void> {
    if (this._preloadedImages.has(src)) {
      return Promise.resolve()
    }

    // Return existing promise if already loading this image
    if (this._loadingPromises.has(src)) {
      return this._loadingPromises.get(src)!
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image()

      const cleanup = () => {
        img.onload = null
        img.onerror = null
        this._loadingPromises.delete(src)
      }

      img.onload = () => {
        this._preloadedImages.add(src)
        cleanup()
        resolve()
      }

      img.onerror = () => {
        cleanup()
        reject(new Error(`Failed to preload image: ${src}`))
      }

      // Add timestamp to bypass cache if needed for development
      img.src = src
    })

    this._loadingPromises.set(src, loadPromise)
    return loadPromise
  }

  /**
   * Add images to low-priority queue to be loaded when idle
   */
  queueImages(sources: string[]): void {
    // Filter out already loaded or queued images
    const newSources = sources.filter(
      (src) =>
        !this._preloadedImages.has(src) && !this._lowPriorityQueue.includes(src)
    )

    if (newSources.length === 0) return

    this._lowPriorityQueue.push(...newSources)

    if (!this._isProcessingQueue) {
      this._processQueue()
    }
  }

  /**
   * Process the queue of low priority images when the browser is idle
   */
  private _processQueue(): void {
    this._isProcessingQueue = true

    // Process multiple images in parallel but limit concurrency
    const processNext = () => {
      if (this._lowPriorityQueue.length === 0) {
        this._isProcessingQueue = false
        return
      }

      // Only load more if we're under the concurrent limit
      const currentlyLoading = this._loadingPromises.size
      if (currentlyLoading >= this._maxConcurrentLoads) {
        // Try again shortly
        setTimeout(processNext, 100)
        return
      }

      const src = this._lowPriorityQueue.shift()!

      const scheduleLoad = (callback: () => void) => {
        if (typeof window !== 'undefined') {
          if ('requestIdleCallback' in window) {
            const rIC =
              window.requestIdleCallback ||
              ((cb: IdleRequestCallback) =>
                setTimeout(
                  () => cb({ didTimeout: false, timeRemaining: () => 50 }),
                  1
                ))

            rIC(() => callback(), { timeout: 1000 })
          } else {
            // Fallback with more efficient setTimeout
            setTimeout(callback, 50)
          }
        } else {
          callback() // Handle SSR case
        }
      }

      scheduleLoad(() => {
        this.preloadImage(src)
          .catch(() => {}) // Silently handle errors for queued images
          .finally(() => {
            // Continue processing the queue
            processNext()
          })
      })
    }

    processNext()
  }

  /**
   * Initialize an intersection observer to preload images as they approach the viewport
   */
  private _initializeIntersectionObserver(): void {
    // This will be used by components to register images for viewport-based loading
    // Implementation details omitted for brevity
  }

  /**
   * Check if an image is already preloaded
   */
  isImagePreloaded(src: string): boolean {
    return this._preloadedImages.has(src)
  }

  /**
   * Preload critical images for initial display
   */
  preloadCriticalImages(sources: string[]): void {
    if (sources.length === 0) return

    // For critical images, load them immediately in parallel
    Promise.all(
      sources.map((src) => this.preloadImage(src).catch(() => {}))
    ).catch(() => {
      // Silently handle errors for critical images
    })
  }
}

export default ImagePreloader.getInstance()
