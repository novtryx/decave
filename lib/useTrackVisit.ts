"use client";

import { useEffect, useRef, useState } from "react";
import { trackVisit } from "@/app/actions/tracking";

/**
 * Fires one traffic-source tracking beat per event-page visit and
 * returns the sessionRef so it can be carried through to checkout —
 * that's what lets a later purchase be joined back to the visit that
 * led to it (see analytics.service.ts:getEventTrafficSources).
 *
 * A fresh sessionRef is generated per mount (i.e. per visit), not
 * persisted across visits — we're tracking "how did they land here
 * this time", not building a cross-session user identity.
 */
export function useTrackVisit(eventId: string | undefined) {
  const [sessionRef] = useState(() =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `visit-${Date.now()}-${Math.random().toString(36).slice(2)}`
  );
  const fired = useRef(false);

  useEffect(() => {
    if (!eventId || fired.current) return;
    fired.current = true;

    const params = new URLSearchParams(window.location.search);
    trackVisit({
      eventId,
      sessionRef,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    });
  }, [eventId, sessionRef]);

  return sessionRef;
}