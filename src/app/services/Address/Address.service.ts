import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddress } from '../../models/IAddress';
import { IAddAddress } from '../../models/IAddAddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:5180/api/Address';

  getAddress(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(this.baseUrl);
  }

  addAddress(address: IAddAddress): Observable<IAddress> {
    return this.http.post<IAddress>(`${this.baseUrl}/add`, address);
  }
}
