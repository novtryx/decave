"use server";

import { publicFetch } from "@/lib/publicFetch";

export type CategoryField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect" | "file" | "url" | "number";
  required: boolean;
  options?: string[];
  placeholder?: string;
  helpText?: string;
  order: number;
};

export type OpenCallCategory = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  active: boolean;
  fields: CategoryField[];
  order: number;
};

export type ApplicationAnswer = { fieldName: string; value: any };

export type ApplicationFile = {
  fieldName: string;
  url: string;
  publicId: string;
  originalName: string;
  resourceType: "image" | "video" | "raw";
};

export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "shortlisted"
  | "accepted"
  | "rejected";

export type ApplicationState = {
  resumeToken: string;
  status: ApplicationStatus;
  submittedAt?: string | null;
  category: { slug: string; name: string; fields: CategoryField[] };
  applicant: {
    fullName: string;
    email: string;
    phoneNumber: string;
    country?: string;
    city?: string;
    bio?: string;
    socialHandles?: { instagram?: string; tiktok?: string; twitter?: string; website?: string };
  };
  answers: ApplicationAnswer[];
  files: ApplicationFile[];
};

type ApiResult<T> = { success: true; data: T } | { success: false; error: string };

async function safeFetch<T>(path: string, options?: Parameters<typeof publicFetch>[1]): Promise<ApiResult<T>> {
  try {
    const res = await publicFetch<{ success: boolean; data: T; message?: string }>(path, options);
    if (!res.success) {
      return { success: false, error: res.message || "Request failed" };
    }
    return { success: true, data: res.data };
  } catch (error: any) {
    return { success: false, error: error?.message || "Something went wrong. Please try again." };
  }
}

export async function getOpenCallCategories() {
  return safeFetch<OpenCallCategory[]>("/apply/categories", { cache: "no-store" });
}

export async function getOpenCallCategory(slug: string) {
  return safeFetch<OpenCallCategory>(`/apply/categories/${slug}`, { cache: "no-store" });
}

export async function startOpenCallApplication(input: {
  categorySlug: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}) {
  return safeFetch<ApplicationState>("/apply/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: input,
    cache: "no-store",
  });
}

export async function getOpenCallApplication(resumeToken: string) {
  return safeFetch<ApplicationState>(`/apply/resume/${resumeToken}`, { cache: "no-store" });
}

export async function saveOpenCallProgress(
  resumeToken: string,
  updates: {
    profile?: Partial<ApplicationState["applicant"]>;
    answers?: ApplicationAnswer[];
  }
) {
  return safeFetch<{ status: ApplicationStatus; answers: ApplicationAnswer[]; applicant: any }>(
    `/apply/${resumeToken}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: updates,
      cache: "no-store",
    }
  );
}

export async function submitOpenCallApplication(resumeToken: string) {
  return safeFetch<{ status: ApplicationStatus; submittedAt: string }>(`/apply/${resumeToken}/submit`, {
    method: "POST",
    cache: "no-store",
  });
}

export async function uploadOpenCallFile(resumeToken: string, fieldName: string, file: File) {
  const formData = new FormData();
  formData.append("fieldName", fieldName);
  formData.append("file", file);
  return safeFetch<{ files: ApplicationFile[] }>(`/apply/${resumeToken}/upload`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });
}