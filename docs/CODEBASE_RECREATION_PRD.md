# Tantia Electronics Website - Codebase Recreation PRD

Last updated: May 4, 2026

## 1. Product Summary

Tantia Electronics Co. website is a B2B catalogue and lead-generation website for a Delhi-based electronic components and industrial electrical goods distributor. The product is not an e-commerce website. It must not show prices, cart flows, checkout flows, online payment, customer accounts, or public order management.

The website exists to help B2B buyers discover the business, browse distributed brands, browse product categories, submit enquiries, start WhatsApp conversations, request catalogues, and understand how to contact or visit the shop.

The current implementation is a full-stack app:

- Frontend: React 19, Vite, Tailwind CSS, React Router, Lucide icons, Sonner toasts.
- Backend: FastAPI with a service/repository pattern.
- Lead storage: Google Sheets repository by default. MongoDB is not required for the current operating setup and should remain disabled unless a future migration explicitly chooses it.
- Lead notification: Resend email integration, optional by environment variables.
- Tracking: first-party visitor/session journey summary captured in the browser and attached to enquiry payloads.
- Future admin direction: Directus + Postgres documented, not yet implemented.

## 2. Goals

The product must:

1. Present Tantia Electronics Co. as a legacy B2B supplier with 55+ years of trust.
2. Explain product categories and brand distribution clearly.
3. Let users submit catalogue, product, quote, brand, and category enquiries.
4. Let users contact through WhatsApp, phone, email, and map address links.
5. Keep business contact details centrally configurable.
6. Keep frontend UI components data-driven and reusable.
7. Keep backend route, service, repository, and integration concerns separated.
8. Preserve a stable `POST /api/enquiries` contract so storage can change later.
9. Support production deployment without localhost fallbacks.
10. Be easy to recreate, maintain, and extend into an admin-managed CMS later.

## 3. Non-Goals

The product must not include:

- Product pricing.
- E-commerce cart.
- Checkout.
- Online payment.
- Customer login or account pages.
- Public enquiry list/detail APIs.
- Public admin routes.
- Product inventory management.
- Binding online quotations.
- CRM automation beyond lead capture and notification.

## 4. Audience

Primary audience:

- B2B buyers.
- Electrical contractors.
- Industrial procurement teams.
- Panel builders.
- Dealers and shop counters.
- OEM and maintenance buyers.

Secondary audience:

- Supplier/manufacturer partners.
- Search visitors looking for specific brands or electrical goods in Delhi.
- Returning customers looking for contact, WhatsApp, email, map, or catalogue help.

## 5. Brand Positioning

Tone:

- Practical.
- Legacy-oriented.
- B2B trustworthy.
- Direct and catalogue-focused.
- Modern enough to feel credible online.

Visual direction:

- Balanced light legacy theme.
- Navy and red as serious business anchors.
- Orange/yellow used sparingly for emphasis.
- Light surfaces and rounded cards in homepage contact/enquiry sections.
- Avoid stock-heavy, overly playful, or SaaS-marketing styling.

Core copy ideas:

- 55+ years of trusted supply.
- Delhi-based B2B supplier and distributor.
- Quality electrical goods and electronic components.
- Authorised dealer and distributor.
- No prices online; request quote/catalogue.

## 6. Current Routes

The frontend must support these public routes:

| Route | Purpose |
| --- | --- |
| `/` | Homepage with hero, stats, brand ribbon, categories, featured brands, why choose us, enquiry section. |
| `/brands` | Brand portfolio grid. |
| `/brands/:brandSlug` | Brand detail page with logo, overview, related categories, catalogue CTA, enquiry form. |
| `/products` | Product category listing. |
| `/products/:categorySlug` | Category detail page with product lines, related brands, category enquiry form. |
| `/about` | Company legacy, values, stats, and CTA. |
| `/contact` | Contact details, map link, WhatsApp CTA, enquiry form. |
| `/privacy-policy` | Privacy policy covering enquiries, analytics, journey tracking, storage and contact rights. |
| `/terms-of-service` | Terms clarifying B2B catalogue use, no e-commerce, no binding pricing. |
| `*` | Not found page. |

## 7. Global Layout Requirements

