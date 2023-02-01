import { Component, EventEmitter, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, from, map, Observable, of, Subscription, switchMap} from 'rxjs';
import { Order } from 'src/app/modules/order/models/order';
import { OrderService } from 'src/app/modules/order/services/order.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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

  isChangedValueForm:boolean = false

  ngOnInit(): void {
    this.loadCartItems();

    this.auth.user$.subscribe(user => {
      this.userId = user?.id
      this.userFullName = user?.firstName+' '+user?.lastName
      this.userContact = user?.phone
      this.userAddress = user?.address

      this.shippingForm.patchValue({
        name: user?.firstName+' '+user?.lastName,
        contact: user?.phone,
        address: user?.address
      })

      this.shippingForm.valueChanges.pipe(
        map((value)=>{return value})
      ).subscribe((value)=>{
        let name:boolean = this.userFullName === value.name
        let contact:boolean = this.userContact === value.contact
        let address:boolean = this.userAddress === value.address
        if(name && contact && address){
          this.isChangedValueForm = false
        }else{
          this.isChangedValueForm = true
        }
        console.log(name, contact, address)
        console.log(this.userFullName, ' ',value.name)
      })
      
    })
  }
  ngOnDestroy(): void {
    for (let subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.check.checkout(false);
  }

  @HostListener ('window:beforeunload', ['$event']) 
  public beforeUnloadHandler(event:any){
    console.log('is dirty form',this.isChangedValueForm)
    if(this.isChangedValueForm){
      event.returnValue = this.isChangedValueForm
    }
  }

  async canExit(): Promise<boolean>{
    let canExit:boolean = false
      if(!this.editInfo){
      return true
    }
    
    const result = await this.openDialogWhenExitingWithougChanges()
    if(result){
      // this.isDirtyForm = false
      return result as boolean
    }
    return canExit
  }

  openDialogWhenExitingWithougChanges(){
    return new Promise(resolve => {
      let dialogRef = this.dialog.open(DialogCanDeactivate, {
        width: '250px'
      });
      dialogRef.afterClosed().subscribe(result =>{
        resolve(result);
      })
    })
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
  // this.editInfo = false1
    // this.isDirtyForm = false
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
        // this.isDirtyForm = false
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
      let cart$ = from(this.cartItems);
      cart$.pipe(
        concatMap(item => {
          item.checkout = true;
          return (item.id) ? this.cartService.update(item) : of(null)
        }),
        switchMap(() => this.cartService.getCartItems())
      ).subscribe(() => this.redirectToHome())

      // this.saveToOrderDataBase();
      // for (let i = 0; i < this.cartItems.length; i++) {
      //   const item = this.cartItems[i];
      //   if (i === this.cartItems.length - 1) {
      //     this.cartService.delete(item.id as number).subscribe(() => {
      //       this.cartService.getCartItems().subscribe(() => this.redirectToHome());
      //     });
      //   } else {
      //     this.deleteCartItem(item.id as number);
      //   }
      // }
    }
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

export class DialogCanDeactivate{
  constructor(public dialogRef: MatDialogRef<DialogCanDeactivate>){}
  onYesClick(): void {
    console.log("Yes")
    this.dialogRef.close(true);
  }
  onNoClick(): void{
    console.log("no")
    this.dialogRef.close(false);
  }
}