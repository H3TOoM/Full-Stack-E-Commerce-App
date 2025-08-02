import { Product } from "./Product";

export interface IOrderItem {
  productId: number;
  quantity: number;
  product?:Product
}
