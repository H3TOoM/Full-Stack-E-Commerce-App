import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../models/ICart';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://localhost:5180/api/Product';
  cartUrl: string = 'http://localhost:5180/api/Cart/add';
  constructor(private http: HttpClient) {}

  getProducts() :Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }

  getProductById(id: number):Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  filterByCategory(name: string) {
    return this.http.get<Product[]>(
      `${this.baseUrl}/filterByCategory?name=${name}`
    );
  }

  addProduct(product: Product) {
    return this.http.post(this.baseUrl, product);
  }

  updateProduct(id: number, product: Product) {
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
