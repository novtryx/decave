// import CallToAction from '@/components/CallToAction'
// import { PiHandshake } from "react-icons/pi"

// const ExamplePage = () => {
//   return (
//     <div>
//       {/* ========================================
//           BASIC USAGE - WITH BACKGROUND IMAGE
//           ======================================== */}
//       <CallToAction
//         // Background - use either backgroundImage OR backgroundGradient
//         backgroundImage="/dancers.jpg"
        
//         // Overlay gradient on top of background
//         overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/90"
        
//         // Section Header - icon and label are optional
//         icon={PiHandshake}
//         iconColor="#EEF6FF"
//         label="Join the Movement"
        
//         // Title and description are REQUIRED
//         title="Ready to Experience the culture?"
//         description="Join the movement. Explore our upcoming events or partner with us to create unforgettable movements"
        
//         // Buttons - both are optional, you can have one, both, or none
//         primaryButton={{
//           text: "Explore events",
//           icon: "arrow", // Options: 'arrow' | 'ticket' | 'handshake' | 'people'
//           onClick: () => console.log('Primary clicked')
//         }}
//         secondaryButton={{
//           text: "Partner with Us",
//           onClick: () => console.log('Secondary clicked')
//         }}
//       />

//       {/* ========================================
//           WITH GRADIENT BACKGROUND (NO IMAGE)
//           ======================================== */}
//       <CallToAction
//         // Use gradient instead of image
//         backgroundGradient="radial-gradient(circle, #001D3D, #56410C, #001D3D)"
        
//         overlay="bg-gradient-to-r from-black/30 to-[#2A2A2A]/90"
//         icon={PiHandshake}
//         iconColor="#EEF6FF"
//         label="Join the Movement"
//         title="Ready to Experience the culture?"
//         description="Join the movement. Explore our upcoming events or partner with us to create unforgettable movements"
//         primaryButton={{
//           text: "Explore events",
//           icon: "arrow"
//         }}
//         secondaryButton={{
//           text: "Partner with Us"
//         }}
//       />

//       {/* ========================================
//           WITH ONLY PRIMARY BUTTON
//           ======================================== */}
//       <CallToAction
//         backgroundImage="/event-bg.jpg"
//         title="Get Your Tickets Now"
//         description="Limited spots available for our next event"
        
//         // Only primary button, no secondary
//         primaryButton={{
//           text: "Buy Tickets",
//           icon: "ticket"
//         }}
//       />

//       {/* ========================================
//           WITH ONLY SECONDARY BUTTON
//           ======================================== */}
//       <CallToAction
//         backgroundGradient="linear-gradient(to right, #001D3D, #CCA33A, #004DA3)"
//         title="Learn More About Us"
//         description="Discover our story and mission"
        
//         // Only secondary button, no primary
//         secondaryButton={{
//           text: "Read Our Story"
//         }}
//       />

//       {/* ========================================
//           NO BUTTONS - JUST CONTENT
//           ======================================== */}
//       <CallToAction
//         backgroundImage="/announcement-bg.jpg"
//         icon={PiHandshake}
//         iconColor="#CCA33A"
//         label="Coming Soon"
//         title="New Event Announcement"
//         description="Stay tuned for something amazing"
//         // No buttons at all
//       />

//       {/* ========================================
//           WITH CHILDREN PROPS
//           ======================================== */}
//       <CallToAction
//         backgroundGradient="radial-gradient(circle, #001D3D, #CCA33A, #004DA3)"
//         title="Join Our Newsletter"
//         description="Get exclusive updates and early bird tickets"
//         primaryButton={{
//           text: "Subscribe Now",
//           icon: "arrow"
//         }}
//       >
//         {/* Children appear AFTER the buttons */}
//         <div className='mt-8 flex gap-8 text-white'>
//           <div className='text-center'>
//             <p className='text-4xl font-bold text-[#CCA33A]'>10K+</p>
//             <p className='text-sm text-gray-300'>Attendees</p>
//           </div>
//           <div className='text-center'>
//             <p className='text-4xl font-bold text-[#CCA33A]'>50+</p>
//             <p className='text-sm text-gray-300'>Events</p>
//           </div>
//           <div className='text-center'>
//             <p className='text-4xl font-bold text-[#CCA33A]'>200+</p>
//             <p className='text-sm text-gray-300'>Artists</p>
//           </div>
//         </div>
//       </CallToAction>

