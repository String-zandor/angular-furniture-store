import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  
  private displaySubject = new BehaviorSubject<Product[]>([]);
  productsDisplay$: Observable<Product[]> = this.displaySubject.asObservable();

  private sortSubject = new BehaviorSubject<Product[]>([]);
  productsToSort$: Observable<Product[]> = this.sortSubject.asObservable();
  
  constructor(private productService: ProductService) { }
  
  updateDisplay(productList: Product[]): void {
    this.displaySubject.next(productList);
  }
  
  forSorting(productList: Product[]): void {
    this.sortSubject.next(productList);
  }

  displayAllProducts(): Observable<Product[]> {
    return this.productService.getProducts().pipe(
      tap(products => this.updateDisplay(products))
    );
  }
}
