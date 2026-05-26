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
  color?: string
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
  disabled = false,
  color,
}: ViewMoreButtonProps) => {

  const accentStyle = color
    ? ({
        "--color-accent":        color,
        "--color-accent-hover":  color,
        "--color-accent-active": color,
        color: "var(--color-accent)",
      } as React.CSSProperties)
    : undefined

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

  // When a custom color is passed, Tailwind hover classes won't affect the variable,
  // so we fall back to inline style + onMouseEnter/Leave for hover/active tinting.
  const baseClassName = color
    ? `group flex items-center gap-3 xs:gap-4 transition-all duration-300 active:scale-95 touch-manipulation select-none ${textClassName}`
    : `group flex items-center gap-3 xs:gap-4 text-[#CCA33A] hover:text-[#FFD159] active:text-[#B89230] transition-all duration-300 active:scale-95 touch-manipulation select-none ${textClassName}`

  const disabledClassName = disabled
    ? `opacity-50 cursor-not-allowed ${color ? '' : 'hover:text-[#CCA33A]'} active:scale-100`
    : 'cursor-pointer'

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (color && !disabled) e.currentTarget.style.filter = 'brightness(1.25)'
  }
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (color) e.currentTarget.style.filter = 'brightness(1)'
  }
  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (color && !disabled) e.currentTarget.style.filter = 'brightness(0.85)'
  }
  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (color && !disabled) e.currentTarget.style.filter = 'brightness(1.25)'
  }

  const interactionHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown:  handleMouseDown,
    onMouseUp:    handleMouseUp,
  }

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
            style={accentStyle}
            onClick={onClick}
            {...interactionHandlers}
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
          style={accentStyle}
          onClick={onClick}
          {...interactionHandlers}
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
        style={accentStyle}
        {...interactionHandlers}
      >
        {content}
      </button>
    </div>
  )
}

export default ViewMoreButton