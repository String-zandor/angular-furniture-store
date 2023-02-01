import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  
  @Input() product?: Product;
  @Output() onSelection = new EventEmitter<CartItem>();
  subscriptions: Subscription[] = [];

  qtyCtrl = new FormControl(1);
  currentVal: number = 1;

  ngOnInit(): void {
    const sub = this.qtyCtrl.valueChanges.subscribe(value => {
      this.currentVal = Number(value);
    });
    this.subscriptions.push(sub);
  }
  
  addQuantity() {
    if (this.currentVal < 1) {
      this.currentVal = 0;
    } 
    this.qtyCtrl.setValue(this.currentVal + 1);
  }

  subractQuantity() {
    if (this.currentVal > 1) {
      this.qtyCtrl.setValue(this.currentVal - 1);
    }
  }

  addToCart() {
    if (this.product) {
      const cartItem: CartItem = { product: this.product, qty: this.currentVal };
      this.onSelection.emit(cartItem)
    }
  }

  ngOnDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}