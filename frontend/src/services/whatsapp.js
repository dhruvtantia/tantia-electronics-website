import { SITE } from "../config/site";

export function createWhatsAppLink(message) {
  const defaultMessage =
    "Hi Tantia Electronics, I would like to send an enquiry.";
  return `https://wa.me/${SITE.whatsappRaw}?text=${encodeURIComponent(message || defaultMessage)}`;
}
