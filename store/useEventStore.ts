import { create } from 'zustand';
import { getEvents, getPublishedEvents, type Event } from '@/app/actions/events';

interface EventStore {
  events: Event[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchEvents: () => Promise<void>;
  fetchPublishedEvents: () => Promise<void>;
  getEventBySlug: (slug: string) => Event | null;
  setCurrentEvent: (event: Event | null) => void;
  clearError: () => void;
}

// Helper function to generate slug from event title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  currentEvent: null,
  loading: false,
  error: null,

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getEvents();
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch events',
        loading: false 
      });
    }
  },

  fetchPublishedEvents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getPublishedEvents();
      set({ events: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch events',
        loading: false 
      });
    }
  },

  getEventBySlug: (slug: string) => {
    const { events } = get();
    return events.find(event => 
      generateSlug(event.eventDetails.eventTitle) === slug
    ) || null;
  },

  setCurrentEvent: (event) => {
    set({ currentEvent: event });
  },

  clearError: () => {
    set({ error: null });
  },
}));