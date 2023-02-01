import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, Subscription, switchMap, tap } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  cartList: CartItem[] = [];
  subTotal: number = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private cartSvc: CartService,
    private check: CheckoutService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    const sub1 = this.cartSvc.cartList$.subscribe(cart => this.cartList = cart);
    const sub2 = this.cartSvc.getSubTotal().subscribe(subTotal => this.subTotal = subTotal);
    this.cartSvc.getCartItems().subscribe();

    this.subscriptions.push(sub1);
    this.subscriptions.push(sub2);
  }

  onAction(data: { cartItem: CartItem, action: string }): void {
    switch(data.action) {
      case 'REMOVE': this.removeFromCart(data.cartItem);
        break; 
      case 'UPDATE': this.updateCartItem(data.cartItem);
        break;
      default: break;
    }
  }

  updateCartItem(cartItem: CartItem) {
    this.cartSvc.update(cartItem).pipe(
      switchMap(() => this.cartSvc.getCartItems())
    ).subscribe();
  }

  removeFromCart(cartItem: CartItem): void {
    if (cartItem.id) {
      this.cartSvc.delete(cartItem.id).pipe(
        switchMap(() => this.cartSvc.getCartItems())
      ).subscribe(items => {
        if (items) {
          if (items) {
            this.snackBar.open('Item removed from cart', '', { duration: 1000 });
          }
        }
      });
    }
  }

  goToCheckout(): void {
    this.check.checkout(true);
    this.router.navigate(['checkout'], { relativeTo: this.route });
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
