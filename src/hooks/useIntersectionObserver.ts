import { useEffect, RefObject } from 'react'

interface IntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

/**
 * Custom hook that observes when an element enters or exits the viewport
 * @param elementRef - Reference to the element to observe
 * @param callback - Callback function to run when intersection changes
 * @param options - IntersectionObserver options and additional custom options
 */
export const useIntersectionObserver = (
  elementRef: RefObject<Element | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverOptions = {}
): void => {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = false,
  } = options

  useEffect(() => {
    const element = elementRef?.current
    if (!element || typeof IntersectionObserver === 'undefined') return

    let isFrozen = false

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      if (freezeOnceVisible && entries[0]?.isIntersecting && !isFrozen) {
        isFrozen = true
        callback(entries)
        return
      }

      if (!freezeOnceVisible || !isFrozen) {
        callback(entries)
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      root,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      if (observer && element) {
        observer.unobserve(element)
        observer.disconnect()
      }
    }
  }, [elementRef, threshold, root, rootMargin, freezeOnceVisible, callback])
}