Every public page must render through `PageShell` and include:

- `TopBar`.
- `Navbar`.
- Main route outlet.
- Global `Footer`.
- `FloatingWhatsApp`.
- Sonner `Toaster`.
- `RouteTracker` for first-party journey capture.

Navbar requirements:

- Sticky top header.
- Logo mark plus `SITE.businessName`.
- Desktop nav links: Home, Brands, Products, About, Contact.
- Desktop CTA: Send Enquiry.
- Mobile menu toggle using Menu/X icons.
- Active nav link styling.

Footer requirements:

- Consistent across all pages.
- Four-column desktop layout.
- Left column: logo mark, business name, since text, summary, clickable address/phone/email.
- Quick links column.
- Categories column.
- Contact column with business hours and WhatsApp CTA.
- Bottom copyright row.
- Links to `/privacy-policy` and `/terms-of-service`.

Floating WhatsApp requirements:

- Fixed bottom-right button.
- Uses WhatsApp service helper.
- Opens `wa.me/919810083392` with encoded message.

## 8. Central Configuration

Business details must live in `frontend/src/config/site.js`.

Current required fields:

```js
SITE = {
  businessName: "Tantia Electronics Co.",
  phone: "+91 9810083392",
  phoneRaw: "+919810083392",
  whatsapp: "+91 9810083392",
  whatsappRaw: "919810083392",
  email: "tantia442@gmail.com",
  address: "Shop No. 422, Lajpat Rai Market, Chandni Chowk, Delhi, 110006",
  mapUrl: "Google Maps search URL for the address",
  domain: "https://tantiaelectronics.com",
  businessHours: {
    days: "Monday - Saturday",
    time: "10:00 AM - 7:00 PM",
    closedDay: "Sunday",
    closedStatus: "Closed",
    label: "Monday - Saturday • 10:00 AM - 7:00 PM"
  },
  shortSummary: "...",
  footerSummary: "..."
}
```

SEO metadata must live in `frontend/src/config/seo.js`.

Tracking event names must live in `frontend/src/config/tracking.js`.

Hero and placeholder assets must live in `frontend/src/config/assets.js`.

## 9. Frontend Data Model

### Brand Object

Brand seed data currently lives in `frontend/src/data/seedBrands.js`.

Each brand must include:

```js
{
  name: string,
  slug: string,
  abbreviation: string,
  tagline: string,
  shortDescription: string,
  longDescription: string,
  categories: string[],
  logoUrl: string,
  catalogueUrl: string,
  manufacturerWebsite: string,
  featured: boolean,
  sortOrder: number
}
```

Current live brands:

1. SGI Wires - `sgi-wires`.
2. Multitec Tools - `multitec-tools`.
3. B.K. Electronics (BKE) - `bke`.
4. Novoflex - `novoflex`.
5. VKY - `vky`.
6. Elcon India - `elcon-india`.
7. Namolectric Controls - `namolectric-controls`.
8. Gilard Electronics - `gilard-electronics`.
9. Calonix - `calonix`.
10. China Lema - `china-lema`.
11. Pankaj Potentiometers - `pankaj-potentiometers`.
12. Woer - `woer`.
13. Brisk - `brisk`.
14. Union Connectors - `union-connectors`.
15. Venus Switches - `venus-switches`.

Important content state:

- Soldron must not appear in the live brand catalogue.
- Elcon must be represented as Elcon India, not Elcon Industries.
- New brand entries are draft-quality content until manufacturer-approved logos and copy are supplied.
- Brands without real logos must display initials using `abbreviation`.

### Category Object

Category seed data currently lives in `frontend/src/data/seedCategories.js`.

Each category must include:

```js
{
  name: string,
  slug: string,
  imageUrl: string,
  shortDescription: string,
  longDescription: string,
  productLines: string[],
  relatedBrands: string[],
  catalogueUrl: string,
  featured: boolean,
  sortOrder: number
}
```

Current product categories:

1. Wires & Cables - `wires-cables`.
2. Switches - `switches`.
3. Fuses - `fuses`.
4. Circuit Breakers - `circuit-breakers`.
5. Connectors - `connectors`.
6. Precision Components - `precision-components`.
7. Industrial Electrical Goods - `industrial-electrical-goods`.
8. Electronic Components - `electronic-components`.

