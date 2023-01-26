import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getOrders(userId: number): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.serverUrl}/orders`).pipe(map(orders => orders.filter(order => order.user === userId)))
  }
}
