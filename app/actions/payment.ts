// actions/payment.ts
"use server"

import { publicFetch } from "@/lib/publicFetch";

export type Buyer = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type CocktailSelection = {
  cocktailId: string;
  quantity: number;
};

export type PurchaseRequest = {
  eventId: string;
  ticketId: string;
  amount: number;
  buyers: Buyer[]; 
  referralCode?: string;
  cocktails?: CocktailSelection[];
  // Ties this purchase back to the page-visit that led to it, for
  // the traffic-source conversion breakdown (see actions/tracking.ts).
  // Optional — a missing value just means no source data for this sale.
  sessionRef?: string;
};


export type PurchaseResponse = {
  authorization_url: string;
  txnId: string;
};

// Server Actions on Vercel/Next.js redact the message of any error you
// `throw` from an action once you're running a production build — the
// client only ever sees a generic "An error occurred in the Server
// Components render..." message with a digest, no matter how clear the
// message was on the server. That's the "generic Vercel error" users were
// seeing. So these actions never throw on an expected failure; they
// return a plain, serializable result and the caller branches on
// `success`. (An actual thrown error still means something we didn't
// anticipate — a real bug — and it's fine for that to surface generically
// so we notice it in server logs via the digest.)
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export async function purchaseTicket(
  purchaseData: PurchaseRequest
): Promise<ActionResult<PurchaseResponse>> {
  try {
    const response = await publicFetch(`/payment/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: purchaseData,
      // publicFetch defaults to caching (next.revalidate: 60), which is
      // meant for read-only public data like event listings. This is a
      // mutating payment call — it must never be served from cache, and
      // must never itself be cached for a later GET to reuse.
      next: { revalidate: 0 },
    });

    return { success: true, data: response as PurchaseResponse };
  } catch (error: any) {
    console.error("❌ Payment API error:", error);
    return {
      success: false,
      // fetcher.ts throws `Request failed: <status> - <backend message>`
      // for non-2xx responses — pull just the backend's message back out
      // so the buyer sees "Payment could not be initialized: ..." instead
      // of the whole "Request failed: 500 - {...}" wrapper.
      message: extractBackendMessage(error?.message) || "Failed to initiate payment. Please try again.",
    };
  }
}

export type VerifyResult = {
  success: boolean;
  status?: "completed" | "failed";
  message?: string;
  [key: string]: any;
};

export async function verifyPayment(reference: string): Promise<ActionResult<VerifyResult>> {
  // /payment/verify/:reference checks directly with Paystack (rather than
  // just reading our own DB, which only ever gets updated by the
  // charge.success webhook). That means a declined card is detected
  // immediately, with Paystack's own reason, instead of us polling a
  // "pending" row for 16s and then guessing. A couple of quick retries
  // are kept only as a safety net for a dropped request, not to wait out
  // the webhook.
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1500;

  let lastMessage = "Failed to verify payment.";

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response: any = await publicFetch(`/payment/verify/${reference}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Same reasoning as above — a cached "pending"/"failed" result
        // here would make every retry (and every later visit to this
        // page) just replay the stale answer instead of re-checking.
        next: { revalidate: 0 },
      });

      return { success: true, data: response as VerifyResult };
    } catch (error: any) {
      lastMessage = extractBackendMessage(error?.message) || lastMessage;
      console.error(`Verify attempt ${attempt} failed:`, error?.message);
      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }

  return { success: false, message: lastMessage };
}

// fetcher.ts throws Error(`Request failed: ${status} - ${backendBodyText}`).
// The backend body is usually `{"message":"..."}` — pull that out so the
// UI shows the actual reason instead of the raw wrapper.
function extractBackendMessage(rawErrorMessage?: string): string | null {
  if (!rawErrorMessage) return null;
  const jsonPart = rawErrorMessage.split(" - ").slice(1).join(" - ");
  try {
    const parsed = JSON.parse(jsonPart);
    return parsed?.message || null;
  } catch {
    return jsonPart || rawErrorMessage;
  }
}