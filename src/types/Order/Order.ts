import { Address } from "cluster";
import { OrderProduct } from "./OrderProduct";

export interface Order {
  id: number;
  status: "Pending" | "Sent" | "Delivered" | "Cancelled";
  Address: Address;
  products: OrderProduct[];
}
