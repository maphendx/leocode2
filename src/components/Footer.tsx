import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#1F232B] py-12 md:py-16 text-white">
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 md:mb-5 block">
              <Image
                src="/new_logo.svg"
                alt="LeoCode"
                width={180}
                height={72}
                className="h-auto w-[clamp(92px,30vw,160px)] object-contain object-left"
              />
            </Link>
            <p className="max-w-[380px] text-[17px] leading-relaxed text-white/76">
              Освітній простір для дітей від 7 до 15 років
            </p>
          </div>

          <div>
            <h3 className="mb-3 md:mb-4 text-lg font-extrabold uppercase tracking-[0.04em] text-white">
              Навігація
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 md:gap-y-2.5 text-[15px]">
              <li>
                <Link
                  href="/#about"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Про нас
                </Link>
              </li>
              <li>
                <Link
                  href="/#advantages"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Переваги
                </Link>
              </li>
              <li>
                <Link
                  href="/#rezultati"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Результати
                </Link>
              </li>
              <li>
                <Link
                  href="/#napryamki"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Напрямки
                </Link>
              </li>
              <li>
                <Link
                  href="/#lokacii"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Локації
                </Link>
              </li>
              <li>
                <Link
                  href="/#vidguki"
                  className="text-white/74 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Відгуки
                </Link>
              </li>
            </ul>
          </div>

          <div id="contacts">
            <h3 className="mb-3 md:mb-4 text-lg font-extrabold uppercase tracking-[0.04em] text-white">
              Контакти
            </h3>
            <ul className="space-y-2.5 md:space-y-3 text-[15px]">
              <li className="flex items-center justify-between gap-3">
                <span className="text-white/65">Загальна лінія</span>
                <a
                  href="tel:0800300648"
                  className="font-semibold text-[#99E392] hover:text-[#B8F1B2] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  0800 300 648
                </a>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-white/65">вул. Наукова, 49</span>
                <a
                  href="tel:+380687388656"
                  className="font-semibold text-white/86 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  +380 68 738 8656
                </a>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-white/65">вул. Мазепи, 25Д</span>
                <a
                  href="tel:+380687388608"
                  className="font-semibold text-white/86 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  +380 68 738 8608
                </a>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-white/10">
              <h4 className="mb-2.5 text-sm font-bold uppercase tracking-[0.07em] text-white/70">
                Соцмережі
              </h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.facebook.com/p/LeoCodeKids-61565577578490/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-white/78 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Facebook
                </a>
                <a
                  href="https://instagram.com/leocode.kids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-white/78 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  Instagram
                </a>
                <a
                  href="https://tiktok.com/@leocode.kids"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] font-semibold text-white/78 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-10 border-t border-white/10 pt-5 md:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-2 md:mb-0">
              Copyright {new Date().getFullYear()} LeoCode. All rights reserved.
            </p>
            <p className="text-white/60 text-sm">
              Developed by{' '}
              <a
                href="https://www.threads.com/@maphendx"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#98CF93] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1F232B]"
              >
                @maphendx
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
