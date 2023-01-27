import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, count, map, Observable, of, Subscription, tap } from 'rxjs';
import { User } from '../../user/models/user';
import { AuthService } from '../../user/services/auth.service';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  
  serverUrl: string = 'http://localhost:3000';
  private subject = new BehaviorSubject<CartItem[]>([]);
  cartList$: Observable<CartItem[]> = this.subject.asObservable();
  subTotalCost$: Observable<number> = of(-1);
  user: User | null | undefined;
  sub?: Subscription;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.getCurrentUser();
    this.computeSubTotal();
  }

  getCurrentUser() {
    this.sub = this.auth.user$.subscribe(user => this.user = user);
  }

  computeSubTotal(): void {
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
      map(cart => cart.filter(cartItem => cartItem.userId === this.user?.id)),
      tap(cartItems => this.subject.next(cartItems)),
    );
  }

  getCartItemOfProduct(id: number): Observable<CartItem | null> {
    return this.getCartItems().pipe(
      map(cart => cart.find(cartItem => cartItem.product.id === id))
    ).pipe(
      map(cartItem => (cartItem) ? cartItem : null)
    );
  }

  getNoOfItems(): Observable<number> {
    return this.cartList$.pipe(
      map(cart => cart.length)
    );
  }

  create(cartItem: CartItem): Observable<CartItem> {
    cartItem.userId = this.user?.id;
    return this.http.post<CartItem>(`${this.serverUrl}/cart`, cartItem);
  }

  update(cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.serverUrl}/cart/${cartItem.id}`, cartItem);
  }

  delete(id: number): Observable<CartItem> {
    return this.http.delete<CartItem>(`${this.serverUrl}/cart/${id}`);
  }

  deleteAll() {
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
