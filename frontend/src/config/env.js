const env = import.meta.env;

export const PUBLIC_ENV = {
  apiBaseUrl: env.NEXT_PUBLIC_API_BASE_URL || env.VITE_API_BASE_URL || "",
  gaMeasurementId: env.NEXT_PUBLIC_GA_MEASUREMENT_ID || env.VITE_GA_MEASUREMENT_ID || "",
  clarityProjectId: env.NEXT_PUBLIC_CLARITY_PROJECT_ID || env.VITE_CLARITY_PROJECT_ID || "",
};
