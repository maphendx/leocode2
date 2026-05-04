'use client'

import { PhoneCall } from 'lucide-react'

type FloatingCallButtonProps = {
  phoneHref?: string
  ariaLabel?: string
}

export default function FloatingCallButton({
  phoneHref = 'tel:0800300648',
  ariaLabel = 'Зателефонувати',
}: FloatingCallButtonProps) {
  return (
    <a
      href={phoneHref}
      aria-label={ariaLabel}
      className="fixed bottom-[96px] right-[20px] z-[2147483600] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#2ed452] text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#292A2C]"
    >
      <PhoneCall className="phone-ring-icon h-6 w-6" />
    </a>
  )
}