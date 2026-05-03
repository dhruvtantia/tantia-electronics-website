import BrandCard from "./BrandCard";

export default function BrandGrid({ brands }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {brands.map((brand) => <BrandCard key={brand.slug} brand={brand} />)}
    </div>
  );
}
