'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { useState } from 'react'
import FreeLesson from '@/components/other/FreeLesson'
import {
  Lightbulb,
  Users,
  Trophy,
  Rocket,
  Microscope,
  Cpu,
  Zap,
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Star,
  Target,
  Award,
  ArrowRight,
} from 'lucide-react'

const scienceFairTopics = [
  {
    title: 'Робототехніка',
    description:
      'Проєктування та програмування роботів для виконання різноманітних завдань.',
    icon: '🤖',
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-200',
  },
  {
    title: 'Штучний інтелект',
    description:
      "Створення розумних програм та моделей машинного навчання для розв'язання реальних проблем.",
    icon: '🧠',
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-200',
  },
  {
    title: 'Екологія та сталий розвиток',
    description:
      'Дослідження екологічних проблем та розробка інноваційних рішень для захисту довкілля.',
    icon: '🌱',
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-200',
  },
  {
    title: 'Ігрова розробка',
    description:
      'Створення власних ігор з використанням сучасних технологій та фреймворків.',
    icon: '🎮',
    color: 'from-orange-500/20 to-red-500/20',
    borderColor: 'border-orange-200',
  },
  {
    title: 'IoT та розумний дім',
    description:
      'Розробка пристроїв інтернету речей та систем автоматизації для повсякденного життя.',
    icon: '🏠',
    color: 'from-teal-500/20 to-sky-500/20',
    borderColor: 'border-teal-200',
  },
  {
    title: 'Мобільні додатки',
    description:
      'Проєктування та створення корисних мобільних додатків для iOS та Android.',
    icon: '📱',
    color: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'border-indigo-200',
  },
]

const pastEvents = [
  {
    title: 'Весняний ярмарок 2025',
    date: 'Березень 2025',
    participants: 120,
    projects: 45,
    highlight: 'Найкращий проєкт — розумна теплиця з IoT-датчиками',
  },
  {
    title: 'Осінній ярмарок 2024',
    date: 'Жовтень 2024',
    participants: 95,
    projects: 38,
    highlight: 'Найкращий проєкт — AI-бот для вивчення математики',
  },
  {
    title: 'Літній ярмарок 2024',
    date: 'Червень 2024',
    participants: 80,
    projects: 30,
    highlight: 'Найкращий проєкт — робот для сортування сміття',
  },
]

const steps = [
  {
    step: 1,
    title: 'Реєстрація',
    description:
      'Зареєструйтеся на наукових ярмарок та оберіть тему свого проєкту.',
    icon: <Target className="h-7 w-7" />,
  },
  {
    step: 2,
    title: 'Підготовка проєкту',
    description:
      'Протягом 4-6 тижнів працюйте над своїм проєктом з підтримкою менторів.',
    icon: <Lightbulb className="h-7 w-7" />,
  },
  {
    step: 3,
    title: 'Презентація',
    description:
      'Представте свій проєкт перед журі та іншими учасниками на ярмарку.',
    icon: <Users className="h-7 w-7" />,
  },
  {
    step: 4,
    title: 'Нагородження',
    description:
      'Отримайте визнання, призи та можливість розвивати свій проєкт далі.',
    icon: <Trophy className="h-7 w-7" />,
  },
]

const benefits = [
  {
    title: 'Практичний досвід',
    description:
      'Діти працюють над реальними проєктами, що розвиває навички вирішення проблем та критичне мислення.',
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    title: 'Командна робота',
    description:
      'Учасники вчаться працювати в команді, розподіляти завдання та спільно досягати результатів.',
    icon: <Users className="h-8 w-8" />,
  },
  {
    title: 'Менторська підтримка',
    description:
      'Досвідчені викладачі та ІТ-фахівці допомагають на кожному етапі створення проєкту.',
    icon: <Star className="h-8 w-8" />,
  },
  {
    title: 'Презентаційні навички',
    description:
      'Діти вчаться впевнено презентувати свої ідеї перед аудиторією та журі.',
    icon: <Zap className="h-8 w-8" />,
  },
  {
    title: 'Портфоліо проєктів',
    description:
      'Кожен учасник отримує готовий проєкт для свого портфоліо, що стане перевагою в майбутньому.',
    icon: <Award className="h-8 w-8" />,
  },
  {
    title: 'Сучасні технології',
    description:
      'Використання найновіших інструментів та платформ: від Arduino до Python та TensorFlow.',
    icon: <Cpu className="h-8 w-8" />,
  },
]

