import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../order/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  serverUrl: string = 'http://localhost:3000';
  constructor(private http:HttpClient) { }

  getCartItems(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.serverUrl}/orders`);
  }

  create(orderItem: Order): Observable<Order> {
    return this.http.post<Order>(`${this.serverUrl}/orders`, orderItem);
  }

  update(orderItem: Order): Observable<Order> {
    return this.http.put<Order>(`${this.serverUrl}/orders/${orderItem.id}`, orderItem);
  }

  // delete(id: number){
  //   return this.http.delete(`${this.serverUrl}/orders/${id}`);
  // }
  delete(id: number): Observable<Order>{
    return this.http.delete<Order>(`${this.serverUrl}/orders?id=${id}`);
  }
}
