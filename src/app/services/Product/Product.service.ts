import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = 'http://localhost:5180/api/Product';
constructor(private http:HttpClient) { }


  getProducts() {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
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

}
