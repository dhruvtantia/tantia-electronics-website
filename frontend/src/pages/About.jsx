import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import StatCard from "../components/common/StatCard";
import Button from "../components/common/Button";
import WhatsAppButton from "../components/common/WhatsAppButton";
import { SEO as SEO_CONFIG } from "../config/seo";

const values = [
  "55+ years of trade legacy",
  "Delhi-based legacy supplier",
  "B2B distribution & dealer network",
  "Wide product categories",
  "Pan-India enquiry handling",
  "Quality product assurance",
];

export default function About() {
  return (
    <>
      <SEO {...SEO_CONFIG.about} />
      <section className="bg-offWhite py-20 hero-entrance">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-brandRed">About Tantia Electronics</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-navy md:text-7xl">A 55+ year Delhi legacy in electrical & electronics distribution.</h1>
          <p className="mt-6 text-lg leading-8 text-mutedText">
            Tantia Electronics Co. has spent over five decades supplying quality electrical goods and electronic components to dealers, contractors, panel-builders, OEMs and industrial buyers across Delhi NCR and major Indian cities.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            <StatCard value="55+" label="Years in Business" />
            <StatCard value="15" label="Trusted Brands" />
            <StatCard value="10" label="Product Categories" />
            <StatCard value="Pan-India" label="Supply Reach" />
          </div>
        </div>
      </section>
      <section className="bg-white py-20 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <SectionHeader eyebrow="What Defines Us" title="Built on relationships, sustained by reliability." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => <div key={value} className="border border-border bg-white p-6 text-xl font-black text-navy shadow-sm">{value}</div>)}
          </div>
        </div>
      </section>
      <section className="bg-navy py-20 text-white reveal-on-scroll">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow">Get In Touch</p>
          <h2 className="mt-4 text-4xl font-black">Looking for a reliable B2B supply partner? Let's talk.</h2>
          <div className="mt-8 flex justify-center gap-3">
            <WhatsAppButton context="about-cta" />
            <Button to="/contact" variant="yellow">Request a Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
