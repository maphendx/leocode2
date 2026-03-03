import PartnershipSection from './PartnershipSection'

const points = [
  'Підсилення іміджу школи як сучасного освітнього простору, що інтегрує інновації.',
  'Розширення STEM-напрямку через практичний досвід у сфері дронів та 3D-технологій.',
  'Підвищення залученості учнів завдяки інтерактивному формату заходу.',
  'Формування профорієнтаційного інтересу до IT та інженерних професій.',
  'Додатковий інформаційний привід для комунікації з батьками та посилення довіри до школи.',
]

export default function NaukoviYarmarkySection() {
  return (
    <PartnershipSection
      id="naukovi-yarmarky"
      title="НАУКОВІ ЯРМАРКИ"
      theme="light"
    >
      <p className="text-[17px] md:text-[21px] leading-relaxed font-semibold text-[#1F2430]">
        Партнерство з LeoCode — додаткова цінність для школи
      </p>

      <ol className="mt-4 space-y-2.5 list-decimal pl-5 text-[15px] md:text-[17px] leading-relaxed text-[#2A3140]/90">
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ol>
    </PartnershipSection>
  )
}

