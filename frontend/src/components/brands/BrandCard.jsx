import BrandLogo from "../common/BrandLogo";
import Button from "../common/Button";
import CatalogueButton from "../common/CatalogueButton";
import WhatsAppButton from "../common/WhatsAppButton";

export default function BrandCard({ brand }) {
  const categoryLabels = brand.categories.slice(0, 3).map((category) => category.replaceAll("-", " "));
  const focusLine = brand.tagline || brand.shortDescription;
  const actions = (
    <>
      <Button to={`/brands/${brand.slug}`} variant="dark" className="rounded-md">View Products</Button>
      <CatalogueButton href={brand.catalogueUrl} context={brand.slug} />
      <WhatsAppButton message={`I am interested in ${brand.name} products. Please share availability and catalogue details.`} context={brand.slug}>Enquire</WhatsAppButton>
    </>
  );

  return (
    <article className="group relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-md border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-card reveal-on-scroll">
      <div className="flex items-start gap-4">
        <BrandLogo brand={brand} />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brandRed">Brand</p>
          <h3 className="mt-1 text-2xl font-black text-navy">{brand.name}</h3>
        </div>
      </div>
      <p className="mt-5 leading-7 text-mutedText">{brand.shortDescription}</p>
      <div className="mt-5 rounded-md border border-slate-200 bg-offWhite p-4">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">Product Focus</p>
        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-navy">{focusLine}</p>
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-xs font-black uppercase tracking-wide text-mutedText">
        <span>{brand.categories.length} Categories</span>
        <span>Catalogue Ready</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {categoryLabels.map((category) => <span key={category} className="rounded-full bg-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy">{category}</span>)}
      </div>
      <div className="mt-6 flex flex-wrap gap-3 md:hidden">
        {actions}
      </div>
      <div className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-navy/78 p-6 opacity-0 backdrop-blur-sm transition duration-300 group-hover:pointer-events-auto group-hover:opacity-100 md:flex">
        <div className="grid w-full max-w-xs gap-3 translate-y-3 transition duration-300 group-hover:translate-y-0">
          {actions}
        </div>
      </div>
    </article>
  );
}
