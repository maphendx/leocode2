import React from 'react'
import Image from 'next/image'

const SummerActivities = () => {
  const activities = [
    {
      title: 'Програмування',
      description:
        'Знайомство з Python, Scratch та основами алгоритмічного мислення',
      icon: '/icons/programming.svg',
      image: '/images/summer-programming.jpg',
    },
    {
      title: 'Робототехніка',
      description:
        'Конструювання та програмування роботів з використанням LEGO та Arduino',
      icon: '/icons/robotics.svg',
      image: '/images/summer-robotics.jpg',
    },
    {
      title: 'Пілотування дронів',
      description: 'Керування дронами та програмування автоматичних польотів',
      icon: '/icons/drone.svg',
      image: '/images/summer-drones.jpg',
    },
    {
      title: '3D-моделювання',
      description: 'Створення тривимірних моделей та їх друк на 3D-принтері',
      icon: '/icons/3d.svg',
      image: '/images/summer-3d.jpg',
    },
    {
      title: 'Створення ігор',
      description:
        'Розробка власних відеоігор від концепції до готового продукту',
      icon: '/icons/game.svg',
      image: '/images/summer-games.jpg',
    },
    {
      title: 'Спортивні активності',
      description: 'Командні ігри та фізичні вправи для активного відпочинку',
      icon: '/icons/sport.svg',
      image: '/images/summer-sports.jpg',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Активності в таборі
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Різноманітні напрямки для всебічного розвитку дитини поєднують
          навчання та розваги у захоплюючому форматі
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <Image
                  src={activity.image || '/images/placeholder.jpg'}
                  alt={activity.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-white text-xl font-bold">
                    {activity.title}
                  </h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-700">{activity.description}</p>
                <a
                  href="#"
                  className="mt-4 inline-block text-accent font-medium hover:underline"
                >
                  Дізнатись більше →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SummerActivities
