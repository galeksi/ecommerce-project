import { Product } from "./Product";

export interface ProductQuery {
  totalCount: number;
  data: Product[];
}
