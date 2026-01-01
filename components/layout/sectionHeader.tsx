// import React from 'react'
// import { IconType } from 'react-icons';

// interface SectionHeaderProps {
//   icon?: IconType;
//   iconColor?: string;
//   label?: string;
//   title: string;
//   description?: string;
//   width?: string;
//   labelColor?: string;
//   descriptionColor?:string;
//   titleColor?:string;
// }

// const SectionHeader = ({ 
//   icon: Icon, 
//   iconColor = "#7B3FE4", 
//   label, 
//   title, 
//   description,
//   width = "50%",
//   titleColor ="#F9F7F4",
//   descriptionColor = "#B3B3B3",
//   labelColor = "#F9F7F4"
// }: SectionHeaderProps) => {
//   return (
//     <div className='w-full flex flex-col items-center text-center my-4'>
//         <div className='text-center flex flex-col items-center' style={{ width }}>
//             {(Icon || label) && (
//               <div className='flex items-center gap-2 text-center justify-center w-fit border-t-2  py-1'
//                 style={{borderTopColor: labelColor}}
//               >
//                   {Icon && <Icon size={26} color={iconColor} />}
//                   {label && <p className='text-center' style={{color: labelColor}}>{label}</p>}
//               </div>
//             )}
            
//             <h2 className='text-[40px] italic font-bold' style={{color: titleColor}}>{title}</h2>
            
//             {description && (
//               <p className='text-lg ' style={{color: descriptionColor}}>{description}</p>
//             )}
//         </div>
//     </div>
//   )
// }

// export default SectionHeader



import { IconType } from 'react-icons';

interface SectionHeaderProps {
  icon?: IconType;
  iconColor?: string;
  label?: string;
  title: string;
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
    <div className={`w-full flex flex-col ${alignmentClasses[align]} my-6 sm:my-8 lg:my-10 px-4 sm:px-6 lg:px-0`}>
        <div className={`flex flex-col ${alignmentClasses[align]} w-full`} style={{ maxWidth: width }}>
            {(Icon || label) && (
              <div className={`flex items-center gap-2 ${justifyClasses[align]} w-fit border-t-2 py-1 mb-2 sm:mb-3`}
                style={{borderTopColor: labelColor}}
              >
                  {Icon && <Icon size={20} className='sm:w-6 sm:h-6 lg:w-[26px] lg:h-[26px]' color={iconColor} />}
                  {label && <p className='text-sm sm:text-base lg:text-lg' style={{color: labelColor}}>{label}</p>}
              </div>
            )}
            
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-5xl italic font-bold leading-tight mb-3 sm:mb-4' style={{color: titleColor}}>
              {title}
            </h2>
            
            {description && (
              <p className='text-sm sm:text-base lg:text-lg w-full md:w-[80%] lg:w-[70%] xl:w-[60%] leading-relaxed' style={{color: descriptionColor}}>
                {description}
              </p>
            )}
        </div>
    </div>
  )
}

export default SectionHeader