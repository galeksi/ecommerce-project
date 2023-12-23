import { NewImage } from "../Image/NewImage";

export interface NewProduct {
  title: string;
  description: string;
  price: number;
  inventory: number;
  categoryId: string;
  imageUrls: string[];
}
