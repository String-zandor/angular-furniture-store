import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, debounce, debounceTime, delay, of, Subscription, switchMap } from 'rxjs';
import { CartItem } from '../../models/cart-item';
import { OrderItem } from '../../models/order-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) { }

  cartItems: CartItem[] = [];
  totalAmmountToPay!: number;
  subtotal!: number;
  deliveryFee: number = 100;
  subscriptions: Subscription[] = [];
  date = new Date();

  ngOnInit(): void {
    this.loadCartItems();
  }
  ngOnDestroy(): void {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  loadCartItems(): void {
    let sub: Subscription = this.cartService
      .getCartItems()
      .subscribe((items: CartItem[]) => {
        this.cartItems = items;
        this.getTotalPrice(items);
      });
    this.subscriptions.push(sub);
  }

  getTotalPrice(cartItems: CartItem[]) {
    var subtotal: number = 0;
    for (let amount of cartItems) {
      subtotal += amount.product.price * amount.qty;
    }
    this.subtotal = subtotal;
    this.totalAmmountToPay = subtotal + this.deliveryFee;
  }

  proceedCheckout() {
    if (this.cartItems.length > 0) {
      this.saveToOrderDataBase();
      // this.cartItems.forEach((item: CartItem) => {
      //   this.deleteCartItem(item.id as number)
      // });
      for (let i = 0; i < this.cartItems.length; i++) {
        const item = this.cartItems[i];
        if (i === this.cartItems.length - 1) {
          this.cartService.delete(item.id as number).subscribe(() => {
            this.cartService.getCartItems().subscribe(() => this.redirectToHome());
          });
        } else {
          this.deleteCartItem(item.id as number);
        }
      }
    }
  }

  deleteCartItem(id: number) {
    //test
    console.log('inside deleteCartItem')
    let sub: Subscription = this.cartService.delete(id).subscribe();
    this.subscriptions.push(sub);
  }
  saveToOrderDataBase() {
    let orderItem: OrderItem = {
      status: 'pending',
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      totalPrice: this.totalAmmountToPay,
      orderDate: this.date.toJSON(),
      cart: this.cartItems,
    };
    let sub: Subscription = this.orderService.create(orderItem).subscribe();
    this.subscriptions.push(sub);
  }

  redirectToHome() { /**redirect to HOME FOR NOW */
    this.router.navigate(['home'])
  }
}
