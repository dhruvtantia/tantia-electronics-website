import SectionHeader from "../common/SectionHeader";

export default function BrandFeaturedProducts({ brand }) {
  const products = (brand.featuredProducts || []).slice(0, 6);
  if (products.length === 0) return null;

  return (
    <section>
      <SectionHeader eyebrow="Featured Products" title={`Selected ${brand.name} products.`} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={`${brand.slug}-${product.name}`} className="flex h-full flex-col border border-border bg-white">
            <ProductImage product={product} brand={brand} />
            <div className="flex flex-1 flex-col p-5">
              {product.category && (
                <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">{product.category}</p>
              )}
              <h3 className="mt-2 text-xl font-black text-navy">{product.name}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-mutedText">{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductImage({ product, brand }) {
  if (product.imageUrl) {
    return (
      <div className="aspect-[4/3] bg-offWhite">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-offWhite p-6 text-center">
      <span className="text-sm font-black uppercase tracking-[0.18em] text-mutedText">{brand.abbreviation || brand.name}</span>
    </div>
  );
}
