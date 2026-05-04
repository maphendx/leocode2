import { CalendarDays, Clock3, FilePenLine, Gift, Users } from 'lucide-react'
import PartnershipSection from './PartnershipSection'
import PartnershipShowcase, {
  type PartnershipInfoItem,
} from './PartnershipShowcase'

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

const logisticsCards: PartnershipInfoItem[] = [
  { icon: Clock3, label: 'Тривалість', value: '1,5 години' },
  { icon: Users, label: 'Кількість учасників', value: 'від 20 учнів' },
  {
    icon: CalendarDays,
    label: 'Графік',
    value: "понеділок-п'ятниця 10:00 або 12:00",
  },
]

const supportCards: PartnershipInfoItem[] = [
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

export default function VorkshopySection() {
  return (
    <PartnershipSection
      id="vorkshopy"
      title="ВОРКШОПИ"
      theme="dark"
      sectionNumber="02"
    >
      <PartnershipShowcase
        theme="dark"
        imageSrc="/images/partnership-workshops.jpeg"
        imageAlt="Воркшопи LeoCode для шкіл"
        imageLabel="Реальний бізнес-кейс"
        imageNote="Практичний формат, у якому діти проходять шлях від ідеї до готового цифрового продукту."
        lead="Воркшоп у LeoCode побудований навколо реального завдання для магазину іграшок, тому учні одразу працюють із логікою продукту, візуалом і технологіями."
        featureBadges={['6-8 класи', '1,5 години', 'Canva / HTML / 3D']}
        formats={directions}
        formatColumns={3}
        highlights={highlights}
        detailParagraphs={[
          'Для освітнього процесу воркшоп є можливістю показати міжпредметну інтеграцію та впровадження практико-орієнтованого навчання з використанням сучасних інструментів: Canva, HTML та 3D.',
          'Окрім розвитку цифрових і креативних навичок, воркшоп має на меті сформувати в учнів розуміння повного циклу створення продукту — від ідеї до реалізації готового результату.',
          'Діти вчаться бачити зв’язок між дизайном, технологіями та бізнесом, усвідомлюють, як створюється продукт для реального ринку.',
        ]}
        logisticsCards={logisticsCards}
        supportCards={supportCards}
        locations={locations}
        phoneLabel="Телефон для запису"
        phoneDisplay="380 68 738 89 08"
        phoneHref="tel:+380687388908"
      />
    </PartnershipSection>
  )
}