## 10. Frontend Service Rules

Reusable UI components must receive data through props and must not directly call backend APIs.

Frontend data access services:

- `src/services/api.js`: generic API request helper.
- `src/services/enquiries.js`: enquiry submission.
- `src/services/brands.js`: brand data access.
- `src/services/categories.js`: category data access.
- `src/services/whatsapp.js`: WhatsApp URL generation.
- `src/services/analytics.js`: analytics event dispatch.
- `src/services/journey.js`: first-party journey/session summary.

Current implementation note:

- Route pages still import seed data directly in several places. Future CMS/API migration should move pages to service calls while keeping UI components prop-driven.

## 11. Homepage Requirements

Homepage sections, in order:

1. SEO metadata.
2. Hero slideshow.
3. Stats strip.
4. Authorised dealer and distributor brand ribbon.
5. Product category section.
6. Featured brands section.
7. Why choose us section.
8. Light enquiry/contact section.

### Hero

Hero requirements:

- Full-width visual section.
- Background image slideshow using `ASSETS.heroSlides`.
- Foreground readable content card.
- Eyebrow: `Established 1969 • Delhi`.
- Main headline emphasizes `55+ Years`.
- Body mentions wires, switches, fuses, circuit breakers, precision components, electronic goods, connectors, and industrial electrical products.
- CTAs: WhatsApp enquiry, Request Quote, View Brands.
- CSS-based slideshow.
- Reduced-motion mode must show static first image.

Known placeholder state:

- Hero images are remote Unsplash URLs. Before launch, replace with optimized local product/business images.

### Stats Strip

Stats should communicate:

- 55+ years.
- Trusted brands count.
- Product categories count.
- Pan-India supply reach.

### Brand Ribbon

Brand ribbon requirements:

- Dark navy section.
- Eyebrow: Authorised Dealer & Distributor.
- Infinite horizontal brand track.
- Slower polished animation.
- Pause-on-hover and reduced-motion support.
- Each tile links to `/brands/:brandSlug`.
- Each tile includes brand name, large logo or initials, and tagline/short description.
- Tiles should be larger, spaced, translucent-edged, and not feel like narrow film-strip cells.

### Product Categories

Category grid requirements:

- Section eyebrow: What We Supply.
- Section title: Eight categories. One trusted source.
- Cards link to `/products/:categorySlug`.
- Cards show icon/visual, name, short description, and CTA.

### Featured Brands

Featured brand requirements:

- Shows brand cards using `BrandCard`.
- Desktop/tablet hover overlay reveals: View Products, Download Catalogue, Enquire.
- Mobile keeps actions visible.
- Card content includes logo/initials, name, short description, product focus line, category count, catalogue-ready label, and category chips.
- No prices or e-commerce language.

### Homepage Enquiry Section

Requirements:

- Light gradient section.
- Left side: heading, guidance copy, enquiry form.
- Right side: visit/contact card plus business-hours card.
- Contact rows must use `SITE.mapUrl`, `tel:${SITE.phoneRaw}`, and `mailto:${SITE.email}`.
- Reuse `EnquiryForm`.

## 12. Brand Pages

### `/brands`

Requirements:

- SEO metadata from config.
- Hero section with title and explanatory body.
- Brand grid showing all configured brands sorted by `sortOrder`.
- Copy must use `Tantia Electronics`, not `Tantia` alone when referring to the business.

### `/brands/:brandSlug`

Requirements:

- Resolve brand by slug.
- If missing, show not-found state.
- Render SEO title using brand name and business name.
- Render breadcrumb: Home > Brands > Brand Name.
- Render brand detail hero.
- Render brand overview.
- Render related category cards filtered by category slug.
- Render brand catalogue CTA.
- Render brand-specific enquiry form.
- Form defaults should mention the brand name.

## 13. Product Pages

### `/products`

Requirements:

- SEO metadata from config.
- Hero with product category introduction.
- Grid of all product categories sorted by `sortOrder`.

### `/products/:categorySlug`

Requirements:

- Resolve category by slug.
- If missing, show not-found state.
- Render category hero.
- Render product lines grid.
- Render related brands for that category.
- Render category enquiry form.

