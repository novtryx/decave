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


export type AboutEventContent = {
  subTitle: string;
  sectionContent: string;
  supportingImage: string;
};

export type AboutEvent = {
  heading: string;
  description: string;
  content: AboutEventContent[];
};

export type faqDataType = {
  _id: string;
    question: string;
    answer: string;
}

export type code = {
  _id: string;
  title: string;
  body: string
}

export type Event = {
  _id: string;
  id: string;
  stage: number;
  published: boolean;
  eventDetails: EventDetails;
  tickets: Ticket[];
  artistLineUp: Artist[];
  faq: faqDataType[];
  code:code[];
  emergencyContact?: EmergencyContact;
  aboutEvent?: AboutEvent;
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
 * Fetch a single event by its ID (for dynamic routing)
 * Uses the 'id' field from the event object
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
 * Fetch a single event by its title (for dynamic routing)
 * Uses /events/eventTitle/:eventTitle
 */
export async function getEventByTitle(eventTitle: string): Promise<Event> {
  const encodedTitle = encodeURIComponent(eventTitle);

  const response = await publicFetch<{ success: boolean; data: Event }>(
    `/events/eventTitle/${encodedTitle}`
  );

  return response.data;
}
