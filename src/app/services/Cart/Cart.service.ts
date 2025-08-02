import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../../models/ICart';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:5180/api/Cart';

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  getCart(): Observable<ICart> {
    return this.http.get<ICart>(this.baseUrl);
  }

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

  getCartCount(): number {
    return this.cartCount.value;
  }

  getCartItem(): Observable<ICart> {
    return this.http.get<ICart>(this.baseUrl);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.baseUrl}/remove?productId=${id}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(this.baseUrl + '/clear').pipe(
      tap(() => {
        this.cartCount.next(0);
      })
    );
  }
}
