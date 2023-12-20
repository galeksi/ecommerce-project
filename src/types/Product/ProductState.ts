import { Product } from "./Product";

export interface ProductState {
  products: Product[];
  productCount: number;
  loading: boolean;
  error: string;
  success: string;
}
