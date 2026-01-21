import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

export interface ListItem {
  id: number;
  text: string;
}

interface RecommendedListProps {
  recommendedItems?: ListItem[];
  notAllowedItems?: ListItem[];
  recommendedTitle?: string;
  notAllowedTitle?: string;
  recommendedColor?: string;
  notAllowedColor?: string;
  recommendedIconColor?: string;
  notAllowedIconColor?: string;
  textColor?: string;
  align?: 'left' | 'center' | 'right';
}

const RecommendedList = ({
  recommendedItems,
  notAllowedItems,
  recommendedTitle = "RECOMMENDED",
  notAllowedTitle = "NOT ALLOWED",
  recommendedColor = "#0854a7",
  notAllowedColor = "#ef4444",
  recommendedIconColor = "#0854a7",
  notAllowedIconColor = "#ef4444",
  textColor = "#9ca3af",
  align = "center"
}: RecommendedListProps) => {
  
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <div className={`flex flex-col lg:flex-row ${alignmentClasses[align]} gap-12`}>
      {/* RECOMMENDED COLUMN */}
      {recommendedItems && recommendedItems.length > 0 && (
        <div>
          <h3 
            className="text-sm font-semibold tracking-wide mb-6" 
            style={{ color: recommendedColor }}
          >
            {recommendedTitle}
          </h3>
          <ul className="space-y-4">
            {recommendedItems.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <FaCheck 
                  size={18} 
                  className="shrink-0 mt-0.5" 
                  style={{ color: recommendedIconColor }} 
                />
                <span style={{ color: textColor }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* NOT ALLOWED COLUMN */}
      {notAllowedItems && notAllowedItems.length > 0 && (
        <div>
          <h3 
            className="text-sm font-semibold tracking-wide mb-6" 
            style={{ color: notAllowedColor }}
          >
            {notAllowedTitle}
          </h3>
          <ul className="space-y-4">
            {notAllowedItems.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <IoClose 
                  size={20} 
                  className="shrink-0 mt-0.5" 
                  style={{ color: notAllowedIconColor }} 
                />
                <span style={{ color: textColor }}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecommendedList;
