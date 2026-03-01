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
    title: 'Lorem ipsum dolor sit amet',
    format: 'Офлайн',
    date: 'Lorem date',
    time: 'Lorem time',
    location: 'Lorem location',
    age: 'Lorem age',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    ctaHref: '/workshopy',
    ctaLabel: 'Lorem',
  },
  {
    id: 'event-002',
    title: 'Lorem ipsum consectetur adipiscing',
    format: 'Онлайн',
    date: 'Lorem date',
    time: 'Lorem time',
    location: 'Lorem location',
    age: 'Lorem age',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud.',
    ctaHref: '/workshopy',
    ctaLabel: 'Lorem',
  },
  {
    id: 'event-003',
    title: 'Lorem ipsum eiusmod tempor',
    format: 'Гібрид',
    date: 'Lorem date',
    time: 'Lorem time',
    location: 'Lorem location',
    age: 'Lorem age',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    ctaHref: '/workshopy',
    ctaLabel: 'Lorem',
  },
]
