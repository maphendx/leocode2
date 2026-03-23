import type { LucideIcon } from 'lucide-react'
import {
  CalendarDays,
  Clock3,
  FilePenLine,
  Gift,
  MapPin,
  Phone,
  Users,
} from 'lucide-react'
import PartnershipSection from './PartnershipSection'

type InfoCard = {
  icon: LucideIcon
  label: string
  value: string
}

const directions = [
  { title: 'Canva', description: 'створення постеру' },
  {
    title: '3D-моделювання',
    description: 'створення прототипу 3D-моделі іграшки',
  },
  {
    title: 'Виставка дронів',
    description: 'ознайомлення з їх анатомією та різновидами',
  },
  {
    title: 'Симулятор',
    description: 'керування дроном у віртуальному середовищі',
  },
]

const highlights = [
  'Мета квесту — познайомити учнів 1–5 класів із сучасними технологіями у доступному та цікавому форматі.',
  'Квест розвиває креативне та логічне мислення, базові цифрові навички та інженерне мислення.',
  'Під час проходження станцій діти вчаться працювати в команді, приймати рішення, експериментувати та не боятися помилятись.',
]

const logisticsCards: InfoCard[] = [
  {
    icon: FilePenLine,
    label: 'Формат',
    value: '4 станції по 20 хвилин, робота в групах із ротацією між станціями',
  },
  { icon: Clock3, label: 'Тривалість', value: '1,5 години' },
  { icon: Users, label: 'Кількість учасників', value: 'від 20 учнів' },
  {
    icon: CalendarDays,
    label: 'Графік',
    value: "понеділок-п'ятниця 10:00 або 12:00",
  },
]

const supportCards: InfoCard[] = [
  {
    icon: Gift,
    label: 'Подарунки',
    value: 'Брендовані подарунки та сертифікат від нашого простору для кожного учня.',
  },
  {
    icon: FilePenLine,
    label: 'Реєстрація',
    value: 'Реєстрація дітей здійснюється шляхом заповнення Google-форми.',
  },
]

const locations = ['Мазепи, 25д', 'Наукова, 49']

const InfoCardItem = ({ item }: { item: InfoCard }) => (
  <article className="rounded-[8px] border border-black/8 bg-white/72 p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#79B96F]/35 bg-[#79B96F]/10">
        <item.icon className="h-4 w-4 text-[#4F8E47]" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6474]">
          {item.label}
        </p>
        <p className="mt-1 text-[#232A37] text-[14px] leading-snug">{item.value}</p>
      </div>
    </div>
  </article>
)

export default function NaukovyiKvestSection() {
  return (
    <PartnershipSection
      id="naukovyi-kvest"
      title="НАУКОВИЙ КВЕСТ"
      theme="light"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-3.5">
        <div className="space-y-3.5">
          <article className="rounded-[8px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(250,251,247,0.96)_100%)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]">
            <p className="text-[#1F2430] text-[16px] md:text-[18px] font-semibold leading-relaxed">
              КВЕСТ — STEM-екскурсія, під час якої діти проходять серію
              тематичних станцій, виконують практичні завдання та відкривають
              для себе світ технологій через гру та дослідження.
            </p>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {directions.map((item, index) => (
              <article
                key={item.title}
                className="rounded-[8px] border border-black/8 bg-white/72 p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[#1F2430] text-[17px] font-extrabold tracking-[-0.03em]">
                    {item.title}
                  </p>
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#79B96F]/45 text-[#4F8E47] text-[12px] font-bold">
                    {index + 1}
                  </span>
                </div>
                <p className="mt-1 text-[#4A5567] text-[13px] leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <article className="rounded-[8px] border border-black/8 bg-white/72 p-4 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6474]">
              Ключова цінність
            </p>
            <ul className="mt-2.5 space-y-2">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[#283140] text-[14px] leading-relaxed"
                >
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#79B96F]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <details className="group rounded-[8px] border border-black/8 bg-white/72 p-4 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
            <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
              <span className="text-[11px] uppercase tracking-[0.08em] text-[#5A6474]">
                Детальніше
              </span>
              <span className="text-[#5A6474] text-[13px] group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="mt-3 space-y-3 text-[#434F61] text-[14px] leading-relaxed">
              <p>
                Під час квесту формується інтерес до навчання та перше розуміння
                того, як працюють технології, які діти використовують щодня.
              </p>
              <p>
                Формат побудований як 4 станції по 20 хвилин, де учні
                працюють у групах і по черзі переходять між активностями.
              </p>
              <p>
                Такий підхід поєднує гру, дослідження та практику, тому квест
                добре підходить для молодших школярів і легко утримує увагу
                протягом усього маршруту.
              </p>
            </div>
          </details>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-3">
            {logisticsCards.map((item) => (
              <InfoCardItem key={item.label} item={item} />
            ))}
          </div>

          <article className="rounded-[8px] border border-black/8 bg-white/72 p-3.5 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset]">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6474]">
              Локації проведення
            </p>
            <ul className="mt-2 space-y-1.5">
              {locations.map((location) => (
                <li
                  key={location}
                  className="flex items-center gap-2 text-[#232A37] text-[14px]"
                >
                  <MapPin className="h-4 w-4 text-[#4F8E47] shrink-0" />
                  <span>{location}</span>
                </li>
              ))}
            </ul>
          </article>

          {supportCards.map((item) => (
            <InfoCardItem key={item.label} item={item} />
          ))}

          <article className="rounded-[8px] border border-[#79B96F]/45 bg-[linear-gradient(90deg,rgba(255,255,255,0.86)_0%,rgba(232,242,227,0.96)_100%)] p-3.5 md:p-4 shadow-[0_1px_0_rgba(255,255,255,0.6)_inset]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#79B96F]/45 bg-[#79B96F]/10">
                  <Phone className="h-4 w-4 text-[#4F8E47]" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#5A6474]">
                  Телефон для запису на квест
                  </p>
                <a
                  href="tel:+380687388908"
                  className="mt-0.5 inline-block text-[#3F7B39] text-[22px] md:text-[24px] font-extrabold tracking-[-0.03em] hover:text-[#33672E] transition-colors"
                >
                  380 68 738 89 08
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </PartnershipSection>
  )
}
