import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  cartList: CartItem[] = [];
  http: any

  @Input() cartItem?: CartItem;
  @Output() onAction = new EventEmitter();


  //addandminus
  quantity = new FormControl(0);

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

  executeAction(action: string) {
    if (this.cartItem && this.quantity.value) {
      this.cartItem.qty = this.quantity.value
      const data: { cartItem: CartItem, action: string } = { cartItem: this.cartItem, action: action }
      this.onAction.emit(data)
      console.log(data)

    }
  }

  ngOnInit(): void {
    if (this.cartItem) {
      this.quantity.setValue(this.cartItem.qty)

    }

    this.quantity.valueChanges.subscribe(() => {
      this.executeAction('UPDATE')
    })
  }


  //This will show the prompt alert
  showAlert = false;
  promptMessage = 'This is a prompt message';

  showPrompt() {
    this.showAlert = true;
  }



}
