"use server";

import { publicFetch } from "@/lib/publicFetch";

export type TrackVisitInput = {
  eventId: string;
  sessionRef: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
};

/**
 * Reports one event-page visit for traffic-source tracking
 * (Instagram / WhatsApp / etc). Fire-and-forget by design — a
 * visitor should never see an error, delay, or broken page because
 * this call failed, so failures are swallowed here rather than
 * thrown back to the caller.
 */
export async function trackVisit(input: TrackVisitInput): Promise<void> {
  try {
    await publicFetch(`/analytics/track-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: input,
      // This is a write with a side-effect, not cacheable data — never
      // let Next's fetch cache dedupe/reuse it across visits.
      cache: "no-store",
    });
  } catch (error) {
    console.error("Visit tracking failed (non-fatal):", error);
  }
}