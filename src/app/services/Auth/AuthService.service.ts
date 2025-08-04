import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://e-commerce-fgf.runasp.net/api/Auth';
  isFormOpen: boolean = false;
  isAdmin: boolean = false;
  constructor(private http: HttpClient) {}

  private userLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  public IsLoggedIn$ = this.userLoggedIn.asObservable();

  private adminLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  public IsAdminLoggedIn$ = this.adminLoggedIn.asObservable();

  register(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/register', user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/login', { email, password });
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setLoginStatus(status: boolean) {
    this.userLoggedIn.next(status);
  }

  setLoginAdminStatus(status : boolean) {
    this.adminLoggedIn.next(status);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setLoginStatus(false);
  }
}
