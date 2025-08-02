import { IOrderItem } from './IOrderItem';

export interface IOrderRequest {
  orderDate: string; // ISO string
  status: string;
  orderItems: IOrderItem[];
  totalAmount: number;
}
