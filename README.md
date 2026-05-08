# Tantia Electronics Co. Website

React/Vite frontend and FastAPI backend for the Tantia Electronics Co. B2B catalogue and enquiry website. This is not an e-commerce app: there are no prices, carts, checkout, public accounts, or public admin pages.

## Lead Flow

The enquiry form posts to `POST /api/enquiries` through `frontend/src/services/enquiries.js`.

Production flow:

1. Customer fills the enquiry/contact form.
2. Frontend validates full name, message / product interest, and phone or email.
3. Frontend sends the form data to the backend API.
4. Backend validates and normalizes the request.
5. Backend saves the lead as a new row in the configured Google Sheet.
6. Backend sends a Resend notification email to `LEAD_NOTIFY_EMAIL`.
7. Backend returns success after the lead is saved, even if email notification fails.
8. Frontend shows a clear success or error message.

## Backend: Render Deployment

Create a Render Web Service from the `backend` folder.

Recommended settings:

- Runtime: Python
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/api/health`

Required backend env vars:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_JSON_BASE64=
GOOGLE_SHEETS_WORKSHEET_NAME=Enquiries
RESEND_API_KEY=
FROM_EMAIL=enquiries@tantiaelectronics.com
LEAD_NOTIFY_EMAIL=tantia442@gmail.com
CORS_ORIGIN=
```

To create `GOOGLE_SERVICE_ACCOUNT_JSON_BASE64`, base64-encode the service-account JSON locally and paste only the encoded value into Render env vars. Do not commit the JSON file or encoded secret. Share the Google Sheet only with the service account email.

## Frontend: Vercel Deployment

Create a Vercel project from the `frontend` folder.

Recommended settings:

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

Frontend env vars:

```env
VITE_API_BASE_URL=
VITE_GA_MEASUREMENT_ID=
VITE_CLARITY_PROJECT_ID=
```

Only public Vite variables should be configured in Vercel. Do not add Google service account JSON, Resend keys, or backend credentials to the frontend environment.

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
VITE_API_BASE_URL=http://localhost:8000/api
```

## Verification

Before deployment:

```bash
cd frontend
npm run build
```

```bash
cd backend
python3 -m compileall app
```

Production acceptance checks:

- Contact/enquiry form submits successfully.
- Lead appears as a new row in Google Sheets.
- Notification email is sent to `tantia442@gmail.com`.
- Frontend shows success and error messages properly.
- GA4 and Microsoft Clarity scripts load only when public IDs are configured.
- No secrets, API keys, service-account JSON, or `.env` files are committed.
- `CORS_ORIGIN` is restricted to production frontend origin(s).
- Basic rate limiting or spam protection is added if spam appears after launch.

## Security Notes

- Store Google Sheets and Resend credentials only in Render environment variables.
- Store only `VITE_API_BASE_URL`, `VITE_GA_MEASUREMENT_ID`, and `VITE_CLARITY_PROJECT_ID` in Vercel.
- Never commit `.env` files, API keys, service-account JSON, base64 credential strings, or private credentials.
- MongoDB is not required for launch and should not be configured for the lead flow.
