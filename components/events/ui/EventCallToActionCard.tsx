// import React from 'react'
// import Button from '@/components/layout/Button'

// interface EventCTAProps {
//   title: string
//   description: string
//   additionalDescription?: string
//   buttonText: string
//   onButtonClick?: () => void
//   className?: string
// }

// const EventCallToAction: React.FC<EventCTAProps> = ({
//   title,
//   description,
//   additionalDescription,
//   buttonText,
//   onButtonClick,
//   className = '',
// }) => {
//   return (
//     <section
//       className={`relative w-full py-20 px-6 md:px-12 bg-linear-to-br from-[#A8A598] via-[#8B9499] to-[#6B7F8F] ${className}`}
//     >
//       <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
//         {/* Title */}
//         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
//           {title}
//         </h2>

//         {/* Description Container */}
//         <div className="flex flex-col items-center gap-3 mb-8">
//           <p className="text-lg md:text-xl text-white/90 max-w-2xl">
//             {description}
//           </p>
          
//           {additionalDescription && (
//             <p className="text-base md:text-lg text-white/80 max-w-xl">
//               {additionalDescription}
//             </p>
//           )}
//         </div>

//         {/* CTA Button */}
//         <Button
//           variant="primary"
//           icon="arrow"
//           onClick={onButtonClick}
//         >
//           {buttonText}
//         </Button>
//       </div>
//     </section>
//   )
// }

// export default EventCallToAction



import React from 'react'
import Button from '@/components/layout/Button'// Adjust path as needed

interface EventCTAProps {
  title: string
  description: string
  additionalDescription?: string
  buttonText: string
  onButtonClick?: () => void
  className?: string
}

const EventCallToAction: React.FC<EventCTAProps> = ({
  title,
  description,
  additionalDescription,
  buttonText,
  onButtonClick,
  className = '',
}) => {
  return (
    <section
      className={`relative w-full py-20 px-6 bg-[#b2ad6a] md:px-12 overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(90deg, #b2ad6a 0%, #001d3d 45%, #b2ad6a 50%, #fbf7ba 75%, #001d3d 100%)',
      }}

    // className="relative overflow-hidden bg-[radial-gradient(circle_at_20%_30%,#6b5b1e,transparent_45%),radial-gradient(circle_at_80%_70%,#0b2a4a,transparent_45%),radial-gradient(circle_at_50%_50%,#0a1a2f,transparent_60%)] blur-2xl scale-110"
    >
      {/* Dark overlay for opacity effect */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {title}
        </h2>

        {/* Description Container */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            {description}
          </p>
          
          {additionalDescription && (
            <p className="text-base md:text-lg text-white/80 max-w-xl">
              {additionalDescription}
            </p>
          )}
        </div>

        {/* CTA Button */}
        <Button
          variant="primary"
          icon="arrow"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  )
}

export default EventCallToAction