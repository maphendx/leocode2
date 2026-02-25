import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="bg-[#292A2C] text-white py-8">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Left side - Logo and description */}
          <div className="md:w-1/3 lg:w-1/4 mb-6 md:mb-0">
            <Link href="/" className="block mb-4">
              <Image
                src="/new_logo.svg"
                alt="LeoCode"
                width={150}
                height={60}
                className="h-10 w-[150px] object-contain object-left"
              />
            </Link>
            <p className="text-gray-300 text-sm mb-3 max-w-[220px]">
              Інноваційний простір для дітей від 5 до 16 років
            </p>
          </div>

          {/* Right side - Three columns grouped together */}
          <div className="md:w-2/3 lg:w-3/4 md:pl-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-6">
              <div>
                <h3 className="text-base font-bold mb-3 text-white">
                  Навчання
                </h3>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <Link
                      href="/
                      #about"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Про нас
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#advantages"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Переваги
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#rezultati"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Результати
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#napryamki"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Напрямки
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#rezultati"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Роботи учнів
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#lokacii"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Локації
                    </Link>
                  </li>
                </ul>
              </div>

              <div id="contacts">
                <h3 className="text-base font-bold mb-3 text-white">
                  Контакти
                </h3>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <a
                      href="tel:+380687388608"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      +380 68 738 8608
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+380687388908"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      +380 68 738 8908
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:droneschoollviv@gmail.com"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      droneschoollviv@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-base font-bold mb-3 text-white">
                  Соціальні мережі
                </h3>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <a
                      href="https://instagram.com/leocode.kids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tiktok.com/@leocode.kids"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-1 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      TikTok
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-xs mb-2 md:mb-0">
              Copyright {new Date().getFullYear()} LeoCode. All rights reserved.
            </p>
            <p className="text-gray-300 text-xs">
              Developed by <a href="https://www.threads.com/@maphendx" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">@maphendx</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
