'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import FreeLesson from '@/components/other/FreeLesson'
import {
  GraduationCap,
  Users,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Code2,
  Cpu,
  Palette,
  Gamepad2,
  Lightbulb,
  Zap,
  CheckCircle2,
  Target,
  BookOpen,
  Sparkles,
  Play,
  Eye,
  Award,
  TrendingUp,
} from 'lucide-react'

const masterClasses = [
  {
    title: 'Створи свою першу гру на Scratch',
    description:
      'Навчися візуальному програмуванню та створи інтерактивну гру з персонажами, рівнями та музикою.',
    duration: '1.5 години',
    age: '6-10 років',
    format: 'Офлайн / Онлайн',
    speaker: 'Олег Ковальчук',
    speakerRole: 'Старший викладач LeoCode',
    icon: <Gamepad2 className="h-7 w-7" />,
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-200',
  },
  {
    title: 'Основи 3D-моделювання',
    description:
      'Вивчи основи 3D-моделювання в Blender та створи свою першу 3D-модель для друку або ігри.',
    duration: '2 години',
    age: '12-17 років',
    format: 'Офлайн',
    speaker: 'Марія Литвин',
    speakerRole: '3D-Artist, 5 років досвіду',
    icon: <Palette className="h-7 w-7" />,
    color: 'from-pink-500/20 to-rose-500/20',
    borderColor: 'border-pink-200',
  },
  {
    title: 'Програмування дронів',
    description:
      'Дізнайся як працюють дрони, напиши код для автономного польоту та пройди перешкоди.',
    duration: '2 години',
    age: '10-16 років',
    format: 'Офлайн',
    speaker: 'Дмитро Савченко',
    speakerRole: 'Інструктор з дронів',
    icon: <Zap className="h-7 w-7" />,
    color: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'border-cyan-200',
  },
  {
    title: 'Створення чат-бота на Python',
    description:
      'Побудуй розумного чат-бота, який може відповідати на питання, жартувати та допомагати з задачами.',
    duration: '2 години',
    age: '13-17 років',
    format: 'Офлайн / Онлайн',
    speaker: 'Анна Козак',
    speakerRole: 'Python-розробниця',
    icon: <Code2 className="h-7 w-7" />,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-200',
  },
  {
    title: 'Збірка розумного робота',
    description:
      'Зібери робота з Arduino, встанови сенсори та запрограмуй його виконувати команди.',
    duration: '2.5 години',
    age: '9-14 років',
    format: 'Офлайн',
    speaker: 'Ігор Мельник',
    speakerRole: 'Інженер-робототехнік',
    icon: <Cpu className="h-7 w-7" />,
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-200',
  },
  {
    title: 'Мій перший вебсайт',
    description:
      'Створи красивий персональний сайт з нуля та навчися публікувати його в інтернеті.',
    duration: '1.5 години',
    age: '10-15 років',
    format: 'Офлайн / Онлайн',
    speaker: 'Софія Петрук',
    speakerRole: 'Frontend-розробниця',
    icon: <Lightbulb className="h-7 w-7" />,
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-200',
  },
]

const whyMasterClasses = [
  {
    title: 'Без підготовки',
    description:
      'Майстер-класи розраховані на новачків — не потрібно мати попередній досвід.',
    icon: <Target className="h-7 w-7" />,
  },
  {
    title: 'Результат за 2 години',
    description:
      'Кожен учасник завершує майстер-клас з готовим проєктом та новими знаннями.',
    icon: <TrendingUp className="h-7 w-7" />,
  },
  {
    title: 'Експерти-практики',
    description:
      'Майстер-класи проводять діючі IT-фахівці з досвідом роботи з дітьми.',
    icon: <GraduationCap className="h-7 w-7" />,
  },
  {
    title: 'Інтерактивний формат',
    description:
      '80% часу — практика. Діти вчаться через створення, а не через лекції.',
    icon: <Play className="h-7 w-7" />,
  },
  {
    title: 'Можливість спробувати',
    description:
      'Ідеальний спосіб спробувати новий напрямок перед записом на повний курс.',
    icon: <Eye className="h-7 w-7" />,
  },
  {
    title: 'Доступна ціна',
    description:
      'Майстер-класи коштують від 250 грн — доступно для кожної родини.',
    icon: <Sparkles className="h-7 w-7" />,
  },
]

const upcomingMasterClasses = [
  {
    title: 'Створи свою першу гру на Scratch',
    date: '1 березня 2026',
    time: '10:00 — 11:30',
    speaker: 'Олег Ковальчук',
    spots: 15,
    price: '250 грн',
    format: 'Офлайн',
  },
  {
    title: 'Програмування дронів',
    date: '8 березня 2026',
    time: '14:00 — 16:00',
    speaker: 'Дмитро Савченко',
    spots: 10,
    price: '400 грн',
    format: 'Офлайн',
  },
  {
    title: 'Створення чат-бота на Python',
    date: '15 березня 2026',
    time: '11:00 — 13:00',
    speaker: 'Анна Козак',
    spots: 12,
    price: '350 грн',
    format: 'Онлайн',
  },
  {
    title: 'Збірка розумного робота',
    date: '22 березня 2026',
    time: '10:00 — 12:30',
    speaker: 'Ігор Мельник',
    spots: 8,
    price: '450 грн',
    format: 'Офлайн',
  },
  {
    title: 'Основи 3D-моделювання',
    date: '29 березня 2026',
    time: '14:00 — 16:00',
    speaker: 'Марія Литвин',
    spots: 10,
    price: '380 грн',
    format: 'Офлайн',
  },
]

