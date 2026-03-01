import Link from 'next/link'
import { CalendarDays, Clock3, MapPin, Users } from 'lucide-react'
import { homeEvents } from '@/data/events'

const formatClasses: Record<string, string> = {
  Офлайн: 'bg-[#EAF5E3] text-[#2E6B2A] border-[#BFDAB7]',
  Онлайн: 'bg-[#E7F0FF] text-[#2B4F8A] border-[#BFD0EC]',
  Гібрид: 'bg-[#F2EAFD] text-[#5B3F8D] border-[#D5C7EE]',
}

const Events = () => {
  return (
    <section id="podii" className="lc-section-soft py-12 md:py-16">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="mb-8 md:mb-10">
          <div>
            <h2 className="lc-section-title mb-3">ПОДІЇ LEO CODE</h2>
            <p className="lc-section-lead max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {homeEvents.map((event) => (
            <article
              key={event.id}
              className="h-full border border-[#D7DDD3] bg-[#FBFCF9] p-4 md:p-5 lg:p-6 flex flex-col"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <span
                  className={`inline-flex rounded-[4px] border px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.05em] ${formatClasses[event.format] || 'bg-[#EEF2EC] text-[#3F4A3F] border-[#D1DAD0]'}`}
                >
                  {event.format}
                </span>
                <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#4E594E]">
                  <Users className="h-3.5 w-3.5" />
                  {event.age}
                </span>
              </div>

              <h3 className="text-[#252C27] text-[20px] md:text-[24px] font-extrabold tracking-[-0.03em] leading-[1.02] mb-3">
                {event.title}
              </h3>

              <p className="text-[#4F594F] text-[14px] md:text-[15px] leading-relaxed mb-4">
                {event.description}
              </p>

              <ul className="space-y-2 text-[13px] md:text-[14px] text-[#3F4840] mb-5">
                <li className="flex items-center gap-2.5">
                  <CalendarDays className="h-4 w-4 text-[#6DBE64]" />
                  <span>{event.date}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock3 className="h-4 w-4 text-[#6DBE64]" />
                  <span>{event.time}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 text-[#6DBE64]" />
                  <span>{event.location}</span>
                </li>
              </ul>

              <Link
                href={event.ctaHref}
                className="mt-auto inline-flex h-11 items-center justify-center rounded-[4px] bg-[#78C86F] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-[#1A2518] transition-colors hover:bg-[#88D57F]"
              >
                {event.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Events
