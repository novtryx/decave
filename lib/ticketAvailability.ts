// lib/ticketAvailability.ts

export type TicketAvailability = "hidden" | "coming_soon" | "sold_out" | "available";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface TicketLike {
  availableQuantity: number;
  saleStartDate?: string | Date | null;
  saleEndDate?: string | Date | null;
}

/**
 * Determines a ticket's current availability based on stock and its
 * optional sale window.
 *
 * - "hidden": sale hasn't started and is more than a day away — don't show the ticket at all.
 * - "coming_soon": sale hasn't started but starts within the next 24 hours — show it, but disabled.
 * - "sold_out": no stock left, or the sale window has ended.
 * - "available": sale is open and stock remains — purchasable.
 *
 * Tickets with no saleStartDate/saleEndDate set are always treated as
 * open (backward compatible with tickets created before this field existed).
 */
export function getTicketAvailability(
  ticket: TicketLike,
  now: Date = new Date(),
): TicketAvailability {
  const saleStart = ticket.saleStartDate ? new Date(ticket.saleStartDate) : null;
  const saleEnd = ticket.saleEndDate ? new Date(ticket.saleEndDate) : null;

  const isSoldOutByStock = ticket.availableQuantity <= 0;
  const isSaleWindowEnded = saleEnd ? saleEnd.getTime() < now.getTime() : false;

  if (isSoldOutByStock || isSaleWindowEnded) {
    return "sold_out";
  }

  if (saleStart && saleStart.getTime() > now.getTime()) {
    const msUntilSaleStart = saleStart.getTime() - now.getTime();
    return msUntilSaleStart <= ONE_DAY_MS ? "coming_soon" : "hidden";
  }

  return "available";
}