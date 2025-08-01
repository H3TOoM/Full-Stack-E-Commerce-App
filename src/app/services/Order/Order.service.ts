import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../../models/IOrder';
import { IOrderResponse } from '../../models/IOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private http:HttpClient) { }

baseUrl:string = 'http://localhost:5180/api/Order';

  addOrder(order: IOrder): Observable<IOrderResponse> {
  return this.http.post<IOrderResponse>(this.baseUrl, order);
}

}
