import { Mail, Phone } from "lucide-react";
import { SITE } from "../../config/site";
import { TRACKING_EVENTS } from "../../config/tracking";
import { trackEvent } from "../../services/analytics";

export default function TopBar() {
  return (
    <div className="bg-navyDark text-xs font-bold uppercase tracking-[0.18em] text-slate-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 md:px-10 lg:px-16">
        <span>B2B Distribution • Delhi & Pan-India</span>
        <div className="hidden items-center gap-5 sm:flex">
          <a className="flex items-center gap-2 hover:text-white" href={`tel:${SITE.phone}`} onClick={() => trackEvent(TRACKING_EVENTS.phoneClick)}>
            <Phone size={13} /> {SITE.phone}
          </a>
          <a className="flex items-center gap-2 hover:text-white" href={`mailto:${SITE.email}`} onClick={() => trackEvent(TRACKING_EVENTS.emailClick)}>
            <Mail size={13} /> {SITE.email}
          </a>
        </div>
      </div>
    </div>
  );
}
