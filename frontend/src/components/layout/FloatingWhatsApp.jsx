import { MessageCircle } from "lucide-react";
import { createWhatsAppLink } from "../../services/whatsapp";
import { trackWhatsAppClick } from "../../services/analytics";

export default function FloatingWhatsApp() {
  return (
    <a
      href={createWhatsAppLink()}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackWhatsAppClick("floating")}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-card transition hover:bg-green-700"
      aria-label="Send WhatsApp enquiry"
    >
      <MessageCircle size={26} />
    </a>
  );
}
