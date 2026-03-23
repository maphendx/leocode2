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
  { title: 'Canva', description: 'візуальний контент для магазину' },
  { title: 'HTML', description: 'базова веб-сторінка продукту' },
  { title: '3D-моделювання', description: 'створення іграшки для магазину' },
]

const highlights = [
  'Мета воркшопу — ознайомити учнів 6–8 класів із цифровими та креативними напрямками через практичну роботу над реальним проєктом.',
  'Діяльність учнів спрямована на розвиток цифрової грамотності, креативного мислення та первинного розуміння професій у сфері ІТ.',
  'Воркшоп показує міжпредметну інтеграцію та практико-орієнтоване навчання з використанням Canva, HTML і 3D.',
]

const logisticsCards: InfoCard[] = [
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
    value: 'Брендовані подарунки від нашого простору для кожного учня та вчителя.',
  },
  {
    icon: FilePenLine,
    label: 'Реєстрація',
    value: 'Реєстрація дітей здійснюється шляхом заповнення Google-форми учнями.',
  },
]

const locations = ['Мазепи, 25д', 'Наукова, 49']

const InfoCardItem = ({ item }: { item: InfoCard }) => (
  <article className="rounded-[8px] border border-white/10 bg-[#2A2D35] p-3.5">
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#88C980]/35 bg-[#88C980]/8">
        <item.icon className="h-4 w-4 text-[#90D986]" />
      </span>
      <div>
        <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">
          {item.label}
        </p>
        <p className="mt-1 text-white/90 text-[14px] leading-snug">{item.value}</p>
      </div>
    </div>
  </article>
)

export default function VorkshopySection() {
  return (
    <PartnershipSection id="vorkshopy" title="ВОРКШОПИ" theme="dark">
      <div className="space-y-4 md:space-y-5">
        <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_1fr] gap-3.5">
          <div className="space-y-3.5">
            <article className="rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,#2F343D_0%,#2A2D35_100%)] p-4">
              <p className="text-white/92 text-[16px] md:text-[18px] font-semibold leading-relaxed">
                ВОРКШОП — робота над реальним бізнес-кейсом зі створення
                продукту для магазину іграшок у таких напрямках:
              </p>
            </article>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {directions.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[8px] border border-white/10 bg-[#2A2D35] p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-white text-[17px] font-extrabold tracking-[-0.03em]">
                      {item.title}
                    </p>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#88C980]/45 text-[#AEE7A6] text-[12px] font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="mt-1 text-white/72 text-[13px] leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <article className="rounded-[8px] border border-white/10 bg-[#2A2D35] p-4">
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">
                Ключова цінність
              </p>
              <ul className="mt-2.5 space-y-2">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-white/84 text-[14px] leading-relaxed"
                  >
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#88C980]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <details className="group rounded-[8px] border border-white/10 bg-[#2A2D35] p-4">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.08em] text-white/65">
                  Детальніше
                </span>
                <span className="text-white/70 text-[13px] group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="mt-3 space-y-3 text-white/78 text-[14px] leading-relaxed">
                <p>
                  Для освітнього процесу воркшоп є можливістю показати
                  міжпредметну інтеграцію та впровадження
                  практико-орієнтованого навчання з використанням сучасних
                  інструментів: Canva, HTML та 3D.
                </p>
                <p>
                  Окрім розвитку цифрових і креативних навичок, воркшоп має на
                  меті сформувати в учнів розуміння повного циклу створення
                  продукту — від ідеї до реалізації готового результату.
                </p>
                <p>
                  Діти вчаться бачити зв’язок між дизайном, технологіями та
                  бізнесом, усвідомлюють, як створюється продукт для реального
                  ринку.
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

            <article className="rounded-[8px] border border-white/10 bg-[#2A2D35] p-3.5">
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/60">
                Локації проведення
              </p>
              <ul className="mt-2 space-y-1.5">
                {locations.map((location) => (
                  <li
                    key={location}
                    className="flex items-center gap-2 text-white/88 text-[14px]"
                  >
                    <MapPin className="h-4 w-4 text-[#90D986] shrink-0" />
                    <span>{location}</span>
                  </li>
                ))}
              </ul>
            </article>

            {supportCards.map((item) => (
              <InfoCardItem key={item.label} item={item} />
            ))}

            <article className="rounded-[8px] border border-[#88C980]/45 bg-[linear-gradient(90deg,#2A2D35_0%,#26342B_100%)] p-3.5 md:p-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#88C980]/45 bg-[#88C980]/10">
                  <Phone className="h-4 w-4 text-[#90D986]" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.08em] text-white/62">
                    Телефон для запису
                  </p>
                  <a
                    href="tel:+380687388908"
                    className="mt-0.5 inline-block text-[#A8E8A0] text-[22px] md:text-[24px] font-extrabold tracking-[-0.03em] hover:text-[#BDF0B7] transition-colors"
                  >
                    380 68 738 89 08
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </PartnershipSection>
  )
}