## 14. About Page

Requirements:

- SEO metadata from config.
- Hero section titled around 55+ year Delhi legacy.
- Body mentions quality electrical goods and electronic components.
- Stats: 55+ years, 15 trusted brands, 10 product categories, Pan-India supply reach.
- Values grid:
  - 55+ years of trade legacy.
  - Delhi-based legacy supplier.
  - B2B distribution & dealer network.
  - Wide product categories.
  - Pan-India enquiry handling.
  - Quality product assurance.
- CTA section with WhatsApp and Request Quote.

## 15. Contact Page

Requirements:

- SEO metadata from config.
- Hero title: Let's talk products, catalogues and quotations.
- Contact cards:
  - Address as Google Maps link.
  - Phone as `tel:` link and WhatsApp display.
  - Email as `mailto:` link.
  - Business hours from `SITE.businessHours`.
- Map placeholder block with Google Maps link.
- WhatsApp CTA card.
- Enquiry form.

## 16. Legal Pages

### Privacy Policy

Must cover:

- Enquiry fields collected.
- Website journey information collected.
- Purposes: enquiry response, lead context, UX improvement, fraud reduction.
- Storage and processors: email, Google Sheets, analytics tools if enabled.
- Cookies/local storage/session storage.
- Data retention.
- Contact email for requests.

### Terms of Service

Must cover:

- Informational B2B catalogue purpose.
- No e-commerce.
- No binding online pricing.
- Enquiries are not confirmed orders.
- Brand and catalogue ownership.
- Acceptable use.
- Contact email for terms questions.

## 17. Enquiry Form Requirements

Fields:

- Full Name: required.
- Company: optional.
- Email: required, valid email format.
- Phone: required, fixed `+91` prefix UI plus 10-digit input.
- Message: required.

Phone behavior:

- Frontend input displays fixed `+91` prefix.
- Customer enters only 10 digits.
- Pasted `+91 9810083392` normalizes to `9810083392`.
- Pasted `09810083392` normalizes to `9810083392`.
- Non-digits are stripped.
- Stored phone is the 10-digit Indian number.

Submit behavior:

- Validate before POST.
- POST to `/api/enquiries` through `submitEnquiry` service.
- Include page context: type, relatedBrand, relatedCategory, sourcePage.
- Include journey context from `getLeadJourneySnapshot`.
- Show success toast on success.
- Show error toast on validation/API failure.
- Reset form after success.

## 18. Journey Tracking Requirements

Current first-party journey tracking:

- `visitorId` stored in localStorage.
- `sessionId` stored in sessionStorage.
- Journey events stored in sessionStorage.
- Tracks page path, document title, startedAt, and durationSeconds.
- Event type is inferred:
  - `/brands/:slug` -> `brand_page_view`.
  - `/products/:slug` -> `category_page_view`.
  - Everything else -> `page_view`.
- On enquiry submit, sends compact summary such as `/ (5s) -> /brands/sgi-wires (12s)`.
- Does not send raw typed message, phone, or email to analytics tools.

Future tracking requirements:

- Add consent UI before enabling PostHog, Clarity, or session replay.
- Do not send PII to third-party analytics.
- Attach analytics lead events using non-PII identifiers.
- Keep privacy policy synchronized with enabled vendors.

## 19. Backend Public API

Base API prefix: `/api`.

### `GET /api/`

Response:

```json
{
  "success": true,
  "message": "Tantia Electronics Co. API"
}
```

### `GET /api/health`

Purpose:

- Production health check.
- Deployment monitoring.

### `POST /api/enquiries`

Public endpoint.

Request shape:

```json
{
  "type": "brand | category | general | quote",
  "relatedBrand": "sgi-wires",
  "relatedCategory": "wires-cables",
  "fullName": "",
  "company": "",
  "email": "",
  "phone": "9810083392",
  "message": "",
  "sourcePage": "/brands/sgi-wires",
  "visitorId": "visitor_uuid",
  "sessionId": "session_uuid",
  "landingPage": "/?utm_source=...",
  "referrer": "",
  "utmSource": "",
  "utmMedium": "",
  "utmCampaign": "",
  "utmTerm": "",
  "utmContent": "",
  "journeySummary": "/ (5s) -> /brands/sgi-wires (12s)"
}
```

