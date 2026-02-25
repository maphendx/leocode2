import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
      <div className="text-center">
        <div className="mx-auto h-40 w-40 relative">
          <Image
            src="/new_logo_dark.svg"
            alt="LEO CODE"
            width={160}
            height={160}
            priority
            sizes="160px"
          />
        </div>
        <p className="text-3xl font-bold text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Сторінку не знайдено
        </h1>
        <p className="mt-6 text-base text-gray-600">
          На жаль, ми не змогли знайти сторінку, яку ви шукали.
        </p>
        <div className="mt-10 flex justify-center">
          <Link
            href="/"
            className="rounded-[40px] bg-accent px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent-hover focus-visible:outline-accent"
          >
            На головну сторінку
          </Link>
        </div>
      </div>
    </div>
  )
}
