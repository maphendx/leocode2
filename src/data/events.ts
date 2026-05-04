export type HomeEvent = {
  id: string
  title: string
  format: 'Офлайн' | 'Онлайн' | 'Гібрид'
  date: string
  time: string
  location: string
  age: string
  description: string
  footerLabel?: string
  ctaHref?: string
  ctaLabel?: string
}

// Щоб додати нову подію: додайте новий об'єкт у масив нижче
export const homeEvents: HomeEvent[] = [
  {
    id: 'event-001',
    title: 'Літній табір',
    format: 'Офлайн',
    date: 'Дати оголосимо незабаром',
    time: "Табір повного дня, пн-пт 09:00-18:00",
    location: 'Львів',
    age: '7-15 років',
    description:
      'День, у якому дитина поєднує IT, творчість, активності та живе спілкування в безпечній і мотивуючій атмосфері.',
    footerLabel: 'Анонс скоро',
  },
  {
    id: 'event-002',
    title: 'Зимовий табір',
    format: 'Офлайн',
    date: 'Дати оголосимо незабаром',
    time: "Табір повного дня, пн-пт 09:00-18:00",
    location: 'Львів',
    age: '7-15 років',
    description:
      'Насичена канікулярна програма, де дитина занурюється в технології, працює над практичними завданнями та проводить час з користю.',
    footerLabel: 'Анонс скоро',
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
    ctaLabel: 'Стежити за новинами LEOCODE',
  },
]
