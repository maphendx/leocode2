'use client'

import dynamic from 'next/dynamic'

const RESULTS_SECTION_CLASSNAME =
  'lc-section-soft pt-10 md:pt-12 lg:pt-16 pb-10 lg:pb-14 courses-section'

const Results = dynamic(() => import('@/components/home/Results'), {
  ssr: false,
  loading: () => (
    <section id="rezultati" className={RESULTS_SECTION_CLASSNAME} />
  ),
})

export default function ResultsIsland() {
  return <Results />
}
