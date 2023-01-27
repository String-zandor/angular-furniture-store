import { Component, Input } from '@angular/core';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-admin-product-item',
  templateUrl: './admin-product-item.component.html',
  styleUrls: ['./admin-product-item.component.scss']
})
export class AdminProductItemComponent {
  @Input() productItem?:OrderItem
}
