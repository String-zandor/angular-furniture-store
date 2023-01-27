import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../order/models/order';

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.serverUrl}/orders`);
  }
}
