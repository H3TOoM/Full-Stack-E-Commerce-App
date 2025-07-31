import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../models/ICart';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:5180/api/Product';
  cartUrl: string = 'http://localhost:5180/api/Cart/add';
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  filterByCategory(name: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}/filterByCategory?name=${name}`
    );
  }

  addProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: number, product: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Add to Cart
  addTocart(id: number, quantity: number): Observable<ICart> {
    return this.http.post<ICart>(`${this.cartUrl}?productId=${id}&quantity=${quantity}`,null);
  }

  
}
