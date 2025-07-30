import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5180/api/Auth';
  isFormOpen: boolean = false;
  constructor(private http: HttpClient) { }


  register(user : User) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + '/login', { email, password });
  }

 getCurrentUser() {
    return this.http.get<User>(this.baseUrl + '/getCurrentUser');
  }

}
