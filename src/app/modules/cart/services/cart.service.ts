import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { Product } from '../../product/models/product';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  serverUrl: string = 'http://localhost:3000';
  private subject = new BehaviorSubject<CartItem[]>([]);
  cartList$: Observable<CartItem[]> = this.subject.asObservable();
  subTotalCost$: Observable<number> = of(-1);

  constructor(private http: HttpClient) {
    this.subTotalCost$ = this.cartList$.pipe(
      map(cartList => cartList.map(cartItem => cartItem.product.price * cartItem.qty)
        .reduce(((sum, val) => sum + val), 0)
    ));
  }

  getSubTotal(): Observable<number> {
      return this.subTotalCost$;
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.serverUrl}/cart`).pipe(
      tap(cartItems => this.subject.next(cartItems))
    );
  }

  getCartItemOfProduct(id: number): Observable<CartItem | null> {
    return this.getCartItems().pipe(
      map(cart => cart.find(cartItem => cartItem.product.id === id))
    ).pipe(
      map(cartItem => (cartItem) ? cartItem : null)
    );
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
