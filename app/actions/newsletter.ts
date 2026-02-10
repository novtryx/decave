
"use server"

import { publicFetch } from "@/lib/publicFetch";

export type NewsletterSubscribeResponse = {
//   success: boolean;
  message: string;
};

export async function subscribeToNewsletter(email: string): Promise<NewsletterSubscribeResponse> {
  return publicFetch<NewsletterSubscribeResponse>("/newsletter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { email }, 
    cache: "no-store",
  });
}