import { Product } from "./Product";

export interface IItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  product:Product
}
