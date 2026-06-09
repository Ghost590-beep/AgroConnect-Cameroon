import type { Product } from "../types/Product";

export interface ProductFilterOptions {
  keyword?: string;
  category?: string;
  subcategory?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
}

export const filterProducts = (
  products: Product[],
  filters: ProductFilterOptions,
): Product[] => {
  const keyword = filters.keyword?.trim().toLowerCase() || "";
  const category = filters.category?.trim() || "";
  const subcategory = filters.subcategory?.trim() || "";
  const location = filters.location?.trim() || "";
  const minPrice = filters.minPrice ? Number(filters.minPrice) : undefined;
  const maxPrice = filters.maxPrice ? Number(filters.maxPrice) : undefined;

  return products.filter((product) => {
    if (category && category !== "All Categories") {
      if (product.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    if (subcategory) {
      if (product.subcategory.toLowerCase() !== subcategory.toLowerCase()) {
        return false;
      }
    }

    if (location && location !== "All Locations") {
      if (!product.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
    }

    if (minPrice !== undefined && !Number.isNaN(minPrice)) {
      if (product.price < minPrice) {
        return false;
      }
    }

    if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
      if (product.price > maxPrice) {
        return false;
      }
    }

    if (keyword) {
      const haystack = [
        product.name,
        product.description || "",
        product.farmer || "",
        product.location || "",
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(keyword)) {
        return false;
      }
    }

    return true;
  });
};
