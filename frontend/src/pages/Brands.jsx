import SEO from "../components/common/SEO";
import SectionHeader from "../components/common/SectionHeader";
import BrandGrid from "../components/brands/BrandGrid";
import { SEO as SEO_CONFIG } from "../config/seo";
import { brands } from "../data/seedBrands";

export default function Brands() {
  return (
    <>
      <SEO {...SEO_CONFIG.brands} />
      <section className="bg-offWhite py-16 hero-entrance">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <SectionHeader
            eyebrow="Brand Portfolio"
            title="Trusted Indian brands, distributed by Tantia Electronics."
            body="We work with established manufacturers across wires & cables, switchgear, fuses, connectors, soldering and electronics - bringing quality, catalogue-supported supply to B2B buyers."
          />
        </div>
      </section>
      <section className="bg-white py-20 reveal-on-scroll">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <BrandGrid brands={brands} />
        </div>
      </section>
    </>
  );
}
