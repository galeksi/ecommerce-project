export interface ProductUpdate {
  id: number;
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}
