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
  date = new Date();
  payment = new FormControl(null, Validators.required);

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

  customClass: string = 'removeDesign'

  isChangedValueForm: boolean = false

  constructor(
    private fb: FormBuilder,
    private cartSvc: CartService,
    private orderSvc: OrderService,
    private router: Router,
    private auth: AuthService,
    private check: CheckoutService,
    public dialog: MatDialog,
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
    if (this.shippingForm.untouched && !this.shippingForm.dirty) {
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
      let dialogRef = this.dialog.open(DialogCanDeactivate, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result => {
        resolve(result);
      })
    })
  }

  openDialog(): void {
    if (this.shippingForm.untouched && !this.shippingForm.dirty) {
      let dialogRef = this.dialog.open(DialogProceedCheckout, {
        width: '250px'
      });
      const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
        this.proceedCheckout();
      });
    } else {
      let dialogRef = this.dialog.open(DialogProceedCheckoutWithoutSaving, {
        width: '250px'
      });
      const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
        // this.isDirtyForm = false
        this.proceedCheckout()
      });

    }
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
        this.snackBar.open('Order placed.', '', { duration: 1000 });
      }
    });
    
  }

  redirectToHome() {
    this.router.navigate(['home'])
  }

}

/**
 * Dialogbox when proceeding to checkout
 */
@Component({
  selector: 'proceed-dialog',
  templateUrl: './checkout-dialog-proceed.html',
  styleUrls: ['./checkout-dialog-proceed.scss'],
})

export class DialogProceedCheckout {
  constructor(public dialogRef: MatDialogRef<DialogProceedCheckout>) { }
  onAdd = new EventEmitter();
  onNoClick(): void {
    console.log("no")
    this.dialogRef.close();
  }
  onYesClick(): void {
    console.log("Yes")
    this.dialogRef.close();
    this.onAdd.emit();
  }
}


/**
 * Dialogbox when proceeding without saving the shipping details
 */
@Component({
  selector: 'proceed-dialog',
  templateUrl: './checkout-dialog-without-saving-info.html',
  styleUrls: ['./checkout-dialog-without-saving-info.scss'],
})

export class DialogProceedCheckoutWithoutSaving {
  constructor(public dialogRef: MatDialogRef<DialogProceedCheckoutWithoutSaving>) { }
  onAdd = new EventEmitter();
  onNoClick(): void {
    console.log("no")
    this.dialogRef.close();
  }
  onYesClick(): void {
    console.log("Yes")
    this.dialogRef.close();
    this.onAdd.emit();
  }
}

export interface DialogData {
  exit: boolean;
}
/**
 * Dialogbox for canDeactivate
 */
@Component({
  selector: 'proceed-dialog',
  templateUrl: './checkout-can-deactivate.html',
  styleUrls: ['./checkout-can-deactivate.scss'],
})

export class DialogCanDeactivate {
  constructor(public dialogRef: MatDialogRef<DialogCanDeactivate>) { }
  onYesClick(): void {
    console.log("Yes")
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    console.log("no")
    this.dialogRef.close(false);
  }
}