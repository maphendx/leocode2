import PartnershipSection from './PartnershipSection'

const points = [
  'Інтерактивна STEM-екскурсія, що поєднує 3D-друк, дизайн у Canva та дрон-технології в одному форматі.',
  'Практичний досвід для кожного учня: створення постера, складання дрона, керування у симуляторі та реальний політ.',
  'Розвиток цифрових, інженерних і креативних навичок через навчання у форматі гри.',
  'Готовий організований формат для класу (20-30 учнів, 1,5-2 години).',
  'Сертифікати учасників та 3D-подарунок кожній дитині.',
]

export default function NaukovyiKvestSection() {
  return (
    <PartnershipSection
      id="naukovyi-kvest"
      title="НАУКОВИЙ КВЕСТ"
      theme="light"
    >
      <p className="text-[#1F2430] text-[17px] md:text-[21px] leading-relaxed font-semibold">
        Науково квест від LeoCode
      </p>

      <ul className="mt-4 space-y-2.5 list-disc pl-5 text-[#2A3140]/90 text-[15px] md:text-[17px] leading-relaxed">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </PartnershipSection>
  )
}

