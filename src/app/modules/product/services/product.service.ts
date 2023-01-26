import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../../cart/services/cart.service';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serverUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private cartService: CartService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.serverUrl}/products`);
  }

}
