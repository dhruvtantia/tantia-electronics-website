import BrandCard from "../brands/BrandCard";

export default function RelatedBrands({ brands }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {brands.map((brand) => <BrandCard key={brand.slug} brand={brand} />)}
    </div>
  );
}
