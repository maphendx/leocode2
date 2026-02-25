'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'
import FreeLesson from '@/components/other/FreeLesson'
import {
  Search,
  Users,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Brain,
  Puzzle,
  Map,
  Key,
  Zap,
  Trophy,
  Target,
  Shield,
  Lightbulb,
  Compass,
  Lock,
  Sparkles,
  CheckCircle2,
  Award,
  Timer,
} from 'lucide-react'

const questTypes = [
  {
    title: 'Кібер-детектив',
    description:
      'Розслідуйте кіберзлочини, зламуйте шифри та знайдіть "хакера" використовуючи навички програмування.',
    duration: '2.5 години',
    age: '12-17 років',
    difficulty: 'Складний',
    teamSize: '3-5 осіб',
    icon: <Search className="h-8 w-8" />,
    color: 'from-red-500/20 to-orange-500/20',
    borderColor: 'border-red-200',
    skills: ['Логіка', 'Криптографія', 'Python', 'Мережі'],
  },
  {
    title: 'Робо-лабіринт',
    description:
      'Запрограмуйте робота, щоб він пройшов складний лабіринт з перешкодами та завданнями.',
    duration: '2 години',
    age: '8-13 років',
    difficulty: 'Середній',
    teamSize: '2-4 осіб',
    icon: <Compass className="h-8 w-8" />,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-200',
    skills: ['Робототехніка', 'Алгоритми', 'Командна робота', 'Логіка'],
  },
  {
    title: 'Код да Вінчі',
    description:
      'Розгадуйте математичні та логічні головоломки, вирішуйте задачі на програмування з елементами квесту.',
    duration: '2 години',
    age: '10-15 років',
    difficulty: 'Середній',
    teamSize: '3-5 осіб',
    icon: <Key className="h-8 w-8" />,
    color: 'from-amber-500/20 to-yellow-500/20',
    borderColor: 'border-amber-200',
    skills: ['Математика', 'Логіка', 'Креативність', 'Шифрування'],
  },
  {
    title: 'Місія: IoT',
    description:
      'Врятуйте "розумний дім" від збоїв — налаштуйте датчики, виправте код та відновіть систему.',
    duration: '2.5 години',
    age: '11-16 років',
    difficulty: 'Складний',
    teamSize: '3-4 осіб',
    icon: <Shield className="h-8 w-8" />,
    color: 'from-teal-500/20 to-emerald-500/20',
    borderColor: 'border-teal-200',
    skills: ['IoT', 'Arduino', 'Сенсори', 'Діагностика'],
  },
  {
    title: 'AI-пригода',
    description:
      'Використовуйте штучний інтелект для вирішення загадок та подолання викликів у захоплюючій пригоді.',
    duration: '2 години',
    age: '13-17 років',
    difficulty: 'Складний',
    teamSize: '2-4 осіб',
    icon: <Brain className="h-8 w-8" />,
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-200',
    skills: ['AI', 'Промпти', 'Аналіз даних', 'Стратегія'],
  },
  {
    title: 'Піксельний квест',
    description:
      'Створюйте та проходьте ігрові рівні, вирішуючи задачі на програмування та гейм-дизайн.',
    duration: '1.5 години',
    age: '7-12 років',
    difficulty: 'Легкий',
    teamSize: '2-3 осіб',
    icon: <Puzzle className="h-8 w-8" />,
    color: 'from-green-500/20 to-lime-500/20',
    borderColor: 'border-green-200',
    skills: ['Scratch', 'Логіка', 'Гейм-дизайн', 'Креативність'],
  },
]

const questBenefits = [
  {
    title: 'Командний дух',
    description:
      'Квести розвивають навички командної роботи, комунікації та спільного вирішення проблем.',
    icon: <Users className="h-7 w-7" />,
  },
  {
    title: 'Критичне мислення',
    description:
      "Діти вчаться аналізувати інформацію, знаходити зв'язки та приймати рішення під тиском часу.",
    icon: <Brain className="h-7 w-7" />,
  },
  {
    title: 'Практичні навички IT',
    description:
      'Квести інтегрують реальні технології — від програмування до робототехніки та IoT.',
    icon: <Zap className="h-7 w-7" />,
  },
  {
    title: 'Емоції та драйв',
    description:
      'Захоплююча атмосфера з таймерами, підказками та несподіваними поворотами сюжету.',
    icon: <Sparkles className="h-7 w-7" />,
  },
  {
    title: 'Нагороди та призи',
    description:
      'Команди-переможці отримують призи, сертифікати та бонуси на навчання в LeoCode.',
    icon: <Trophy className="h-7 w-7" />,
  },
  {
    title: 'Безпечне середовище',
    description:
      'Дружня атмосфера, де помилки — це частина процесу навчання, а не привід для розчарування.',
    icon: <Shield className="h-7 w-7" />,
  },
]

const upcomingQuests = [
  {
    title: 'Кібер-детектив: Справа №42',
    date: '7 березня 2026',
    time: '14:00 — 16:30',
    spots: 20,
    teams: '5 команд по 4 осіб',
    price: '450 грн/особа',
    difficulty: 'Складний',
  },
  {
    title: 'Робо-лабіринт: Весняний виклик',
    date: '14 березня 2026',
    time: '11:00 — 13:00',
    spots: 16,
    teams: '4 команди по 4 осіб',
    price: '400 грн/особа',
    difficulty: 'Середній',
  },
  {
    title: 'Піксельний квест для малят',
    date: '21 березня 2026',
    time: '10:00 — 11:30',
    spots: 12,
    teams: '4 команди по 3 осіб',
    price: '350 грн/особа',
    difficulty: 'Легкий',
  },
]

