import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5180/api/Auth';
  isFormOpen: boolean = false;
  constructor(private http: HttpClient) {}

  register(user: User) :Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', user);
  }

  login(email: string, password: string) :Observable<any>{
    return this.http.post<any>(this.baseUrl + '/login', { email, password });
  }


  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
