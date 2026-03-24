import { CalendarDays, Clock3, FilePenLine, Gift, Users } from 'lucide-react'
import PartnershipSection from './PartnershipSection'
import PartnershipShowcase, {
  type PartnershipInfoItem,
} from './PartnershipShowcase'

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

const logisticsCards: PartnershipInfoItem[] = [
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

const supportCards: PartnershipInfoItem[] = [
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

export default function NaukovyiKvestSection() {
  return (
    <PartnershipSection
      id="naukovyi-kvest"
      title="НАУКОВИЙ КВЕСТ"
      theme="light"
      sectionNumber="03"
    >
      <PartnershipShowcase
        theme="light"
        imageSrc="/images/quest/quest1.jpeg"
        imageAlt="Науковий квест LeoCode"
        imageLabel="STEM-маршрут для молодших школярів"
        imageNote="Гра, дослідження та практика об’єднані в одному маршруті з послідовними станціями."
        lead="Науковий квест у LeoCode знайомить дітей 1-5 класів із сучасними технологіями через серію станцій, де кожна активність тримає увагу і дає відчутний досвід."
        featureBadges={['1-5 класи', '4 станції', '1,5 години']}
        formats={directions}
        formatColumns={4}
        highlights={highlights}
        detailParagraphs={[
          'Під час квесту формується інтерес до навчання та перше розуміння того, як працюють технології, які діти використовують щодня.',
          'Формат побудований як 4 станції по 20 хвилин, де учні працюють у групах і по черзі переходять між активностями.',
          'Такий підхід поєднує гру, дослідження та практику, тому квест добре підходить для молодших школярів і легко утримує увагу протягом усього маршруту.',
        ]}
        logisticsCards={logisticsCards}
        supportCards={supportCards}
        locations={locations}
        phoneLabel="Телефон для запису на квест"
        phoneDisplay="380 68 738 89 08"
        phoneHref="tel:+380687388908"
      />
    </PartnershipSection>
  )
}
