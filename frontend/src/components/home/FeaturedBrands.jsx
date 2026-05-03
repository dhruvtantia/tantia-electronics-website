import BrandGrid from "../brands/BrandGrid";

export default function FeaturedBrands({ brands }) {
  return <BrandGrid brands={brands.filter((brand) => brand.featured).slice(0, 9)} />;
}
