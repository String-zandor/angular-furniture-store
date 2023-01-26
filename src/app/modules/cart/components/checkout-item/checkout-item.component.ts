import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent {
  @Input() cartItem?:CartItem


}
