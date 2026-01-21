export function stringToSlug(title: string) {
  return title
    .toLowerCase()                // lowercase
    .trim()                       // remove extra spaces at ends
    .replace(/\s+/g, "-")         // replace spaces with hyphens
    .replace(/[^\w-]+/g, "");     // remove non-word chars except hyphen
}
