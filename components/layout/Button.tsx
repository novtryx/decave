import React from 'react'
import { IconType } from 'react-icons'


interface ButtonProps {
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  icon?: IconType
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
  icon: Icon,
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

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {Icon && iconPosition === 'left' && <Icon size={iconSize} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
    </button>
  )
}

export default Button