Success response:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "brand",
    "relatedBrand": "sgi-wires",
    "relatedCategory": null,
    "fullName": "",
    "company": "",
    "email": "name@example.com",
    "phone": "9810083392",
    "message": "",
    "sourcePage": "",
    "visitorId": "",
    "sessionId": "",
    "landingPage": "",
    "referrer": "",
    "utmSource": "",
    "utmMedium": "",
    "utmCampaign": "",
    "utmTerm": "",
    "utmContent": "",
    "journeySummary": "",
    "status": "new",
    "createdAt": "datetime",
    "updatedAt": "datetime"
  },
  "message": "Thank you. Your enquiry has been sent. We will get back to you shortly."
}
```

Public enquiry read endpoints must remain disabled for MVP.

## 20. Backend Architecture Requirements

Backend routes must call services.

Backend services must call repositories.

Repositories must handle storage.

Google Sheets logic must not appear directly in API route files. MongoDB is not required for the current MVP setup.

Current backend layers:

- `app/api/routes/enquiries.py`: public POST route only.
- `app/api/routes/health.py`: health route.
- `app/schemas/enquiry.py`: Pydantic request/response schemas and phone normalization.
- `app/services/enquiry_service.py`: creates enquiry and triggers notification service.
- `app/services/notification_service.py`: formats notification email and calls email integration.
- `app/repositories/enquiry_repository.py`: repository interface.
- `app/repositories/sheets_enquiry_repository.py`: Google Sheets append repository.
- `app/repositories/mongo_enquiry_repository.py`: optional legacy/future provider file only; not used when `ENQUIRY_STORAGE_PROVIDER=google_sheets`.
- `app/integrations/google_sheets.py`: Google API integration.
- `app/integrations/email.py`: Resend email integration.
- `app/config.py`: environment settings.
- `app/core/errors.py`: app/config error classes.

## 21. Backend Validation Requirements

Phone:

- Strip non-digits.
- If 12 digits and starts with `91`, remove country code.
- If 11 digits and starts with `0`, remove leading zero.
- Require exactly 10 digits after normalization.
- Store 10-digit value.

Email:

- Use Pydantic `EmailStr`.

Text limits:

- fullName: 1 to 120 chars.
- company: max 160 chars.
- message: 1 to 3000 chars.
- sourcePage: max 300 chars.
- visitorId/sessionId: max 120 chars.
- referrer: max 500 chars.
- journeySummary: max 2200 chars.

## 22. Lead Storage Requirements

Default provider: `google_sheets`.

Live spreadsheet:

- Spreadsheet URL: `https://docs.google.com/spreadsheets/d/100glkL_Q1A5iBSGQVaUQOzbfM6wJ9R_khsg8pDgVfX0/edit?gid=0#gid=0`
- Spreadsheet ID: `100glkL_Q1A5iBSGQVaUQOzbfM6wJ9R_khsg8pDgVfX0`
- Worksheet name: `Enquiries`

Operating behavior:

- Every valid enquiry form submission must be stored as one new row in this Google Sheet.
- The same submission must also trigger a formatted email notification to `tantia442@gmail.com` when email env vars are configured.
- MongoDB is not needed for this workflow and should not be configured for launch.
- Google Sheets is the lead log/backup; email is the immediate office notification.

Required columns:

1. id
2. createdAt
3. updatedAt
4. status
5. type
6. relatedBrand
7. relatedCategory
8. fullName
9. company
10. email
11. phone
12. message
13. sourcePage
14. visitorId
15. sessionId
16. landingPage
17. referrer
18. utmSource
19. utmMedium
20. utmCampaign
21. utmTerm
22. utmContent
23. journeySummary

Storage behavior:

- Ensure header row exists.
- Append one row per enquiry.
- Keep row append stable so future CRM/Postgres migration does not change frontend.

Known audit issue:

- Current Google Sheets integration still uses range `A1:M1` and append range `A:M`, but the required schema now has 23 columns. This must be updated to `A1:W1` and `A:W` before production lead tracking is relied on.

## 23. Email Notification Requirements

