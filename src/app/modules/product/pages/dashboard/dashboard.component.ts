import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AdminProductComponent } from '../admin-product/admin-product.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /** 
   * to be refactored into a DisplayService
   */
  private subject = new BehaviorSubject<Product[]>([]);
  productsDisplay$: Observable<Product[]> = this.subject.asObservable();
  allProducts$?: Observable<Product[]>;

  private sortSubject = new BehaviorSubject<Product[]>([]);
  productsToSort$?: Observable<Product[]> = this.sortSubject.asObservable();
  
  constructor(
    private productService: ProductService, 
    private cartService: CartService) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.allProducts$ = this.productService.getProducts();
    this.productService.getProducts().subscribe(products => {
      this.subject.next(products);
      this.sortSubject.next(products);
    });
  }

  filter(filteredList: Product[]): void {
    this.sortSubject.next(filteredList);
  }

  sort(sortedList: Product[]): void {
    this.subject.next(sortedList);
  }

  search(searchResult: Product[]): void {
    this.subject.next(searchResult);
  }

  addToCart(cartItem: CartItem): void {
    this.cartService.getCartItemOfProduct(cartItem.product.id).subscribe((item) => {
      if (item) {
        item.qty += cartItem.qty;
        this.cartService.update(item).subscribe();
      } else {
        this.cartService.create(cartItem).subscribe();
      }
    });
    
  }

}
