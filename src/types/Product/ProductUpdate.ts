export interface ProductUpdate {
  id: string;
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}
