"use client"
import { IoArrowForward } from 'react-icons/io5'

interface ViewMoreButtonProps {
  text?: string
  onClick?: () => void
  className?: string
  textClassName?: string
  iconSize?: number
  disabled?: boolean
}

const ViewMoreButton = ({
  text = "View More",
  onClick,
  className = '',
  textClassName = '',
  iconSize = 20,
  disabled = false
}: ViewMoreButtonProps) => {
  return (
    <div className={`w-full items-center flex justify-center ${className}`}>
        <button 
          onClick={onClick}
          disabled={disabled}
          className={`flex cursor-pointer gap-4 items-center text-[#CCA33A] hover:text-[#B89230] transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${textClassName}`}
        >
            <span className='font-bold text-base'>{text}</span> 
            <IoArrowForward size={iconSize}/>
        </button>
    </div>
  )
}

export default ViewMoreButton