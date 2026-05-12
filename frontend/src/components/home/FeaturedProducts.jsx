import Button from "../common/Button";
import SectionHeader from "../common/SectionHeader";

function productEnquiryPath(brand, product) {
  const params = new URLSearchParams({ product: product.name });
  return `/brands/${brand.slug}?${params.toString()}#enquiry`;
}

export default function FeaturedProducts({ brands }) {
  const products = brands
    .filter((brand) => brand.featured)
    .flatMap((brand) => (brand.featuredProducts || []).slice(0, 1).map((product) => ({ brand, product })))
    .slice(0, 8);

  if (products.length === 0) return null;

  return (
    <section className="bg-offWhite py-20 reveal-on-scroll">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Top Product Picks"
          title="Fast-moving products buyers ask for."
          body="A quick look at selected product ranges across supplied brands. Open a brand page to request catalogue details, availability and suitable options."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map(({ brand, product }) => (
            <article key={`${brand.slug}-${product.name}`} className="flex h-full flex-col overflow-hidden border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-card">
              <div className="aspect-[4/3] bg-offWhite">
                <img src={product.imageUrl} alt={`${product.name} from ${brand.name}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">{brand.name}</p>
                <h3 className="mt-2 text-xl font-black leading-tight text-navy">{product.name}</h3>
                <p className="mt-2 text-sm font-bold text-mutedText">{product.category}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-mutedText">{product.description}</p>
                <div className="mt-5 grid gap-2">
                  <Button to={`/brands/${brand.slug}`} variant="dark" className="w-full rounded-md" icon={false}>View Brand</Button>
                  <Button to={productEnquiryPath(brand, product)} variant="secondary" className="w-full rounded-md" icon={false}>Enquire</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
