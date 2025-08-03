import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrderRequest } from '../../models/IOrderRequest';
import { IOrderResponse } from '../../models/IOrderResponse';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:5180/api/Order';



  // user orders
  getOrders(): Observable<IOrderResponse[]> {
    return this.http.get<IOrderResponse[]>(this.baseUrl + '/myOrders');
  }

  // to admin
  getAllOrders(): Observable<IOrderResponse[]>{
    return this.http.get<IOrderResponse[]>(this.baseUrl);
  }

  createOrder(order: IOrderRequest): Observable<IOrderResponse> {
    return this.http.post<IOrderResponse>(this.baseUrl, order);
  }
}
