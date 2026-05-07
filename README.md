# Tantia Electronics Co. Website

React/Vite frontend and FastAPI backend for the Tantia Electronics Co. B2B catalogue and enquiry website. This is not an e-commerce app: there are no prices, carts, checkout, public accounts, or public admin pages.

## Lead Flow

The enquiry form posts to `POST /api/enquiries` through `frontend/src/services/enquiries.js`.

Backend flow:

1. Validate and normalize the enquiry payload.
2. Save the lead as a new row in the configured Google Sheet.
3. Send a Resend notification email to `LEAD_NOTIFY_EMAIL`.
4. Return success after the lead is saved, even if email notification fails.

## Backend: Render Deployment

Create a Render Web Service from the `backend` folder.

Recommended settings:

- Runtime: Python
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/api/health`

Required backend env vars:

```env
ENQUIRY_STORAGE_PROVIDER=google_sheets
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SHEETS_WORKSHEET_NAME=Enquiries
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64=
CORS_ORIGIN=https://tantiaelectronics.com,https://www.tantiaelectronics.com
RESEND_API_KEY=
FROM_EMAIL=Tantia Electronics Co. <enquiries@tantiaelectronics.com>
LEAD_NOTIFY_EMAIL=tantia442@gmail.com
```

To create `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`, base64-encode the service-account JSON locally and paste only the encoded value into Render env vars. Do not commit the JSON file or encoded secret.

## Frontend: Vercel Deployment

Create a Vercel project from the `frontend` folder.

Recommended settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Frontend env vars:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-render-service.onrender.com/api
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_PROJECT_ID=
```

The app also supports `VITE_API_BASE_URL`, `VITE_GA_MEASUREMENT_ID`, and `VITE_CLARITY_PROJECT_ID` for local Vite-style configuration. Only public frontend variables are read by the browser bundle.

## Local Development

Backend:

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

For local frontend API calls, set:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## Verification

Before deployment:

```bash
cd frontend
npm run build
```

```bash
cd backend
python -m compileall app
```

Production acceptance checks:

- Contact/enquiry form submits successfully.
- Lead appears as a new row in Google Sheets.
- Notification email is sent to `tantia442@gmail.com`.
- Frontend shows success and error messages properly.
- GA4 and Microsoft Clarity scripts load only when public IDs are configured.
- No secrets, API keys, service-account JSON, or `.env` files are committed.
