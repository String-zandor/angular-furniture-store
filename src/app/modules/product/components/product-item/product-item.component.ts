import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';

//new import from dialogs
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromptComponent } from 'src/app/shared/prompt/prompt.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product?: Product;
  @Output() onSelection = new EventEmitter<CartItem>();
  subscriptions: Subscription[] = [];

  constructor(private _snackBar: MatSnackBar) { }

  quantity = new FormControl(1)
  //addandminus
  //quantity: number = 1;

  addQuantity() {

    if (this.quantity.value) {
      if (this.quantity.value > 0) {
        this.quantity.setValue(this.quantity.value.valueOf() + 1);
      }
    } else {
      this.quantity.setValue(1);
    }
  }

  subractQuantity() {
    if (this.quantity.value) {
      if (this.quantity.value > 1) {
        this.quantity.setValue(this.quantity.value.valueOf() - 1);
      } else {
        this.quantity.setValue(1);
      }
    }

  }

  //addToCart
  durationInSeconds = 1;
  addToCart() {
    if (this.product) {
      const cartItem: CartItem = {
        product: this.product,
        qty: Number(this.quantity.value),
      }
      this.onSelection.emit(cartItem)
      this._snackBar.openFromComponent(PromptComponent, {
        duration: this.durationInSeconds * 1000,
      });
    }
  }

}


