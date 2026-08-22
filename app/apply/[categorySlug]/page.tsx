import { redirect } from "next/navigation";

// QR-code compatibility (spec section 21) — each category can have
// its own printed URL, e.g. /apply/artists, but everything funnels
// into the same application system at /apply. This route only
// exists to translate the pretty per-category URL into the
// ?category= query param the real flow reads.
export default async function ApplyCategoryRedirect({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  redirect(`/apply?category=${encodeURIComponent(categorySlug)}`);
}