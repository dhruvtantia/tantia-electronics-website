import { brands, getBrandBySlug as getSeedBrandBySlug } from "../data/seedBrands";

export async function getBrands() {
  return brands.slice().sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getBrandBySlug(slug) {
  return getSeedBrandBySlug(slug);
}
