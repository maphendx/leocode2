export type HomeEvent = {
  id: string
  title: string
  format: 'Офлайн' | 'Онлайн' | 'Гібрид'
  date: string
  time: string
  location: string
  age: string
  description: string
  ctaHref: string
  ctaLabel: string
}

// Щоб додати нову подію: додайте новий об'єкт у масив нижче
export const homeEvents: HomeEvent[] = [
  {
    id: 'event-001',
    title: 'Літній табір',
    format: 'Офлайн',
    date: 'Дати оголосимо незабаром',
    time: 'Формат дня уточнюється',
    location: 'Львів',
    age: '7-15 років',
    description:
      'Готуємо насичену літню програму з IT, творчими завданнями, командними активностями та новими знайомствами.',
    ctaHref: '/#contacts',
    ctaLabel: 'Запитати деталі',
  },
  {
    id: 'event-002',
    title: 'Зимовий табір',
    format: 'Офлайн',
    date: 'Дати оголосимо незабаром',
    time: 'Формат дня уточнюється',
    location: 'Львів',
    age: '7-15 років',
    description:
      'Плануємо зимову програму з технологіями, практичними заняттями, іграми та командними активностями на канікулах.',
    ctaHref: '/#contacts',
    ctaLabel: 'Запитати деталі',
  },
  {
    id: 'event-003',
    title: 'Готуємо цікаві анонси вже незабаром',
    format: 'Онлайн',
    date: 'Слідкуйте за оновленнями',
    time: 'Новини зʼявляться скоро',
    location: 'Instagram, Facebook, TikTok',
    age: 'Для всіх',
    description:
      'Працюємо над новими подіями, форматами та активностями. Скоро поділимося всіма деталями на сайті та в соцмережах LEOCODE.',
    ctaHref: 'https://instagram.com/leocode.kids',
    ctaLabel: 'Стежити за новинами',
  },
]
