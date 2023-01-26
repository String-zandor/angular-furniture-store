import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  serverUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getCartItems(): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(`${this.serverUrl}/orders`);
  }

  create(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(`${this.serverUrl}/orders`, orderItem);
  }

  update(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.serverUrl}/orders/${orderItem.id}`, orderItem);
  }

  // delete(id: number){
  //   return this.http.delete(`${this.serverUrl}/orders/${id}`);
  // }
  delete(id: number): Observable<OrderItem>{
    return this.http.delete<OrderItem>(`${this.serverUrl}/orders?id=${id}`);
  }
}