export default function MasterClassesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-gradient-to-br from-[#47241a] via-[#1F2421] to-primary text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
            <div className="absolute top-12 left-12 w-18 h-18 border-2 border-white/30 rounded-full animate-pulse" />
            <div
              className="absolute top-28 right-20 w-16 h-16 border-2 border-accent/40 rounded-lg rotate-12 animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-20 left-1/4 w-14 h-14 border-2 border-primary-light/30 rounded-full animate-pulse"
              style={{ animationDelay: '2s' }}
            />
          </div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                <GraduationCap className="h-4 w-4 text-accent" />
                <span>Майстер-класи LeoCode</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Майстер-
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-light">
                  класи
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/85 font-light max-w-3xl mx-auto leading-relaxed">
                Короткі інтенсивні заняття від IT-експертів — ідеальний спосіб
                спробувати нову технологію та створити свій перший проєкт
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Записатися на майстер-клас
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#schedule"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Розклад занять
                </a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '100+', label: 'Майстер-класів' },
                  { value: '1500+', label: 'Учасників' },
                  { value: '15+', label: 'Спікерів' },
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

        {/* Master Class Cards */}
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
                Наші майстер-класи
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть тему, яка зацікавить вашу дитину
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {masterClasses.map((mc, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border ${mc.borderColor}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${mc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10 p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl transition-colors">
                        {mc.icon}
                      </div>
                      <span className="text-xs font-medium px-3 py-1 bg-primary/5 text-primary/60 rounded-full">
                        {mc.format}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {mc.title}
                    </h3>
                    <p className="text-sm text-primary/65 leading-relaxed mb-4">
                      {mc.description}
                    </p>

                    <div className="flex gap-3 mb-4 text-xs text-primary/50">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" /> {mc.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {mc.age}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                          <GraduationCap className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-primary">
                            {mc.speaker}
                          </div>
                          <div className="text-xs text-primary/50">
                            {mc.speakerRole}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Master Classes */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Переваги</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Чому майстер-класи?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Ідеальний формат для знайомства з IT-технологіями
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyMasterClasses.map((item, index) => (
                <div
                  key={index}
                  className="group bg-[#FCFEFA] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
                >
                  <div className="w-16 h-16 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl mb-6 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Goes */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Формат</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Як проходить майстер-клас?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Вступ (15 хв)',
                  desc: 'Знайомство зі спікером, темою та інструментами. Цікаві факти та мотивація.',
                  icon: <BookOpen className="h-6 w-6" />,
                },
                {
                  step: 2,
                  title: 'Практика (60-90 хв)',
                  desc: 'Покрокове створення проєкту під керівництвом ментора з індивідуальною підтримкою.',
                  icon: <Code2 className="h-6 w-6" />,
                },
                {
                  step: 3,
                  title: 'Фінал (15 хв)',
                  desc: 'Демонстрація результатів, отримання сертифікату та рекомендацій для подальшого розвитку.',
                  icon: <Award className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto bg-accent text-white rounded-2xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-accent/70 uppercase tracking-wider mb-1">
                    Етап {item.step}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-primary/60 leading-relaxed">
                    {item.desc}
                  </p>
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
                Найближчі майстер-класи
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Обирайте тему та записуйтесь — кількість місць обмежена
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {upcomingMasterClasses.map((mc, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-primary-light/15"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-primary text-lg mb-1">
                        {mc.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-primary/55 mb-1">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-accent" />
                          {mc.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-accent" />
                          {mc.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-accent" />
                          {mc.spots} місць
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-primary/40">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>{mc.speaker}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded-full">
                          {mc.format}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xl font-extrabold text-accent">
                        {mc.price}
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-accent hover:bg-accent-hover text-[#1F2A1F] font-bold py-2.5 px-6 rounded-full text-sm transition-all hover:shadow-md"
                      >
                        Записатися
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-light/20">
                <div className="bg-gradient-to-r from-accent to-primary-light p-8 md:p-10 text-white">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium backdrop-blur-sm">
                    <Sparkles className="h-4 w-4" />
                    Спеціальна пропозиція
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Абонемент на 5 майстер-класів
                  </h2>
                  <p className="text-white/85 text-lg max-w-2xl">
                    Придбайте абонемент та отримайте знижку 20% на кожен
                    майстер-клас. Обирайте будь-які теми та дати!
                  </p>
                </div>

                <div className="p-8 md:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {[
                      'Знижка 20% на кожне заняття',
                      'Вільний вибір тем та дат',
                      'Перенос без обмежень',
                      'Пріоритетне бронювання',
                      'Бонусний 6-й майстер-клас у подарунок',
                      'Сертифікат про завершення серії',
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-primary/70"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 w-full sm:w-auto bg-accent hover:bg-accent-hover text-[#1F2A1F] font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Придбати абонемент
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <div className="text-center sm:text-left">
                      <div className="text-3xl font-extrabold text-accent">
                        1 400 грн
                      </div>
                      <div className="text-sm text-primary/50 line-through">
                        1 750 грн
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Відкрийте для дитини світ{' '}
                <span className="text-accent">технологій!</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed">
                Оберіть майстер-клас та дайте можливість вашій дитині створити
                щось неймовірне вже сьогодні!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Обрати майстер-клас
                </button>
                <a
                  href="/"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  На головну
                </a>
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
