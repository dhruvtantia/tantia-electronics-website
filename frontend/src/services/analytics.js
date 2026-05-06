import { TRACKING_EVENTS } from "../config/tracking";

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (import.meta.env.VITE_GA_MEASUREMENT_ID && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
  if (import.meta.env.VITE_POSTHOG_KEY && window.posthog && typeof window.posthog.capture === "function") {
    window.posthog.capture(eventName, params);
  }
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
