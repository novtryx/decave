import React from 'react'
import { IconType } from 'react-icons'

interface CardWithoutImageProps {
  icon: IconType
  iconColor?: string
  iconBgColor?: string
  title: string
  description: string
  className?: string
  iconSize?: number
}

const CardWithoutImage = ({
  icon: Icon,
  iconColor = "#CCA33A",
  iconBgColor = "#2A2A2A",
  title,
  description,
  className = '',
  iconSize = 24
}: CardWithoutImageProps) => {
  return (
    <div className={`border-2 border-[#2A2A2A] hover:border-[#0854A7] rounded-xl p-6 space-y-22.5 w-full transition-all duration-300 ${className}`}>
        <div 
          className='p-3 rounded-lg w-fit'
          style={{ backgroundColor: iconBgColor }}
        >
            <Icon size={iconSize} color={iconColor}/>
        </div>

        <div className='space-y-3'>
            <h3 className='font-semibold text-[20px]'>{title}</h3>
            <p className='text-[#B3B3B3]'>{description}</p>
        </div>

        
    </div>
  )
}

export default CardWithoutImage