import { IOrderItem } from "./IOrderItem";

export interface IOrderResponse {
  id: number;
  userId: number;
  orderDate: string; // ISO Date string
  status: string;
  orderItems:IOrderItem[]
  totalAmount: number;
}
