// actions/payment.ts
import { publicFetch } from "@/lib/publicFetch";

// -------------------------
// Types
// -------------------------

export type Buyer = {
  fullName: string;
  email: string;
  phoneNumber: string;
  // Remove ticketId from here since backend generates it
};

export type PurchaseRequest = {
  eventId: string;
  ticketId: string; // This is the main ticket type ID
  amount: number;
  buyers: Buyer[]; // Buyers don't have ticketId in request
};


export type PurchaseResponse = {
  authorization_url: string;
  txnId: string;
};

// -------------------------
// Payment function
// -------------------------

/**
 * Initiates a ticket purchase by calling the backend payment API
 */
// export async function purchaseTicket(purchaseData: PurchaseRequest): Promise<PurchaseResponse> {
//   try {
//     // publicFetch expects a URL string, so we pass the endpoint and handle POST manually
//     const response = await publicFetch(`/payment/purchase`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(purchaseData),
//     });

//     return response as PurchaseResponse;
//   } catch (error: any) {
//     console.error("Payment API error:", error);
//     throw new Error(error?.message || "Failed to initiate payment. Please try again.");
//   }
// }

// actions/payment.ts
// actions/payment.ts - CORRECTED VERSION
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
  try {
    console.log(`Verifying payment with reference: ${reference}`);
    
    const response = await publicFetch(`/payment/verify/${reference}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Verification response:", response);
    return response;
    
  } catch (error: any) {
    console.error("Verification error:", error);
    throw new Error(error?.message || "Failed to verify payment");
  }
}