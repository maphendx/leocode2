'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import FreeLesson from '@/components/other/FreeLesson'
import {
  Wrench,
  Users,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Code2,
  Cpu,
  Palette,
  Globe,
  Smartphone,
  Bot,
  CheckCircle2,
  Zap,
  Target,
  BookOpen,
  Laptop,
  Sparkles,
} from 'lucide-react'

const workshops = [
  {
    title: 'Веб-розробка з нуля',
    description:
      'Створіть свій перший вебсайт за один день! Вивчіть HTML, CSS та основи JavaScript.',
    duration: '4 години',
    age: '7-15 років',
    level: 'Початковий',
    icon: <Globe className="h-7 w-7" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-200',
    topics: ['HTML основи', 'CSS стилізація', 'Інтерактивність', 'Публікація'],
  },
  {
    title: 'Python для початківців',
    description:
      'Поринте в світ програмування на Python. Створюйте ігри, чат-ботів та автоматизуйте рутинні задачі.',
    duration: '5 годин',
    age: '7-15 років',
    level: 'Початковий',
    icon: <Code2 className="h-7 w-7" />,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-200',
    topics: ['Змінні та типи', 'Умови та цикли', 'Функції', 'Міні-проєкт'],
  },
  {
    title: 'Розробка мобільних додатків',
    description:
      'Створіть власний мобільний додаток з нуля, який буде працювати на Android та iOS.',
    duration: '6 годин',
    age: '7-15 років',
    level: 'Середній',
    icon: <Smartphone className="h-7 w-7" />,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-200',
    topics: ['UI дизайн', 'Логіка додатку', 'API інтеграція', 'Тестування'],
  },
  {
    title: 'Робототехніка та Arduino',
    description:
      'Зберіть та запрограмуйте свого першого робота на базі Arduino. Практика з електронікою та сенсорами.',
    duration: '5 годин',
    age: '7-15 років',
    level: 'Початковий',
    icon: <Cpu className="h-7 w-7" />,
    color: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'border-orange-200',
    topics: ['Arduino основи', 'Сенсори', 'Програмування', 'Збірка робота'],
  },
  {
    title: 'Штучний інтелект та ChatGPT',
    description:
      'Дізнайтесь як працює AI, навчіться створювати промпти та побудуйте свій AI-проєкт.',
    duration: '4 години',
    age: '7-15 років',
    level: 'Середній',
    icon: <Bot className="h-7 w-7" />,
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-200',
    topics: ['Основи AI', 'Промпт-інженерія', 'ML Basics', 'AI-проєкт'],
  },
  {
    title: 'Дизайн та UI/UX',
    description:
      'Навчіться створювати красиві та зручні інтерфейси для вебсайтів та мобільних додатків.',
    duration: '4 години',
    age: '7-15 років',
    level: 'Початковий',
    icon: <Palette className="h-7 w-7" />,
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-200',
    topics: ['Figma основи', 'Кольори та шрифти', 'UI компоненти', 'Прототип'],
  },
]

const workshopAdvantages = [
  {
    title: 'Практичний результат',
    description:
      'Кожен учасник завершує воркшоп з готовим проєктом, який можна показати друзям та родині.',
    icon: <Target className="h-7 w-7" />,
  },
  {
    title: 'Малі групи',
    description:
      'Максимум 10-12 учасників у групі для індивідуального підходу до кожної дитини.',
    icon: <Users className="h-7 w-7" />,
  },
  {
    title: 'Досвідчені ментори',
    description:
      'Воркшопи проводять практикуючі IT-фахівці з досвідом роботи з дітьми.',
    icon: <Star className="h-7 w-7" />,
  },
  {
    title: 'Всі матеріали включено',
    description:
      'Ноутбуки, обладнання, методичні матеріали — все надається на місці.',
    icon: <Laptop className="h-7 w-7" />,
  },
  {
    title: 'Сертифікат учасника',
    description:
      'Кожен учасник отримує іменний сертифікат про завершення воркшопу.',
    icon: <BookOpen className="h-7 w-7" />,
  },
  {
    title: 'Гнучкий розклад',
    description:
      'Воркшопи проводяться у вихідні та на канікулах, зручний час для дітей і батьків.',
    icon: <Calendar className="h-7 w-7" />,
  },
]

const upcomingWorkshops = [
  {
    title: 'Python для початківців',
    date: '8 березня 2026',
    time: '10:00 — 15:00',
    spots: 8,
    price: '950 грн',
  },
  {
    title: 'Веб-розробка з нуля',
    date: '15 березня 2026',
    time: '10:00 — 14:00',
    spots: 5,
    price: '850 грн',
  },
  {
    title: 'Робототехніка та Arduino',
    date: '22 березня 2026',
    time: '11:00 — 16:00',
    spots: 10,
    price: '1 100 грн',
  },
  {
    title: 'AI та ChatGPT',
    date: '29 березня 2026',
    time: '10:00 — 14:00',
    spots: 6,
    price: '900 грн',
  },
]

