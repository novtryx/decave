// actions/payment.ts
"use server"

import { publicFetch } from "@/lib/publicFetch";

export type Buyer = {
  fullName: string;
  email: string;
  phoneNumber: string;
};

export type PurchaseRequest = {
  eventId: string;
  ticketId: string;
  amount: number;
  buyers: Buyer[]; 
  referralCode?: string;
};


export type PurchaseResponse = {
  authorization_url: string;
  txnId: string;
};


export async function purchaseTicket(purchaseData: PurchaseRequest): Promise<PurchaseResponse> {
  try {
    console.log("🚀 Sending payment request via publicFetch...");
    
    // DO NOT stringify the body here - fetcher will do it!
    const response = await publicFetch(`/payment/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: purchaseData, // <-- Send the object, NOT stringified!
    });

    console.log("✅ Payment success:", response);
    return response as PurchaseResponse;
    
  } catch (error: any) {
    console.error("❌ Payment API error:", error);
    throw new Error(error?.message || "Failed to initiate payment. Please try again.");
  }
}


// Add this to your actions/payment.ts
export async function verifyPayment(reference: string): Promise<any> {
  const MAX_RETRIES = 8;
  const RETRY_DELAY = 2000;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt}: fetching transaction for reference ${reference}`);

      const response: any = await publicFetch(`/payment/transaction/${reference}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Webhook still processing — wait and retry
      if (response?.status === "pending") {
        console.log(`Attempt ${attempt}: still pending, retrying in ${RETRY_DELAY}ms...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        continue;
      }

      console.log("Transaction fetched:", response);
      return response;

    } catch (error: any) {
      // If it's a 202 or "still processing" error, retry
      if (error?.statusCode === 202 || error?.message?.includes("processing")) {
        console.log(`Attempt ${attempt}: processing, retrying...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        continue;
      }

      // Any other error — throw immediately
      console.error("Transaction fetch error:", error);
      throw new Error(error?.message || "Failed to fetch transaction");
    }
  }

  throw new Error(
    "Your payment was received but is taking a moment to confirm. Please check your email for your ticket or contact support."
  );
}