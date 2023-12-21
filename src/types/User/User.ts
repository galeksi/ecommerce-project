import { Address } from "../Address/Address";
import { Order } from "../Order/Order";
import { Review } from "../Review/Review";

export interface User {
  id: string;
  role: "Customer" | "Admin";
  name: string;
  email: string;
  avatar: string;
  addresses?: Address[];
  reviews?: Review[];
  orders?: Order[];
}