export default function WorkshopsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]"
      >
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-gradient-to-br from-[#2a1a47] via-[#1F2421] to-primary text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
            <div className="absolute top-14 left-14 w-20 h-20 border-2 border-white/30 rounded-lg rotate-12 animate-pulse" />
            <div
              className="absolute top-40 right-16 w-14 h-14 border-2 border-accent/40 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-24 left-1/3 w-10 h-10 border-2 border-primary-light/30 rounded-lg rotate-45 animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                <Wrench className="h-4 w-4 text-accent" />
                <span>Воркшопи LeoCode</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                IT{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-light">
                  Воркшопи
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/85 font-light max-w-3xl mx-auto leading-relaxed">
                Одноденні інтенсивні заняття, де діти створюють реальні проєкти
                під керівництвом IT-професіоналів
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Записатися на воркшоп
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#schedule"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Розклад воркшопів
                </a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '50+', label: 'Воркшопів' },
                  { value: '800+', label: 'Учасників' },
                  { value: '12', label: 'Тем' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-accent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Cards */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-light/10 rounded-bl-[100px]" />

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Каталог</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Наші воркшопи
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть тему, яка цікавить вашу дитину — від програмування до
                дизайну
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {workshops.map((workshop, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border ${workshop.borderColor}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${workshop.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10 p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl transition-colors">
                        {workshop.icon}
                      </div>
                      <span className="text-xs font-bold px-3 py-1 bg-accent/10 text-accent rounded-full">
                        {workshop.level}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {workshop.title}
                    </h3>
                    <p className="text-sm text-primary/65 leading-relaxed mb-4">
                      {workshop.description}
                    </p>

                    <div className="flex gap-3 mb-4">
                      <span className="text-xs font-medium flex items-center gap-1 text-primary/50">
                        <Clock className="h-3.5 w-3.5" /> {workshop.duration}
                      </span>
                      <span className="text-xs font-medium flex items-center gap-1 text-primary/50">
                        <Users className="h-3.5 w-3.5" /> {workshop.age}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {workshop.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 bg-gray-50 text-primary/60 rounded-full border border-gray-100"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Переваги</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Чому наші воркшопи?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Максимум практики, мінімум теорії — кожен учасник іде додому з
                готовим проєктом
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshopAdvantages.map((advantage, index) => (
                <div
                  key={index}
                  className="group bg-[#FCFEFA] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
                >
                  <div className="w-16 h-16 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl mb-6 transition-colors">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Процес</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Як проходить воркшоп?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: 'Знайомство',
                  desc: 'Знайомство з темою, ментором та іншими учасниками',
                  icon: <Users className="h-6 w-6" />,
                },
                {
                  step: 2,
                  title: 'Навчання',
                  desc: 'Інтерактивна навчальна частина з прикладами і демо',
                  icon: <BookOpen className="h-6 w-6" />,
                },
                {
                  step: 3,
                  title: 'Практика',
                  desc: 'Самостійна робота над проєктом з підтримкою ментора',
                  icon: <Code2 className="h-6 w-6" />,
                },
                {
                  step: 4,
                  title: 'Презентація',
                  desc: 'Демонстрація результатів та отримання сертифікату',
                  icon: <Sparkles className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-accent text-white rounded-2xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-accent/70 uppercase tracking-wider mb-1">
                    Крок {item.step}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-primary/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section
          id="schedule"
          className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Розклад</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Найближчі воркшопи
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть зручну дату та запишіться заздалегідь — кількість місць
                обмежена
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {upcomingWorkshops.map((ws, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-primary-light/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-primary text-lg mb-1">
                      {ws.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-primary/55">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-accent" />
                        {ws.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-accent" />
                        {ws.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-accent" />
                        {ws.spots} місць
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-xl font-extrabold text-accent">
                      {ws.price}
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-accent hover:bg-accent-hover text-[#1F2A1F] font-bold py-2.5 px-6 rounded-full text-sm transition-all hover:shadow-md"
                    >
                      Записатися
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Готові спробувати{' '}
                <span className="text-accent">щось нове?</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed">
                Запишіться на воркшоп та дайте вашій дитині можливість створити
                свій перший IT-проєкт за один день!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Обрати воркшоп
                </button>
                <Link
                  href="/"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  На головну
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FreeLesson isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
