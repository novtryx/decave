// components/layout/StickyNavigation.tsx
'use client'
import { useState, useEffect } from 'react'
import LatestTicket from './latestTicket'
import Header from './header'

export default function StickyNavigation() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Adjust the scroll threshold as needed
      setIsSticky(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* LatestTicket */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSticky 
            ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' 
            : 'relative'
        }`}
      >
        <LatestTicket />
      </div>

      {/* Header */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isSticky 
            ? 'fixed left-0 right-0 z-40 bg-black/90 backdrop-blur-md shadow-md border-b border-white/5' 
            : 'relative bg-transparent'
        }`}
        style={{ 
          top: isSticky ? 'var(--ticket-height, 40px)' : '0' 
        }}
      >
        <div className="px-4 sm:px-6 lg:px-6 py-2">
          <div className="max-w-full mx-auto">
            <Header />
          </div>
        </div>
      </div>

      {/* Spacer to prevent content jump when fixed */}
      {isSticky && (
        <div 
          className="transition-all duration-300"
          style={{ height: 'calc(var(--ticket-height, 40px) + var(--header-height, 80px))' }}
        />
      )}
    </>
  )
}