import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5180/api/Category';

  getCategories():Observable<Category[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Category[]>(this.baseUrl, { headers });
  }

  getCategoryById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCategory(category: any) {
    return this.http.post(this.baseUrl, category);
  }

  updateCategory(id: number, category: any) {
    return this.http.put(`${this.baseUrl}/${id}`, category);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
