"use client"
import React from 'react'
import { LuFilter } from 'react-icons/lu'

export interface TabItem {
  id: string
  label: string
  onClick?: () => void
  href?: string
}

interface TabNavigationProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  showFilter?: boolean
  filterColor?: string
  activeTabColor?: string
  inactiveTabColor?: string
  borderColor?: string
  containerClassName?: string
}

const TabNavigation = ({
  tabs,
  activeTab,
  onTabChange,
  showFilter = true,
  filterColor = '#ad46ff',
  activeTabColor = '#0854a7',
  inactiveTabColor = '#6f6f6f',
  borderColor = 'rgb(229, 231, 235)',
  containerClassName = ''
}: TabNavigationProps) => {
  const handleTabClick = (tab: TabItem) => {
    onTabChange(tab.id)
    if (tab.onClick) {
      tab.onClick()
    }
  }

  return (
    <>
      <div className={`pt-10 sm:pt-12 lg:pt-14 pb-4 sm:pb-6  ${containerClassName}`}>
        <div className="flex gap-3 items-center">
          {showFilter && (
            <>
              <LuFilter 
                className="text-xl sm:text-2xl shrink-0" 
                style={{ color: filterColor }}
              />
              <div className="h-8 sm:h-10 w-px bg-gray-600"></div>
            </>
          )}
          
          {/* Scrollable tab container on mobile */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`tracking-wider py-1.5 sm:py-2 px-3 sm:px-4 text-sm sm:text-base lg:text-lg whitespace-nowrap cursor-pointer shrink-0 transition-colors duration-200`}
                style={{
                  backgroundColor: activeTab === tab.id ? activeTabColor : 'transparent',
                  color: activeTab === tab.id ? 'white' : inactiveTabColor,
                  border: activeTab === tab.id ? 'none' : `1px solid ${borderColor}`
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}

export default TabNavigation