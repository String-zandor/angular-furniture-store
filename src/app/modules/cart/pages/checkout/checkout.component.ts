import { Component, EventEmitter, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, from, of, Subscription, switchMap } from 'rxjs';
import { Order } from 'src/app/modules/order/models/order';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/modules/user/models/user';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { DialogData } from 'src/app/shared/models/dialog-data';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})

export class CheckoutComponent implements OnInit, OnDestroy {

  user?: User;
  cartItems: CartItem[] = [];
  totalAmountToPay!: number;
  subtotal!: number;
  deliveryfee: number = 100;
  subscriptions: Subscription[] = [];
  payment = new FormControl(null, Validators.required);
  orderPlaced: boolean = false;

  shippingForm = this.fb.group({
    name: ['', Validators.required],
    contact: ['', Validators.required],
    address: ['', Validators.required]
  });


  get name(): FormControl {
    return this.shippingForm.get('name') as FormControl;
  }

  get contact(): FormControl {
    return this.shippingForm.get('contact') as FormControl;
  }

  get address(): FormControl {
    return this.shippingForm.get('address') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private cartSvc: CartService,
    private orderSvc: OrderService,
    private router: Router,
    private auth: AuthService,
    private check: CheckoutService,
    public dialogSvc: DialogService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    const sub = this.cartSvc.subTotalCost$.subscribe(subTotal => {
      this.subtotal = subTotal;
      this.totalAmountToPay = this.subtotal + this.deliveryfee;
    });
    this.subscriptions.push(sub);

    this.cartSvc.getCartItems().subscribe(cart => this.cartItems = cart);

    this.auth.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.shippingForm.patchValue({
          name: `${user.firstName} ${user.lastName}`,
          contact: user.phone,
          address: user.address
        });
      }
    })
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
    this.check.checkout(false);
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeUnloadHandler(event: any) {
    event.returnValue = this.shippingForm.dirty;
  }

  async canExit(): Promise<boolean> {
    if ((this.shippingForm.untouched && !this.shippingForm.dirty) ||
      (this.orderPlaced)) {
      return true;
    }
    const result = await this.confirmExitDiscardChanges()
    if (result) {
      return result as boolean;
    }
    return false;
  }

  confirmExitDiscardChanges() {
    return new Promise(resolve => {
      const data: DialogData = {
        title: 'Confirm',
        content: 'Are you sure you want to exit this page? Changes will not be saved.',
        confirm: 'Confirm',
        cancel: 'Cancel'
      }
      this.dialogSvc.confirm(data).subscribe(confirmed => resolve(confirmed));
    })
  }

  openDialog(): void {
    const data: DialogData = {
      title: 'Confirm',
      content: 'Would you like to proceed with your order?',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
    this.dialogSvc.confirm(data).subscribe(confirmed => {
      if (confirmed) {
        this.proceedCheckout();
      }
    })
  }

  proceedCheckout() {
    if (this.cartItems.length > 0) {
      this.saveToOrderDataBase();
      let cart$ = from(this.cartItems);
      cart$.pipe(
        concatMap(item => {
          item.checkout = true;
          return (item.id) ? this.cartSvc.update(item) : of(null)
        }),
        switchMap(() => this.cartSvc.getCartItems())
      ).subscribe(() => this.redirectToHome())
    }
  }

  saveToOrderDataBase() {
    let order: Order = {
      user: (this.user?.id) ? this.user.id : -1,
      status: 'pending',
      subtotal: this.subtotal,
      deliveryfee: this.deliveryfee,
      total: this.totalAmountToPay,
      orderDate: new Date().toJSON(),
      cart: this.cartItems,
      shipping: {
        name: this.name.value,
        phone: this.contact.value,
        address: this.address.value
      }
    };

    this.orderSvc.create(order).subscribe(order => {
      if (order) {
        this.orderPlaced = true;
        this.snackBar.open('Order placed.', '', { duration: 1000, verticalPosition: 'top',
        horizontalPosition: 'right'});
      }
    });

  }

  redirectToHome() {
    this.router.navigate(['home'])
  }

}
