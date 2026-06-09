import { describe, expect, it } from "vitest";
import { filterProducts } from "../utils/filterProducts";

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    subcategory: "Tomatoes",
    unit: "kg",
    stock_quantity: 10,
    farmer: "John Doe",
    location: "Yaoundé",
    price: 2000,
    image: "tomatoes.jpg",
    user_id: 2,
    description: "Sweet and ripe tomatoes",
  },
  {
    id: 2,
    name: "Organic Corn",
    category: "Grains",
    subcategory: "Corn",
    unit: "kg",
    stock_quantity: 5,
    farmer: "Jane Doe",
    location: "Bamenda",
    price: 1500,
    image: "corn.jpg",
    user_id: 3,
    description: "High-quality organic corn",
  },
  {
    id: 3,
    name: "Rice Bag",
    category: "Grains",
    subcategory: "Rice",
    unit: "kg",
    stock_quantity: 20,
    farmer: "Agro Farmer",
    location: "Yaoundé",
    price: 5000,
    image: "rice.jpg",
    user_id: 4,
    description: "Premium rice",
  },
];

describe("filterProducts utility", () => {
  it("returns all products when no filters are applied", () => {
    expect(filterProducts(products, {})).toHaveLength(3);
  });

  it("filters by category", () => {
    const filtered = filterProducts(products, { category: "Grains" });
    expect(filtered.map((item) => item.id)).toEqual([2, 3]);
  });

  it("filters by keyword", () => {
    const filtered = filterProducts(products, { keyword: "organic" });
    expect(filtered.map((item) => item.id)).toEqual([2]);
  });

  it("filters by minPrice and maxPrice", () => {
    const filtered = filterProducts(products, { minPrice: "1500", maxPrice: "4000" });
    expect(filtered.map((item) => item.id)).toEqual([1, 2]);
  });

  it("filters by location and subcategory together", () => {
    const filtered = filterProducts(products, {
      location: "Yaoundé",
      subcategory: "Rice",
    });
    expect(filtered.map((item) => item.id)).toEqual([3]);
  });
});
