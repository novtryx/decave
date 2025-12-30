'use client'
import React from 'react'
import { IconType } from 'react-icons'
import { IoArrowForward } from 'react-icons/io5'

interface ButtonProps {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  icon?: IconType | 'arrow' // Add named icon options
  iconPosition?: 'left' | 'right'
  iconSize?: number
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
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
}: ButtonProps) => {
  const baseStyles = 'rounded-full px-8 py-2 flex items-center gap-4 justify-center transition-all duration-300 font-medium'
  
  const variants = {
    primary: 'bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-[#FFD159] to-[#FFD159] bg-[#FFD159] text-[#FFF7E4] hover:shadow-lg hover:scale-105',
    outline: 'border border-[#CCA33A] text-[#CCA33A] hover:bg-[#FFF7E4] hover:scale-105'
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  // Resolve icon
  let IconComponent: IconType | null = null
  if (icon === 'arrow') {
    IconComponent = IoArrowForward
  } else if (typeof icon !== 'string') {
    IconComponent = icon as IconType
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {IconComponent && iconPosition === 'left' && <IconComponent size={iconSize} />}
      <span>{children}</span>
      {IconComponent && iconPosition === 'right' && <IconComponent size={iconSize} />}
    </button>
  )
}

export default Button