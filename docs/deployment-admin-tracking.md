# Deployment, Admin, Email Leads, And Tracking Notes

## Production Stack

Recommended launch stack:

- Frontend: Vercel or Render static site.
- Backend: Render or Railway FastAPI service.
- Domain: `tantiaelectronics.com` for frontend and `api.tantiaelectronics.com` for backend.
- Lead storage: Google Sheets through the existing repository provider.
- Lead notification: Resend email to `tantia442@gmail.com`.
- Future admin: Directus + Postgres.
- Journey tracking: first-party session summary first, PostHog later when consent/privacy controls are ready.

## Required Production Environment

Frontend:

```env
VITE_API_BASE_URL=https://api.tantiaelectronics.com/api
VITE_GA_MEASUREMENT_ID=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://app.posthog.com
VITE_CLARITY_PROJECT_ID=
```

Backend:

```env
ENQUIRY_STORAGE_PROVIDER=google_sheets
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_WORKSHEET_NAME=Enquiries
GOOGLE_SERVICE_ACCOUNT_JSON=
CORS_ORIGINS=https://tantiaelectronics.com,https://www.tantiaelectronics.com
RESEND_API_KEY=
EMAIL_FROM=Tantia Electronics Co. <enquiries@tantiaelectronics.com>
ENQUIRY_NOTIFICATION_TO=tantia442@gmail.com
```

## Directus Admin Phase

Add Directus after the public website is stable. Suggested collections:

- `brands`: name, slug, abbreviation, tagline, descriptions, categories, logo, catalogue URL, manufacturer website, featured, active, sort order.
- `categories`: name, slug, descriptions, product lines, related brands, catalogue URL, featured, active, sort order.
- `enquiries`: lead fields, source page, visitor/session IDs, journey summary, status, notes, assigned user.
- `pages`: editable SEO and page copy.
- `heroSlides`: local/managed homepage images, alt text, active flag, sort order.

Keep frontend components receiving props. Only service files should decide whether data comes from static seed data, FastAPI, or Directus.

## Tracking Policy

The current implementation stores a short first-party session journey in browser session storage and attaches a compact page path summary to enquiry submissions. It does not collect typed form field contents as analytics events and does not send phone/email/message text into analytics providers.

Before enabling PostHog, Clarity, or session replay, add consent controls and verify the privacy policy lists the active vendors, data categories, retention approach, and opt-out mechanism.
