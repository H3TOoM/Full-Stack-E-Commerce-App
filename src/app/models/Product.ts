import { IOrderItem } from "./IOrderItem";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  orderItems?:IOrderItem[]
}
