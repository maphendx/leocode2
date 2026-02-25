'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import FreeLesson from '@/components/other/FreeLesson'
import {
  Tent,
  Sun,
  Users,
  MapPin,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  TreePine,
  Gamepad2,
  Code2,
  Cpu,
  Camera,
  Mountain,
  Flame,
  Shield,
  Heart,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react'

const campPrograms = [
  {
    title: 'IT-табір "Code Camp"',
    age: '8-12 років',
    duration: '10 днів',
    description:
      'Занурення у світ програмування через ігри, проєкти та командні змагання. Діти створюють власні ігри та вебсайти.',
    activities: [
      'Python & Scratch',
      'Веб-розробка',
      'Ігрові проєкти',
      'Хакатон',
    ],
    icon: <Code2 className="h-8 w-8" />,
    color: 'from-blue-500 to-cyan-500',
    price: '8 500 грн',
  },
  {
    title: 'Табір дронів "SkyPilots"',
    age: '10-15 років',
    duration: '7 днів',
    description:
      'Навчання пілотуванню дронів, основи аерофотозйомки та програмування автономних польотів.',
    activities: ['Пілотування', 'Аерозйомка', 'Автономні польоти', 'Змагання'],
    icon: <Gamepad2 className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-500',
    price: '9 200 грн',
  },
  {
    title: 'Робо-табір "TechKids"',
    age: '7-11 років',
    duration: '10 днів',
    description:
      'Конструювання та програмування роботів, основи електроніки та інженерного мислення.',
    activities: ['Arduino', 'LEGO Robotics', 'Електроніка', 'Виставка роботів'],
    icon: <Cpu className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500',
    price: '8 800 грн',
  },
  {
    title: 'Креативний табір "DigiArt"',
    age: '9-14 років',
    duration: '7 днів',
    description:
      'Цифрове мистецтво, 3D-моделювання, анімація та створення контенту для соціальних мереж.',
    activities: ['3D-моделювання', 'Анімація', 'Відеомонтаж', 'Дизайн'],
    icon: <Camera className="h-8 w-8" />,
    color: 'from-orange-500 to-red-500',
    price: '7 900 грн',
  },
]

const campFeatures = [
  {
    title: 'Безпека та комфорт',
    description:
      'Сертифіковані інструктори, медичне забезпечення та комфортні умови проживання.',
    icon: <Shield className="h-7 w-7" />,
  },
  {
    title: 'Природа та активності',
    description:
      'Табори розташовані в мальовничих місцях Карпат з програмою активного відпочинку.',
    icon: <TreePine className="h-7 w-7" />,
  },
  {
    title: 'Нові друзі',
    description:
      'Діти знаходять однодумців, навчаються працювати в команді та будують міцні дружби.',
    icon: <Heart className="h-7 w-7" />,
  },
  {
    title: 'Професійні ментори',
    description:
      'Досвідчені IT-фахівці та педагоги, які вміють зацікавити та мотивувати дітей.',
    icon: <Star className="h-7 w-7" />,
  },
  {
    title: 'Харчування',
    description:
      '5-разове повноцінне харчування з урахуванням дієтичних потреб кожної дитини.',
    icon: <Flame className="h-7 w-7" />,
  },
  {
    title: 'Спогади назавжди',
    description:
      'Фото та відеозвіти, сертифікати, подарунки та незабутні враження на все життя.',
    icon: <Camera className="h-7 w-7" />,
  },
]

const schedule = [
  {
    time: '08:00',
    activity: 'Підйом та ранкова зарядка',
    icon: <Sun className="h-5 w-5" />,
  },
  { time: '08:30', activity: 'Сніданок', icon: <Flame className="h-5 w-5" /> },
  {
    time: '09:30',
    activity: 'Навчальний блок №1 (IT/Дрони/Робо)',
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    time: '11:30',
    activity: 'Перекус та активний відпочинок',
    icon: <TreePine className="h-5 w-5" />,
  },
  {
    time: '12:30',
    activity: 'Навчальний блок №2 (Проєкти)',
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    time: '14:00',
    activity: 'Обід та вільний час',
    icon: <Flame className="h-5 w-5" />,
  },
  {
    time: '15:30',
    activity: 'Активності на природі / Спорт',
    icon: <Mountain className="h-5 w-5" />,
  },
  {
    time: '17:00',
    activity: 'Творчий блок / Вечірні проєкти',
    icon: <Sparkles className="h-5 w-5" />,
  },
  { time: '19:00', activity: 'Вечеря', icon: <Flame className="h-5 w-5" /> },
  {
    time: '20:00',
    activity: 'Вечірні розваги / Кіно / Квести',
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  { time: '22:00', activity: 'Відбій', icon: <Star className="h-5 w-5" /> },
]

const testimonials = [
  {
    name: 'Оксана М.',
    role: 'Мама учасника',
    text: 'Мій син повернувся з табору натхненний та сповнений ідей! Він навчився програмувати та знайшов нових друзів.',
    camp: 'IT-табір 2025',
  },
  {
    name: 'Андрій К.',
    role: 'Учасник, 13 років',
    text: 'Це було найкраще літо! Я навчився керувати дроном, створив свою першу гру і просто класно провів час.',
    camp: 'Табір дронів 2025',
  },
  {
    name: 'Ірина В.',
    role: 'Мама учасниці',
    text: 'Донька хоче їхати знову! Програма чудова — і навчання, і відпочинок, і нові навички. Дуже вдячні!',
    camp: 'Робо-табір 2025',
  },
]

export default function CampsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-gradient-to-br from-[#1a472a] via-[#1F2421] to-primary text-white overflow-hidden">
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
          </div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                <Tent className="h-4 w-4 text-accent" />
                <span>Літні та сезонні табори LeoCode</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                IT-табори{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-light">
                  в Карпатах
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/85 font-light max-w-3xl mx-auto leading-relaxed">
                Поєднання технологій та природи — діти навчаються програмуванню,
                робототехніці та пілотуванню дронів серед мальовничих Карпат
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Забронювати місце
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#programs"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Програми таборів
                </a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '500+', label: 'Учасників' },
                  { value: '25+', label: 'Таборів' },
                  { value: '4.9★', label: 'Рейтинг' },
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

        {/* Camp Programs */}
        <section
          id="programs"
          className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative"
        >
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-light/10 rounded-bl-[100px]" />

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Програми</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Наші табірні програми
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть програму, яка найкраще підходить для вашої дитини
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {campPrograms.map((program, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/15"
                >
                  <div className={`h-2 bg-gradient-to-r ${program.color}`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 flex items-center justify-center text-white bg-gradient-to-br from-accent to-primary-light rounded-2xl shadow-md">
                        {program.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-accent">
                          {program.price}
                        </div>
                        <div className="text-xs text-primary/50">за зміну</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {program.title}
                    </h3>

                    <div className="flex gap-3 mb-4">
                      <span className="text-xs font-medium px-3 py-1 bg-accent/10 text-accent rounded-full">
                        {program.age}
                      </span>
                      <span className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                        {program.duration}
                      </span>
                    </div>

                    <p className="text-primary/65 text-sm leading-relaxed mb-5">
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {program.activities.map((activity, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 bg-gray-50 text-primary/70 rounded-full border border-gray-100"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Переваги</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Чому обирають наші табори?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Ми дбаємо про кожну деталь, щоб ваша дитина отримала найкращий
                досвід
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-[#FCFEFA] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
                >
                  <div className="w-16 h-16 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl mb-6 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-primary/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Schedule */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Розклад</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Типовий день у таборі
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Кожен день насичений навчанням, розвагами та цікавими
                активностями
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute left-[29px] top-4 bottom-4 w-0.5 bg-accent/20" />
                <div className="space-y-4">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex gap-5 items-center group">
                      <div className="flex-shrink-0 w-[60px] text-right">
                        <span className="text-sm font-bold text-primary/80">
                          {item.time}
                        </span>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 bg-white border-2 border-accent/30 rounded-full flex items-center justify-center text-accent z-10 group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 bg-white px-5 py-3 rounded-xl shadow-sm border border-primary-light/10 group-hover:shadow-md transition-all">
                        <span className="text-sm font-medium text-primary/75">
                          {item.activity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Відгуки</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Що кажуть наші учасники
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-7 shadow-md hover:shadow-lg transition-all border border-primary-light/15"
                >
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-primary/70 text-sm leading-relaxed mb-5 italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="font-bold text-primary text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-primary/50">
                      {testimonial.role} • {testimonial.camp}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Camps */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-light/20">
                <div className="bg-gradient-to-r from-[#1a472a] to-accent p-8 md:p-10 text-white">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-white/15 rounded-full text-sm font-medium backdrop-blur-sm">
                    <Tent className="h-4 w-4" />
                    Найближча зміна
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Літній IT-табір 2026
                  </h2>
                  <p className="text-white/85 text-lg max-w-2xl">
                    Запрошуємо дітей 7-16 років у незабутню подорож до світу
                    технологій серед мальовничих Карпатських гір!
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
                          1-10 липня 2026
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <MapPin className="h-6 w-6 text-accent" />
                      <div>
                        <div className="text-xs text-primary/50 font-medium uppercase">
                          Місце
                        </div>
                        <div className="font-bold text-primary">
                          Карпати, Славське
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-xl">
                      <Users className="h-6 w-6 text-accent" />
                      <div>
                        <div className="text-xs text-primary/50 font-medium uppercase">
                          Місць
                        </div>
                        <div className="font-bold text-primary">
                          30 (залишилось 12)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="font-bold text-primary mb-3">Що входить:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {[
                        'Проживання та харчування',
                        'Навчальна програма',
                        'Усі матеріали та обладнання',
                        'Екскурсії та активності',
                        'Страхування',
                        'Сертифікат та подарунки',
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
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 bg-accent hover:bg-accent-hover text-[#1F2A1F] font-bold py-4 px-8 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                      Забронювати місце
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <a
                      href="tel:+380687388608"
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-primary font-medium py-4 px-8 rounded-full transition-all flex items-center justify-center gap-2"
                    >
                      Зателефонувати
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Подаруйте дитині{' '}
                <span className="text-accent">незабутнє літо!</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed">
                Забронюйте місце в IT-таборі вже зараз — кількість місць
                обмежена. Раннє бронювання зі знижкою 10%!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Забронювати зі знижкою
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
