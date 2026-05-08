import { PUBLIC_ENV } from "../config/env";

const API_BASE_URL = PUBLIC_ENV.apiBaseUrl;

export async function apiRequest(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured. Set VITE_API_BASE_URL for this environment.");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const detail = Array.isArray(payload?.detail) ? payload.detail.map((item) => item.msg).join(" ") : payload?.detail;
    throw new Error(detail || payload?.message || "API request failed");
  }
  return payload;
}
