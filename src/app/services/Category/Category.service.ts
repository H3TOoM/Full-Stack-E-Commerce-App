import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://e-commerce-fgf.runasp.net/api/Category';

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getCategoryById(id: number):Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`);
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(id: number, category: Category) {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
