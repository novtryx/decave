'use client'
import React from 'react'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { IoArrowForward } from 'react-icons/io5'

interface ButtonProps {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  icon?: IconType | 'arrow'
  iconPosition?: 'left' | 'right'
  iconSize?: number
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  external?: boolean
  prefetch?: boolean
  scroll?: boolean
}

const Button = ({
  variant = 'primary',
  children,
  icon,
  iconPosition = 'right',
  iconSize = 24,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  href,
  external = false,
  prefetch = true,
  scroll = true,
}: ButtonProps) => {
  const baseStyles = 'rounded-full px-6 xs:px-8 py-2 xs:py-2.5 sm:py-3 flex items-center gap-3 xs:gap-4 justify-center transition-all duration-300 font-medium text-sm xs:text-base active:scale-95 touch-manipulation select-none'
  
  const variants = {
    primary: 'bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[#FFD159] to-[#FFD159] bg-[#FFD159] text-[#FFF7E4] hover:shadow-lg hover:shadow-[#FFD159]/30 hover:scale-105 active:shadow-md',
    outline: 'border-2 border-[#CCA33A] text-[#CCA33A] hover:bg-[#CCA33A]/10 hover:border-[#FFD159] hover:scale-105 active:bg-[#CCA33A]/20'
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100 active:scale-100' : 'cursor-pointer'

  // Resolve icon
  let IconComponent: IconType | null = null
  if (icon === 'arrow') {
    IconComponent = IoArrowForward
  } else if (typeof icon !== 'string') {
    IconComponent = icon as IconType
  }

  // Responsive icon size
  const responsiveIconSize = {
    base: iconSize * 0.8, // Smaller on mobile
    sm: iconSize
  }

  // Button content
  const content = (
    <>
      {IconComponent && iconPosition === 'left' && (
        <IconComponent 
          size={responsiveIconSize.base} 
          className='xs:w-auto xs:h-auto transition-transform duration-300 group-hover:-translate-x-0.5 group-active:translate-x-0'
          style={{ width: responsiveIconSize.base, height: responsiveIconSize.base }}
        />
      )}
      <span className='transition-all duration-300'>{children}</span>
      {IconComponent && iconPosition === 'right' && (
        <IconComponent 
          size={responsiveIconSize.base}
          className='xs:w-auto xs:h-auto transition-transform duration-300 group-hover:translate-x-0.5 group-active:translate-x-0'
          style={{ width: responsiveIconSize.base, height: responsiveIconSize.base }}
        />
      )}
    </>
  )

  const combinedClassName = `group ${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`

  // If href is provided, render as Link
  if (href && !disabled) {
    // External link
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
          onClick={onClick}
        >
          {content}
        </a>
      )
    }

    // Internal Next.js Link
    return (
      <Link
        href={href}
        prefetch={prefetch}
        scroll={scroll}
        className={combinedClassName}
        onClick={onClick}
      >
        {content}
      </Link>
    )
  }

  // Default button
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {content}
    </button>
  )
}

export default Button