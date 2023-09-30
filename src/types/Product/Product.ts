import { Category } from "./Category";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string[];
}
