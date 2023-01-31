import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, switchMap, tap } from 'rxjs';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { User } from 'src/app/modules/user/models/user';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** 
   * to be refactored into a DisplayService
   */
  private subject = new BehaviorSubject<Product[]>([]);
  productsDisplay$: Observable<Product[]> = this.subject.asObservable();
  allProducts$?: Observable<Product[]>;

  private sortSubject = new BehaviorSubject<Product[]>([]);
  productsToSort$?: Observable<Product[]> = this.sortSubject.asObservable();
  subscriptions: Subscription[] = [];
  user: User | null = null;
  
  constructor(
    private productService: ProductService, 
    private cartSvc: CartService,
    private auth: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.getLoggedUser();
    this.getProducts();
    this.cartSvc.getCartItems().subscribe();
  }

  getLoggedUser() {
    this.subscriptions.push(
      this.auth.user$.subscribe(user => this.user = user)
    );
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

  addToCart(cartItem: CartItem): void {
    if (this.user) {
      this.cartSvc.getCartItemOfProduct(cartItem.product.id).pipe(
        switchMap(item => {
          if (item) {
            item.qty += cartItem.qty;
            return this.cartSvc.update(item);
          } else {
            return this.cartSvc.create(cartItem);
          }
        }),
      ).subscribe(() => this.cartSvc.getCartItems().subscribe());
    } else {
      this.router.navigate(['/profile/login']);
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

}
