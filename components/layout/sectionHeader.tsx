import { IconType } from 'react-icons';
import { ReactNode } from 'react';

interface SectionHeaderProps {
  icon?: IconType;
  iconColor?: string;
  label?: string;
  title: ReactNode;
  description?: string;
  width?: string;
  labelColor?: string;
  descriptionColor?: string;
  titleColor?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeader = ({ 
  icon: Icon, 
  iconColor = "#7B3FE4", 
  label, 
  title, 
  description,
  width = "100%",
  titleColor = "#F9F7F4",
  descriptionColor = "#B3B3B3",
  labelColor = "#F9F7F4",
  align = "center"
}: SectionHeaderProps) => {
  
  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right'
  };

  const justifyClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={`w-full flex flex-col ${alignmentClasses[align]} my-4`}>
        <div className={`flex flex-col ${alignmentClasses[align]}`} style={{ width }}>
            {(Icon || label) && (
              <div className={`flex items-center gap-2 ${justifyClasses[align]} w-fit border-t-2 py-1`}
                style={{borderTopColor: labelColor}}
              >
                  {Icon && <Icon size={26} color={iconColor} />}
                  {label && <p style={{color: labelColor}}>{label}</p>}
              </div>
            )}
            
            <h2 className='text-[40px] w-full lg:w-[50%] leading-tight mb-3 italic font-bold' style={{color: titleColor}}>{title}</h2>
            
            {description && (
              <p className='text-lg w-full lg:w-[50%]' style={{color: descriptionColor}}>{description}</p>
            )}
        </div>
    </div>
  )
}

export default SectionHeader