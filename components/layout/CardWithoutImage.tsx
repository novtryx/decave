
// import React from 'react'
// import { IconType } from 'react-icons'

// interface CardWithoutImageProps {
//   icon: IconType
//   iconColor?: string
//   iconBgColor?: string
//   title: string
//   description: string
//   className?: string
//   iconSize?: number
//   titleColor?: string        // New prop
//   titleSize?: 'md' | 'lg' | 'xl'  // New prop
// }

// const CardWithoutImage = ({
//   icon: Icon,
//   iconColor = "#CCA33A",
//   iconBgColor = "#2A2A2A",
//   title,
//   description,
//   className = '',
//   iconSize = 24,
//   titleColor = '#000',      // Default title color
//   titleSize = 'md',         // Default title size
// }: CardWithoutImageProps) => {

//   // Map titleSize to Tailwind text classes
//   const titleSizeClasses: Record<typeof titleSize, string> = {
//     md: 'text-[20px]',
//     lg: 'text-[24px]',
//     xl: 'text-[30px]',
//   }

//   return (
//     <div className={`border-2 border-[#2A2A2A] hover:border-[#0854A7] rounded-xl p-6 space-y-6 w-full transition-all duration-300 ${className}`}>
//         <div 
//           className='p-3 rounded-lg w-fit'
//           style={{ backgroundColor: iconBgColor }}
//         >
//             <Icon size={iconSize} color={iconColor}/>
//         </div>

//         <div className='space-y-3'>
//             <h3
//               className={`font-semibold ${titleSizeClasses[titleSize]}`}
//               style={{ color: titleColor }}
//             >
//               {title}
//             </h3>
//             <p className='text-[#B3B3B3]'>{description}</p>
//         </div>
//     </div>
//   )
// }

// export default CardWithoutImage


import React from 'react'
import { IconType } from 'react-icons'

interface CardWithoutImageProps {
  icon: IconType
  iconColor?: string
  iconBgColor?: string
  title: string
  description: string
  className?: string
  iconSize?: number
  titleColor?: string
  titleSize?: 'md' | 'lg' | 'xl'
  children?: React.ReactNode  // Added children prop
}

const CardWithoutImage = ({
  icon: Icon,
  iconColor = "#CCA33A",
  iconBgColor = "#2A2A2A",
  title,
  description,
  className = '',
  iconSize = 24,
  titleColor = '#000',
  titleSize = 'md',
  children,  // Destructure children
}: CardWithoutImageProps) => {

  const titleSizeClasses: Record<typeof titleSize, string> = {
    md: 'text-[20px]',
    lg: 'text-[24px]',
    xl: 'text-[30px]',
  }

  return (
    <div className={`border-2 border-[#2A2A2A] hover:border-[#0854A7] rounded-xl p-6 space-y-6 w-full transition-all duration-300 ${className}`}>
        <div 
          className='p-3 rounded-lg w-fit'
          style={{ backgroundColor: iconBgColor }}
        >
            <Icon size={iconSize} color={iconColor}/>
        </div>

        <div className='space-y-3'>
            <h3
              className={`font-semibold ${titleSizeClasses[titleSize]}`}
              style={{ color: titleColor }}
            >
              {title}
            </h3>
            <p className='text-[#B3B3B3]'>{description}</p>
        </div>

        {/* Render children if provided */}
        {children && (
          <div>
            {children}
          </div>
        )}
    </div>
  )
}

export default CardWithoutImage