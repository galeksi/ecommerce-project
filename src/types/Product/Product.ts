import { Category } from "../Category/Category";
import { Image } from "../Image/Image";
import { Review } from "../Review/Review";

export interface Product {
  id: string;
  title: string;
  price: number;
  inventory: number;
  description: string;
  category: Category;
  images: Image[];
  reviews: Review[];
}
