// import { publicFetch } from "@/lib/publicFetch";

// // Type definitions based on your API response
// export type BrandColor = {
//   primaryColor: string;
//   secondaryColor: string;
// };

// export type EventDetails = {
//   eventType: string;
//   eventTitle: string;
//   eventTheme: string;
//   supportingText: string;
//   eventBanner: string;
//   startDate: string;
//   endDate: string;
//   venue: string;
//   address: string;
//   brandColor: BrandColor;
//   eventVisibility: boolean;
// };

// export type Ticket = {
//   _id: string;
//   ticketName: string;
//   price: number;
//   currency: string;
//   initialQuantity: number;
//   availableQuantity: number;
//   benefits: string[];
// };

// export type ArtistSocials = {
//   instagram?: string;
//   twitter?: string;
//   website?: string;
// };

// export type Artist = {
//   _id: string;
//   artistImage: string;
//   artistName: string;
//   artistGenre: string;
//   headliner: boolean;
//   socials: ArtistSocials;
// };

// export type EmergencyContact = {
//   security: string;
//   medical: string;
//   lostButFound: string;
//   supportingInfo: string;
// };

// export type Event = {
//   _id: string;
//   id: string;
//   stage: number;
//   published: boolean;
//   eventDetails: EventDetails;
//   tickets: Ticket[];
//   artistLineUp: Artist[];
//   emergencyContact?: EmergencyContact;
//   isEventActive: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// };

// export type Pagination = {
//   total: number;
//   page: number;
//   limit: number;
//   pages: number;
//   hasNext: boolean;
//   hasPrev: boolean;
// };

// export type EventsResponse = {
//   success: boolean;
//   data: Event[];
//   pagination: Pagination;
// };

// // Helper function to generate slug from event title
// export const generateSlug = (title: string): string => {
//   return title
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
// };

// // Fetch all events
// export async function getEvents(params?: {
//   page?: number;
//   limit?: number;
// }): Promise<EventsResponse> {
//   const queryParams = new URLSearchParams();
  
//   if (params?.page) {
//     queryParams.append("page", params.page.toString());
//   }
  
//   if (params?.limit) {
//     queryParams.append("limit", params.limit.toString());
//   }

//   const queryString = queryParams.toString();
//   const url = `/events${queryString ? `?${queryString}` : ""}`;

//   return publicFetch<EventsResponse>(url);
// }

// // Fetch a single event by ID
// export async function getEventById(eventId: string): Promise<Event> {
//   const response = await publicFetch<{ success: boolean; data: Event }>(
//     `/events/${eventId}`
//   );
//   return response.data;
// }

// // Fetch event by slug (event title converted to URL-friendly format)
// export async function getEventBySlug(slug: string): Promise<Event | null> {
//   try {
//     const response = await getPublishedEvents();
//     const event = response.data.find(
//       (event) => generateSlug(event.eventDetails.eventTitle) === slug
//     );
//     return event || null;
//   } catch (error) {
//     console.error("Error fetching event by slug:", error);
//     return null;
//   }
// }

// // Fetch only published events
// export async function getPublishedEvents(params?: {
//   page?: number;
//   limit?: number;
// }): Promise<EventsResponse> {
//   const events = await getEvents(params);
  
//   return {
//     ...events,
//     data: events.data.filter((event) => event.published),
//     pagination: {
//       ...events.pagination,
//       total: events.data.filter((event) => event.published).length,
//     },
//   };
// }

// // Fetch only active events
// export async function getActiveEvents(params?: {
//   page?: number;
//   limit?: number;
// }): Promise<EventsResponse> {
//   const events = await getEvents(params);
  
//   return {
//     ...events,
//     data: events.data.filter((event) => event.isEventActive),
//     pagination: {
//       ...events.pagination,
//       total: events.data.filter((event) => event.isEventActive).length,
//     },
//   };
// }


import { publicFetch } from "@/lib/publicFetch";

// -------------------------
// Type definitions
// -------------------------

export type BrandColor = {
  primaryColor: string;
  secondaryColor: string;
};

export type EventDetails = {
  eventType: string;
  eventTitle: string;
  eventTheme: string;
  supportingText: string;
  eventBanner: string;
  startDate: string;
  endDate: string;
  venue: string;
  address: string;
  brandColor: BrandColor;
  eventVisibility: boolean;
};

export type Ticket = {
  _id: string;
  ticketName: string;
  price: number;
  currency: string;
  initialQuantity: number;
  availableQuantity: number;
  benefits: string[];
};

export type ArtistSocials = {
  instagram?: string;
  twitter?: string;
  website?: string;
};

export type Artist = {
  _id: string;
  artistImage: string;
  artistName: string;
  artistGenre: string;
  headliner: boolean;
  socials: ArtistSocials;
};

export type EmergencyContact = {
  security: string;
  medical: string;
  lostButFound: string;
  supportingInfo: string;
};

export type Event = {
  _id: string;
  id: string;
  stage: number;
  published: boolean;
  eventDetails: EventDetails;
  tickets: Ticket[];
  artistLineUp: Artist[];
  emergencyContact?: EmergencyContact;
  isEventActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Pagination = {
  total: number;
  page: number;
  limit: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type EventsResponse = {
  success: boolean;
  data: Event[];
  pagination: Pagination;
};

// -------------------------
// Helper functions
// -------------------------

/**
 * Generate a URL-friendly slug from event title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")  // Replace spaces and special chars with hyphens
    .replace(/^-+|-+$/g, "");     // Remove leading/trailing hyphens
};

// -------------------------
// Fetch functions
// -------------------------

/**
 * Fetch all events (paginated)
 */
export async function getEvents(params?: { page?: number; limit?: number }): Promise<EventsResponse> {
  const queryParams = new URLSearchParams();
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.limit) queryParams.append("limit", params.limit.toString());

  const url = `/events${queryParams.toString() ? `?${queryParams}` : ""}`;
  return publicFetch<EventsResponse>(url);
}

/**
 * Fetch a single event by its database ID
 */
export async function getEventById(eventId: string): Promise<Event> {
  const response = await publicFetch<{ success: boolean; data: Event }>(`/events/${eventId}`);
  return response.data;
}

/**
 * Fetch only published events
 */
export async function getPublishedEvents(params?: { page?: number; limit?: number }): Promise<EventsResponse> {
  const allEvents = await getEvents(params);
  const publishedEvents = allEvents.data.filter((event) => event.published);

  return {
    ...allEvents,
    data: publishedEvents,
    pagination: {
      ...allEvents.pagination,
      total: publishedEvents.length,
    },
  };
}

/**
 * Fetch only active events
 */
export async function getActiveEvents(params?: { page?: number; limit?: number }): Promise<EventsResponse> {
  const allEvents = await getEvents(params);
  const activeEvents = allEvents.data.filter((event) => event.isEventActive);

  return {
    ...allEvents,
    data: activeEvents,
    pagination: {
      ...allEvents.pagination,
      total: activeEvents.length,
    },
  };
}

/**
 * Fetch an event by its slug (generated from title)
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  try {
    const response = await getPublishedEvents(); // Only consider published events
    const event = response.data.find(
      (event) => generateSlug(event.eventDetails.eventTitle) === slug
    );
    return event || null;
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
}
