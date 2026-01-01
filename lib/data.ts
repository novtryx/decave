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


// lib/data.ts

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