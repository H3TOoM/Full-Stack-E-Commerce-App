import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../models/ICart';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl: string = 'http://e-commerce-fgf.runasp.net/api/Product';
  cartUrl: string = 'http://e-commerce-fgf.runasp.net/api/Cart/add';
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

  addProduct(product: any, image: File): Observable<any> {
    const formData = new FormData();

    formData.append('Title', product.title);
    formData.append('Description', product.description);
    formData.append('Price', product.price.toString());
    formData.append('CategoryId', product.categoryId.toString());
    formData.append('image', image);

    return this.http.post(`${this.baseUrl}`, formData);
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
