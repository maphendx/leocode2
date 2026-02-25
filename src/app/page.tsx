import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/components/home/Hero'
import Partnership from '@/components/home/Partnership'
import type { Metadata } from 'next'
import ErrorBoundary from '@/components/utils/ErrorBoundary'
import Courses from '@/components/home/Courses'
import OnlineLearning from '@/components/home/OnlineLearning'
import SummerCampAd from '@/components/other/SummerCampAd'
import Results from '@/components/home/Results'
import CallToAction from '@/components/home/CallToAction'
import FAQ from '@/components/home/FAQ'
import Locations from '@/components/home/Locations'
import Reviews from '@/components/home/Reviews'

export const metadata: Metadata = {
  title: 'LEOCODE - Інноваційний простір для дітей від 7 до 15 років у Львові',
  description:
    'LEOCODE - інноваційний освітній простір для дітей від 7 до 15 років у Львові: IT-напрямки, дрони, онлайн та офлайн навчання.',
}

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
      <main className="bg-transparent">
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
          <CallToAction />
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
