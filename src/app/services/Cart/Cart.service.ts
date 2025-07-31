import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../../models/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http:HttpClient) { }

baseUrl:string = 'http://localhost:5180/api/Cart';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

  getCartCount(): number {
    return this.cartCount.value;
  }

  getCartItem():Observable<ICart>{
    return this.http.get<ICart>(this.baseUrl);
  }


}