Plain-language behavior:

When a customer submits an enquiry form, the backend must do two things:

1. Store the enquiry as a new row in the configured Google Sheet.
2. Send a structured email notification to `tantia442@gmail.com`.

This means the business has both a spreadsheet record and an immediate office email. MongoDB is not needed for this current setup.

Email provider: Resend.

Required env vars:

```env
RESEND_API_KEY=
EMAIL_FROM=Tantia Electronics Co. <enquiries@tantiaelectronics.com>
ENQUIRY_NOTIFICATION_TO=tantia442@gmail.com
```

Email behavior:

- Send after successful enquiry storage.
- Do not fail the public form if email notification fails.
- Log notification failure server-side.
- Email subject: `New website enquiry: {fullName}`.
- Plain text and HTML bodies should include:
  - Name.
  - Company.
  - Email.
  - Phone.
  - Type.
  - Related brand.
  - Related category.
  - Source page.
  - Landing page.
  - Referrer.
  - UTM source, medium, campaign.
  - Visitor ID.
  - Session ID.
  - Created at.
  - Journey summary.
  - Message.

## 24. Environment Variables

Frontend production:

```env
VITE_API_BASE_URL=https://api.tantiaelectronics.com/api
VITE_GA_MEASUREMENT_ID=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://app.posthog.com
VITE_CLARITY_PROJECT_ID=
```

Frontend local development:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_GA_MEASUREMENT_ID=
```

Backend production:

```env
ENQUIRY_STORAGE_PROVIDER=google_sheets
GOOGLE_SHEETS_SPREADSHEET_ID=100glkL_Q1A5iBSGQVaUQOzbfM6wJ9R_khsg8pDgVfX0
GOOGLE_SHEETS_WORKSHEET_NAME=Enquiries
GOOGLE_SERVICE_ACCOUNT_JSON=
CORS_ORIGINS=https://tantiaelectronics.com,https://www.tantiaelectronics.com
RESEND_API_KEY=
EMAIL_FROM=Tantia Electronics Co. <enquiries@tantiaelectronics.com>
ENQUIRY_NOTIFICATION_TO=tantia442@gmail.com
```

Google Sheets access requirement:

- `GOOGLE_SERVICE_ACCOUNT_JSON` is not another normal Gmail inbox.
- It is a Google Cloud service account credential used by the backend server to write rows into the spreadsheet automatically.
- The service account has an email address like `name@project-id.iam.gserviceaccount.com`.
- That service account email must be added to the Google Sheet with Editor access.
- The office notification email remains `tantia442@gmail.com`.

MongoDB:

- MongoDB is not required for launch.
- Do not set `ENQUIRY_STORAGE_PROVIDER=mongodb` unless a future migration intentionally moves away from Google Sheets.
- `MONGODB_URI` and `MONGODB_DATABASE` can remain empty.

## 25. Deployment Requirements

Recommended deployment:

- Frontend: Vercel or Render static site.
- Backend: Render or Railway FastAPI service.
- API domain: `https://api.tantiaelectronics.com/api`.
- Frontend domain: `https://tantiaelectronics.com` and `https://www.tantiaelectronics.com`.
- Health check: `/api/health`.

Production safety requirements:

- No production fallback to localhost.
- Frontend must error clearly if `VITE_API_BASE_URL` is missing.
- Backend CORS must only include production frontend domains and explicit local dev origin when developing.
- Secrets must live in deployment provider env vars, not committed files.

## 26. Future Admin/CMS Requirements

Future stack: Directus + Postgres.

Admin should manage:

- Brands.
- Categories.
- Enquiries.
- Page copy.
- Hero slides.
- Catalogue URLs.
- Brand logos.
- Featured/active flags.
- Sort order.

Directus collections:

### `brands`

Fields:

- id.
- name.
- slug.
- abbreviation.
- tagline.
- shortDescription.
- longDescription.
- categories relation.
- logo asset.
- catalogueUrl/file.
- manufacturerWebsite.
- featured.
- active.
- sortOrder.
- createdAt.
- updatedAt.

### `categories`

Fields:

- id.
- name.
- slug.
- image asset.
- shortDescription.
- longDescription.
- productLines JSON/list.
- relatedBrands relation.
- catalogueUrl/file.
- featured.
- active.
- sortOrder.
- createdAt.
- updatedAt.

### `enquiries`

Fields:

- All current enquiry response fields.
- status.
- notes.
- assignedTo.
- lastContactedAt.

### `pages`

Fields:

- route.
- title.
- SEO title.
- SEO description.
- page sections JSON.
- active.

### `heroSlides`

Fields:

- image asset.
- alt text.
- active.
- sortOrder.

Migration rule:

- Keep frontend UI components prop-driven.
- Move data fetching into service files.
- Provide seed fallback until CMS is stable.

## 27. Accessibility Requirements

- All links and buttons must have clear accessible labels or text.
- Logo images must have alt text.
- Decorative slideshow backgrounds should be `aria-hidden`.
- Mobile menu button must have aria-label.
- Forms must use labels.
- Validation errors must be surfaced visibly through toast and native form constraints.
- Color contrast must be checked, especially over hero slideshow.

## 28. Performance Requirements

- Replace remote Unsplash hero/product images with optimized local assets before launch.
- Prefer compressed WebP/AVIF images.
- Avoid loading multiple 1800px remote images on first render in production.
- Keep CSS animations lightweight.
- Respect `prefers-reduced-motion`.
- Avoid heavy frontend analytics before consent and production need.

Known audit issue:

- `ASSETS.heroSlides` currently uses four remote Unsplash URLs at 1800px width. This is acceptable for placeholder development but not final launch.

## 29. Security And Privacy Requirements

- Public API must only expose enquiry creation.
- Public API must not list or return arbitrary saved enquiries.
- CORS is not authentication and must not be treated as access control.
- Google service account JSON must never be committed.
- Resend API key must never be committed.
- Do not send raw phone, email, company, or message values to analytics vendors.
- Add consent UI before enabling PostHog/Clarity/session replay.
- Privacy policy must stay aligned with enabled tracking/storage vendors.

Known audit issue:

- First-party journey tracking starts immediately and stores visitor/session IDs in browser storage. The legal page discloses this, but a full consent preference UI is still needed before enabling third-party analytics or session replay.

## 30. Testing Requirements

Frontend:

- `npm run build` must pass.
- All routes must render.
- Navbar desktop/mobile interactions must work.
- Brand ribbon tiles must link to correct brand pages.
- Brand cards must show desktop hover overlay and mobile visible actions.
- Contact links must open map, mailto, tel, and WhatsApp URLs.
- Legal footer links must route to real pages.
- Enquiry form must reject missing required fields.
- Enquiry form must reject malformed emails.
- Enquiry form must normalize and enforce 10-digit phones.
- Enquiry form must include journey snapshot in payload.

Backend:

- Python compile/import check must pass with project requirements installed.
- `GET /api/` returns API root message.
- `GET /api/health` returns healthy status.
- `POST /api/enquiries` rejects invalid phone.
- `POST /api/enquiries` accepts `+91 9810083392` and stores `9810083392`.
- Missing Google Sheets config returns structured service unavailable response.
- Public GET enquiry routes are unavailable.
- Google Sheets row append includes all 23 expected columns.
- The configured spreadsheet ID is `100glkL_Q1A5iBSGQVaUQOzbfM6wJ9R_khsg8pDgVfX0`.
- Resend email notification is skipped safely when not configured.
- Resend email notification does not break form response if provider fails.

## 31. Current Audit Findings

This section is a direct local codebase audit. CodeRabbit was not able to run because agent authentication failed with `Failed to start server. Is port 0 in use?`.

### P1 - Google Sheets column range is stale

File: `backend/app/integrations/google_sheets.py`

Impact:

The lead schema now has 23 columns, but Google Sheets uses `A1:M1` and `A:M`. New journey fields may not be written or header handling may become inconsistent.

Fix:

Update ranges to `A1:W1` and `A:W`, or compute the range dynamically from header length.

### P2 - Third-party analytics consent is not implemented

Files: `frontend/src/services/journey.js`, `frontend/src/services/analytics.js`, `frontend/src/pages/PrivacyPolicy.jsx`

Impact:

