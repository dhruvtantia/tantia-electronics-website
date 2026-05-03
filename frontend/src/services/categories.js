import { categories, getCategoryBySlug as getSeedCategoryBySlug } from "../data/seedCategories";

export async function getCategories() {
  return categories.slice().sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug) {
  return getSeedCategoryBySlug(slug);
}
