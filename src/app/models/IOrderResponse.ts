export interface IOrderResponse {
  id: number;
  userId: number;
  orderDate: string; // ISO Date string
  status: string;
  totalAmount: number;
}
