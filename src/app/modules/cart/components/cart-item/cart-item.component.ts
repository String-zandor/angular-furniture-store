import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, Subscription, tap } from 'rxjs';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit, OnDestroy {

  @Input() cartItem?: CartItem;
  @Output() onAction = new EventEmitter();

  qtyCtrl = new FormControl(1);
  currentVal: number = 1;
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (this.cartItem) {
      this.qtyCtrl.setValue(this.cartItem.qty)
    }
    const sub = this.qtyCtrl.valueChanges.pipe(
      tap(value => {
        this.currentVal = Number(value);
      console.log('inside tap', this.currentVal)
      }),
      debounceTime(300)
    ).subscribe(() => {
      console.log('inside valueChanges', this.currentVal)
      if (this.currentVal >= 1) {
        this.executeAction('UPDATE')
      }
    })
    this.subscriptions.push(sub);
  }

  addQuantity() {
    console.log('outside', this.currentVal)
    if (this.currentVal < 1) {
      console.log('inside', this.currentVal)
      this.currentVal = 0;
    } 
    this.qtyCtrl.setValue(this.currentVal + 1);
    console.log('after', this.qtyCtrl.value)
  }

  subractQuantity() {
    if (this.currentVal > 1) {
      this.qtyCtrl.setValue(this.currentVal - 1);
    }
  }

  executeAction(action: string) {
    if (this.cartItem) {
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
