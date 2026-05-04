import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/home/Hero'
import Partnership from '@/components/home/Partnership'
import type { Metadata } from 'next'
import ErrorBoundary from '@/components/utils/ErrorBoundary'
import Courses from '@/components/home/Courses'
import OnlineLearning from '@/components/home/OnlineLearning'
import SummerCampAd from '@/components/other/SummerCampAd'
import Results from '@/components/home/ResultsIsland'
import Events from '@/components/home/Events'
import FAQ from '@/components/home/FAQ'
import Locations from '@/components/home/Locations'
import Reviews from '@/components/home/Reviews'
import { buildPageMetadata, siteConfig } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  path: '/',
  keywords: [
    'онлайн навчання для дітей',
    'дрони для дітей Львів',
    'LEOCODE Львів',
  ],
})

const MediaErrorFallback = ({
  message = 'Виникла помилка при завантаженні',
}) => (
  <div className="bg-gray-100 p-6 rounded-lg text-center">
    <p className="text-gray-700">{message}</p>
    <p className="text-sm text-gray-500 mt-2">
      Будь ласка, перевірте з'єднання з інтернетом
    </p>
  </div>
)

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="bg-transparent">
        <ErrorBoundary
          fallback={
            <MediaErrorFallback message="Не вдалося завантажити головний блок" />
          }
        >
          <Hero />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={
            <MediaErrorFallback message="Не вдалося завантажити розділ курсів" />
          }
        >
          <Courses />
        </ErrorBoundary>

        <ErrorBoundary>
          <OnlineLearning />
        </ErrorBoundary>

        <ErrorBoundary>
          <Partnership />
        </ErrorBoundary>

        <ErrorBoundary>
          <Results />
        </ErrorBoundary>

        <ErrorBoundary>
          <Reviews />
        </ErrorBoundary>

        <ErrorBoundary>
          <Locations />
        </ErrorBoundary>

        <ErrorBoundary>
          <Events />
        </ErrorBoundary>

        <ErrorBoundary>
          <FAQ />
        </ErrorBoundary>
      </main>
      <Footer />
      <SummerCampAd />
    </>
  )
}
