# PRD: Tantia Electronics Co. B2B Catalogue and Enquiry Website

## 1. Product Overview

### Product Name

Tantia Electronics Co. Website

### Business Type

B2B electronic and electrical components dealer/distributor website.

### Business Goal

Create a professional, modern, high-trust B2B catalogue and enquiry website for Tantia Electronics Co.

The website must showcase:

- Company credibility and 55+ year legacy
- Product categories
- Dealer/distributor brands
- Brand-specific product ranges
- Catalogue downloads
- Enquiry generation through WhatsApp, phone, email, and website forms

This is not an e-commerce website.

The purpose is:

- Lead generation
- Brand credibility
- Catalogue discovery
- B2B enquiry conversion

Do not include product pricing, checkout, cart, payment flows, customer accounts, or consumer-style e-commerce behavior.

---

## 2. Target Audience

The website is for:

- Electrical contractors
- Panel builders
- OEMs
- Industrial buyers
- Dealers and traders
- Procurement teams
- Maintenance teams
- B2B buyers looking for electronic/electrical components in Delhi and across India

---

## 3. Core Positioning

The website should communicate:

Tantia Electronics Co. is a 55+ year Delhi-based supplier and dealer/distributor of electronic components, electrical goods, wires, switches, fuses, circuit breakers, connectors, precision components, and industrial electrical products.

The design should feel:

- Corporate
- Modern
- Premium
- Industrial
- Clean
- Catalogue-driven
- Reliable
- B2B-focused

Avoid:

- Cheap template feel
- Generic brochure layout
- E-commerce-heavy layout
- Flashy consumer-style branding
- Overuse of gradients
- Random animations
- Price-based selling
- Backend/admin overengineering in MVP

---

## 4. Confirmed Business Details

Use these real details across the website.

