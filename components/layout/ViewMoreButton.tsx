"use client"
import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'

interface ViewMoreButtonProps {
  text?: string
  onClick?: () => void
  href?: string
  external?: boolean
  prefetch?: boolean
  scroll?: boolean
  className?: string
  textClassName?: string
  iconSize?: number
  disabled?: boolean
}

const ViewMoreButton = ({
  text = "View More",
  onClick,
  href,
  external = false,
  prefetch = true,
  scroll = true,
  className = '',
  textClassName = '',
  iconSize = 20,
  disabled = false
}: ViewMoreButtonProps) => {
  
  // Base button content
  const content = (
    <>
      <span className='font-bold text-sm xs:text-base transition-all duration-300'>{text}</span> 
      <IoArrowForward 
        size={iconSize} 
        className='transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-0'
      />
    </>
  )

  const baseClassName = `group flex items-center gap-3 xs:gap-4 text-[#CCA33A] hover:text-[#FFD159] active:text-[#B89230] transition-all duration-300 active:scale-95 touch-manipulation select-none ${textClassName}`
  
  const disabledClassName = disabled ? 'opacity-50 cursor-not-allowed hover:text-[#CCA33A] active:scale-100' : 'cursor-pointer'

  // If href is provided, render as Link
  if (href && !disabled) {
    // External link
    if (external) {
      return (
        <div className={`w-full items-center flex justify-center ${className}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClassName} ${disabledClassName}`}
            onClick={onClick}
          >
            {content}
          </a>
        </div>
      )
    }

    // Internal Next.js Link
    return (
      <div className={`w-full items-center flex justify-center ${className}`}>
        <Link
          href={href}
          prefetch={prefetch}
          scroll={scroll}
          className={`${baseClassName} ${disabledClassName}`}
          onClick={onClick}
        >
          {content}
        </Link>
      </div>
    )
  }

  // Default button
  return (
    <div className={`w-full items-center flex justify-center ${className}`}>
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`${baseClassName} ${disabledClassName}`}
      >
        {content}
      </button>
    </div>
  )
}

export default ViewMoreButton