export default function ScienceQuestsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]">
        {/* Hero Section */}
        <section className="relative py-24 md:py-36 bg-gradient-to-br from-[#1a1a47] via-[#1F2421] to-[#2a2a1a] text-white overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
            <div className="absolute top-8 left-16 w-16 h-16 border-2 border-white/30 rounded-lg rotate-45 animate-pulse" />
            <div
              className="absolute top-36 right-24 w-20 h-20 border-2 border-accent/40 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            />
            <div
              className="absolute bottom-16 left-1/3 w-12 h-12 border-2 border-primary-light/30 rounded-lg rotate-12 animate-pulse"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute top-1/2 right-1/4 w-8 h-8 bg-amber-500/20 rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            />
          </div>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/15 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/10">
                <Search className="h-4 w-4 text-accent" />
                <span>Наукові квести LeoCode</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                Наукові{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-accent">
                  квести
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-10 text-white/85 font-light max-w-3xl mx-auto leading-relaxed">
                Захоплюючі командні пригоди, де діти розв'язують технологічні
                загадки, зламують шифри та рятують віртуальні світи
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative overflow-hidden bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all shadow-lg hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    Записати команду
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <a
                  href="#quests"
                  className="bg-transparent border-2 border-white/30 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Переглянути квести
                </a>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
                {[
                  { value: '30+', label: 'Квестів' },
                  { value: '200+', label: 'Команд' },
                  { value: '6', label: 'Сценаріїв' },
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

        {/* Quest Types */}
        <section
          id="quests"
          className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative"
        >
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-light/10 rounded-bl-[100px]" />

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Сценарії</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Типи квестів
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Оберіть квест за рівнем складності та інтересами вашої дитини
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {questTypes.map((quest, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border ${quest.borderColor}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${quest.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative z-10 p-7">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 flex items-center justify-center text-accent bg-accent/10 group-hover:bg-accent/20 rounded-2xl transition-colors">
                        {quest.icon}
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          quest.difficulty === 'Легкий'
                            ? 'bg-green-100 text-green-700'
                            : quest.difficulty === 'Середній'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {quest.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {quest.title}
                    </h3>
                    <p className="text-sm text-primary/65 leading-relaxed mb-4">
                      {quest.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-primary/50">
                      <span className="flex items-center gap-1">
                        <Timer className="h-3.5 w-3.5" /> {quest.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" /> {quest.teamSize}
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="h-3.5 w-3.5" /> {quest.age}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {quest.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 bg-gray-50 text-primary/60 rounded-full border border-gray-100"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Переваги</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Чому діти обожнюють квести?
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Квести — це не просто розваги, а потужний інструмент навчання
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {questBenefits.map((benefit, index) => (
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

        {/* How Quest Works */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Процес</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Як проходить квест?
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    step: 1,
                    title: 'Збір команди',
                    desc: 'Сформуйте команду з друзями або ми допоможемо знайти однодумців.',
                    icon: <Users className="h-7 w-7" />,
                  },
                  {
                    step: 2,
                    title: 'Брифінг',
                    desc: 'Отримайте легенду квесту, ознайомтесь з правилами та інструментами.',
                    icon: <Map className="h-7 w-7" />,
                  },
                  {
                    step: 3,
                    title: 'Проходження',
                    desc: 'Вирішуйте завдання, розгадуйте загадки та рухайтесь до фіналу.',
                    icon: <Lock className="h-7 w-7" />,
                  },
                  {
                    step: 4,
                    title: 'Фінал та нагородження',
                    desc: 'Підведення підсумків, нагородження переможців та спільне фото.',
                    icon: <Award className="h-7 w-7" />,
                  },
                ].map((item, index) => (
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
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Quests */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent" />
                <span>Розклад</span>
                <span className="w-12 h-0.5 bg-accent" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                Найближчі квести
              </h2>
              <p className="text-lg md:text-xl text-primary/75 max-w-2xl mx-auto">
                Збирайте команду та записуйтесь — кількість місць обмежена!
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {upcomingQuests.map((quest, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-primary-light/15"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-primary text-lg">
                          {quest.title}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            quest.difficulty === 'Легкий'
                              ? 'bg-green-100 text-green-700'
                              : quest.difficulty === 'Середній'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {quest.difficulty}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-primary/55">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-accent" />
                          {quest.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-accent" />
                          {quest.time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-accent" />
                          {quest.teams}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-lg font-extrabold text-accent">
                        {quest.price}
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

        {/* CTA */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Готові до <span className="text-accent">пригоди?</span>
              </h2>
              <p className="text-lg md:text-xl mb-10 text-white/85 leading-relaxed">
                Зберіть команду та пройдіть наш науковий квест! Головоломки,
                технології та незабутні емоції гарантовано.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-accent hover:bg-accent-hover text-[#1F2A1F] py-4 px-10 rounded-full text-lg font-bold transition-all hover:shadow-xl hover:-translate-y-1"
                >
                  Записати команду
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
