export interface ProductUpdate {
  id: string;
  categoryId?: string;
  title?: string;
  description?: string;
  price?: number;
  inventory?: number;
}
