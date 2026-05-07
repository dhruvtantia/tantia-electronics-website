import BrandLogo from "../common/BrandLogo";
import CatalogueRequestButton from "../common/CatalogueRequestButton";
import SectionLabel from "../common/SectionLabel";
import WhatsAppButton from "../common/WhatsAppButton";

export default function BrandDetailHero({ brand }) {
  return (
    <section className="bg-offWhite py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <BrandLogo brand={brand} size="lg" />
            <div>
              <SectionLabel>Brand</SectionLabel>
              <h1 className="mt-2 text-4xl font-black text-navy md:text-6xl">{brand.name}</h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-mutedText">{brand.tagline || brand.shortDescription}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton message={`I am interested in ${brand.name} products. Please share availability and catalogue details.`} context={brand.slug} />
            <CatalogueRequestButton to={`/brands/${brand.slug}#enquiry`} context={brand.slug} />
            {brand.manufacturerWebsite && <a className="border border-border bg-white px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy" href={brand.manufacturerWebsite}>Manufacturer Site</a>}
          </div>
        </div>
      </div>
    </section>
  );
}
