import { Product } from "./Product";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
  success: string;
}
