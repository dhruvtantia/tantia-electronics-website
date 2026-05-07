import json

from google.oauth2 import service_account
from googleapiclient.discovery import build

from app.config import get_settings
from app.core.errors import ConfigurationError


class GoogleSheetsClient:
    def __init__(self):
        settings = get_settings()
        if not settings.google_sheets_spreadsheet_id:
            raise ConfigurationError("GOOGLE_SHEETS_SPREADSHEET_ID is required when ENQUIRY_STORAGE_PROVIDER=google_sheets")
        service_account_json = settings.google_service_account_json_value
        if not service_account_json:
            raise ConfigurationError("GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 is required for Google Sheets export")

        self.spreadsheet_id = settings.google_sheets_spreadsheet_id
        self.worksheet_name = settings.google_sheets_worksheet_name
        try:
            service_account_info = json.loads(service_account_json)
        except json.JSONDecodeError as exc:
            raise ConfigurationError("Google service account credentials must be valid JSON") from exc

        credentials = service_account.Credentials.from_service_account_info(
            service_account_info,
            scopes=["https://www.googleapis.com/auth/spreadsheets"],
        )
        self.service = build("sheets", "v4", credentials=credentials, cache_discovery=False)

    @property
    def sheet(self):
        return self.service.spreadsheets()

    def ensure_headers(self, headers: list[str]) -> None:
        range_name = f"'{self.worksheet_name}'!A1:W1"
        result = self.sheet.values().get(spreadsheetId=self.spreadsheet_id, range=range_name).execute()
        existing_values = result.get("values", [])
        if existing_values and existing_values[0] == headers:
            return
        self.sheet.values().update(
            spreadsheetId=self.spreadsheet_id,
            range=range_name,
            valueInputOption="RAW",
            body={"values": [headers]},
        ).execute()

    def append_row(self, values: list[str]) -> None:
        self.sheet.values().append(
            spreadsheetId=self.spreadsheet_id,
            range=f"'{self.worksheet_name}'!A:W",
            valueInputOption="RAW",
            insertDataOption="INSERT_ROWS",
            body={"values": [values]},
        ).execute()
