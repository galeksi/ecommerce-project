import { Product } from "../Product/Product";

export interface UpdateProductFormProps {
  product: Product;
  onClose: () => void;
}
