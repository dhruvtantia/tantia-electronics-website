import json
import urllib.error
import urllib.request

from app.config import get_settings


class EmailClient:
    endpoint = "https://api.resend.com/emails"

    def __init__(self):
        self.settings = get_settings()

    @property
    def enabled(self) -> bool:
        return bool(self.settings.resend_api_key and self.settings.email_from and self.settings.enquiry_notification_to)

    def send_email(self, subject: str, text: str, html: str | None = None) -> bool:
        if not self.enabled:
            return False

        payload = {
            "from": self.settings.email_from,
            "to": [self.settings.enquiry_notification_to],
            "subject": subject,
            "text": text,
        }
        if html:
            payload["html"] = html

        request = urllib.request.Request(
            self.endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {self.settings.resend_api_key}",
                "Content-Type": "application/json",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=10) as response:
                return 200 <= response.status < 300
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Resend email request failed: {exc.code} {detail}") from exc
