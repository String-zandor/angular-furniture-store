import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { Order } from 'src/app/modules/order/models/order';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private check: CheckoutService,
    public dialog: MatDialog
  ) { }
  userFullName?:string
  userContact?:string
  userAddress?:string
  userId?:number
  cartItems: CartItem[] = [];
  totalAmmountToPay!: number;
  subtotal!: number;
  deliveryfee: number = 100;
  subscriptions: Subscription[] = [];
  date = new Date();
  editInfo = false
  shippingForm = new FormGroup({
    name: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })
  customClass:string ='removeDesign'

  

  ngOnInit(): void {
    this.loadCartItems();

    this.auth.user$.subscribe(user => {
      this.userId = user?.id
      this.userFullName = user?.firstName+' '+user?.lastName
      this.userContact = user?.phone
      this.userAddress = user?.address

      this.shippingForm.patchValue({
        name: this.userFullName,
        contact: this.userContact,
        address: this.userAddress
      })
      
    })
  }
  ngOnDestroy(): void {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.check.checkout(false);
  }

  canExit(): boolean {
    if(!this.editInfo){
      return true
    }
    if(confirm("Do you want to close this page without saving the details?")){
      return true;
    }else{
      return false
    }
  }

  editShippingForm(){
    this.customClass = 'toggleRemoveDesign'
    this.editInfo = true
  }
  onSubmitShippingForm(){
    if(!this.shippingForm.valid){
      return
    }
    this.userFullName = this.shippingForm.value.name? this.shippingForm.value.name: '';
    this.userContact = this.shippingForm.value.contact? this.shippingForm.value.contact: ''
    this.userAddress = this.shippingForm.value.address? this.shippingForm.value.address: ''
    this.customClass = 'removeDesign'
    this.editInfo = false
  }
  openDialog(): void {
    if(!this.editInfo){
      let dialogRef = this.dialog.open(DialogProceedCheckout, {
        width: '250px'
      });
      const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
        this.proceedCheckout()
      });
      // dialogRef.afterClosed().subscribe(() => {
      //   // unsubscribe onAdd
      // });
    }else{
      let dialogRef = this.dialog.open(DialogProceedCheckoutWithoutSaving, {
        width: '250px'
      });
      const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
        this.proceedCheckout()
      });
      
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
    this.totalAmmountToPay = subtotal + this.deliveryfee;
  }

  proceedCheckout() {
    if (this.cartItems.length > 0) {
      this.saveToOrderDataBase();
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
    console.log('inside deleteCartItem')
    let sub: Subscription = this.cartService.delete(id).subscribe();
    this.subscriptions.push(sub);
  }
  saveToOrderDataBase() {
    let order: Order = {
      user: this.userId ? this.userId : 0,
      status: 'pending',
      subtotal: this.subtotal,
      deliveryfee: this.deliveryfee,
      total: this.totalAmmountToPay,
      orderDate: this.date.toJSON(),
      cart: this.cartItems,
      shipping: {
        name: this.userFullName ? this.userFullName: '',
        phone: this.userContact ? this.userContact: '',
        address: this.userAddress ? this.userAddress: ''
      }
    };
    let sub: Subscription = this.orderService.create(order).subscribe();
    this.subscriptions.push(sub);
  }

  redirectToHome() { /**redirect to HOME FOR NOW */
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

export class DialogProceedCheckout{
  constructor(public dialogRef: MatDialogRef<DialogProceedCheckout>){}
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

export class DialogProceedCheckoutWithoutSaving{
  constructor(public dialogRef: MatDialogRef<DialogProceedCheckoutWithoutSaving>){}
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