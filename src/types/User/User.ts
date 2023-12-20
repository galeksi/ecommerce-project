import { Address } from "../Address/Address";
import { Review } from "../Review/Review";

export interface User {
  id: string;
  role: "Customer" | "Admin";
  name: string;
  email: string;
  avatar: string;
  addresses: Address[];
  reviews: Review[];
}
