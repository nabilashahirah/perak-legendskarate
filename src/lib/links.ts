import { centreEnquiryMessage, centreTrialMessage, contact, trialMessage } from "@/content/site";

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const bookTrialLink = whatsappLink(trialMessage);

export const centreTrialLink = (centreName: string) =>
  whatsappLink(centreTrialMessage.replace("{centre}", centreName));

/** For centres without a listed location: asks for the exact location and class times */
export const centreEnquiryLink = (centreName: string) =>
  whatsappLink(centreEnquiryMessage.replace("{centre}", centreName));

// Embedded map for a search phrase (the HQ uses its Google listing name so the pin is exact)
export const mapEmbedUrl = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const mapSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
