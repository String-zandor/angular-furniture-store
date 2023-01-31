import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { CartService } from '../../cart/services/cart.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl: string = 'http://localhost:3000';

  private subject = new BehaviorSubject<Product[]>([]);
  allProducts$: Observable<Product[]> = this.subject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serverUrl}/products`).pipe(
      tap(allProducts => this.subject.next(allProducts))
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.serverUrl}/products/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.serverUrl}/products`, product);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.serverUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.serverUrl}/products/${id}`);
  }

}
