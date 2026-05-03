import { Mail, MapPin, Phone } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ContactForm from "../components/forms/ContactForm";
import { SEO as SEO_CONFIG } from "../config/seo";
import { SITE } from "../config/site";

export default function Contact() {
  return (
    <>
      <SEO {...SEO_CONFIG.contact} />
      <section className="bg-offWhite py-16">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <SectionHeader
            eyebrow="Contact"
            title="Let's talk products, catalogues and quotations."
            body="Send us your enquiry, request a brand catalogue, or ask for a quotation. Our team responds Monday-Saturday between business hours."
          />
        </div>
      </section>
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1fr_520px] lg:px-16">
          <div className="space-y-5">
            <ContactCard icon={<MapPin />} title="Address">{SITE.address}, India</ContactCard>
            <ContactCard icon={<Phone />} title="Phone & WhatsApp">
              <a href={`tel:${SITE.phone}`} className="font-bold text-navy">{SITE.phone}</a>
              <br />WhatsApp: {SITE.whatsapp}
            </ContactCard>
            <ContactCard icon={<Mail />} title="Email">
              <a href={`mailto:${SITE.email}`} className="font-bold text-navy">{SITE.email}</a>
            </ContactCard>
            <ContactCard title="Business Hours">{SITE.businessHours}<br />Sunday closed</ContactCard>
            <div className="border border-dashed border-border bg-offWhite p-8 text-center font-black uppercase tracking-wide text-mutedText">
              Google Maps Placeholder<br />
              <span className="text-sm font-semibold normal-case tracking-normal">Embed map here once coordinates are finalized.</span>
            </div>
            <div className="bg-navy p-8 text-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow">Prefer WhatsApp?</p>
              <p className="mt-3 text-slate-300">Quickly send your requirements over WhatsApp and we will revert with availability.</p>
              <WhatsAppButton context="contact-whatsapp" className="mt-5">Chat on WhatsApp</WhatsAppButton>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, children }) {
  return (
    <div className="flex gap-4 border border-border bg-white p-6">
      {icon && <div className="text-brandRed">{icon}</div>}
      <div>
        <h3 className="font-black uppercase tracking-wide text-navy">{title}</h3>
        <div className="mt-2 leading-7 text-mutedText">{children}</div>
      </div>
    </div>
  );
}
