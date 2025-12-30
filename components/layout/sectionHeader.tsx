import React from 'react'
import { IconType } from 'react-icons';

interface SectionHeaderProps {
  icon?: IconType;
  iconColor?: string;
  label?: string;
  title: string;
  description?: string;
  width?: string;
}

const SectionHeader = ({ 
  icon: Icon, 
  iconColor = "#7B3FE4", 
  label, 
  title, 
  description,
  width = "50%"
}: SectionHeaderProps) => {
  return (
    <div className='w-full flex flex-col items-center text-center my-4'>
        <div className='text-center flex flex-col items-center' style={{ width }}>
            {(Icon || label) && (
              <div className='flex items-center gap-2 text-center justify-center w-fit border-t-2 border-t-[#EEF6FF] py-1'>
                  {Icon && <Icon size={26} color={iconColor} />}
                  {label && <p className='text-center'>{label}</p>}
              </div>
            )}
            
            <h2 className='text-[40px] italic font-bold'>{title}</h2>
            
            {description && (
              <p className='text-lg text-[#B3B3B3]'>{description}</p>
            )}
        </div>
    </div>
  )
}

export default SectionHeader