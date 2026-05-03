import { Mail, MapPin, Phone } from "lucide-react";
import { SITE } from "../../config/site";
import EnquiryForm from "../forms/EnquiryForm";

export default function HomeCTA() {
  return (
    <section className="bg-gradient-to-br from-offWhite via-white to-blue-50 py-20 reveal-on-scroll">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-600">Get In Touch</p>
          <h2 className="mt-4 text-4xl font-black leading-tight text-navy md:text-6xl">Request a quote or catalogue consultation</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-mutedText">
            Fill out the form and our team will respond with product availability, suitable brands, catalogue details, and next steps for your requirement.
          </p>
          <div className="mt-8">
            <EnquiryForm type="quote" sourcePage="/" defaultMessage="I would like to request product availability and catalogue details." />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-card">
            <h3 className="text-2xl font-black text-navy">Visit us</h3>
            <div className="mt-7 space-y-6">
              <ContactRow icon={<MapPin size={26} />} title="Main Office" href={SITE.mapUrl} external>
                {SITE.address}
              </ContactRow>
              <ContactRow icon={<Phone size={26} />} title="Phone" href={`tel:${SITE.phoneRaw}`}>
                {SITE.phone}
              </ContactRow>
              <ContactRow icon={<Mail size={26} />} title="Email" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </ContactRow>
            </div>
          </div>

          <div className="rounded-xl bg-blue-600 p-8 text-white shadow-card">
            <h3 className="text-2xl font-black">Business Hours</h3>
            <div className="mt-6 grid gap-4 text-lg">
              <div className="flex items-center justify-between gap-4">
                <span>Monday - Saturday</span>
                <span className="font-bold">10:00 AM - 7:00 PM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Sunday</span>
                <span className="font-bold">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, title, href, external = false, children }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex gap-5 rounded-lg transition hover:bg-offWhite"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">{icon}</span>
      <span>
        <span className="block text-lg font-bold text-navy">{title}</span>
        <span className="mt-1 block leading-7 text-mutedText">{children}</span>
      </span>
    </a>
  );
}
