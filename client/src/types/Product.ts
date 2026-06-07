// types/Product.ts

export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  unit: string;
  stock_quantity: number;
  farmer: string;
  location: string;
  price: number;
  image: string;
  user_id: number;
  description?: string;
  status?: string;
  phone?: string;
}
