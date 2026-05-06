import { Link } from "react-router-dom";
import BrandLogo from "../common/BrandLogo";

export default function BrandRibbon({ brands }) {
  const ribbonItems = [...brands, ...brands];

  return (
    <section className="overflow-hidden bg-navy py-14 text-white reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-yellow">Authorised Dealer & Distributor</p>
      </div>
      <div className="brand-ribbon-mask mt-8 overflow-hidden py-2">
        <div className="brand-ribbon-track flex w-max gap-8 px-6 motion-reduce:animate-none md:px-10 lg:px-16">
          {ribbonItems.map((brand, index) => (
            <Link
              key={`${brand.slug}-${index}`}
              to={`/brands/${brand.slug}`}
              className="flex h-72 w-72 shrink-0 flex-col items-center justify-between rounded-xl border border-white/20 bg-white/[0.09] p-6 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_20px_55px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:-translate-y-1 hover:border-yellow/70 hover:bg-white/[0.14]"
              aria-label={`View ${brand.name}`}
            >
              <p className="line-clamp-2 min-h-10 text-base font-black leading-5 text-white">{brand.name}</p>
              <div className="flex h-28 w-56 items-center justify-center rounded-lg border border-white/20 bg-white/95 p-4 text-3xl font-black text-navy">
                {brand.logoUrl ? (
                  <img src={brand.logoUrl} alt={`${brand.name} logo`} className="max-h-full max-w-full object-contain" />
                ) : (
                  brand.abbreviation
                )}
              </div>
              <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-200">{brand.tagline || brand.shortDescription}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
