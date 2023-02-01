import { Component, OnDestroy, OnInit } from '@angular/core';
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
    private cartService: CartService,
    private check: CheckoutService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const sub1 = this.cartService.cartList$.subscribe(cart => this.cartList = cart);
    const sub2 = this.cartService.getSubTotal().subscribe(subTotal => this.subTotal = subTotal);
    this.cartService.getCartItems().subscribe();

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
    this.cartService.update(cartItem).subscribe();
  }

  removeFromCart(cartItem: CartItem): void {
    if (cartItem.id) {
      this.cartService.delete(cartItem.id).pipe(
        switchMap(() => this.cartService.getCartItems())
      ).subscribe();
    }
  }

  /**
   * TODO: update CartService to monitor this so that this is the only access to checkout
   */
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
