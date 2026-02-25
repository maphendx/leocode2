'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Щось пішло не так
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Ми вже працюємо над виправленням проблеми
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <button
            onClick={reset}
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Спробувати ще раз
          </button>
          <Link href="/" className="text-sm font-semibold text-accent">
            На головну <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