```js
export const SITE = {
  businessName: "Tantia Electronics Co.",
  phone: "+91 9810083392",
  whatsapp: "+91 9810083392",
  whatsappRaw: "+91 9810083392",
  email: "tantiaelectronics@gmail.com",
  address: "422 Old Lajpatrai Market, Chandni Chowk, Delhi 110009",
  domain: "https://tantiaelectronics.com",
  businessHours: "Monday – Saturday • 10:00 AM – 7:00 PM",
};


Business details must be stored centrally.

Recommended file:

src/config/site.js

Do not hardcode phone, email, WhatsApp number, address, or domain inside page JSX.

5. Required Tech Stack
Frontend

Use:

React
Vite
JavaScript
Tailwind CSS
React Router
Lucide React icons
Sonner for toasts
Axios or Fetch for API calls

Optional:

Framer Motion only for subtle section entrance animations

Do not overuse animation.

Backend

Use:

FastAPI
Uvicorn
Pydantic
Motor / PyMongo
Python Dotenv
Email-validator

Do not switch to Node/Express unless explicitly requested later.

Database

Use MongoDB for the first production version.

Use MongoDB Atlas in production.

Initial required collection:

enquiries

Future collections:

brands
categories
productLines
siteSettings
catalogues
adminUsers
Hosting and Infrastructure

Recommended production setup:

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
DNS/CDN/SSL: Cloudflare
Email: Google Workspace or Zoho Mail
Analytics: Google Analytics 4 + Google Search Console

Do not use shared hosting for this architecture.

Do not use Hostinger Website Builder for this codebase.

Do not self-host everything on a VPS in Phase 1 unless explicitly requested. VPS adds Nginx, SSL renewals, firewall, server updates, backups, monitoring, and deployment maintenance.

6. Main Architecture Principle

The frontend, backend, storage provider, analytics, WhatsApp links, and content should remain separately editable.

Required rule:

UI components should not know database details.
Frontend should not know whether enquiries are stored in MongoDB, Google Sheets, Airtable, PostgreSQL, or CRM.
Backend routes should not directly contain storage logic.
Storage provider should be swappable through configuration.

Stable frontend API contract:

POST /api/enquiries

The response shape should remain stable even if the backend storage provider changes.

7. Project Structure

Build the project with clean frontend/backend separation.

tantia-electronics-website/
  docs/
    PRD.md

  backend/
    server.py
    requirements.txt
    .env.example
    .gitignore
    app/
      main.py
      config.py
      api/
        routes/
          health.py
          enquiries.py
      schemas/
        enquiry.py
      services/
        enquiry_service.py
        notification_service.py
      repositories/
        enquiry_repository.py
        mongo_enquiry_repository.py
        sheets_enquiry_repository.py
      integrations/
        google_sheets.py
        email.py
      core/
        errors.py
        logging.py

  frontend/
    package.json
    vite.config.js
    postcss.config.js
    tailwind.config.js
    .env.example
    .gitignore
    index.html

    public/
      robots.txt
      sitemap.xml
      placeholder-catalogue.pdf
      assets/
        logos/
        catalogues/
        hero/
        products/

    src/
      App.jsx
      main.jsx
      index.css

      config/
        site.js
        routes.js
        seo.js
        assets.js
        tracking.js

      services/
        api.js
        enquiries.js
        brands.js
        categories.js
        whatsapp.js
        analytics.js

      data/
        seedBrands.js
        seedCategories.js

      components/
        layout/
          TopBar.jsx
          Navbar.jsx
          Footer.jsx
          FloatingWhatsApp.jsx
          PageShell.jsx

        common/
          Button.jsx
          SectionLabel.jsx
          SectionHeader.jsx
          StatCard.jsx
          Breadcrumb.jsx
          CatalogueButton.jsx
          WhatsAppButton.jsx
          EmptyState.jsx
          BrandLogo.jsx
          SEO.jsx

        home/
          HomeHero.jsx
          StatsStrip.jsx
          BrandRibbon.jsx
          CategoryGrid.jsx
          FeaturedBrands.jsx
          WhyChooseUs.jsx
          HomeCTA.jsx

        brands/
          BrandCard.jsx
          BrandGrid.jsx
          BrandDetailHero.jsx
          BrandOverview.jsx
          BrandCatalogueCTA.jsx

        products/
          CategoryCard.jsx
          ProductCategoryHero.jsx
          ProductLinesGrid.jsx
          RelatedBrands.jsx

        forms/
          EnquiryForm.jsx
          ContactForm.jsx

      pages/
        Home.jsx
        Brands.jsx
        BrandDetail.jsx
        Products.jsx
        ProductCategory.jsx
        About.jsx
        Contact.jsx
        NotFound.jsx

Keep components modular.

Do not build one massive page file.

Pages compose sections.

Sections compose reusable components.

Reusable components should receive data as props.

Data fetching should happen through services or page-level hooks.

8. Required Routes

The website must include:

/
 /brands
 /brands/:brandSlug
 /products
 /products/:categorySlug
 /about
 /contact
 *

Optional future routes:

/catalogues
/industries
/admin
/admin/brands
/admin/categories
/admin/enquiries

Do not build optional future routes in Phase 1.

9. Frontend Data Access Rule

Frontend components must not directly call backend endpoints.

Use service files:

src/services/api.js
src/services/enquiries.js
src/services/brands.js
src/services/categories.js
src/services/whatsapp.js
src/services/analytics.js

Pages may call services.

Reusable UI components should receive data as props.

This keeps UI components reusable and prevents backend changes from breaking unrelated frontend components.

Recommended fallback pattern:

import { brands as fallbackBrands } from "../data/seedBrands";
import { categories as fallbackCategories } from "../data/seedCategories";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getBrands() {
  try {
    const res = await fetch(`${API_BASE_URL}/brands`);
    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch {
    return fallbackBrands;
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    if (!res.ok) throw new Error("API failed");
    return await res.json();
  } catch {
    return fallbackCategories;
  }
}

This allows the frontend to work even if backend brand/category APIs are not yet built.

10. Backend Architecture and Storage Abstraction

The backend must be designed so that storage providers can be changed without rewriting frontend code or API contracts.

Routes must not directly contain MongoDB, Google Sheets, Airtable, CRM, or external integration logic.

Required backend flow:

API route
  ↓
service
  ↓
repository/provider
  ↓
storage/integration

Required rule:

API routes call services.
Services call repositories.
Repositories handle storage.
Integrations handle external tools.
Schemas validate input/output.

The frontend must always submit enquiries to:

POST /api/enquiries

The frontend must not know whether enquiries are stored in MongoDB, Google Sheets, Airtable, PostgreSQL, CRM, or email.

Use an environment variable to choose storage backend:

ENQUIRY_STORAGE_PROVIDER=mongodb

Future supported values:

mongodb
google_sheets
airtable
postgres
crm

Example:

If ENQUIRY_STORAGE_PROVIDER=mongodb:
  use MongoEnquiryRepository

If ENQUIRY_STORAGE_PROVIDER=google_sheets:
  use GoogleSheetsEnquiryRepository

The API response shape must remain stable regardless of provider.

11. Backend MVP API Requirements

Base route:

/api

Required MVP routes:

GET /api/
GET /api/health
POST /api/enquiries
GET /api/enquiries
GET /api/enquiries/:id

Do not build full CRUD for brands/categories in Phase 1. Static seed data is enough.

Enquiry Payload

All enquiry forms should submit:

{
  "type": "brand | category | general | quote",
  "relatedBrand": "sgi-wires",
  "relatedCategory": "wires-cables",
  "fullName": "",
  "company": "",
  "email": "",
  "phone": "",
  "message": "",
  "sourcePage": "/brands/sgi-wires"
}

Backend should store:

{
  "id": "uuid",
  "type": "brand",
  "relatedBrand": "sgi-wires",
  "relatedCategory": null,
  "fullName": "",
  "company": "",
  "email": "",
  "phone": "",
  "message": "",
  "sourcePage": "",
  "status": "new",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
Validation

Required fields:

fullName
email
phone
message

Optional fields:

company
relatedBrand
relatedCategory
sourcePage

After successful submit, show:

Thank you. Your enquiry has been sent. We will get back to you shortly.
12. Future Backend Scope

Future APIs, not required in Phase 1:

GET /api/brands
GET /api/brands/:slug
POST /api/brands
PUT /api/brands/:id
DELETE /api/brands/:id

GET /api/categories
GET /api/categories/:slug
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id

GET /api/site-settings
PUT /api/site-settings

Build these only when adding admin/editability.

13. Future Database Models

Do not implement all models in Phase 1 unless requested.

Brand Model
{
  "name": "String",
  "slug": "String",
  "abbreviation": "String",
  "logoUrl": "String",
  "tagline": "String",
  "shortDescription": "String",
  "longDescription": "String",
  "categories": ["String"],
  "catalogueUrl": "String",
  "manufacturerWebsite": "String",
  "featured": "Boolean",
  "sortOrder": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Category Model
{
  "name": "String",
  "slug": "String",
  "imageUrl": "String",
  "shortDescription": "String",
  "longDescription": "String",
  "productLines": ["String"],
  "relatedBrands": ["String"],
  "catalogueUrl": "String",
  "featured": "Boolean",
  "sortOrder": "Number",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Enquiry Model
{
  "id": "String",
  "type": "String",
  "relatedBrand": "String",
  "relatedCategory": "String",
  "fullName": "String",
  "company": "String",
  "email": "String",
  "phone": "String",
  "message": "String",
  "sourcePage": "String",
  "status": "new | contacted | closed",
  "createdAt": "Date",
  "updatedAt": "Date"
}
Site Settings Model
{
  "businessName": "String",
  "phone": "String",
  "whatsapp": "String",
  "email": "String",
  "address": "String",
  "businessHours": "String",
  "googleMapsEmbedUrl": "String",
  "logoUrl": "String",
  "heroImageUrl": "String",
  "updatedAt": "Date"
}
14. Global Layout Requirements

Every page must use the same layout:

Top Utility Bar
Navbar
Page Content
Footer
Floating WhatsApp Button

Recommended wrapper component:

PageShell.jsx
15. Top Utility Bar

A slim dark navy bar at the top of every page.

Left:

B2B DISTRIBUTION • DELHI & PAN-INDIA

Right:

Phone icon + +91 9810083392
Email icon + tantiaelectronics@gmail.com

Style:

Height: around 32px
Background: #0f172a or #101828
Text: small uppercase
Letter spacing: wide
Text color: muted white/gray
16. Main Navbar

Below the utility bar.

Left:

Red square icon with lightning/electric mark
Text: Tantia Electronics Co.

Center navigation:

Home
Brands
Products
About
Contact

Right CTA:

Send Enquiry

Behavior:

Sticky on scroll
Active route highlighted with red underline
White background
Dark text
Clean spacing
Mobile hamburger menu
17. Floating WhatsApp Button

Every page must include a floating WhatsApp button at bottom-right.

Style:

Green circular button
Fixed position
Bottom: 24px
Right: 24px
Icon: WhatsApp/chat icon
High z-index

Default link:

https://wa.me/919810083392?text=Hi%20Tantia%20Electronics%2C%20I%20would%20like%20to%20send%20an%20enquiry.

Utility file:

src/services/whatsapp.js

Function:

export function createWhatsAppLink(message) {
  const phone = "919810083392";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
18. Home Page

Route:

/
Hero Section

Two-column layout.

Left column:

Badge:

ESTABLISHED 1969 • DELHI

Headline:

55+ Years of Trusted Electronic Components & Electrical Goods Distribution.

Styling:

“55+ Years” highlighted in orange/amber
Rest in deep navy/black
Very large bold heading
Modern sans-serif display font

Body:

Tantia Electronics Co. supplies wires, switches, fuses, circuit breakers, precision components, electronic goods, connectors, and industrial electrical products across Delhi and major Indian cities.

CTA buttons:

Send WhatsApp Enquiry
Request Quote
View Brands →

Right column:

Placeholder industrial/warehouse/product image
Overlay card:
B2B DISTRIBUTION
Wires • Switches • Fuses • Components
Small orange badge:
SINCE 1969

Background:

Light off-white
Subtle grid pattern
Stats Strip

Show:

55+ Years
9 Trusted Brands
8 Categories
Pan-India Supply Reach
Brand Ribbon

Dark navy section.

Label:

AUTHORISED DEALER & DISTRIBUTOR

Brands:

SGI Wires
Multitec Tools
BKE
Novoflex
VKY
Elcon Industries
Soldron
Namoelectric
Gilard Electronics

Use initials if real logos are not available:

SGI, MT, BKE, NX, VKY, EI, SD, NE, GE
Product Category Section

Eyebrow:

WHAT WE SUPPLY

Heading:

Eight categories. One trusted source.

Show 8 cards:

Wires & Cables
Switches
Fuses
Circuit Breakers
Connectors
Precision Components
Industrial Electrical Goods
Electronic Components

Each card links to:

/products/:categorySlug
Featured Brands Section

Eyebrow:

FEATURED BRANDS

Heading:

Brands we proudly distribute.

Show 6 to 9 brand cards.

Each card has:

Logo or abbreviation
Brand name
Description
Category tags
View Products button
Catalogue button
Enquire button
Why Choose Tantia Electronics Section

Eyebrow:

WHY CHOOSE TANTIA ELECTRONICS

Heading:

Built on five and a half decades of trade trust.

Body:

From small electrical contractors to large panel-builders and OEMs, buyers across Delhi and India rely on us for genuine products, reliable supply and clear communication.

Six value cards:

55+ Years of Experience
Genuine Products
Strong Dealer Network
Catalogue Availability
B2B Supply Focus
Delhi-Based Legacy
Final Home CTA

Dark navy section.

Eyebrow:

READY TO ENQUIRE?

Heading:

Tell us what you need. We’ll come back with availability, brands & catalogues.

Buttons:

Send WhatsApp Enquiry
Request a Quote
19. Brands Page

Route:

/brands

Hero eyebrow:

BRAND PORTFOLIO

Heading:

Trusted Indian brands, distributed by Tantia.

Body:

We work with established manufacturers across wires & cables, switchgear, fuses, connectors, soldering and electronics — bringing genuine, catalogue-supported supply to B2B buyers.

Display all brand cards.

Each card:

Logo or initials box
Label: BRAND
Brand name
Short description
Category tags
View Products button
Catalogue button
Enquire button
Link target: /brands/:brandSlug
20. Brand Detail Page

Route:

/brands/:brandSlug

Example:

/brands/sgi-wires

Breadcrumb:

Home > Brands > SGI Wires

Header:

Brand logo or initials
Eyebrow: BRAND
Heading: brand name
Description: brand tagline
Buttons:
WhatsApp Enquiry
Download Catalogue
Manufacturer Site

Manufacturer site may be disabled or placeholder in MVP.

Overview section:

Eyebrow: BRAND OVERVIEW
Heading: About [Brand Name]
Body from seed data

Right side:

Brand-specific enquiry form.

Default message example:

I am interested in SGI Wires products. Please share availability and pricing.

Product lines section:

Show related categories this brand supplies
Each card links to category detail

Catalogue section:

Dark navy card
Download PDF button
Request via WhatsApp button

Back link:

← Back to all brands
21. Products Page

Route:

/products

Hero eyebrow:

PRODUCT CATEGORIES

Heading:

Browse by category.

Body:

Find wires, switches, fuses, circuit breakers, connectors, precision components and industrial electrical goods supplied through Tantia Electronics Co.

Show all 8 categories.

Each card links to:

/products/:categorySlug
22. Product Category Detail Page

Route:

/products/:categorySlug

Example:

/products/wires-cables

Breadcrumb:

Home > Products > Wires & Cables

Category header:

Eyebrow: CATEGORY
Heading: category name
Body: category long description
Buttons:
WhatsApp Enquiry
Download Catalogue

Right:

Category image placeholder

Brands in this category:

Display related brands
Each card links to brand detail

Available product lines:

White card grid
Check icon
Two columns on desktop
One column on mobile

Enquiry form:

Right side on desktop
Below content on mobile
Category-specific default message

Catalogue card:

Dark navy section
Download PDF
Request via WhatsApp
23. About Page

Route:

/about

Hero eyebrow:

ABOUT TANTIA

Heading:

A 55+ year Delhi legacy in electrical & electronics distribution.

Body:

Tantia Electronics Co. has spent over five decades supplying genuine electrical goods and electronic components to dealers, contractors, panel-builders, OEMs and industrial buyers across Delhi NCR and major Indian cities.

Stats:

55+ Years in Business
15 Trusted Brands
10 Product Categories
Pan-India Supply Reach

Values section:

Eyebrow:

WHAT DEFINES US

Heading:

Built on relationships, sustained by reliability.

Six cards:

55+ years of trade legacy
Delhi-based legacy supplier
B2B distribution & dealer network
Wide product categories
Pan-India enquiry handling
Genuine product assurance

CTA section:

GET IN TOUCH
Looking for a reliable B2B supply partner? Let’s talk.

Buttons:

Send WhatsApp Enquiry
Request a Quote
24. Contact Page

Route:

/contact

Hero eyebrow:

CONTACT

Heading:

Let’s talk products, catalogues and pricing.

Body:

Send us your enquiry, request a brand catalogue, or ask for a quotation. Our team responds Monday–Saturday between business hours.

Two-column layout.

Left column cards:

Address:

422 Old Lajpatrai Market
Chandni Chowk
Delhi 110009, India

Phone & WhatsApp:

+91 9810083392
WhatsApp: +91 9810083392

Email:

tantiaelectronics@gmail.com

Business Hours:

Monday – Saturday • 10:00 AM – 7:00 PM
Sunday closed

Map placeholder:

GOOGLE MAPS PLACEHOLDER
Embed map here once coordinates are finalized.

WhatsApp block:

PREFER WHATSAPP?
Quickly send your requirements over WhatsApp and we will revert with availability.

Button:

Chat on WhatsApp

Right column:

Quote form with:

Full Name *
Company
Email *
Phone *
Message *

Message placeholder:

Tell us what products / brands you are interested in, quantity, and timeline.

Submit button:

Send Enquiry
25. Footer

Dark navy footer on all pages.

Top border:

Thin red line

Column 1:

Logo
Tantia Electronics Co.
Business summary
Badge:
55+ YEARS • EST. DELHI

Column 2:

Home
Brands
Products
About
Contact

Column 3:

Wires & Cables
Switches
Fuses
Circuit Breakers
Connectors
Precision Components

Column 4:

422 Old Lajpatrai Market, Chandni Chowk, Delhi 110009
+91 9810083392
tantiaelectronics@gmail.com
Monday – Saturday • 10:00 AM – 7:00 PM

Button:

Send WhatsApp Enquiry

Copyright:

© 2026 Tantia Electronics Co. All rights reserved.
26. Static Seed Data

Use static seed data first.

Do not depend on backend availability for initial frontend rendering.

Brands File
src/data/seedBrands.js

Use these brands:

SGI Wires
Multitec Tools
BKE
Novoflex
VKY
Elcon Industries
Soldron
Namoelectric
Gilard Electronics

Each brand object should include:

{
  name: "",
  slug: "",
  abbreviation: "",
  tagline: "",
  shortDescription: "",
  longDescription: "",
  categories: [],
  logoUrl: "",
  catalogueUrl: "/placeholder-catalogue.pdf",
  manufacturerWebsite: "",
  featured: true,
  sortOrder: 1
}
Categories File
src/data/seedCategories.js

Use these categories:

Wires & Cables
Switches
Fuses
Circuit Breakers
Connectors
Precision Components
Industrial Electrical Goods
Electronic Components

Each category object should include:

{
  name: "",
  slug: "",
  imageUrl: "",
  shortDescription: "",
  longDescription: "",
  productLines: [],
  relatedBrands: [],
  catalogueUrl: "/placeholder-catalogue.pdf",
  featured: true,
  sortOrder: 1
}
27. Styling Requirements

Use Tailwind CSS.

Colors
colors: {
  navy: "#101828",
  navyDark: "#0B1220",
  red: "#A7191C",
  redDark: "#851214",
  orange: "#F59E0B",
  yellow: "#FACC15",
  offWhite: "#F8FAFC",
  mutedText: "#475569",
  border: "#E2E8F0"
}
Typography

Recommended:

Headings: Outfit, Space Grotesk, Manrope, or Satoshi
Body: Inter or system sans-serif

Design direction:

Big display headings
Uppercase eyebrow labels
Wide letter spacing for small labels
Large line height for hero text
Body text in muted blue-gray
Layout

Use:

max-width: 1200px or 1280px
responsive padding: px-6 md:px-10 lg:px-16
section spacing: py-20 or py-24
Buttons

Primary:

Deep red background
White text
Sharp corners or modest rounding
Arrow icon on right where useful

Secondary:

White background
Border
Dark text

Outline yellow on dark sections:

Dark background
Yellow border
Yellow text
Hover: yellow background, navy text
Cards

Use:

White background
Border
Subtle hover shadow
Subtle translate-y hover
Clean spacing
Minimal radius
rounded-none or rounded-sm
28. Required UX Interactions

Required:

Active nav underline based on current route
Brand card hover state
Category card hover state
WhatsApp button opens correct WhatsApp link
Catalogue button opens/downloads PDF placeholder
Enquiry form validates required fields
Form submission success toast/message
Mobile menu open/close
Breadcrumb links
Floating WhatsApp button visible across site
Mobile-friendly call and email links

Optional:

Brand ribbon auto-scroll
Fade-in sections on scroll
Smooth scroll to enquiry form
Search/filter for Brands page
Search/filter for Product Categories page

Do not implement optional features until Phase 1 is complete.

29. SEO and Tracking Requirements
SEO Basics

Add:

Page titles
Meta descriptions
Open Graph tags
robots.txt
sitemap.xml
Semantic headings
Clean route slugs
Descriptive alt text for images
SEO Config

Use:

src/config/seo.js
src/components/common/SEO.jsx

Do not hardcode SEO title/description directly in every page.

Each page should import SEO config and render through the SEO component.

Target SEO Terms

Use naturally in titles, meta, headings, and body copy:

Electronic components dealer in Delhi
Electrical goods supplier in Delhi
Industrial wires distributor in India
Switchgear supplier in Delhi
Fuses and circuit breakers supplier India
Electronic components supplier Chandni Chowk
Electrical goods dealer Bhagirath Place
Analytics

Use:

src/services/analytics.js
src/config/tracking.js

Track:

whatsapp_click
phone_click
email_click
catalogue_download
enquiry_submit
brand_page_view
category_page_view

Do not hardcode Google Analytics ID inside components.

Use environment variable:

VITE_GA_MEASUREMENT_ID=
30. Acceptance Criteria
Home Page
Displays hero with correct headline, CTAs, and image
Displays stats strip
Displays brand ribbon
Displays 8 product categories
Displays featured brands
Displays Why Choose Tantia section
Displays final CTA
Floating WhatsApp button works
Brands Page
Displays all brand cards
Each brand card links to detail page
Catalogue button opens PDF placeholder
Enquire button opens WhatsApp or enquiry flow
Brand Detail Page
Displays brand name, description, catalogue button, and enquiry form
Shows related product lines/categories
Shows brand catalogue CTA
Back to brands link works
WhatsApp message is brand-specific
Products Page
Displays all product categories
Each category links to category detail page
Category Detail Page
Displays category overview
Shows related brands
Shows product lines
Shows enquiry form
Catalogue download button works
WhatsApp message is category-specific
About Page
Displays company legacy copy
Shows stats and values grid
CTA buttons work
Contact Page
Displays address, phone, email, hours, and map placeholder
Contact form validates and submits
WhatsApp button works
Responsive
Desktop, tablet, and mobile layouts work
Navbar becomes hamburger menu on mobile
Cards stack correctly on mobile
Forms are usable on mobile
Backend
GET /api/health returns healthy status
POST /api/enquiries validates and saves enquiry
GET /api/enquiries returns saved enquiries
CORS is restricted to frontend domain in production
Environment variables are used for database URL, CORS origins, and storage provider
Routes call services
Services call repositories
Storage provider can be changed without frontend changes
31. Development Phases
Phase 1: Frontend Static MVP

Build:

Layout
Home
Brands
Brand detail
Products
Category detail
About
Contact
Static seed data
WhatsApp links
PDF placeholder links
Form UI
Basic SEO metadata
Responsive design
Phase 2: Backend Enquiry System

Build:

FastAPI server
MongoDB connection
Enquiry schema
Enquiry service
Enquiry repository interface
MongoDB enquiry repository
Enquiry submission route
Enquiry listing route
Frontend form submission
Success/error toast
Environment variables
Phase 3: Storage Abstraction

Add:

ENQUIRY_STORAGE_PROVIDER
Repository/provider selection
Placeholder Google Sheets repository
Stable API response shape
Provider-specific error handling

Do not change frontend API contract.

Phase 4: Production Readiness

Add:

Strict CORS
MongoDB Atlas configuration
Remove platform-specific generated code
Real business details
Real catalogues
Real logos
Real hero/shop/product photos
Google Maps embed/link
sitemap.xml
robots.txt
Open Graph tags
Analytics event hooks
Phase 5: Admin/Editability

Build later:

Admin login
View enquiries
Add/edit/delete brands
Add/edit/delete categories
Upload logos/catalogues
Export enquiries to CSV
Email notification on new enquiry

Do not build admin in Phase 1.

Phase 6: SEO and Launch

Add/verify:

Google Analytics 4
Google Search Console
Cloudflare DNS
Vercel frontend deployment
Render backend deployment
MongoDB Atlas production database
Real domain: tantiaelectronics.com
Live enquiry test
WhatsApp click test
Catalogue download test
Mobile test
32. Final Build Objective

The finished website should feel like:

A premium B2B catalogue and enquiry platform for a legacy Delhi electronics distributor.

It should not feel like:

A Shopify store
A cheap local business template
A generic agency landing page
A static brochure with no conversion system

The site must make buyers quickly understand:

Who Tantia Electronics Co. is
What product categories it supplies
Which brands it distributes
How to download catalogues
How to send an enquiry by WhatsApp, email, phone, or form