//       {/* ========================================
//           WITH CUSTOM STYLING
//           ======================================== */}
//       <CallToAction
//         backgroundImage="/hero-bg.jpg"
        
//         // Custom height (default is h-92.25)
//         height="h-[600px]"
        
//         // Custom container padding (default is p-15)
//         containerClassName="p-6 md:p-12"
        
//         // Custom content alignment and spacing
//         contentClassName="text-left items-start px-12"
        
//         // Custom overlay
//         overlay="bg-gradient-to-t from-black/90 via-black/50 to-transparent"
        
//         title="Exclusive VIP Experience"
//         description="Elevate your event experience with premium access"
//         primaryButton={{
//           text: "Get VIP Pass",
//           icon: "ticket"
//         }}
//       />

//       {/* ========================================
//           DIFFERENT GRADIENT EXAMPLES
//           ======================================== */}
      
//       {/* Linear gradient */}
//       <CallToAction
//         backgroundGradient="linear-gradient(to right, #001D3D 0%, #CCA33A 50%, #004DA3 100%)"
//         title="Experience the Colors"
//         description="Every event is a masterpiece"
//         primaryButton={{ text: "Explore Events" }}
//       />

//       {/* 4-color radial gradient */}
//       <CallToAction
//         backgroundGradient="radial-gradient(circle, #001D3D 0%, #CCA33A 33%, #004DA3 66%, #FAF8FF 100%)"
//         overlay="bg-black/20"
//         title="Cultural Celebration"
//         description="Join us for unforgettable moments"
//         primaryButton={{ text: "Get Tickets" }}
//       />

//       {/* Diagonal gradient */}
//       <CallToAction
//         backgroundGradient="linear-gradient(135deg, #001D3D, #56410C, #CCA33A)"
//         overlay="bg-black/40"
//         title="Golden Nights"
//         description="Premium entertainment experience"
//         primaryButton={{ text: "Reserve Now", icon: "arrow" }}
//         secondaryButton={{ text: "Learn More" }}
//       />

//       {/* ========================================
//           WITH CUSTOM FORM IN CHILDREN
//           ======================================== */}
//       <CallToAction
//         backgroundGradient="radial-gradient(circle, #001D3D, #56410C, #001D3D)"
//         title="Stay Connected"
//         description="Get updates on upcoming events and exclusive offers"
//       >
//         {/* Custom form as children */}
//         <form className='flex gap-4 mt-6 flex-col sm:flex-row w-full max-w-md'>
//           <input 
//             type="email" 
//             placeholder="Enter your email"
//             className='px-6 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder:text-gray-300 backdrop-blur-sm flex-1'
//           />
//           <button 
//             type="submit"
//             className='px-8 py-3 bg-[#CCA33A] rounded-full font-semibold hover:bg-[#B89230] transition-colors text-white'
//           >
//             Subscribe
//           </button>
//         </form>
//       </CallToAction>

//       {/* ========================================
//           MINIMAL VERSION
//           ======================================== */}
//       <CallToAction
//         backgroundImage="/simple-bg.jpg"
        
//         // Only required props
//         title="Join Us"
//         description="Be part of something special"
        
//         // Everything else is optional
//       />
//     </div>
//   )
// }

// export default ExamplePage

