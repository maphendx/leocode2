import { CalendarDays, Clock3, FilePenLine, Gift, Users } from 'lucide-react'
import PartnershipSection from './PartnershipSection'
import PartnershipShowcase, {
  type PartnershipInfoItem,
} from './PartnershipShowcase'

const fairFormats = [
  {
    title: 'Проєкти учнів',
    description:
      'Презентації власних робіт, короткі виступи та жива взаємодія з аудиторією.',
  },
  {
    title: 'STEM-зони',
    description:
      'Інтерактивні точки з технологіями, дослідами та практичними демонстраціями.',
  },
  {
    title: 'LeoCode demo',
    description:
      'Знайомство з напрямками програмування, 3D-моделювання та сучасними STEM-інструментами.',
  },
  {
    title: 'Командна участь',
    description:
      'Формат, у якому діти вчаться презентувати ідеї, співпрацювати та відповідати за результат.',
  },
]

const highlights = [
  'Підсилення іміджу школи як сучасного освітнього простору, що інтегрує інновації.',
  'Розширення STEM-напрямку через практичний досвід у сфері дронів та 3D-технологій.',
  'Підвищення залученості учнів завдяки інтерактивному формату заходу.',
  'Формування профорієнтаційного інтересу до IT та інженерних професій.',
  'Додатковий інформаційний привід для комунікації з батьками та посилення довіри до школи.',
]

const logisticsCards: PartnershipInfoItem[] = [
  {
    icon: FilePenLine,
    label: 'Формат',
    value:
      'Подія під ключ для школи: презентації, STEM-зони, інтерактивні активності та супровід команди LeoCode.',
  },
  {
    icon: Clock3,
    label: 'Тривалість',
    value:
      'Сценарій і тривалість формуються індивідуально під масштаб ярмарку та кількість активностей.',
  },
  {
    icon: Users,
    label: 'Аудиторія',
    value:
      'Учні, батьки та педагогічна команда школи можуть бути залучені до події в різних ролях.',
  },
  {
    icon: CalendarDays,
    label: 'Графік',
    value:
      'Дата, програма та послідовність зон узгоджуються окремо відповідно до запиту школи.',
  },
]

const supportCards: PartnershipInfoItem[] = [
  {
    icon: Gift,
    label: 'Підтримка LeoCode',
    value:
      'Допомагаємо з ідеєю події, наповненням локацій та адаптацією активностей під вік учасників.',
  },
  {
    icon: FilePenLine,
    label: 'Сценарій',
    value:
      'Конкретний таймінг, перелік STEM-зон, ролі команди та логіку руху учасників формуємо після короткого брифу зі школою.',
  },
]

const locations = ['На базі школи', 'Простір LeoCode або партнерська локація']

export default function NaukoviYarmarkySection() {
  return (
    <PartnershipSection
      id="naukovi-yarmarky"
      title="НАУКОВІ ЯРМАРКИ"
      theme="light"
      sectionNumber="01"
    >
      <PartnershipShowcase
        theme="light"
        imageSrc="/images/yarmarka/yar_1.jpg"
        imageAlt="Наукові ярмарки LeoCode"
        imageLabel="Відкритий шкільний формат"
        imageNote="Подія, у якій учнівські ідеї, STEM-активності та взаємодія з батьками збираються в одну сильну презентацію школи."
        lead="Науковий ярмарок дає школі живий спосіб показати результативність учнів, підкреслити сучасний підхід до навчання та залучити дітей до технологій у відкритому форматі."
        featureBadges={['STEM', 'Презентації', 'Залучення батьків']}
        formats={fairFormats}
        formatColumns={4}
        highlights={highlights}
        detailParagraphs={[
          'Ярмарок допомагає школі показати результативність учнів, дати дітям сцену для самопрезентації та підкреслити сучасний підхід до навчання.',
          'LeoCode може інтегрувати до програми власні STEM-активності, демонстрації та інтерактиви, щоб подія була динамічною й цінною як для учасників, так і для батьків.',
          'Після погодження формату ми готуємо структуру локацій, послідовність виступів, точки взаємодії з батьками та рекомендації щодо організації простору.',
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
