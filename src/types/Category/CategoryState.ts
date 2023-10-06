import { Category } from "./Category";

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string;
}
