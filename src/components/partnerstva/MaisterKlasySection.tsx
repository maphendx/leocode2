import { CalendarDays, Clock3, FilePenLine, Gift, Users } from 'lucide-react'
import PartnershipSection from './PartnershipSection'
import PartnershipShowcase, {
  type PartnershipInfoItem,
} from './PartnershipShowcase'

const directions = [
  {
    title: 'Програмування',
    description:
      'Інтерактивні вправи, логічні завдання та мініпроєкт із видимим результатом.',
  },
  {
    title: 'Дрони',
    description:
      'Ознайомлення з базовими принципами, безпекою та практичними сценаріями використання.',
  },
  {
    title: '3D-моделювання',
    description:
      'Робота з формою, обʼємом та створенням простої моделі у цифровому середовищі.',
  },
]

const highlights = [
  'Майстер-класи дають дітям швидкий вхід у технологічну тему без перевантаження теорією.',
  'Кожен формат адаптується під вік групи, тему події та освітню ціль школи.',
  'Після заняття учні мають новий досвід, конкретний результат і більше зацікавлення до STEM-напрямків.',
]

const logisticsCards: PartnershipInfoItem[] = [
  {
    icon: FilePenLine,
    label: 'Формат',
    value:
      'Один майстер-клас = одна тема, практичне завдання та зрозумілий фінальний результат для учасників.',
  },
  {
    icon: Clock3,
    label: 'Тривалість',
    value:
      'Тривалість залежить від теми, віку групи та сценарію, який школа обирає разом із командою LeoCode.',
  },
  {
    icon: Users,
    label: 'Учасники',
    value:
      'Клас, група або окремий набір учнів. Формат масштабується під кількість дітей.',
  },
  {
    icon: CalendarDays,
    label: 'Графік',
    value:
      'Проведення узгоджується індивідуально або в межах тематичного дня, події чи шкільної програми.',
  },
]

const supportCards: PartnershipInfoItem[] = [
  {
    icon: Gift,
    label: 'Матеріали',
    value:
      'LeoCode готує наповнення, адаптує подачу під вік дітей і допомагає зробити формат динамічним.',
  },
  {
    icon: FilePenLine,
    label: 'Теми',
    value:
      'Підбираємо теми під вік групи та цілі школи: програмування, дрони, 3D-моделювання, дизайн або короткі STEM-активності.',
  },
]

const locations = ['На базі школи', 'Локації LeoCode']

export default function MaisterKlasySection() {
  return (
    <PartnershipSection
      id="maister-klasy"
      title="МАЙСТЕР КЛАСИ"
      theme="dark"
      sectionNumber="04"
    >
      <PartnershipShowcase
        theme="dark"
        imageSrc="/mk/mk2.JPG"
        imageAlt="Майстер-класи LeoCode для шкіл"
        imageLabel="Швидкий практичний формат"
        imageNote="Одна тема, одна дія, один відчутний результат, який дитина забирає з собою вже після заняття."
        lead="Майстер-класи в LeoCode дають школі гнучкий спосіб познайомити дітей із технологічними напрямками без довгого входу: швидко, зрозуміло й з фокусом на практику."
        featureBadges={['Короткий формат', 'Тематичні дні', 'Практичний результат']}
        formats={directions}
        formatColumns={3}
        highlights={highlights}
        detailParagraphs={[
          'Майстер-класи зручно інтегрувати у шкільний день, тематичний тиждень або окрему партнерську подію, якщо потрібен короткий, але змістовний формат взаємодії.',
          'Теми можна поєднувати з навчальними цілями школи або використовувати як перше знайомство дітей з напрямками LeoCode.',
          'Після короткого брифу ми пропонуємо перелік тем, рекомендований формат для віку учнів і сценарій проведення під конкретний шкільний запит.',
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
