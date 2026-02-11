"use server"
import { publicFetch } from "@/lib/publicFetch";
import Gallery from './../gallery/page';


export interface GalleryData {
    _id: string;
    type: "video" | "image";
    event: {
        _id: string;
        eventDetails: {
            eventTitle: string;
            eventTheme: string;
        };
    };
    thumbnail:  string;
    link: string;
    featured: boolean;
    createdAt: string;
}

export interface GalleryEventType{
  
    _id: string;
    eventDetails:{
      eventTitle: string;
    }
  
}
export async function getFeaturedGallery(): Promise<GalleryData[]> {

  const response = await publicFetch<{ success: boolean; gallery: GalleryData[] }>(
    `/gallery/featured`
  );

  return response.gallery;
}

export async function getGalleryEvent(): Promise<GalleryEventType[]> {

  const response = await publicFetch<{ success: boolean; events: GalleryEventType[] }>(
    `/gallery/events`
  );

  return response.events;
}

export async function getGalleryByEvent(id: string): Promise<GalleryData[]> {

  const response = await publicFetch<{ success: boolean; events: GalleryData[] }>(
    `/gallery/event/${id}`
  );

  return response.events;
}

export async function getGalleryVideo(): Promise<GalleryData[]> {

  const response = await publicFetch<{ success: boolean; gallery: GalleryData[] }>(
    `/gallery/type/video`
  );

  return response.gallery;
}