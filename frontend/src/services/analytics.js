import { TRACKING_EVENTS } from "../config/tracking";
import { PUBLIC_ENV } from "../config/env";

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (PUBLIC_ENV.gaMeasurementId && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

export function trackWhatsAppClick(context) {
  trackEvent(TRACKING_EVENTS.whatsappClick, { context });
}

export function trackCatalogueDownload(context) {
  trackEvent(TRACKING_EVENTS.catalogueDownload, { context });
}

export function trackCatalogueRequest(context) {
  trackEvent(TRACKING_EVENTS.catalogueRequest, { context });
}

export function trackEnquirySubmit(context) {
  trackEvent(TRACKING_EVENTS.enquirySubmit, { context });
}