First-party journey capture is disclosed, but consent management is not implemented. PostHog/Clarity should not be enabled until there is a consent UI and vendor-specific disclosure.

Fix:

Add consent preferences, store consent choice, and only initialize non-essential analytics after opt-in where required.

### P2 - Remote hero images are still placeholders

File: `frontend/src/config/assets.js`

Impact:

The homepage loads remote Unsplash images. This creates dependency, privacy, performance, and brand authenticity risks.

Fix:

Replace with local optimized product/shop/brand assets before public launch.

### P2 - Admin/CMS is documented but not implemented

File: `docs/deployment-admin-tracking.md`

Impact:

Brand edits still require code changes. The requested owner-managed dashboard is future-phase only.

Fix:

Implement Directus + Postgres, then migrate brand/category reads to service-backed CMS fetches with static seed fallback.

### P3 - Brand content for newly added brands is draft quality

File: `frontend/src/data/seedBrands.js`

Impact:

New brand entries intentionally use generic descriptions and initials until real logos and approved copy are provided.

Fix:

Collect official logo files, catalogue files, and verified one-line descriptions for each brand.

### P3 - CodeRabbit audit could not run

Tooling issue:

`coderabbit auth login --agent` failed with `Failed to start server. Is port 0 in use?`.

Fix:

Run CodeRabbit auth manually or retry after the CLI/auth environment is corrected, then run `coderabbit review --agent`.

## 32. AI Website Builder Handoff Guidance

This PRD is sufficient for an AI website builder to understand the desired website, pages, content model, lead capture workflow, and deployment target. It is especially useful if the builder can create a React/Vite frontend and a FastAPI backend.

However, many AI website builders are better at visual pages than backend integrations. If using an AI builder, provide this PRD and explicitly require:

- No e-commerce features and no prices.
- Google Sheets lead storage using the spreadsheet ID in this PRD.
- Formatted email notifications to `tantia442@gmail.com`.
- Centralized contact config.
- Real `/privacy-policy` and `/terms-of-service` pages.
- No public lead-reading endpoints.
- Production API URL, not localhost.

An AI builder may still need separate secret setup after generation:

- Google service account JSON.
- Sharing the Google Sheet with the service account email.
- Resend API key and verified sender domain.
- Deployment provider environment variables.

The PRD is therefore strong enough for recreation, but not a substitute for production credential setup.

## 33. Rebuild Checklist

To recreate the project from scratch:

1. Create `frontend/` Vite React app.
2. Install React Router, Lucide, Sonner, Tailwind.
3. Create config files: site, seo, tracking, assets, routes.
4. Create seed data files: brands, categories.
5. Create service files: api, enquiries, brands, categories, whatsapp, analytics, journey.
6. Create common components: SEO, Button, WhatsAppButton, CatalogueButton, BrandLogo, Breadcrumb, EmptyState, SectionHeader, StatCard, PageHero, RouteTracker.
7. Create layout components: TopBar, Navbar, Footer, FloatingWhatsApp, PageShell.
8. Create home components: HomeHero, StatsStrip, BrandRibbon, CategoryGrid, FeaturedBrands, WhyChooseUs, HomeCTA.
9. Create brand components: BrandGrid, BrandCard, BrandDetailHero, BrandOverview, BrandCatalogueCTA.
10. Create product components: CategoryCard, ProductCategoryHero, ProductLinesGrid, RelatedBrands.
11. Create form components: EnquiryForm, ContactForm.
12. Create route pages: Home, Brands, BrandDetail, Products, ProductCategory, About, Contact, PrivacyPolicy, TermsOfService, NotFound.
13. Create `backend/` FastAPI app.
14. Add settings/config with env vars.
15. Add API routes: root, health, POST enquiries.
16. Add Pydantic schemas and validators.
17. Add service/repository interfaces.
18. Add Google Sheets repository and integration.
19. Add optional Mongo repository.
20. Add Resend email integration and notification service.
21. Add CORS and configuration error handling.
22. Add env examples.
23. Run frontend build and backend compile checks.
24. Configure production deployment env vars.
25. Replace placeholder assets and draft brand content.
26. Add consent UI before enabling third-party tracking.
27. Implement Directus + Postgres admin phase when ready.
