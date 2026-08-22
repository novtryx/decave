"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getOpenCallCategories,
  getOpenCallCategory,
  startOpenCallApplication,
  saveOpenCallProgress,
  submitOpenCallApplication,
  OpenCallCategory,
  ApplicationState,
  ApplicationFile,
} from "@/app/actions/openCall";
import ApplyProgress from "@/components/apply/ApplyProgress";
import CategoryGrid from "@/components/apply/CategoryGrid";
import DynamicField from "@/components/apply/DynamicField";
import FileUploadField from "@/components/apply/FileUploadField";

// resumeToken is stored client-side only — it IS the applicant's
// credential (spec: private link, like a Google Form edit link), so
// this is intentionally the only place "identity" lives. No accounts,
// no cookies, no server session.
const STORAGE_KEY = "afrospook_resume_token";

type Step = 0 | 1 | 2 | 3 | 4;

function ApplyFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const preselectedSlug = searchParams.get("category") || undefined;

  const [step, setStep] = useState<Step>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [categories, setCategories] = useState<OpenCallCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<OpenCallCategory | null>(null);

  const [resumeToken, setResumeToken] = useState<string | null>(null);
  const [applicant, setApplicant] = useState({ fullName: "", email: "", phoneNumber: "" });
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [files, setFiles] = useState<Record<string, ApplicationFile>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ---- Bootstrapping: resume an existing draft, or load categories fresh ----
  useEffect(() => {
    (async () => {
      const existingToken =
        typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;

      if (existingToken) {
        const res = await import("@/app/actions/openCall").then((m) =>
          m.getOpenCallApplication(existingToken)
        );
        if (res.success && res.data.status === "draft") {
          hydrateFromApplication(res.data);
          setLoading(false);
          return;
        }
        // Token invalid, expired, or already submitted — clear it and
        // fall through to a fresh start rather than getting stuck.
        window.localStorage.removeItem(STORAGE_KEY);
      }

      const catRes = await getOpenCallCategories();
      if (catRes.success) {
        setCategories(catRes.data);
        if (preselectedSlug) {
          const match = catRes.data.find((c) => c.slug === preselectedSlug);
          if (match) setSelectedCategory(match);
        }
      } else {
        setError(catRes.error);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function hydrateFromApplication(data: ApplicationState) {
    setResumeToken(data.resumeToken);
    setApplicant({
      fullName: data.applicant.fullName,
      email: data.applicant.email,
      phoneNumber: data.applicant.phoneNumber,
    });
    setSelectedCategory({
      _id: "",
      slug: data.category.slug,
      name: data.category.name,
      description: "",
      active: true,
      order: 0,
      fields: data.category.fields,
    });
    const answerMap: Record<string, any> = {};
    for (const a of data.answers) answerMap[a.fieldName] = a.value;
    setAnswers(answerMap);
    const fileMap: Record<string, ApplicationFile> = {};
    for (const f of data.files) fileMap[f.fieldName] = f;
    setFiles(fileMap);
    setStep(2); // skip straight past account/category — they already chose
  }

  // ---- Step 0: personal info -> creates the application + resumeToken ----
  const handleStartApplication = async () => {
    if (!selectedCategory) {
      setError("Please select a category to continue.");
      return;
    }
    if (!applicant.fullName.trim() || !applicant.email.trim() || !applicant.phoneNumber.trim()) {
      setError("Please fill in your name, email, and phone number.");
      return;
    }
    setError(null);
    setSaving(true);
    const res = await startOpenCallApplication({
      categorySlug: selectedCategory.slug,
      fullName: applicant.fullName.trim(),
      email: applicant.email.trim(),
      phoneNumber: applicant.phoneNumber.trim(),
    });
    setSaving(false);

    if (!res.success) {
      setError(res.error);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, res.data.resumeToken);
    hydrateFromApplication(res.data);
    setStep(2); // personal info + category chosen in one step already
  };

  const handleAnswerChange = (name: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const persistAnswers = async () => {
    // Nothing to save once the application is submitted — attempting
    // to PATCH here would 409 for no reason, since this can be
    // reached from goToStep as well as handleSubmit.
    if (!resumeToken || !selectedCategory || submitted) return true;
    setSaving(true);
    const payload = selectedCategory.fields
      .filter((f) => f.type !== "file")
      .map((f) => ({ fieldName: f.name, value: answers[f.name] ?? null }));
    const res = await saveOpenCallProgress(resumeToken, { answers: payload });
    setSaving(false);
    if (!res.success) {
      setError(res.error);
      return false;
    }
    return true;
  };

  const goToStep = async (next: Step) => {
    if (step === 2) {
      const ok = await persistAnswers();
      if (!ok) return;
    }
    setError(null);
    setStep(next);
  };

  const handleSubmit = async () => {
    // Re-entrancy guard: `disabled={saving}` on the button covers the
    // normal case, but this blocks it at the source too, in case a
    // double-click/double-tap races ahead of the state update.
    if (!resumeToken || saving || submitted) return;
    setSaving(true);
    setSubmitError(null);
    const ok = await persistAnswers();
    if (!ok) {
      setSaving(false);
      return;
    }
    const res = await submitOpenCallApplication(resumeToken);
    setSaving(false);
    if (!res.success) {
      // A 409 here specifically means it was already submitted (e.g.
      // in another tab, or a prior click that succeeded before this
      // one reached the server) — treat that as success rather than
      // showing a confusing error for something that isn't wrong.
      if (res.error.toLowerCase().includes("already been submitted")) {
        window.localStorage.removeItem(STORAGE_KEY);
        setSubmitted(true);
        return;
      }
      setSubmitError(res.error);
      return;
    }
    window.localStorage.removeItem(STORAGE_KEY);
    setSubmitted(true);
  };

  // ---- Render ----

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCA33A]" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-[#CCA33A]/10 border border-[#CCA33A] flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h1 className="text-2xl font-bold text-[#F9F7F4] mb-3">Application Submitted</h1>
        <p className="text-[#B3B3B3] leading-relaxed">
          Your Afrospook 2026 application has been successfully submitted. Our team will review
          your application and contact selected applicants with the next steps.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    // pt-28/pt-32 clears the fixed floating header (same convention as
    // checkout/page.tsx's py-20/mt-20) — the header is `fixed`, so it
    // takes no space in normal flow and anything with too little top
    // padding renders underneath it instead of below it. Step 0 still
    // trims the BOTTOM spacing (pb-6) to keep the 8-card grid compact,
    // but the top offset stays consistent across every step.
    <div className={`max-w-2xl mx-auto px-4 pt-28 sm:pt-32 ${step === 0 ? "pb-6 sm:pb-10" : "pb-16 sm:pb-24"}`}>
      <h1 className={`font-bold text-[#F9F7F4] ${step === 0 ? "text-xl sm:text-2xl mb-1" : "text-2xl sm:text-3xl mb-1"}`}>
        Afrospook 2026 Open Call
      </h1>
      <p className={`text-[#8a8a8a] text-sm ${step === 0 ? "mb-4" : "mb-8"}`}>
        Apply to be part of Afrospook 2026 — select a category and tell us about yourself.
      </p>

      {step !== 0 && <ApplyProgress currentStep={step} />}

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Step 0/1 collapsed together: category first, then personal info,
          both required before the application can be created server-side.
          Step 0's chrome above is intentionally tighter, and the progress
          bar is skipped here entirely — the goal is fitting all 8
          category cards in view without scrolling, and every bit of
          vertical space saved above the grid helps on shorter screens. */}
      {step === 0 && (
        <div className="space-y-3">
          <h2 className="text-[#F9F7F4] font-semibold text-base sm:text-lg">Select a category</h2>
          <CategoryGrid
            categories={categories}
            selectedSlug={selectedCategory?.slug}
            onSelect={(cat) => setSelectedCategory(cat)}
          />
          <button
            disabled={!selectedCategory}
            onClick={() => setStep(1)}
            className="w-full mt-3 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-[#F9F7F4] font-semibold text-lg mb-2">Your details</h2>
          <p className="text-[#8a8a8a] text-sm mb-4">
            Applying for: <span className="text-[#CCA33A]">{selectedCategory?.name}</span>
          </p>
          <div className="bg-[#151515] rounded-2xl p-5 space-y-4">
            <div>
              <label className="block text-[#F9F7F4] font-medium text-sm mb-1.5">Full Name *</label>
              <input
                type="text"
                value={applicant.fullName}
                onChange={(e) => setApplicant((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-[#F9F7F4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CCA33A]"
              />
            </div>
            <div>
              <label className="block text-[#F9F7F4] font-medium text-sm mb-1.5">Email *</label>
              <input
                type="email"
                value={applicant.email}
                onChange={(e) => setApplicant((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-[#F9F7F4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CCA33A]"
              />
              <p className="text-[#6F6F6F] text-xs mt-1.5">
                We'll use this to keep your account in sync if you apply again later.
              </p>
            </div>
            <div>
              <label className="block text-[#F9F7F4] font-medium text-sm mb-1.5">Phone Number *</label>
              <input
                type="tel"
                value={applicant.phoneNumber}
                onChange={(e) => setApplicant((p) => ({ ...p, phoneNumber: e.target.value }))}
                className="w-full bg-[#0f0f0f] border border-[#2a2a2a] text-[#F9F7F4] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#CCA33A]"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="px-6 py-3 bg-[#151515] border border-[#2a2a2a] text-[#F9F7F4] font-medium rounded-lg"
            >
              Back
            </button>
            <button
              disabled={saving}
              onClick={handleStartApplication}
              className="flex-1 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg disabled:opacity-50"
            >
              {saving ? "Starting..." : "Continue"}
            </button>
          </div>
        </div>
      )}

      {step === 2 && selectedCategory && (
        <div className="space-y-5">
          <h2 className="text-[#F9F7F4] font-semibold text-lg mb-2">{selectedCategory.name} Application</h2>
          <div className="bg-[#151515] rounded-2xl p-5 space-y-5">
            {selectedCategory.fields
              .filter((f) => f.type !== "file")
              .map((field) => (
                <DynamicField
                  key={field.name}
                  field={field}
                  value={answers[field.name]}
                  onChange={handleAnswerChange}
                  disabled={saving}
                />
              ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-[#151515] border border-[#2a2a2a] text-[#F9F7F4] font-medium rounded-lg"
            >
              Back
            </button>
            <button
              disabled={saving}
              onClick={() => goToStep(3)}
              className="flex-1 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg disabled:opacity-50"
            >
              {saving ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      )}

      {step === 3 && selectedCategory && resumeToken && (
        <div className="space-y-5">
          <h2 className="text-[#F9F7F4] font-semibold text-lg mb-2">Uploads</h2>
          {selectedCategory.fields.filter((f) => f.type === "file").length === 0 ? (
            <p className="text-[#8a8a8a] text-sm">No uploads needed for this category.</p>
          ) : (
            <div className="bg-[#151515] rounded-2xl p-5 space-y-5">
              {selectedCategory.fields
                .filter((f) => f.type === "file")
                .map((field) => (
                  <FileUploadField
                    key={field.name}
                    field={field}
                    resumeToken={resumeToken}
                    existingFile={files[field.name]}
                    disabled={saving}
                    onUploaded={(file) => setFiles((prev) => ({ ...prev, [field.name]: file }))}
                  />
                ))}
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-[#151515] border border-[#2a2a2a] text-[#F9F7F4] font-medium rounded-lg"
            >
              Back
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg"
            >
              Review Application
            </button>
          </div>
        </div>
      )}

      {step === 4 && selectedCategory && (
        <div className="space-y-5">
          <h2 className="text-[#F9F7F4] font-semibold text-lg mb-2">Review Your Application</h2>

          <div className="bg-[#151515] rounded-2xl p-5 space-y-3">
            <h3 className="text-[#CCA33A] text-sm font-semibold uppercase tracking-wide">Personal Info</h3>
            <ReviewRow label="Name" value={applicant.fullName} />
            <ReviewRow label="Email" value={applicant.email} />
            <ReviewRow label="Phone" value={applicant.phoneNumber} />
            <ReviewRow label="Category" value={selectedCategory.name} />
          </div>

          <div className="bg-[#151515] rounded-2xl p-5 space-y-3">
            <h3 className="text-[#CCA33A] text-sm font-semibold uppercase tracking-wide">
              {selectedCategory.name}
            </h3>
            {selectedCategory.fields.map((field) => (
              <ReviewRow
                key={field.name}
                label={field.label}
                value={
                  field.type === "file"
                    ? files[field.name]?.originalName || "—"
                    : Array.isArray(answers[field.name])
                    ? answers[field.name].join(", ") || "—"
                    : answers[field.name] || "—"
                }
              />
            ))}
          </div>

          {submitError && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {submitError}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-[#151515] border border-[#2a2a2a] text-[#F9F7F4] font-medium rounded-lg"
            >
              Back
            </button>
            <button
              disabled={saving}
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-[#CCA33A] text-black font-semibold rounded-lg disabled:opacity-50"
            >
              {saving ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-sm py-1.5 border-b border-[#2a2a2a] last:border-0">
      <span className="text-[#8a8a8a]">{label}</span>
      <span className="text-[#F9F7F4] text-right">{value}</span>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCA33A]" />
        </div>
      }
    >
      <ApplyFlow />
    </Suspense>
  );
}