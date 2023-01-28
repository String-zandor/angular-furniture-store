import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { Order } from 'src/app/modules/order/models/order';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private auth: AuthService,
    private check: CheckoutService
  ) { }
  userName:string ='John Lazy'
  userContact:string ='09454278841'
  userAddress:string ='Lot 6 Mercury Street, Lourdes Subdivision, Quezon'
  cartItems: CartItem[] = [];
  totalAmmountToPay!: number;
  subtotal!: number;
  deliveryfee: number = 100;
  subscriptions: Subscription[] = [];
  date = new Date();

  ngOnInit(): void {
    this.loadCartItems();

    // this.auth.user$
  }
  ngOnDestroy(): void {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.check.checkout(false);
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
    this.totalAmmountToPay = subtotal + this.deliveryfee;
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
    let order: Order = {
      user: 1,
      status: 'pending',
      subtotal: this.subtotal,
      deliveryfee: this.deliveryfee,
      total: this.totalAmmountToPay,
      orderDate: this.date.toJSON(),
      cart: this.cartItems,
      shipping: {
        name: '',
        phone: '',
        address: ''
      }
    };
    let sub: Subscription = this.orderService.create(order).subscribe();
    this.subscriptions.push(sub);
  }

  redirectToHome() { /**redirect to HOME FOR NOW */
    this.router.navigate(['home'])
  }
}
