import { Mail, MapPin, Phone, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import { categories } from "../../data/seedCategories";
import WhatsAppButton from "../common/WhatsAppButton";

const quickLinks = [
  ["Home", "/"],
  ["Brands", "/brands"],
  ["Products", "/products"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-brandRed bg-navyDark text-white reveal-on-scroll">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:px-10 lg:grid-cols-[1.35fr_0.7fr_0.9fr_1fr] lg:px-16">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-md bg-brandRed text-white"><Zap size={30} /></span>
            <div>
              <h2 className="text-2xl font-black">{SITE.businessName}</h2>
              <p className="mt-1 text-sm font-semibold text-slate-400">Since 1969</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">{SITE.footerSummary}</p>
          <div className="mt-7 space-y-4 text-base text-slate-300">
            <ContactLink icon={<MapPin size={22} />} href={SITE.mapUrl} external>{SITE.address}</ContactLink>
            <ContactLink icon={<Phone size={22} />} href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</ContactLink>
            <ContactLink icon={<Mail size={22} />} href={`mailto:${SITE.email}`}>{SITE.email}</ContactLink>
          </div>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />

        <div>
          <h3 className="text-xl font-black uppercase tracking-wide">Categories</h3>
          <div className="mt-5 grid gap-3 text-base text-slate-300">
            {categories.slice(0, 6).map((category) => <Link key={category.slug} to={`/products/${category.slug}`} className="transition hover:text-white">{category.name}</Link>)}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black uppercase tracking-wide">Contact</h3>
          <div className="mt-5 space-y-4 text-base leading-7 text-slate-300">
            <p>{SITE.businessHours}</p>
            <p>Sunday closed</p>
            <p>Send product requirements, catalogue requests, or quotation enquiries directly on WhatsApp.</p>
          </div>
          <WhatsAppButton context="footer" className="mt-6 w-full" />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
        <p>© 2026 {SITE.businessName}. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/contact" className="hover:text-white">Privacy Policy</Link>
          <Link to="/contact" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

function ContactLink({ icon, href, external = false, children }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-start gap-4 transition hover:text-white"
    >
      <span className="mt-1 text-orange">{icon}</span>
      <span>{children}</span>
    </a>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xl font-black uppercase tracking-wide">{title}</h3>
      <div className="mt-5 grid gap-3 text-base text-slate-300">
        {links.map(([label, to]) => <Link key={to} to={to} className="transition hover:text-white">{label}</Link>)}
      </div>
    </div>
  );
}