export default function ScienceFairsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-gradient-to-br from-primary via-[#1F2421] to-[#2a3a2a] text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-full animate-pulse" />
            <div
              className="absolute top-32 right-20 w-16 h-16 border-2 border-accent/40 rounded-lg rotate-45 animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-primary-light/30 rounded-full animate-pulse"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute top-1/2 right-1/3 w-8 h-8 bg-accent/20 rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                <Microscope className="h-4 w-4 text-accent" />
                <span>Наукові ярмарки LeoCode</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Наукові{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-light">
                  ярмарки
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/85 font-light max-w-3xl mx-auto leading-relaxed">
                Місце, де юні інноватори презентують свої технологічні проєкти,
                отримують визнання та натхнення для подальших звершень
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Записатися
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#how-it-works"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Як це працює?
                </a>
              </div>

              {/* Stats bar */}
              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '300+', label: 'Учасників' },
                  { value: '100+', label: 'Проєктів' },
                  { value: '15+', label: 'Ярмарків' },
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

        {/* What are Science Fairs */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-light/10 rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-accent/10 rounded-tr-[80px]" />

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                  <span className="w-12 h-0.5 bg-accent" />
                  <span>Про ярмарки</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
                  Що таке наукові ярмарки?
                </h2>
                <div className="space-y-5 text-primary/75">
                  <p className="text-lg leading-relaxed">
                    Наукові ярмарки — це захоплюючі заходи, де діти від{' '}
                    <span className="font-semibold text-primary">
                      6 до 18 років
                    </span>{' '}
                    презентують власні технологічні та наукові проєкти перед
                    журі та широкою аудиторією.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Це унікальна можливість для юних дослідників
                    продемонструвати свої знання, творчість та інноваційне
                    мислення. Кожен учасник працює над реальним проєктом
                    протягом кількох тижнів під керівництвом досвідчених
                    менторів.
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    Наша мета — надихнути покоління майбутніх інноваторів!
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {['Програмування', 'Робототехніка', 'AI', 'IoT', 'Дрони'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-accent/10 text-accent font-medium rounded-full text-sm border border-accent/20"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-accent/20 to-primary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Microscope className="h-24 w-24 text-accent/60 mx-auto mb-4" />
                      <p className="text-primary/50 text-lg font-medium">
                        Наукові ярмарки LeoCode
                      </p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary-light/30 rounded-2xl rotate-12 shadow-lg" />
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/15 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Переваги</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Чому варто брати участь?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Наукові ярмарки дають унікальний досвід, який неможливо отримати
                в звичайному класі
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-[#FCFEFA] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
                >
                  <div className="w-16 h-16 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl mb-6 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Напрямки</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Теми проєктів
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть тему, яка вас надихає, або запропонуйте свою власну ідею
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {scienceFairTopics.map((topic, index) => (
                <div
                  key={index}
                  className={`group relative p-6 rounded-2xl bg-white border ${topic.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{topic.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-primary">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-primary/65 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Процес</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Як це працює?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Від ідеї до презентації — простий та зрозумілий шлях
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {steps.map((item, index) => (
                  <div
                    key={index}
                    className="relative flex gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-primary-light/15"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-accent text-white rounded-2xl flex items-center justify-center shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-accent/70 uppercase tracking-wider mb-1">
                        Крок {item.step}
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2">
                        {item.title}
                      </h3>
                      <p className="text-primary/65 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Історія</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Минулі ярмарки
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Подивіться, як пройшли наші попередні наукові ярмарки
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-primary-light/15"
                >
                  <div className="h-3 bg-gradient-to-r from-accent to-primary-light" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-primary/60">
                        <Calendar className="h-4 w-4 text-accent" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary/60">
                        <Users className="h-4 w-4 text-accent" />
                        {event.participants} учасників
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary/60">
                        <Lightbulb className="h-4 w-4 text-accent" />
                        {event.projects} проєктів
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex items-start gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary/70">
                          {event.highlight}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Event */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-light/20">
                <div className="bg-gradient-to-r from-accent to-primary-light p-8 md:p-10 text-white">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium backdrop-blur-sm">
                    <Zap className="h-4 w-4" />
                    Найближчий ярмарок
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Весняний науковий ярмарок 2026
                  </h2>
                  <p className="text-white/85 text-lg max-w-2xl">
                    Запрошуємо всіх юних дослідників та інноваторів на наш
                    найбільший науковий ярмарок цього року!
                  </p>
                </div>

                <div className="p-8 md:p-10">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <Calendar className="h-6 w-6 text-accent" />
                      <div>
                        <div className="text-xs text-primary/50 font-medium uppercase">
                          Дата
                        </div>
                        <div className="font-bold text-primary">
                          15 квітня 2026
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <Clock className="h-6 w-6 text-accent" />
                      <div>
                        <div className="text-xs text-primary/50 font-medium uppercase">
                          Час
                        </div>
                        <div className="font-bold text-primary">
                          10:00 — 17:00
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <MapPin className="h-6 w-6 text-accent" />
                      <div>
                        <div className="text-xs text-primary/50 font-medium uppercase">
                          Місце
                        </div>
                        <div className="font-bold text-primary">м. Львів</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 bg-accent hover:bg-accent-hover text-[#1F2A1F] font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Зареєструватися
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <a
                      href="#how-it-works"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-primary font-medium py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2"
                    >
                      Дізнатися більше
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary-light/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Готові створити свій{' '}
                <span className="text-accent">інноваційний проєкт?</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed">
                Запишіться на наступний науковий ярмарок та покажіть світу свої
                технологічні ідеї. Разом ми надихаємо покоління майбутніх
                інноваторів!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Записатися на ярмарок
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
