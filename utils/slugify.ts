// utils/slugify.ts

export function createSlug(title: string): string {
  return title
  .trim()
  .replace(/[^\w\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-')      // Replace spaces with hyphens
  .replace(/-+/g, '-');      // Replace multiple hyphens with single hyphen
    // .toLowerCase()
}

export function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .join(' ');
    // .map(word => word.charAt(0).toUpperCase() + word.slice(1))
}