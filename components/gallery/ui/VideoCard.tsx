"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { FaPlay } from 'react-icons/fa'

interface VideoCardProps {
  thumbnail: string
  videoUrl?: string
  runtime?: string // e.g., "4:15"
  title?: string
  year?: string | number
  views?: string | number // e.g., "876K" or 876000
  onPlayClick?: () => void
  imageAlt?: string
  className?: string
  height?: string
}

const VideoCard = ({
  thumbnail,
  videoUrl,
  runtime,
  title,
  year,
  views,
  onPlayClick,
  imageAlt = "Video thumbnail",
  className = "h-100"
}: VideoCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onPlayClick) {
      onPlayClick()
    } else if (videoUrl) {
      window.open(videoUrl, '_blank')
    }
  }

  const formatViews = (viewCount: string | number) => {
    if (typeof viewCount === 'string') return viewCount
    
    if (viewCount >= 1000000) {
      return `${(viewCount / 1000000).toFixed(1)}M`
    } else if (viewCount >= 1000) {
      return `${(viewCount / 1000).toFixed(0)}K`
    }
    return viewCount.toString()
  }

  return (
    <div className={`w-full bg-[#151515] rounded-lg flex flex-col z-10 gap-3 sm:gap-4 ${className}`}>
      {/* Video Thumbnail Container */}
      <div 
        className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {/* Thumbnail Image */}
        <Image
          src={thumbnail}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`bg-[#cca33a] rounded-full w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110 bg-[#b8922e]' : 'scale-100'
            }`}
          >
            <FaPlay className="text-white text-lg sm:text-xl ml-1" />
          </div>
        </div>

  
        {/* Runtime Badge */}
        {runtime && (
        <div className="absolute bottom-3 right-10 bg-black/70 backdrop-blur-sm rounded-full px-4 py-3">
          <span className="text-[#b3b3b3] text-md font-medium">{runtime}</span>
        </div>
        )}

      </div>

      {/* Video Info */}
      <div className="p-4 flex flex-col gap-1">
        {title && (
          <h3 className="text-white text-base sm:text-xl font-semibold line-clamp-2 hover:text-[#cca33a] transition-colors cursor-pointer">
            {title}
          </h3>
        )}
        
        {(year || views) && (
          <div className="flex items-center gap-2 text-sm sm:text-base text-zinc-400">
            {year && <span>{year}</span>}
            {year && views && <span>•</span>}
            {views && <span>{formatViews(views)} views</span>}
          </div>
        )}
      </div>
    </div>
  )
}

export default VideoCard