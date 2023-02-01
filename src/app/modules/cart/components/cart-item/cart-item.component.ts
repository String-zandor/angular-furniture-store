import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Subscription, tap } from 'rxjs';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {

  @Input() cartItem!: CartItem;
  @Output() onAction = new EventEmitter();

  constructor(private snackBar: MatSnackBar){}

  qtyCtrl = new FormControl(1);
  currentVal: number = 1;
  subscriptions: Subscription[] = [];
  previousVal: number = 1;

  ngOnInit(): void {
    this.currentVal = this.cartItem.qty;
    const sub = this.qtyCtrl.valueChanges.pipe(
      tap(value => {
        this.previousVal = this.currentVal;
        this.currentVal = Number(value);
      }),
      debounceTime(400),
    ).subscribe(() => {
      if (this.currentVal != this.previousVal &&
        this.currentVal && 
        this.currentVal >= 1) {
        this.executeAction('UPDATE')
      }

    })
    this.qtyCtrl.setValue(this.cartItem.qty);

     //for snackbar
     this.snackBar.open('Item deleted.', '', {
      duration: 500
    });
    this.subscriptions.push(sub);
   
  }

  addQuantity() {
    console.log('curretVal inside addQuantity',this.currentVal)
    if (this.currentVal < 0 || Number.isNaN(this.currentVal)) {
      this.currentVal = 0;
    }
    this.qtyCtrl.setValue(this.currentVal + 1);
  }

  subractQuantity() {
    if (this.currentVal > 1) {
      this.qtyCtrl.setValue(this.currentVal - 1);
    }
    
  }

  executeAction(action: string) {
    if (this.cartItem && this.currentVal) {
      this.cartItem.qty = this.currentVal;
      const data: { cartItem: CartItem, action: string } = { cartItem: this.cartItem, action: action }
      this.onAction.emit(data);
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
  
}
