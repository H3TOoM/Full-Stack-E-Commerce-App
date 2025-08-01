import { IOrderItem } from "./IOrderItem";


export interface IOrder {
    orderDate: string; // ISO string
  status: string;
  orderItems: IOrderItem[];
  totalAmount: number;
}