/* ========================================
   COMPONENT PROPS REFERENCE
   ========================================

   BACKGROUND (choose one):
   - backgroundImage?: string - Path to image (e.g., "/dancers.jpg")
   - backgroundGradient?: string - CSS gradient (e.g., "radial-gradient(circle, #001D3D, #CCA33A)")

   OVERLAY:
   - overlay?: string - Tailwind gradient classes (default: "bg-gradient-to-r from-black/30 to-[#2A2A2A]/90")

   SECTION HEADER (title & description required, others optional):
   - icon?: IconType - React icon component
   - iconColor?: string - Hex color for icon
   - label?: string - Small label above title
   - title: string - Main heading (REQUIRED)
   - description: string - Subtitle text (REQUIRED)

   BUTTONS (all optional):
   - primaryButton?: {
       text: string
       icon?: 'arrow' | 'ticket' | 'handshake' | 'people'
       onClick?: () => void
       href?: string
     }
   - secondaryButton?: {
       text: string
       onClick?: () => void
       href?: string
     }

   STYLING (all optional):
   - height?: string - Tailwind height class (default: "h-92.25")
   - containerClassName?: string - Outer container classes (default: "p-15")
   - contentClassName?: string - Content wrapper classes

   CHILDREN (optional):
   - children?: ReactNode - Custom content after buttons

   ======================================== */





"use client"
import Image from 'next/image'
import React, { ReactNode } from 'react'
import SectionHeader from './sectionHeader'
import Button from './Button'
import { IconType } from 'react-icons'




interface CallToActionProps {
  // Background (either image OR gradient)
  backgroundImage?: string
  backgroundGradient?: string // e.g., 'radial-gradient(circle,#001D3D,#56410C,#001D3D)'
  
  // Overlay
  overlay?: string // e.g., 'bg-gradient-to-r from-black/30 to-[#2A2A2A]/90'
  
  // Section Header (required)
  icon?: IconType
  iconColor?: string
  label?: string
  title: string
  description: string
  
  // Buttons (optional)
  primaryButton?: {
    text: string
    icon?: 'arrow' 
    onClick?: () => void
    href?: string
  }
  secondaryButton?: {
    text: string
    onClick?: () => void
    href?: string
  }
  
  // Styling
  height?: string // e.g., 'h-92.25' or 'h-96'
  containerClassName?: string
  contentClassName?: string
  
  // Children (appears after buttons)
  children?: ReactNode
}

const CallToAction = ({
  backgroundImage,
  backgroundGradient,
  overlay = 'bg-gradient-to-r from-black/30 to-[#2A2A2A]/90',
  icon,
  iconColor,
  label,
  title,
  description,
  primaryButton,
  secondaryButton,
  height = 'h-92.25',
  containerClassName = 'p-15',
  contentClassName = '',
  children
}: CallToActionProps) => {
  return (
    <div className={containerClassName}>
        <div className={`relative w-full ${height} rounded-lg overflow-hidden`}>
            {/* Background Image OR Gradient */}
            {backgroundImage && !backgroundGradient && (
              <Image 
                src={backgroundImage} 
                alt={title} 
                fill 
                className='object-cover' 
              />
            )}
            
            {backgroundGradient && !backgroundImage && (
              <div 
                className={`w-full ${height}`}
                style={{ background: backgroundGradient }}
              ></div>
            )}
            
            {/* Overlay with Content */}
            <div className={`absolute inset-0 ${overlay} z-10 flex flex-col items-center justify-center gap-6 ${contentClassName}`}>
                {/* Section Header */}
                <SectionHeader
                    icon={icon}
                    iconColor={iconColor}
                    label={label}
                    title={title}
                    description={description}
                />

                {/* Buttons */}
                {(primaryButton || secondaryButton) && (
                  <div className='flex items-center gap-10 flex-wrap justify-center'>
                      {primaryButton && (
                        <Button 
                          variant='primary' 
                          icon={"arrow"}
                          onClick={primaryButton.onClick}
                        >
                          {primaryButton.text}
                        </Button>
                      )}
                      
                      {secondaryButton && (
                        <Button 
                          variant='outline'
                          onClick={secondaryButton.onClick}
                        >
                          {secondaryButton.text}
                        </Button>
                      )}
                  </div>
                )}

                {/* Children (after buttons) */}
                {children}
            </div>
        </div>
    </div>
  )
}

export default CallToAction