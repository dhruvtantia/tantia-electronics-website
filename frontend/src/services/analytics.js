import { TRACKING_EVENTS } from "../config/tracking";

export function trackEvent(eventName, params = {}) {
  if (!import.meta.env.VITE_GA_MEASUREMENT_ID) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

export function trackWhatsAppClick(context) {
  trackEvent(TRACKING_EVENTS.whatsappClick, { context });
}

export function trackCatalogueDownload(context) {
  trackEvent(TRACKING_EVENTS.catalogueDownload, { context });
}

export function trackEnquirySubmit(context) {
  trackEvent(TRACKING_EVENTS.enquirySubmit, { context });
}
