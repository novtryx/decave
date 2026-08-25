"use server";

import { publicFetch } from "@/lib/publicFetch";

export type ContactInquiryInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  inquiryType: string;
  message: string;
};

type ContactResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitContactInquiry(input: ContactInquiryInput): Promise<ContactResult> {
  try {
    const res = await publicFetch<{ success: boolean; message: string }>("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: input,
      cache: "no-store",
    });

    if (!res.success) {
      return { success: false, error: res.message || "Something went wrong. Please try again." };
    }
    return { success: true, message: res.message };
  } catch (error: any) {
    // fetcher() throws a raw "Request failed: 400 - {...}" string on
    // any non-2xx response rather than a parsed body — extract the
    // real backend message out of that blob so validation errors and
    // the rate-limit message actually reach the person, instead of
    // showing them a stray JSON string.
    const raw = error?.message || "";
    const jsonStart = raw.indexOf("{");
    if (jsonStart !== -1) {
      try {
        const parsed = JSON.parse(raw.slice(jsonStart));
        if (parsed?.message) {
          return { success: false, error: parsed.message };
        }
      } catch {
        // fall through to the generic message below
      }
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}