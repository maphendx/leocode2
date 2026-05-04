import React from 'react'

interface LoadingIndicatorProps {
  message?: string
  height?: string
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = 'Завантаження...',
  height = 'min-h-[300px]',
}) => {
  return (
    <div className={`${height} flex items-center justify-center bg-white`}>
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-gray-500 font-medium">{message}</p>
      </div>
    </div>
  )
}

export default LoadingIndicator
