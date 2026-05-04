'use client'

import React from 'react'
import SilentVideo from '../ui/SilentVideo'

const VideoExample: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Sample Video 1</h2>
          <SilentVideo
            src="/video.mp4"
            controls={true}
            className="rounded-lg w-full"
          />
          <p className="mt-3 text-sm text-gray-600">
            This video is loaded from the public folder and plays without sound.
          </p>
        </div>

        <div className="shadow-lg rounded-lg overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Sample Video 2</h2>
          <SilentVideo
            src="/temp.mp4"
            controls={true}
            className="rounded-lg w-full"
          />
          <p className="mt-3 text-sm text-gray-600">
            This is the temp.mp4 video from the root directory, also playing
            without sound.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoExample
