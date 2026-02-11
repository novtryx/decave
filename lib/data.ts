import { ListItem } from "@/components/events/event/RecommendList";
import { FaRegHeart, FaRegQuestionCircle } from "react-icons/fa";
import { FaArrowTrendUp, FaAward } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";
import { LuGift, LuHeart, LuSparkles, LuSun, LuTarget, LuZap } from "react-icons/lu";
import { MdOutlineMessage, MdOutlineShield } from "react-icons/md";
import { TiGlobe } from "react-icons/ti";

export const upcomingEventsData = [
    {
        id: 1,
        category: "UPCOMING",
        peopleCount: "1.8K",
        image: "/events/afro-pulse-img.png",
        title: "Afro Pulse Sessions",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 2,
        category: "UPCOMING",
        peopleCount: "1.8K",
        image: "/events/midnight-groove.png",
        title: "Midnight Groove",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 3,
        category: "UPCOMING",
        peopleCount: "1.8K",
        image: "/events/culture-connect-img.png",
        title: "Culture Connect",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 4,
        category: "UPCOMING",
        peopleCount: "1.8K",
        image: "/events/afro-pulse-img.png",
        title: "Afro Pulse Sessions",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 5,
        category: "SOLD OUT",
        peopleCount: "1.8K",
        image: "/events/midnight-groove.png",
        title: "Midnight Groove",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 6,
        category: "SOLD OUT",
        peopleCount: "1.8K",
        image: "/events/culture-connect-img.png",
        title: "Culture Connect",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
]

export const pastEventsData = [
    {
        id: 1,
        category: "PAST EVENT",
        peopleCount: "1.8K",
        image: "/events/afro-pulse-img.png",
        title: "Afro Pulse Sessions",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 2,
        category: "PAST EVENT",
        peopleCount: "1.8K",
        image: "/events/midnight-groove.png",
        title: "Midnight Groove",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    {
        id: 3,
        category: "PAST EVENT",
        peopleCount: "1.8K",
        image: "/events/culture-connect-img.png",
        title: "Culture Connect",
        date: "Mar 22, 2025",
        location: "Victoria Island",
        buttonText: "View Event"
    },
    
]

export interface TicketData {
  id: number;
  price: string;
  originalPrice?: string;
  title: string;
  description: string;
  personCount: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
  isPrimary?: boolean;
}

export const afroTicketData: TicketData[] = [
  {
    id: 1,
    price: "₦5,000",
    originalPrice: "₦7,000",
    title: "Early Bird/Standard",
    description: "Discounted general admission for one.",
    personCount: "1 Person",
    features: ["Event Entry", "Digital Programs", "Access to Main Venues"],
    buttonText: "Buy Early Bird",
    isPopular: false,
    isPrimary: false
  },
  {
    id: 2,
    price: "₦12,000",
    title: "Couple",
    description: "Ticket bundle for two people.",
    personCount: "2 Persons",
    features: ["2 Tickets", "Event Entry", "Digital Programs", "Access to Main Venues"],
    buttonText: "Buy Couple",
    isPopular: true,
    isPrimary: true
  },
  {
    id: 3,
    price: "₦20,000",
    title: "Group of 4",
    description: "Discounted group package for four friends.",
    personCount: "4 Persons",
    features: ["Event Entry", "Digital Programs", "Access to Main Venues"],
    buttonText: "Buy Group of 4",
    isPopular: false,
    isPrimary: false
  },
  {
    id: 4,
    price: "₦120,000",
    originalPrice: "₦150,000",
    title: "VIP Group of 4",
    description: "Exclusive VIP table experience for four.",
    personCount: "4 Persons",
    features: ["4 VIP Tickets", "Reserved Table for 4", "One premium whiskey bottle", "Priority Entry"],
    buttonText: "Buy VIP Group of 4",
    isPopular: false,
    isPrimary: false
  }
];

export const slides = [
  {
    id: 1,
    image: "/event/main-stage-img.png",
    tag: "The Heartbeat",
    title: "Main Stage",
    description:
      "Our flagship stage hosts headliners and major acts across Afrobeats, Amapiano, Hip-Hop, and more. State-of-the-art sound, immersive lighting, and room for 5,000+ to move as one.",
  },
  {
    id: 2,
    image: "/event/high-energy-img.png",
    tag: "High Energy",
    title: "Dance Arena",
    description:
      "A nonstop dance experience featuring top DJs and electrifying performances all night long.",
  }
];

export const features = [
  {
    _id: "1",
    title: "Express Yourself",
    body:
      "Bold prints, vibrant colors, traditional fabrics reimagined. Wear what makes you feel powerful.",
  },
  {
    _id: "2",
    title: "Comfort First",
    body:
      "You will be dancing for hours. Choose breathable fabrics, comfortable shoes and layers for the night.",
  },
  {
    _id: "3",
    title: "Cultural Pride",
    body:
      "Represent your roots. Ankara, dashiki, kente, beads – celebrate African heritage through your style.",
  },
  {
    _id: "4",
    title: "Day to Night",
    body:
      "This takes place overnight. Bring layers, stay hydrated, and be ready for temperature shifts.",
  },
];

export const safetyData = [
  {
    id: 1,
    title: "Professional Security",
    description: "Licensed security personnel stationed throughout the venue, trained in crowd management and emergency response",
    icon: MdOutlineShield
  },
  {
    id: 2,
    title: "Crowd Control",
    description: "Clear entry/exit routes, capacity monitoring, and designated safe zones to prevent overcrowding",
    icon: HiUsers
  },
  {
    id: 3,
    title: "Medical Support",
    description: "On site medical team with paramedics, first aid stations, and direct line to local hospitals.",
    icon: FaRegHeart
  },
  {
    id: 4,
    title: "Emergency Preparedness",
    description: "Comprehensive emergency plans, evacuation procedures, and coordination with local authorities.",
    icon: FaRegQuestionCircle
  }
]

export const recommendedItems: ListItem[] = [
  { id: 1, text: "Comfortable, closed-toe shoes for dancing" },
  { id: 2, text: "Light jacket or wrap for nighttime" },
  { id: 3, text: "Reusable water bottle (refill stations available)" },
  { id: 4, text: "Small crossbody bag or backpack" },
  { id: 5, text: "Sunglasses and sunscreen for daytime" }
];

export const notAllowedItems: ListItem[] = [
  { id: 1, text: "Outside food or drinks" },
  { id: 2, text: "Weapons of any kind" },
  { id: 3, text: "Professional cameras without media pass" },
  { id: 4, text: "Large bags or suitcases" },
  { id: 5, text: "Glass containers" }
];

export const encouragedItems: ListItem[] = [
  {id: 1, text: "Respect for all attendeees regardless of background"},
  {id: 2, text: "Consent before physical contact or photos"},
  {id: 3, text: "Awareness of personal space and boundaries"},
  {id: 4, text: "Looking out for each other's wellbeing"}
]
export const notToleratedItems: ListItem[] = [
  {id: 1, text: "Harrasssment, discrimination, or hate speech"},
  {id: 2, text: "Violence or threatening behaviour"},
  {id: 3, text: "Theft or property damage"},
  {id: 4, text: "Illegal substances or activities"}
]


export const entryRequirements: ListItem[] = [
  {id: 1, text: "Valid Ticket (Digital or Printed)"},
  {id: 2, text: "Government-issued IC (18+ event)"},
  {id: 3, text: "Bag inspection at entry points"},
  {id: 4, text: "Metal detector screening"},
  {id: 5, text: "Wristband activation"},
]

export const contactData = [
  {
    id: 1,
    title: "FESTIVAL SECURITY",
    content: "+234 800 4353 24",
    subtext: "Text \"HELP\" + your location"
  },
  {
    id: 2,
    title: "MEDICAL EMERGENCY",
    content: "+234 800 4353 24",
    subtext: "On-site medical team"
  },
  {
    id: 3,
    title: "LOST AND FOUND",
    content: "Main Plaza Tent",
    subtext: "Open during festival hours"
  }
]



export const galleryVideoData = [
  {
    id: 1,
    thumbnail: "/gallery/video-thumbnail-2.png",
    videoUrl: "#",
    // runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },
  {
    id: 2,
    thumbnail: "/gallery/video-thumbnail-1.png",
    videoUrl: "#",
    runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },
  {
    id: 3,
    thumbnail: "/gallery/video-thumbnail-1.png",
    videoUrl: "#",
    runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },
  {
    id: 4,
    thumbnail: "/gallery/video-thumbnail-5.png",
    videoUrl: "#",
    // runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },
  {
    id: 5,
    thumbnail: "/gallery/video-thumbnail-1.png",
    videoUrl: "#",
    runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },
  {
    id: 6,
    thumbnail: "/gallery/video-thumbnail-1.png",
    videoUrl: "#",
    runtime: "4:15",
    title: "Fire Zone Highlights",
    year: "2026",
    views: "876K",
    onPlayClick: () => console.log("Video clicked"),
    imageAlt: "video thumbnail"
  },

]

export const audienceInsightData = [
  {
    id: 1,
    icon: HiUsers,
    value: "10,000+",
    caption: "Projected Attendees",
  },
  {
    id: 2,
    icon: LuTarget,
    value: "18 - 35",
    caption: "Core Demographic",
  },
  {
    id: 3,
    icon: IoStatsChart,
    value: "5M+",
    caption: "Social Media Reach"
  },
  {
    id: 4,
    icon: FaArrowTrendUp,
    value: "300%",
    caption: "Year-over-Year Growth"
  },
  {
    id: 5,
    icon: TiGlobe,
    value: "15+",
    caption: "Countries Represented"
  },
  {
    id: 6,
    icon: FaAward,
    value: "85%",
    caption: "Brand Recall"
  }
]

export const partnerAccordionData = [
  {
    id: 1,
    accordionTitle: "Authentic Cultural Relevance",
    description: "deCave is deeply rooted in music, lifestyle, and youth culture. Brands that partner with us don't interrupt culture — they become part of it, earning organic visibility and genuine audience trust."
  },
  {
    id: 2,
    accordionTitle: "Multi-Channel Visibility & Brand Amplification",
    description: "Our platform ensures your brand is seen across multiple touchpoints — from social media and live events to digital campaigns — amplifying your message and creating meaningful engagement with a culturally tuned audience."
  },
  {
    id: 3,
    accordionTitle: "Immersive Experiential Activation Opportunities",
    description: "Bring your brand to life through experiences that resonate. From live activations to interactive campaigns, we create moments that audiences don't just see — they feel and remember."
  },
  {
    id: 4,
    accordionTitle: "Strong Influencer & Content-Driven Ecosystem",
    description: "Connect with influential voices and content creators who live and breathe culture. Our network drives authentic storytelling, ensuring your brand's presence is organic, relatable, and shareable."
  },
  {
    id: 5,
    accordionTitle: "Long-Term Partnership Potential",
    description: "We focus on sustainable collaborations that evolve over time. Partnering with us builds a foundation for ongoing cultural impact, consistent visibility, and mutually beneficial growth."
  }
]

export const sponsorshipData = [
  {
    id: 1,
    price: "₦1 - 2 MILLION",
    title: "BRONZE",
    description: "Entry-level partnerships for emerging brands",
    features: ["Social inclusion", "Sponsor listing", "Light visibility options"],
    buttonText: "Get Bronze Package",
    isPopular: false
  },
  {
    id: 2,
    price: "₦5 MILLION",
    title: "SILVER",
    description: "Enhanced visibility for growing brands",
    features: ["Banner/logo placement", "Social media mentions", "Access to media content"],
    buttonText: "Get Silver Package",
    isPopular: false
  },
  {
    id: 3,
    price: "₦10 MILLION",
    title: "GOLD",
    description: "Premium partnership with stage presence",
    features: ["Logo placement on select materials", "Activation space", "Digital promotion", "Press mentions"],
    buttonText: "Get Gold Package",
    isPopular: true
  },
  {
    id: 4,
    price: "₦25 MILLION",
    title: "PLATINUM",
    description: "Entry-level partnerships for emerging brands",
    features: ["Category exclusivity", "Major logo placement across all materials", "Main stage branding", "Premium activation booth", "Branded content & press visibility", "VIP table package"],
    buttonText: "Get Platinum Package",
    isPopular: false
  }
]

export const contactCardData = [
  {
    id: 1,
    icon: MdOutlineMessage,
    title: "Media Inquiries",
    description: "Press credentials, interviews, and media partnership",
    email: "media@decave.com"
  },
  {
    id: 2,
    icon: LuGift,
    title: "Sponsorships & Partnerships",
    description: "Brand partnerships, sponsorship opportunities, and collaborations",
    email: "partnerships@decave.com"
  },
  {
    id: 3,
    icon: FaRegQuestionCircle,
    title: "Ticket Support",
    description: "Ticket issues, refunds, accessibility needs, and general questions",
    email: "support@decave.com"
  }
]