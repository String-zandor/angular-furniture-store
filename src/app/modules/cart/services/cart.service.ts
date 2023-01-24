import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.serverUrl}/cart`);
  }

  create(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.serverUrl}/cart`, cartItem);
  }

  update(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.serverUrl}/cart/${cartItem.id}`, cartItem);
  }

  delete(id: number): Observable<CartItem> {
    return this.http.delete<CartItem>(`${this.serverUrl}/cart/${id}`);
  }

}
