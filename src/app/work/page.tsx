import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Вакансії та робота в LEOCODE у Львові',
  description:
    'Актуальні вакансії LEOCODE у Львові: викладачі, менеджери та методисти для дитячого освітнього простору.',
  path: '/work',
  keywords: ['вакансії Львів', 'робота викладач Львів', 'вакансії LEOCODE'],
})

export default function WorkPage() {
  return (
    <>
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="overflow-hidden bg-gradient-to-b from-[#F7FAF4] via-[#F3F8F0] to-[#EEF5E9]"
      >
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-gradient-to-r from-primary to-[#1F2421] text-white overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/pattern.svg')] opacity-10 z-0"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-4 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                Кар'єра в LeoCode
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                Долучайтесь до нашої{' '}
                <span className="text-accent">команди освітян!</span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/90 font-light">
                Запрошуємо у свою команду натхненних та енергійних викладачів і
                менеджерів, які готові ростити покоління нового ІТ-спеціалістів
              </p>
              <button className="group relative overflow-hidden bg-primary-light hover:bg-accent text-primary py-4 px-10 rounded-full text-lg font-semibold transition-all shadow-lg hover:-translate-y-1 border border-white/15">
                <span className="relative z-10">Подати заявку</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-24 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9] relative">
          <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-light/10 rounded-bl-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-48 bg-accent/10 rounded-tr-[80px]"></div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2 order-2 md:order-1">
                <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                  <span className="w-12 h-0.5 bg-accent"></span>
                  <span>Наша історія</span>
                </div>
                <h2 className="text-4xl font-bold mb-8 text-primary">
                  Про нас
                </h2>
                <div className="space-y-6 text-primary/75">
                  <p className="text-lg leading-relaxed">
                    Наша школа є успішним освітнім проєктом, який діє з{' '}
                    <span className="font-semibold text-primary">
                      2018 року
                    </span>{' '}
                    та має понад{' '}
                    <span className="font-semibold text-primary">
                      50 000 випускників
                    </span>
                    . Навчаємо дітей 7-15 років, заняття проводимо онлайн та
                    офлайн. Маємо кілька напрямків: програмування, дрони та
                    цифрові навички.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Крім основного навчання проводимо сезонні інтелектуальні
                    квести з призами, їздимо в ІТ-табори до Карпат та заохочуємо
                    до навчання різноманітними способами.
                  </p>
                  <p className="text-xl font-semibold text-primary">
                    Наша основна мета — навчати цікаво, легко та ефективно!
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2 relative">
                <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-primary/40 mix-blend-multiply z-10"></div>
                  <Image
                    src="/main-poster.jpg"
                    alt="Команда LEOCODE"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-light rounded-2xl rotate-12 shadow-lg"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-gradient-to-b from-[#EEF5E9] to-[#F8FBF6] relative">
          <div className="absolute top-0 left-0 right-0 h-20 bg-[linear-gradient(to_bottom_right,transparent_49%,white_50%)]"></div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-medium">
                <span className="w-12 h-0.5 bg-accent"></span>
                <span>Чому ми</span>
                <span className="w-12 h-0.5 bg-accent"></span>
              </div>
              <h2 className="text-4xl font-bold mb-4 text-primary">
                Переваги роботи з нами
              </h2>
              <p className="text-xl text-primary/75 max-w-2xl mx-auto">
                Ми створюємо середовище, де кожен може рости, розвиватися і
                отримувати задоволення від роботи
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Баланс роботи та відпочинку',
                  description:
                    'Робота роботою, а відпочинок за графіком :) Для нас важлива ваша емоційна розрядка, тож ми проводимо кофі-брейки, спільні поїздки в Карпати, квесткімнати, ігроклуби і інше.',
                  icon: '⛰️',
                },
                {
                  title: 'Навчання і розвиток',
                  description:
                    'Ми розуміємо, що на початку завжди важко, тож проводимо регулярне навчання, щотижневі дзвінки, де обговорюємо проблеми, з якими ви стикаєтесь в роботі.',
                  icon: '🎓',
                },
                {
                  title: 'Можливість росту',
                  description:
                    'Наші працівники не мають стелі у заробітку, ви можете контролювати свій дохід за допомогою системи бонусів і власного навантаження.',
                  icon: '📈',
                },
                {
                  title: 'Щорічні корпоративи',
                  description:
                    'Регулярно проводимо командні заходи для зміцнення корпоративного духу та відзначення наших спільних досягнень.',
                  icon: '🎉',
                },
                {
                  title: 'Постійна підтримка',
                  description:
                    'Ми будуємо команду, де кожен член відчуває себе важливим. Наші керівники завжди відкриті для спілкування та допомоги.',
                  icon: '🤝',
                },
                {
                  title: 'Достойна зарплата',
                  description:
                    'Ми цінуємо ваш внесок і пропонуємо конкурентну оплату праці, яка відповідає вашим навичкам та досвіду.',
                  icon: '💰',
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="group bg-[#FCFEFA] p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary-light/20"
                >
                  <div className="w-16 h-16 flex items-center justify-center text-3xl bg-primary/10 group-hover:bg-primary/20 rounded-2xl mb-6 transition-colors">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-primary/75">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions Section */}
        <section className="py-24 bg-gradient-to-b from-[#F8FBF6] to-[#EEF5E9]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-primary">
                Відкриті вакансії
              </h2>
              <p className="text-xl text-primary/75 max-w-2xl mx-auto">
                Приєднуйтесь до команди професіоналів та впливайте на майбутнє
                IT-освіти
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: 'Викладач програмування',
                  type: 'Повний/Частковий день',
                  location: 'Онлайн + Офлайн',
                },
                {
                  title: 'Викладач дронів',
                  type: 'Повний/Частковий день',
                  location: 'Онлайн + Офлайн',
                },
                {
                  title: 'Менеджер з продажів',
                  type: 'Повний день',
                  location: 'Офіс у Львові',
                },
                {
                  title: 'Методист з розробки навчальних програм',
                  type: 'Проєктна робота',
                  location: 'Віддалено',
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group flex flex-col p-8 rounded-2xl border border-primary-light/25 hover:border-primary-light/60 bg-[#FCFEFA] transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="inline-flex items-center gap-1 text-primary/55 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-primary/55 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {job.location}
                    </span>
                  </div>
                  <button className="mt-auto inline-flex items-center gap-2 text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Детальніше
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-primary to-[#1F2421] text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern-grid.svg')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Готові приєднатися до команди?
              </h2>
              <p className="text-xl mb-10 text-white/90">
                Станьте частиною нашої місії з підготовки нового покоління
                ІТ-фахівців. Разом ми змінюємо майбутнє освіти!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary-light text-primary hover:bg-accent py-4 px-10 rounded-full text-lg font-semibold transition-all hover:shadow-xl hover:-translate-y-1 border border-white/10">
                  Подати заявку
                </button>
                <button className="bg-transparent border border-white/35 hover:bg-white/10 py-4 px-10 rounded-full text-lg font-medium transition-all hover:shadow-xl hover:shadow-white/10 hover:-translate-y-1">
                  Переглянути вакансії
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
