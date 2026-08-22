"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getOpenCallApplication } from "@/app/actions/openCall";

// This is the "Google Form edit link" from the spec — visiting this
// URL loads the token into local storage (same place /apply reads
// it from) and forwards to the actual flow. Two entry points, one
// piece of state, so /apply doesn't need to know or care whether the
// applicant started fresh or arrived via a resume link.
const STORAGE_KEY = "afrospook_resume_token";

export default function ResumeApplicationPage() {
  const router = useRouter();
  const params = useParams<{ token: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = params.token;
      const res = await getOpenCallApplication(token);
      if (!res.success) {
        setError(res.error);
        return;
      }
      if (res.data.status !== "draft") {
        setError(
          `This application has already been ${res.data.status.replace("_", " ")}. It can no longer be edited.`
        );
        return;
      }
      window.localStorage.setItem(STORAGE_KEY, token);
      router.replace("/apply");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.token]);

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-[#F9F7F4] mb-3">Can't resume this application</h1>
        <p className="text-[#B3B3B3]">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCA33A]" />
    </div>
  );
}