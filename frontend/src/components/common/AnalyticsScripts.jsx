import { useEffect } from "react";
import { PUBLIC_ENV } from "../../config/env";

export default function AnalyticsScripts() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    loadGoogleAnalytics(PUBLIC_ENV.gaMeasurementId);
    loadMicrosoftClarity(PUBLIC_ENV.clarityProjectId);
  }, []);

  return null;
}

function loadGoogleAnalytics(measurementId) {
  if (!measurementId || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
}

function loadMicrosoftClarity(projectId) {
  if (!projectId || window.clarity) return;

  window.clarity = function clarity() {
    (window.clarity.q = window.clarity.q || []).push(arguments);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  document.head.appendChild(script);
}
