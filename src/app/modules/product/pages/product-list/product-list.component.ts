import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription, switchMap } from 'rxjs';
import { CartItem } from 'src/app/modules/cart/models/cart-item';
import { CartService } from 'src/app/modules/cart/services/cart.service';
import { User } from 'src/app/modules/user/models/user';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { Product } from '../../models/product';
import { DisplayService } from '../../services/display.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  @Input() products$?: Observable<Product[]>;
  productsDisplay$?: Observable<Product[]>;
  productsToSort$?: Observable<Product[]>;

  subscriptions: Subscription[] = [];
  user: User | null = null;

  constructor(
    private cartSvc: CartService,
    private auth: AuthService,
    private displaySvc: DisplayService,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {
    this.productsDisplay$ = this.displaySvc.productsDisplay$;
    this.productsToSort$ = this.displaySvc.productsToSort$;
    this.getProducts();
    this.cartSvc.getCartItems().subscribe();
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.subscriptions.push(
      this.auth.user$.subscribe(user => this.user = user)
    );
  }

  getProducts() {
    this.subscriptions.push(
      this.products$!.subscribe(products => {
        this.displaySvc.updateDisplay(products)
      })
    );
  }

  filter(filteredList: Product[]): void {
    this.displaySvc.forSorting(filteredList);
  }

  sort(sortedList: Product[]): void {
    this.displaySvc.updateDisplay(sortedList);
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
        switchMap(item => {
          return (item) ? this.cartSvc.getCartItems() : of(null);
        })
      ).subscribe(items => {
        if (items) {
          this.snackBar.open('Added to cart successfully', '', { duration: 1000 });
        }
      })
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
