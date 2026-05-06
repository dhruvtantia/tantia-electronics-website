import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { recordPageView } from "../../services/journey";
import { trackEvent } from "../../services/analytics";

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    recordPageView(path, document.title || "");
    trackEvent("page_view", { path });
  }, [location.pathname, location.search]);

  return null;
}
