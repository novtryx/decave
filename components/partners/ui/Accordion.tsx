'use client'

import React, { useState, useRef, useEffect } from 'react'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'

interface AccordionProps {
  accordionTitle: string
  description: string
  className?: string
}

const Accordion: React.FC<AccordionProps> = ({
  accordionTitle,
  description,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('0px') // For transition

  const toggleAccordion = () => setIsOpen(!isOpen)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px')
    }
  }, [isOpen])

  return (
    <div className={`border border-[#2a2a2a] rounded-lg overflow-hidden ${className}`}>
      {/* Accordion Header */}
      <button
        className="flex cursor-pointer items-center justify-between w-full p-4 bg-[#151515] transition-colors"
        onClick={toggleAccordion}
      >
        <span className="font-medium text-left text-[#F9F7F4]">{accordionTitle}</span>
        {isOpen ? <IoChevronUp size={20} /> : <IoChevronDown size={20} />}
      </button>

      {/* Accordion Content with smooth height transition */}
      <div
        ref={contentRef}
        style={{ height }}
        className="overflow-hidden transition-all duration-300"
      >
        <div className="p-4 bg-[#151515] text-[#b3b3b3]">{description}</div>
      </div>
    </div>
  )
}

export default Accordion
