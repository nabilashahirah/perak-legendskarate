import { centreTrialMessage, contact, trialMessage } from "@/content/site";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const bookTrialLink = whatsappLink(trialMessage);

export const centreTrialLink = (centreName: string) =>
  whatsappLink(centreTrialMessage.replace("{centre}", centreName));

// TODO: temporary search-based map; swap for the real place embed once addresses are confirmed
export const mapEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
