
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


// actions/newsletter.ts

export interface UnsubscribePayload {
  email: string;
}

export interface UnsubscribeResponse {
  success: boolean;
  message: string;
}

export async function unsubscribeFromNewsletter(
  params: UnsubscribePayload
): Promise<UnsubscribeResponse | { error: string }> {
  try {
    const res = await publicFetch<UnsubscribeResponse>("/newsletter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { email: params.email },
      cache: "no-store",
    });

    return { success: true, message: res.message };
  } catch (err: any) {
    // publicFetch throws: "Request failed: 404 - {"message":"...","success":false}"
    // Extract the JSON part after the first " - "
    try {
      const jsonStr = err.message?.split(" - ").slice(1).join(" - ");
      const parsed = JSON.parse(jsonStr);
      return { error: parsed.message ?? "Failed to unsubscribe." };
    } catch {
      return { error: err.message ?? "Failed to unsubscribe." };
    }
  }
}