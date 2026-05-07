import base64
import binascii
from functools import lru_cache

from pydantic import AliasChoices, Field
from pydantic_settings import BaseSettings, SettingsConfigDict

from app.core.errors import ConfigurationError


class Settings(BaseSettings):
    enquiry_storage_provider: str = "google_sheets"
    google_sheets_spreadsheet_id: str = ""
    google_sheets_worksheet_name: str = "Enquiries"
    google_service_account_json: str = ""
    google_service_account_json_base64: str = ""
    cors_origins: str = Field(default="https://tantiaelectronics.com", validation_alias=AliasChoices("CORS_ORIGIN", "CORS_ORIGINS", "cors_origins"))
    resend_api_key: str = ""
    email_from: str = Field(default="Tantia Electronics Co. <enquiries@tantiaelectronics.com>", validation_alias=AliasChoices("FROM_EMAIL", "EMAIL_FROM", "email_from"))
    enquiry_notification_to: str = Field(default="tantia442@gmail.com", validation_alias=AliasChoices("LEAD_NOTIFY_EMAIL", "ENQUIRY_NOTIFICATION_TO", "enquiry_notification_to"))

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def google_service_account_json_value(self) -> str:
        if self.google_service_account_json:
            return self.google_service_account_json
        if not self.google_service_account_json_base64:
            return ""
        try:
            return base64.b64decode(self.google_service_account_json_base64).decode("utf-8")
        except (binascii.Error, UnicodeDecodeError) as exc:
            raise ConfigurationError("GOOGLE_SERVICE_ACCOUNT_JSON_BASE64 must be valid base64-encoded JSON") from exc


@lru_cache
def get_settings() -> Settings:
    return Settings()
