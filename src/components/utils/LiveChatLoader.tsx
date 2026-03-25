'use client'

import { useEffect } from 'react'

type LiveChatLoaderProps = {
  chatId: string
}

const LIVE_CHAT_SCRIPT_ID = 'sendpulse-live-chat-loader'
const INTERACTION_EVENTS: Array<keyof WindowEventMap> = [
  'pointerdown',
  'touchstart',
  'keydown',
  'scroll',
]

export default function LiveChatLoader({ chatId }: LiveChatLoaderProps) {
  useEffect(() => {
    if (!chatId) {
      return
    }

    const loadLiveChat = () => {
      if (document.getElementById(LIVE_CHAT_SCRIPT_ID)) {
        return
      }

      const script = document.createElement('script')
      script.id = LIVE_CHAT_SCRIPT_ID
      script.src = 'https://cdn.pulse.is/livechat/loader.js'
      script.async = true
      script.dataset.liveChatId = chatId
      document.body.appendChild(script)
      removeListeners()
    }

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, loadLiveChat)
      })
    }

    INTERACTION_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, loadLiveChat, {
        passive: true,
        once: true,
      })
    })

    return removeListeners
  }, [chatId])

  return null
}
