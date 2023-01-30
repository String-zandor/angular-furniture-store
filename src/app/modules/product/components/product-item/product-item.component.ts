import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product?: Product;
  @Output() onSelection = new EventEmitter<CartItem>();

  qtyControl = new FormControl

  //addandminus
  quantity: number = 1;
  

  addQuantity() {
    this.quantity += 1;
  }

  subractQuantity() {
    if (this.quantity != 0)
      this.quantity--;
  }

  //addToCart
  addToCart() {
    if (this.product) {
      const cartItem: CartItem = {
        product: this.product,
        qty: this.quantity
      }
      this.onSelection.emit(cartItem)
    }



  }
}