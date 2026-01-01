// import React from 'react';
// import { IconType } from 'react-icons';
// import { LuTicket, LuUsers, LuCheck } from 'react-icons/lu';

// interface TicketCardProps {
//   price: string;
//   originalPrice?: string;
//   title: string;
//   description: string;
//   personCount: string;
//   features: string[];
//   buttonText: string;
//   onBuyClick: () => void;
//   icon?: IconType;
//   isPopular?: boolean;
//   isPrimary?: boolean;
// }

// export const TicketCard: React.FC<TicketCardProps> = ({
//   price,
//   originalPrice,
//   title,
//   description,
//   personCount,
//   features,
//   buttonText,
//   onBuyClick,
//   icon: Icon = LuTicket,
//   isPopular = false,
//   isPrimary = false
// }) => {
//   return (
//     <div className="relative">
//       {/* Most Popular Badge */}
//       {isPopular && (
//         <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
//           <div className="bg-linear-to-r from-yellow-500 to-yellow-600 text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//             </svg>
//             Most Popular
//           </div>
//         </div>
//       )}

//       {/* Card */}
//       <div
//         className={`
//           relative bg-[#1a1a1a] rounded-2xl p-6
//           transition-all duration-300 hover:scale-105 hover:shadow-2xl
//           ${isPopular ? 'border-2 border-yellow-500' : 'border border-gray-800'}
//           ${isPopular ? 'mt-4' : ''}
//         `}
//       >
//         {/* Icon */}
//         <div className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center mb-6">
//           <Icon className="text-gray-400" size={24} />
//         </div>

//         {/* Price */}
//         <div className="mb-2">
//           <span className="text-4xl font-bold text-[#cca33a]">
//             {price}
//           </span>
//           {originalPrice && (
//             <span className="text-lg text-gray-600 line-through ml-2">
//               {originalPrice}
//             </span>
//           )}
//         </div>

//         {/* Title & Description */}
//         <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
//         <p className="text-gray-400 text-sm mb-6 italic">{description}</p>

//         {/* Person Count */}
//         <div className="flex items-center gap-2 text-gray-400 mb-6 pb-6 border-b border-gray-800">
//           <LuUsers size={18} />
//           <span className="text-sm">{personCount}</span>
//         </div>

//         {/* Features */}
//         <div className="space-y-3 mb-8">
//           {features.map((feature, index) => (
//             <div key={index} className="flex items-center gap-3">
//               <LuCheck className="text-blue-500 flex-shrink-0" size={18} />
//               <span className="text-gray-300 text-sm">{feature}</span>
//             </div>
//           ))}
//         </div>

//         {/* Button */}
//         <button
//           onClick={onBuyClick}
//           className={`
//             w-full py-4 px-6 rounded-full font-semibold
//             transition-all duration-300 hover:scale-105
//             ${isPrimary
//               ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700'
//               : 'bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800'
//             }
//           `}
//         >
//           {buttonText}
//         </button>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { IconType } from "react-icons";
import { FaRegStar } from "react-icons/fa";
import { LuTicket, LuUsers, LuCheck } from "react-icons/lu";

interface TicketCardProps {
  id?: number;
  price: string;
  originalPrice?: string;
  title: string;
  description: string;
  personCount: string;
  features: string[];
  buttonText: string;
  onBuyClick?: () => void;
  icon?: IconType;
  isPopular?: boolean;
  isPrimary?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  price,
  originalPrice,
  title,
  description,
  personCount,
  features,
  buttonText,
  onBuyClick,
  icon: Icon = LuTicket,
  isPopular = false,
  isPrimary = false,
}) => {
  return (
    <div className="relative">
      {/* Most Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-linear-to-r from-[#BC9229] to-[#DFA91E] text-white text-sm font-semibold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
            <FaRegStar />
            Most Popular
          </div>
        </div>
      )}

      {/* Card */}
      <div
        className={`
          relative bg-[#1a1a1a] rounded-2xl p-6 
          transition-all duration-300 hover:scale-105 hover:shadow-2xl
          border border-[#2a2a2a] hover:border-yellow-500
          min-h-130 h-auto
        
        `}
      >
        {/* Icon */}
        <div className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center mb-6">
          <Icon className="text-gray-400" size={24} />
        </div>

        {/* Price */}
        <div className="mb-2">
          <span className="text-3xl font-bold text-[#cca33a]">{price}</span>
          {originalPrice && (
            <span className="text-lg text-gray-600 line-through ml-2">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-[#b3b3b3] text-sm mb-6 italic">{description}</p>

        {/* Person Count */}
        <div className="flex items-center gap-2 text-gray-400 mb-6 pb-6 border-b border-gray-800">
          <LuUsers size={18} />
          <span className="text-sm">{personCount}</span>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <LuCheck className="text-blue-500 shrink-0" size={18} />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* button */}
        <button
          onClick={onBuyClick}
          className={`
                w-full py-4 px-6 rounded-full font-semibold 
                transition-all duration-300 hover:scale-105
                hover:shadow-[inset_0_0_18px_rgba(255,255,255,0.95)]
                    ${
                    isPrimary
                        ? "bg-linear-to-r from-[#E0A91B] to-[#EFBD3E] text-white hover:from-yellow-600 hover:to-yellow-700"
                        : "bg-transparent border-2 border-gray-700 text-white hover:bg-gray-800"
                    }
                `}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
