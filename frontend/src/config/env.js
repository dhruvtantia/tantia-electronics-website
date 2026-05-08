const env = import.meta.env;

export const PUBLIC_ENV = {
  apiBaseUrl: env.VITE_API_BASE_URL || "",
  gaMeasurementId: env.VITE_GA_MEASUREMENT_ID || "",
  clarityProjectId: env.VITE_CLARITY_PROJECT_ID || "",
};
