const VISITOR_KEY = "te_visitor_id";
const SESSION_KEY = "te_session_id";
const JOURNEY_KEY = "te_journey_v1";
const MAX_EVENTS = 30;

function canUseStorage() {
  return typeof window !== "undefined" && window.localStorage && window.sessionStorage;
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return `${prefix}_${crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function getStoredId(storage, key, prefix) {
  let value = storage.getItem(key);
  if (!value) {
    value = createId(prefix);
    storage.setItem(key, value);
  }
  return value;
}

function readJourney() {
  if (!canUseStorage()) return null;
  try {
    const stored = window.sessionStorage.getItem(JOURNEY_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function writeJourney(journey) {
  if (!canUseStorage()) return;
  window.sessionStorage.setItem(JOURNEY_KEY, JSON.stringify(journey));
}

function getUtmParams(searchParams) {
  return {
    utmSource: searchParams.get("utm_source") || "",
    utmMedium: searchParams.get("utm_medium") || "",
    utmCampaign: searchParams.get("utm_campaign") || "",
    utmTerm: searchParams.get("utm_term") || "",
    utmContent: searchParams.get("utm_content") || "",
  };
}

function getOrCreateJourney() {
  if (!canUseStorage()) return null;
  const visitorId = getStoredId(window.localStorage, VISITOR_KEY, "visitor");
  const sessionId = getStoredId(window.sessionStorage, SESSION_KEY, "session");
  const existing = readJourney();
  if (existing) return existing;

  const searchParams = new URLSearchParams(window.location.search);
  const journey = {
    visitorId,
    sessionId,
    landingPage: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer || "",
    ...getUtmParams(searchParams),
    events: [],
  };
  writeJourney(journey);
  return journey;
}

function eventTypeForPath(path) {
  if (path.startsWith("/brands/")) return "brand_page_view";
  if (path.startsWith("/products/")) return "category_page_view";
  return "page_view";
}

export function recordPageView(path, title = "") {
  if (!canUseStorage()) return;
  const journey = getOrCreateJourney();
  if (!journey) return;
  const now = Date.now();
  const last = journey.events[journey.events.length - 1];
  if (last && !last.durationSeconds) {
    last.durationSeconds = Math.max(0, Math.round((now - last.startedAtMs) / 1000));
  }
  journey.events.push({
    type: eventTypeForPath(path),
    path,
    title,
    startedAt: new Date(now).toISOString(),
    startedAtMs: now,
    durationSeconds: 0,
  });
  journey.events = journey.events.slice(-MAX_EVENTS);
  writeJourney(journey);
}

export function getLeadJourneySnapshot() {
  if (!canUseStorage()) return {};
  const journey = getOrCreateJourney();
  if (!journey) return {};
  const now = Date.now();
  const events = journey.events.map((event, index) => {
    if (index === journey.events.length - 1) {
      return { ...event, durationSeconds: Math.max(0, Math.round((now - event.startedAtMs) / 1000)) };
    }
    return event;
  });
  const compactEvents = events.map(({ startedAtMs, ...event }) => event);
  return {
    visitorId: journey.visitorId,
    sessionId: journey.sessionId,
    landingPage: journey.landingPage,
    referrer: journey.referrer,
    utmSource: journey.utmSource,
    utmMedium: journey.utmMedium,
    utmCampaign: journey.utmCampaign,
    utmTerm: journey.utmTerm,
    utmContent: journey.utmContent,
    journeySummary: compactEvents.map((event) => `${event.path} (${event.durationSeconds}s)`).join(" -> ").slice(0, 2000),
  };
}
