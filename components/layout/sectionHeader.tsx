import React from 'react'
import { IconType } from 'react-icons';

interface SectionHeaderProps {
  icon?: IconType;
  iconColor?: string;
  label?: string;
  title: string;
  description?: string;
  width?: string;
  labelColor?: string;
  descriptionColor?:string;
  titleColor?:string;
}

const SectionHeader = ({ 
  icon: Icon, 
  iconColor = "#7B3FE4", 
  label, 
  title, 
  description,
  width = "50%",
  titleColor ="#F9F7F4",
  descriptionColor = "#B3B3B3",
  labelColor = "#F9F7F4"
}: SectionHeaderProps) => {
  return (
    <div className='w-full flex flex-col items-center text-center my-4'>
        <div className='text-center flex flex-col items-center' style={{ width }}>
            {(Icon || label) && (
              <div className='flex items-center gap-2 text-center justify-center w-fit border-t-2  py-1'
                style={{borderTopColor: labelColor}}
              >
                  {Icon && <Icon size={26} color={iconColor} />}
                  {label && <p className='text-center' style={{color: labelColor}}>{label}</p>}
              </div>
            )}
            
            <h2 className='text-[40px] italic font-bold' style={{color: titleColor}}>{title}</h2>
            
            {description && (
              <p className='text-lg ' style={{color: descriptionColor}}>{description}</p>
            )}
        </div>
    </div>
  )
}

export default SectionHeader